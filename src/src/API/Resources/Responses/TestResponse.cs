using System;
using System.Globalization;

namespace API.Resources.Responses
{
    public class TestResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public CultureInfo Language { get; set; }
    }
}