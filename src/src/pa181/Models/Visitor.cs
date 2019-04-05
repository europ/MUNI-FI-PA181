using System.ComponentModel.DataAnnotations;

namespace pa181.Models
{
    public class Visitor
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}