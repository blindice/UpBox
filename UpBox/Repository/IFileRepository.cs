using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using UpBox.Model;

namespace UpBox.Repository
{
    public interface IFileRepository
    {
        IQueryable<tbl_file> GetAllFiles();

        IQueryable<tbl_file> GetByCondition(Expression<Func<tbl_file, bool>> expression);
    }
}
