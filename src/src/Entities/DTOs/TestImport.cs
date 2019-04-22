using System.Collections.Generic;

namespace Entities.DTOs
{
    public class TestImportDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }
        public ICollection<Question> Questions { get; set; }

        public class Question
        {
            public string Name { get; set; }
            public string Text { get; set; }
            public string Description { get; set; }
            public string AfterSubmitFeedback { get; set; }
            public ICollection<Answer> Answers { get; set; }
        }

        public class Answer
        {
            public string Text { get; set; }
            public bool IsCorrect { get; set; }
        }
    }
}