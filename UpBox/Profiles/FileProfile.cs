using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Model;

namespace UpBox.Profiles
{
    public class FileProfile : Profile
    {
        public FileProfile()
        {
            CreateMap<tbl_file, FileDTO>().ReverseMap();
        }
    }
}
