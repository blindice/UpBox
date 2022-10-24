using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using UpBox.Model;

#nullable disable

namespace UpBox.Model.Context
{
    public partial class UpBoxContext : DbContext
    {
        public UpBoxContext()
        {
        }

        public UpBoxContext(DbContextOptions<UpBoxContext> options)
            : base(options)
        {
        }

        public virtual DbSet<tbl_file> tbl_files { get; set; }
        public virtual DbSet<tbl_fileType> tbl_fileTypes { get; set; }
        public virtual DbSet<tbl_user> tbl_users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("name=DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<tbl_file>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.tbl_files)
                    .HasForeignKey(d => d.TypeId)
                    .HasConstraintName("FK_fileTypes_files");
            });

            modelBuilder.Entity<tbl_fileType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<tbl_user>(entity =>
            {
                entity.Property(e => e.Username).IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
