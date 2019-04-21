using System;
using System.Collections.Generic;

namespace API.Resources.Responses
{
    public class TestResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }
        public ICollection<QuestionResponse> Questions { get; set; }
    }
}