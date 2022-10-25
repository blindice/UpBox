using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using UpBox.Model;
using UpBox.Model.Context;

namespace UpBox.Repository
{
    public class FileRepository : IFileRepository
    {
        UpBoxContext _context;
        public FileRepository(UpBoxContext context) => _context = context;

        public IQueryable<tbl_file> GetAllFiles() => _context.tbl_files.Include(_ => _.Type).AsNoTracking();

        public IQueryable<tbl_file> GetByCondition(Expression<Func<tbl_file, bool>> expression) => _context.tbl_files.Include(_ => _.Type).Where(expression).AsNoTracking();

        public void Create(tbl_file entity) => _context.tbl_files.Add(entity);

        public void Update(tbl_file entity) => _context.tbl_files.Update(entity);

        public async Task SaveAsync() => await _context.SaveChangesAsync();

    }
}
