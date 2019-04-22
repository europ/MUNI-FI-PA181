using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Entities.DTOs;

namespace Services.Interfaces
{
    public interface ITestService
    {
        Task<Test> Get(Guid id);
        Task<IEnumerable<Test>> GetAll();
        Task Create(Test test);
        Task Update(Guid id, Test test);
        Task Delete(Guid id);
        Task<Guid> ImportTest(TestImportDto testImportDto);
    }
}