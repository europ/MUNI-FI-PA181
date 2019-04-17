using Entities.Contexts;

namespace Repositories
{
    public class BaseRepository
    {
        protected readonly AppDbContext Context;

        public BaseRepository(AppDbContext context)
        {
            Context = context;
        }
    }
}