using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;

namespace Repositories.Interfaces
{
    public interface ITestRepository
    {
        Task<IEnumerable<Test>> GetAll();
        Task Add(Test test);
        Task<Test> Find(Guid id);
        void Update(Test newTest, Test oldTest);
        void Remove(Test test);
    }
}