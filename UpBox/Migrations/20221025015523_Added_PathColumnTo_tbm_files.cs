using Microsoft.EntityFrameworkCore.Migrations;

namespace UpBox.Migrations
{
    public partial class Added_PathColumnTo_tbm_files : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "tbl_files",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Path",
                table: "tbl_files");
        }
    }
}
