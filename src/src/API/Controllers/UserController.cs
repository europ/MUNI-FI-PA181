using System.Threading.Tasks;
using API.Resources.Requests;
using API.Resources.Responses;
using AutoMapper;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public UsersController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserAuthenticationRequest userAuthenticationRequest)
        {
            var user = await _userService.Authenticate(userAuthenticationRequest.Username, userAuthenticationRequest.Password);

            if (user == null)
                return BadRequest(new {message = "Username or password is incorrect"});

            var response = _mapper.Map<User, UserResponse>(user);
            return Ok(response);
        }
    }
}