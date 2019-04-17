using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testsRepository;
        private readonly IUnitOfWork _unitOfWork;

        public TestService(ITestRepository testsRepository, IUnitOfWork unitOfWork)
        {
            _testsRepository = testsRepository;
            _unitOfWork = unitOfWork;
        }

        public Task<Test> Get(Guid id)
        {
            return _testsRepository.Find(id);
        }

        public Task<IEnumerable<Test>> GetAll()
        {
            return _testsRepository.GetAll();
        }

        public async Task Create(Test test)
        {
            try
            {
                await _testsRepository.Add(test);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(Guid id, Test test)
        {
            var existingTest = await _testsRepository.Find(id);

            if (existingTest == null)
                throw new Exception();

            try
            {
                _testsRepository.Update(test, existingTest);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Delete(Guid id)
        {
            var existingCategory = await _testsRepository.Find(id);

            if (existingCategory == null)
                throw new Exception();

            try
            {
                _testsRepository.Remove(existingCategory);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}