using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class AnswerService : IAnswerService
    {
        private readonly IAnswerRepository _answersRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AnswerService(IAnswerRepository answersRepository, IUnitOfWork unitOfWork)
        {
            _answersRepository = answersRepository;
            _unitOfWork = unitOfWork;
        }

        public Task<Answer> Get(Guid id)
        {
            return _answersRepository.Find(id);
        }

        public Task<IEnumerable<Answer>> GetAll()
        {
            return _answersRepository.GetAll();
        }

        public async Task Create(Answer answer)
        {
            try
            {
                await _answersRepository.Add(answer);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(Guid id, Answer answer)
        {
            var existingAnswer = await _answersRepository.Find(id);

            if (existingAnswer == null)
                throw new Exception();

            try
            {
                _answersRepository.Update(answer, existingAnswer);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Delete(Guid id)
        {
            var existingCategory = await _answersRepository.Find(id);

            if (existingCategory == null)
                throw new Exception();

            try
            {
                _answersRepository.Remove(existingCategory);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}