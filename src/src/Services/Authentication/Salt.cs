using System;
using System.Security.Cryptography;

namespace Services.Authentication
{
    public class Salt : ISalt
    {
        private const int SaltByteSize = 32;

        public string Create()
        {
            var randomBytes = new byte[SaltByteSize];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }
    }
}