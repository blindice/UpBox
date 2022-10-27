using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.DTO
{
    public class FileUploadDTO
    {
        [Required]
        public int CreatedBy { get; set; }

        [Required]
        public IFormFile File { get; set; }
    }
}
