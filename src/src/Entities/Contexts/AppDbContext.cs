using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Entities.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Test> Tests { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Test>()
                .HasMany(t => t.Questions)
                .WithOne(q => q.Test)
                .HasForeignKey(q => q.TestId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Question>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User>().HasData
            (
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "No",
                    LastName = "Name",
                    Username = "noname@noemail.com",
                    Password = "E6ciPrA9iFUaIn91FfS8SgxhTFGHXu4+QpAIGlRbDlw=",
                    Salt = "91BDAA01E3CC2412580AA61E0F47C4B9",
                    Role = Role.Admin
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Václav",
                    LastName = "Stehlík",
                    Username = "vasastehlik@email.cz",
                    Password = "d2D6gknohWuDlpqBuledV2LXarn50uw26cTEXxvwi7A=",
                    Salt = "D6D058720A8F18D6B0EC7430B50C67FB",
                    Role = Role.Admin
                }
            );


            var testChemistry = new Test {Id = Guid.NewGuid(), Name = "Chemistry", Description = "General knowledge of chemistry.", Language = "EN"};
            var testGeology = new Test {Id = Guid.NewGuid(), Name = "Geology", Description = "General knowledge of geology.", Language = "EN"};
            var testInformatics = new Test {Id = Guid.NewGuid(), Name = "Informatics", Description = "General knowledge of informatics.", Language = "EN"};
            var testMathematics = new Test {Id = Guid.NewGuid(), Name = "Mathematics", Description = "General knowledge of mathematics.", Language = "EN"};

            var questionChemistry = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(), TestId = testChemistry.Id, Text = "Which element is radioactive?", Description = "Elements", AfterSubmitFeedback = "Be aware of them."
                },
                new Question
                {
                    Id = Guid.NewGuid(), TestId = testChemistry.Id, Text = "What is dihydrogen oxid?", Description = "Chemical compound", AfterSubmitFeedback = "So smart."
                },
                new Question
                {
                    Id = Guid.NewGuid(), TestId = testChemistry.Id, Text = "Which element is fundamental for the iron industry?", Description = "Metal",
                    AfterSubmitFeedback = "... and also for Iron Man!!!"
                }
            };

            var questionGeology = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(), TestId = testGeology.Id, Text = "Which one is the world's biggest ocean?", Description = "Oceans",
                    AfterSubmitFeedback = "You should know it."
                },
                new Question {Id = Guid.NewGuid(), TestId = testGeology.Id, Text = "Where are pyramids?", Description = "Monuments", AfterSubmitFeedback = "Easy for you."},
                new Question
                {
                    Id = Guid.NewGuid(), TestId = testGeology.Id, Text = "Where does the lion live?", Description = "Animals", AfterSubmitFeedback = "This was a casual one."
                }
            };

            var questionInformatics = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(), TestId = testInformatics.Id, Text = "Which one is the core of the computer?", Description = "Chip",
                    AfterSubmitFeedback = "Easy to anybody."
                },
                new Question
                {
                    Id = Guid.NewGuid(), TestId = testInformatics.Id, Text = "Where do we store persistent informations on a local computer?", Description = "Data storage",
                    AfterSubmitFeedback = "Unbelievably easy."
                },
                new Question
                {
                    Id = Guid.NewGuid(), TestId = testInformatics.Id, Text = "Whats is the term for the computer network address?", Description = "Networking",
                    AfterSubmitFeedback = "An advanced one."
                }
            };

            var questionMathematics = new List<Question>
            {
                new Question {Id = Guid.NewGuid(), TestId = testMathematics.Id, Text = "2 - 2 = ?", Description = "Subtraction", AfterSubmitFeedback = "Easy or not?"},
                new Question {Id = Guid.NewGuid(), TestId = testMathematics.Id, Text = "2 + 2 = ?", Description = "Addition", AfterSubmitFeedback = "So funny."},
                new Question {Id = Guid.NewGuid(), TestId = testMathematics.Id, Text = "2 * 2 = ?", Description = "Multiplication", AfterSubmitFeedback = "Difficult?"}
            };

            var answerChemistry = new List<List<Answer>>
            {
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[0].Id, Text = "Uranium", IsCorrect = true},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[0].Id, Text = "Oxygen", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[0].Id, Text = "Plutonium", IsCorrect = true},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[0].Id, Text = "Mercury", IsCorrect = false},
                },
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[1].Id, Text = "Polyvinyl chloride", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[1].Id, Text = "Methane", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[1].Id, Text = "Bronze", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[1].Id, Text = "Water", IsCorrect = true},
                },
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[2].Id, Text = "Borum", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[2].Id, Text = "Ferrum", IsCorrect = true},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[2].Id, Text = "Helium", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionChemistry[2].Id, Text = "Krypton", IsCorrect = false},
                },
            };
            var answerGeology = new List<List<Answer>>
            {
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[0].Id, Text = "Pacific Ocean", IsCorrect = true},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[0].Id, Text = "Atlantic Ocean", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[0].Id, Text = "Indian Ocean", IsCorrect = false},
                },
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[1].Id, Text = "Germany", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[1].Id, Text = "Hungary", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[1].Id, Text = "Slovakia", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[1].Id, Text = "Egypt", IsCorrect = true},
                },
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[2].Id, Text = "Europe", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[2].Id, Text = "Africa", IsCorrect = true},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[2].Id, Text = "Antarctica", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionGeology[2].Id, Text = "Arctic", IsCorrect = false},
                },
            };
            var answerInformatics = new List<List<Answer>>
            {
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[0].Id, Text = "CPU (Central Processing Unit)", IsCorrect = true},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[0].Id, Text = "USB (Universal Serial Bus)", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[0].Id, Text = "RAM (Random Access Memory)", IsCorrect = false},
                },
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[1].Id, Text = "Processor", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[1].Id, Text = "Disk", IsCorrect = true},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[1].Id, Text = "Motherboard", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[1].Id, Text = "Keyboard", IsCorrect = false},
                },
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[2].Id, Text = "ID address", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[2].Id, Text = "PI address", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[2].Id, Text = "IT address", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionInformatics[2].Id, Text = "IP address", IsCorrect = true},
                },
            };
            var answerMathematics = new List<List<Answer>>
            {
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[0].Id, Text = "0", IsCorrect = true},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[0].Id, Text = "2", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[0].Id, Text = "4", IsCorrect = false},
                },
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[1].Id, Text = "1", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[1].Id, Text = "2", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[1].Id, Text = "9", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[1].Id, Text = "4", IsCorrect = true},
                },
                new List<Answer>
                {
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[2].Id, Text = "1", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[2].Id, Text = "2", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[2].Id, Text = "3", IsCorrect = false},
                    new Answer {Id = Guid.NewGuid(), QuestionId = questionMathematics[2].Id, Text = "4", IsCorrect = true},
                },
            };

            var allQuestions = new List<List<Question>> {questionChemistry, questionGeology, questionInformatics, questionMathematics};
            var allAnswers = new List<List<List<Answer>>> {answerChemistry, answerGeology, answerInformatics, answerMathematics};

            builder.Entity<Test>().HasData(testChemistry, testGeology, testInformatics, testMathematics);

            foreach (var testQuestions in allQuestions)
            {
                builder.Entity<Question>().HasData(testQuestions.ToArray());
            }

            foreach (var testAnswers in allAnswers)
            {
                foreach (var questionAnswers in testAnswers)
                {
                    builder.Entity<Answer>().HasData(questionAnswers.ToArray());
                }
            }
        }
    }
}