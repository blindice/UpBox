using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.DTO
{
    public class FileDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DateTime LastEditedDate { get; set; }

        public long Size { get; set; }

        public int TypeId { get; set; }

        public bool IsDeleted { get; set; }
    }
}
