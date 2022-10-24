using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UpBox.Migrations
{
    public partial class InitialMigrate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "tbl_fileTypes",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tbl_fileTypes", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tbl_users",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Username = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
            //        Password = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
            //        Salt = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tbl_users", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tbl_files",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
            //        Size = table.Column<long>(type: "bigint", nullable: false),
            //        TypeId = table.Column<int>(type: "int", nullable: false),
            //        IsDeleted = table.Column<bool>(type: "bit", nullable: false),
            //        CreatedBy = table.Column<int>(type: "int", nullable: false),
            //        CreateDate = table.Column<DateTime>(type: "datetime", nullable: false),
            //        UpdatedBy = table.Column<int>(type: "int", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tbl_files", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_fileTypes_files",
            //            column: x => x.TypeId,
            //            principalTable: "tbl_fileTypes",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_tbl_files_TypeId",
            //    table: "tbl_files",
            //    column: "TypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_files");

            migrationBuilder.DropTable(
                name: "tbl_users");

            migrationBuilder.DropTable(
                name: "tbl_fileTypes");
        }
    }
}
