using API.Resources.Requests;
using API.Resources.Responses;
using AutoMapper;
using Entities;
using Entities.DTOs;

namespace API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserResponse>();

            CreateMap<Test, TestResponse>();
            CreateMap<Test, TestRequest>();
            CreateMap<TestRequest, Test>();
            CreateMap<TestResponse, Test>();

            CreateMap<Question, QuestionResponse>();
            CreateMap<Question, QuestionRequest>();
            CreateMap<QuestionRequest, Question>();
            CreateMap<QuestionResponse, Question>();

            CreateMap<Answer, AnswerResponse>();
            CreateMap<Answer, AnswerRequest>();
            CreateMap<AnswerRequest, Answer>();
            CreateMap<AnswerResponse, Answer>();

            CreateMap<ImportTestRequest, TestImportDto>();
        }
    }
}