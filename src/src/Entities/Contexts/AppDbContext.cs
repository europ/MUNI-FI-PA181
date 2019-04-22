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
                    Password = "FF83504906991383181BA5B84E9F7554708242B8AD8B6E2CF4029C71994274B6",
                    Role = Role.Admin
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Václav",
                    LastName = "Stehlík",
                    Username = "vasastehlik@email.cz",
                    Password = "2FC34D13457629D11C9FC2A4586099B69B0DEA1269564ADCED28B2D2342FD864",
                    Role = Role.Admin
                }
            );
        }
    }
}