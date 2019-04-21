using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;

namespace Services.Interfaces
{
    public interface IAnswerService
    {
        Task<Answer> Get(Guid id);
        Task<IEnumerable<Answer>> GetAll();
        Task Create(Answer answer);
        Task Update(Guid id, Answer answer);
        Task Delete(Guid id);
    }
}