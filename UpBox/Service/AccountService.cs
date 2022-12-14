using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Helper.CustomExceptions;
using UpBox.Interface;
using UpBox.Model;
using static UpBox.Helper.PasswordManager;

namespace UpBox.Service
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repo;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwt;
        public AccountService(IAccountRepository repo, IMapper mapper, IJwtService jwt)
        {
            _repo = repo;
            _mapper = mapper;
            _jwt = jwt;
        }
        public async Task<UserInfoDTO> VerifyUserAsync(LoginDTO account)
        {
            var userInfo = await _repo.GetByCondition(u => u.Username == account.Username).FirstOrDefaultAsync();

            if (userInfo is null) throw new CustomException("User Not Found!");

            var hash = GetHash(account.Password, userInfo.Salt);

            if (hash != userInfo.Password) throw new CustomException("Invalid Account");

            var info = _mapper.Map<UserInfoDTO>(userInfo);

            return info;
        }

        public async Task<UserInfoDTO> GetUserByUserIdAsync(int userId)
        {
            var userInfo = await _repo.GetByCondition(u => u.Id == userId).FirstOrDefaultAsync();

            if (userInfo is null) throw new CustomException("Invalid User ID!");

            var info = _mapper.Map<UserInfoDTO>(userInfo);

            return info;
        }

        public async Task<string> GenerateJWTTokenAsync(UserInfoDTO userInfo)
        {
            if (userInfo is null) throw new CustomException("Can't Generate JWT Token, Invalid User Info!");

            return await _jwt.GenerateJwtTokenAsync(userInfo);
        }

        public async Task RegisterAccountAsync(RegisterDTO account)
        {
            var userInfo = await _repo.GetByCondition(u => u.Username == account.Username).FirstOrDefaultAsync();

            if(userInfo is not null) throw new CustomException("Username Already Exists!");

            var salt = GenerateSalt();

            var newAccount = new tbl_user
            {
                Username = account.Username,
                Password = GetHash(account.Password, salt),
                Fullname = account.Fullname,
                Salt = salt,
                RoleId = account.RoleId
            };

            _repo.Create(newAccount);
            await _repo.SaveAsync();
        }
    }
}
