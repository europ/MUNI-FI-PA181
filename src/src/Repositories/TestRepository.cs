using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories
{
    public class TestRepository : BaseRepository, ITestRepository
    {
        public TestRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Test>> GetAll()
        {
            return await Context.Tests
                .Include(test => test.Questions)
                .ThenInclude(question => question.Answers)
                .ToListAsync();
        }

        public async Task Add(Test test)
        {
            await Context.Tests.AddAsync(test);
        }

        public async Task<Test> Find(Guid id)
        {
            return await Context.Tests
                .Include(test => test.Questions)
                .ThenInclude(question => question.Answers)
                .SingleOrDefaultAsync(test => test.Id == id);
        }

        public void Update(Test newTest, Test oldTest)
        {
            Context.Entry(oldTest).CurrentValues.SetValues(newTest);
        }

        public void Remove(Test test)
        {
            Context.Tests.Remove(test);
        }
    }
}