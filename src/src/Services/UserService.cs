using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Repositories.Interfaces;
using Services.Authentication;
using Services.Interfaces;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly IUserRepository _userRepository;
        private readonly IHash _hash;

        public UserService(IOptions<AppSettings> appSettings, IUserRepository userRepository, IHash hash)
        {
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
            _hash = hash;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var users = await _userRepository.GetAll();
            var user = users.SingleOrDefault(x => x.Username == username);

            // return null if user not found
            if (user == null || !_hash.Validate(password, user.Salt, user.Password))
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public Task<User> Get(Guid id)
        {
            return _userRepository.Find(id);
        }

        public Task<IEnumerable<User>> GetAll()
        {
            return _userRepository.GetAll();
        }
    }
}