using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using UpBox.Interface;
using UpBox.Model;
using UpBox.Model.Context;

namespace UpBox.Repository
{
    public class FileRepository : IFileRepository
    {
        IDbContextFactory<UpBoxContext> _contextFactory;
        public FileRepository(IDbContextFactory<UpBoxContext> contextFactory) => _contextFactory = contextFactory;

        public IQueryable<tbl_file> GetAllFiles()
        {
            using var _context = _contextFactory.CreateDbContext();
            return _context.tbl_files.Include(_ => _.Type).AsNoTracking();
        }

        public IQueryable<tbl_file> GetByCondition(Expression<Func<tbl_file, bool>> expression)
        {
            using var _context = _contextFactory.CreateDbContext();
            return _context.tbl_files.Include(_ => _.Type).Where(expression).AsNoTracking();
        }

        public void Create(tbl_file entity)
        {
            using var _context = _contextFactory.CreateDbContext();
            _context.tbl_files.Add(entity);
        }

        public void Update(tbl_file entity)
        {
            using var _context = _contextFactory.CreateDbContext();
            _context.tbl_files.Update(entity);
        }

        public async Task SaveAsync()
        {
            using var _context = _contextFactory.CreateDbContext();
            await _context.SaveChangesAsync();
        }

    }
}
