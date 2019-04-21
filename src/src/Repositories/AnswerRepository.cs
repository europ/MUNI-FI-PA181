using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories
{
    public class AnswerRepository : BaseRepository, IAnswerRepository
    {
        public AnswerRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Answer>> GetAll()
        {
            return await Context.Answers.ToListAsync();
        }

        public async Task Add(Answer answer)
        {
            await Context.Answers.AddAsync(answer);
        }

        public async Task<Answer> Find(Guid id)
        {
            return await Context.Answers.FindAsync(id);
        }

        public void Update(Answer newAnswer, Answer oldAnswer)
        {
            Context.Entry(oldAnswer).CurrentValues.SetValues(newAnswer);
        }

        public void Remove(Answer answer)
        {
            Context.Answers.Remove(answer);
        }
    }
}