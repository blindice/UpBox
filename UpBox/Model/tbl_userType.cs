using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace UpBox.Model
{
    public partial class tbl_userType
    {
        public tbl_userType()
        {
            tbl_users = new HashSet<tbl_user>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(30)]
        public string Role { get; set; }

        [InverseProperty(nameof(tbl_user.Role))]
        public virtual ICollection<tbl_user> tbl_users { get; set; }
    }
}
