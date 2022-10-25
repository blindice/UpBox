using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.DTO
{
    public class FileUpdateDTO
    {
        public int Id { get; set; }

        public bool IsDeleted { get; set; }

        public int? UpdatedBy { get; set; }
    }
}
