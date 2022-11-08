using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace UpBox.Model
{
    public partial class tbl_user
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(30)]
        public string Username { get; set; }
        [Required]
        [StringLength(128)]
        public string Password { get; set; }
        [Required]
        [StringLength(128)]
        public string Salt { get; set; }
        [Required]
        [StringLength(100)]
        public string Fullname { get; set; }
        public int RoleId { get; set; }

        [ForeignKey(nameof(RoleId))]
        [InverseProperty(nameof(tbl_userType.tbl_users))]
        public virtual tbl_userType Role { get; set; }
    }
}
