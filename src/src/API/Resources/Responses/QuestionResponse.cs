using System;
using System.Collections.Generic;

namespace API.Resources.Responses
{
    public class QuestionResponse
    {
        public Guid Id { get; set; }
        public Guid TestId { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }
        public string AfterSubmitFeedback { get; set; }
        public ICollection<AnswerResponse> Answers { get; set; }
    }
}