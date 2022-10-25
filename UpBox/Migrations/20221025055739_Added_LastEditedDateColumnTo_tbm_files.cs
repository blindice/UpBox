using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UpBox.Migrations
{
    public partial class Added_LastEditedDateColumnTo_tbm_files : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastEditedDate",
                table: "tbl_files",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastEditedDate",
                table: "tbl_files");
        }
    }
}
