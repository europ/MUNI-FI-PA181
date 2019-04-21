using System;
using System.Collections.Generic;

namespace Entities
{
    public class Test
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}