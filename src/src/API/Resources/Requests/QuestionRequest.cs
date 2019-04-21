using System;

namespace API.Resources.Requests
{
    public class QuestionRequest
    {
        public Guid TestId { set; get; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }
        public string AfterSubmitFeedback { get; set; }
    }
}