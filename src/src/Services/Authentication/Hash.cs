using System;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Services.Authentication
{
    public class Hash : IHash
    {
        private const int HashByteSize = 32;

        public string Create(string value, string salt)
        {
            var valueBytes = KeyDerivation.Pbkdf2(value, Encoding.UTF8.GetBytes(salt), KeyDerivationPrf.HMACSHA512, 10000, HashByteSize);
            return Convert.ToBase64String(valueBytes);
        }

        public bool Validate(string value, string salt, string hash) => Create(value, salt) == hash;
    }
}