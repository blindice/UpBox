using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Model;

namespace UpBox.Profiles
{
    public class AccountProfile : Profile
    {
        public AccountProfile()
        {
            CreateMap<tbl_user, UserInfoDTO>()
                .ForMember(des => des.Role, opt => opt.MapFrom(src => src.Role.Role)).ReverseMap();
        }
    }
}
