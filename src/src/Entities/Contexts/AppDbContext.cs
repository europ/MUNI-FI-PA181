using System;
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
        }
    }
}