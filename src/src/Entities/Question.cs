using System;
using System.Collections.Generic;

namespace Entities
{
    public class Question
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }
        public string AfterSubmitFeedback { get; set; }
        public ICollection<Answer> Answers { get; set; }

        public Guid TestId { get; set; }
        public Test Test { get; set; }
    }
}