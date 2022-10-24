using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace UpBox.Model
{
    public partial class tbl_fileType
    {
        public tbl_fileType()
        {
            tbl_files = new HashSet<tbl_file>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [InverseProperty(nameof(tbl_file.Type))]
        public virtual ICollection<tbl_file> tbl_files { get; set; }
    }
}
