using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;

namespace UpBox.Interface
{
    public interface IJwtService
    {
        Task<string> GenerateJwtTokenAsync(UserInfoDTO result);
    }
}
