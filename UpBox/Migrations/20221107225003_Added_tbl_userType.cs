using Microsoft.EntityFrameworkCore.Migrations;

namespace UpBox.Migrations
{
    public partial class Added_tbl_userType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_userTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_userTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_users_RoleId",
                table: "tbl_users",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleId",
                table: "tbl_users",
                column: "RoleId",
                principalTable: "tbl_userTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleId",
                table: "tbl_users");

            migrationBuilder.DropTable(
                name: "tbl_userTypes");

            migrationBuilder.DropIndex(
                name: "IX_tbl_users_RoleId",
                table: "tbl_users");
        }
    }
}
