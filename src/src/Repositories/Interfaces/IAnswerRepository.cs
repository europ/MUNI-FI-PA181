using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;

namespace Repositories.Interfaces
{
    public interface IAnswerRepository
    {
        Task<IEnumerable<Answer>> GetAll();
        Task Add(Answer answer);
        Task<Answer> Find(Guid id);
        void Update(Answer newAnswer, Answer oldAnswer);
        void Remove(Answer answer);
    }
}