using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace UpBox.Model
{
    [Index(nameof(TypeId), Name = "IX_tbl_files_TypeId")]
    public partial class tbl_file
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public long Size { get; set; }
        public int TypeId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreateDate { get; set; }
        public int? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }
        [Required]
        public string Path { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime LastEditedDate { get; set; }

        [ForeignKey(nameof(TypeId))]
        [InverseProperty(nameof(tbl_fileType.tbl_files))]
        public virtual tbl_fileType Type { get; set; }
    }
}
