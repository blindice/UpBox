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
    public class AccountRepository : IAccountRepository
    {
        UpBoxContext _context;
        public AccountRepository(UpBoxContext context) => _context = context;

        public IQueryable<tbl_user> GetByCondition(Expression<Func<tbl_user, bool>> expression) => _context.tbl_users.Where(expression).AsNoTracking();

        public void Create(tbl_user entity) => _context.tbl_users.Add(entity);

        public async Task SaveAsync() => await _context.SaveChangesAsync();
    }
}
