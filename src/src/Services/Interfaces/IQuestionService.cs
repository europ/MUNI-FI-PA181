using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;

namespace Services.Interfaces
{
    public interface IQuestionService
    {
        Task<Question> Get(Guid id);
        Task<IEnumerable<Question>> GetAll();
        Task Create(Question question);
        Task Update(Guid id, Question question);
        Task Delete(Guid id);
    }
}