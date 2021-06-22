using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ProfileContext : IdentityDbContext
    {
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public ProfileContext(DbContextOptions<ProfileContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Skill>().HasOne(p => p.Profile).WithMany(b => b.Skills)
                .HasForeignKey(p => p.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(builder);
        }
    }
}
