using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;

namespace Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> Find(Guid id);
    }
}