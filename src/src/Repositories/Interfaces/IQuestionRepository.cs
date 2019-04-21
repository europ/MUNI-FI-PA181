using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;

namespace Repositories.Interfaces
{
    public interface IQuestionRepository
    {
        Task<IEnumerable<Question>> GetAll();
        Task Add(Question question);
        Task<Question> Find(Guid id);
        void Update(Question newQuestion, Question oldQuestion);
        void Remove(Question question);
    }
}