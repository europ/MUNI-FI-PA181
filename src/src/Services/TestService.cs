using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using Entities.DTOs;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class TestService : ITestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IQuestionService _questionService;
        private readonly IAnswerService _answerService;
        private readonly ITestRepository _testsRepository;

        public TestService(ITestRepository testsRepository, IUnitOfWork unitOfWork, IQuestionService questionService, IAnswerService answerService)
        {
            _unitOfWork = unitOfWork;
            _questionService = questionService;
            _answerService = answerService;
            _testsRepository = testsRepository;
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

        public async Task<Guid> ImportTest(TestImportDto testImportDto)
        {
            var test = new Test
            {
                Id = Guid.NewGuid(),
                Name = testImportDto.Name,
                Description = testImportDto.Description,
                Language = testImportDto.Language
            };

            await Create(test);


            foreach (var question in testImportDto.Questions)
            {
                var questionEntity = new Question
                {
                    Id = Guid.NewGuid(),
                    TestId = test.Id,
                    Name = question.Name,
                    Text = question.Text,
                    Description = question.Description,
                    AfterSubmitFeedback = question.AfterSubmitFeedback
                };

                await _questionService.Create(questionEntity);

                foreach (var answer in question.Answers)
                {
                    var answerEntity = new Answer
                    {
                        Id = Guid.NewGuid(),
                        QuestionId = questionEntity.Id,
                        Text = answer.Text,
                        IsCorrect = answer.IsCorrect
                    };

                    await _answerService.Create(answerEntity);
                }
            }

            return test.Id;
        }
    }
}