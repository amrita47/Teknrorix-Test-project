using Microsoft.EntityFrameworkCore;
using MyApiProject.Models;
using static System.Net.Mime.MediaTypeNames;

namespace MyApiProject.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Job> Jobs { get; set; }
    }
}

