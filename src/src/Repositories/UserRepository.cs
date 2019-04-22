using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await Context.Users.ToListAsync();
        }

        public async Task<User> Find(Guid id)
        {
            return await Context.Users.FindAsync(id);
        }
    }
}