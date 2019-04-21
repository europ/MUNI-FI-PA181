using System;

namespace API.Resources.Responses
{
    public class AnswerResponse
    {
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}