using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository _questionsRepository;
        private readonly IUnitOfWork _unitOfWork;

        public QuestionService(IQuestionRepository questionsRepository, IUnitOfWork unitOfWork)
        {
            _questionsRepository = questionsRepository;
            _unitOfWork = unitOfWork;
        }

        public Task<Question> Get(Guid id)
        {
            return _questionsRepository.Find(id);
        }

        public Task<IEnumerable<Question>> GetAll()
        {
            return _questionsRepository.GetAll();
        }

        public async Task Create(Question question)
        {
            try
            {
                await _questionsRepository.Add(question);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(Guid id, Question question)
        {
            var existingQuestion = await _questionsRepository.Find(id);

            if (existingQuestion == null)
                throw new Exception();

            try
            {
                _questionsRepository.Update(question, existingQuestion);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Delete(Guid id)
        {
            var existingCategory = await _questionsRepository.Find(id);

            if (existingCategory == null)
                throw new Exception();

            try
            {
                _questionsRepository.Remove(existingCategory);
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}