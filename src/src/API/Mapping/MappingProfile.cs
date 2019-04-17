using API.Resources.Requests;
using API.Resources.Responses;
using AutoMapper;
using Entities;

namespace API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Test, TestResponse>();
            CreateMap<Test, TestRequest>();
            CreateMap<TestRequest, Test>();
            CreateMap<TestResponse, Test>();
        }
    }
}