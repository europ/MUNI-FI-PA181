using Microsoft.EntityFrameworkCore;

namespace Entities.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Test> Tests { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Test>().ToTable("Tests");
            builder.Entity<Test>().HasKey(p => p.Id);
            builder.Entity<Test>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Test>().Property(p => p.Name).IsRequired();
            builder.Entity<Test>().Property(p => p.Description).IsRequired();
            builder.Entity<Test>().Property(p => p.Language).IsRequired();

            // TODO: Think about seeder structure and usage for the future.
//            builder.Entity<Test>().HasData
//            (
//                new Test { Id = Guid.NewGuid(), Name = "PA101", Description = "ABC", Language = CultureInfo.GetCultureInfo("en").TwoLetterISOLanguageName},
//                new Test { Id = Guid.NewGuid(), Name = "PA102", Description = "DEF", Language = CultureInfo.GetCultureInfo("cs").TwoLetterISOLanguageName}
//            );
        }
    }
}