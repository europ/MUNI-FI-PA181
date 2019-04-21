using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories
{
    public class QuestionRepository : BaseRepository, IQuestionRepository
    {
        public QuestionRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Question>> GetAll()
        {
            return await Context.Questions
                .Include(question => question.Answers)
                .ToListAsync();
        }

        public async Task Add(Question question)
        {
            await Context.Questions.AddAsync(question);
        }

        public async Task<Question> Find(Guid id)
        {
            return await Context.Questions
                .Include(question => question.Answers)
                .SingleOrDefaultAsync(question => question.Id == id);
        }

        public void Update(Question newQuestion, Question oldQuestion)
        {
            Context.Entry(oldQuestion).CurrentValues.SetValues(newQuestion);
        }

        public void Remove(Question question)
        {
            Context.Questions.Remove(question);
        }
    }
}