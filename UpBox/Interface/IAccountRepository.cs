using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using UpBox.Model;

namespace UpBox.Interface
{
    public interface IAccountRepository
    {
        IQueryable<tbl_user> GetByCondition(Expression<Func<tbl_user, bool>> expression);

        void Create(tbl_user entity);

        Task SaveAsync();
    }
}
