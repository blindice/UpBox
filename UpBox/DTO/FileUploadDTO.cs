using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.DTO
{
    public class FileUploadDTO
    {
        public int CreatedBy { get; set; }
        
        public IFormFile File { get; set; }
    }
}
