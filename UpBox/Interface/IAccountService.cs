using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;

namespace UpBox.Interface
{
    public interface IAccountService
    {
        Task<UserInfoDTO> VerifyUserAsync(LoginDTO account);

        Task<UserInfoDTO> GetUserByUserIdAsync(int userId);

        Task<string> GenerateJWTTokenAsync(UserInfoDTO userInfo);
    }
}
