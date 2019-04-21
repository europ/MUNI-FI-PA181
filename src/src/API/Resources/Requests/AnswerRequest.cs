using System;

namespace API.Resources.Requests
{
    public class AnswerRequest
    {
        public Guid QuestionId { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}