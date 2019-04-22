using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;

namespace Services.Interfaces
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<User> Get(Guid id);
        Task<IEnumerable<User>> GetAll();
    }
}