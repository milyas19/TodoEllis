using Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Data
{
    public class TodoContext  : DbContext
    {
        public DbSet<Todo> Todos { get; set; }
        
        public TodoContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new TodoConfig());
        }
    }
}
