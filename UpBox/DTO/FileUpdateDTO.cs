using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.DTO
{
    public class FileUpdateDTO
    {
        [Required]
        public int? Id { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        [Required]
        public int? UpdatedBy { get; set; }
    }
}
