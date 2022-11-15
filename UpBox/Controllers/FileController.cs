using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Interface;
using UpBox.Service;

namespace UpBox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        IFileService _svc;

        public FileController(IConfiguration config, IFileService svc) => _svc = svc;

        [HttpGet("getall")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FileDTO>))]
        public async Task<IActionResult> GetAll()
        {
            var files = await _svc.GetAllFilesAsync();

            var response = new ResponseDTO<List<FileDTO>>
            {
                isSuccess = true,
                Result = files,
                Message = "Get all files Successfully",
            };

            return Ok(response);
        }

        [HttpGet("getbyfiletypeandname")]
        [Authorize]
        public async Task<IActionResult> GetByFileTypeAndName([FromQuery] string fileName, [FromQuery] int? fileType, [FromQuery] bool isDeleted)
        {
            var files = await _svc.GetFilesByNameAndFileTypeAsync(fileName, fileType, isDeleted);

            var response = new ResponseDTO<List<FileDTO>>
            {
                isSuccess = true,
                Result = files,
                Message = "Get filtered files Successfully",
            };

            return Ok(response);
        }

        [HttpPost("upload")]
        [DisableRequestSizeLimit]
        [Authorize]
        public async Task<IActionResult> Upload([FromForm] FileUploadDTO file)
        {
            var userId = Convert.ToInt32(Request.Headers["updatedby"][0]);
            //var lastModified = Request.Headers["lastmodifieddate"][0];

            file.CreatedBy = userId;

            if (file.File.Length < 0) return BadRequest();

            await _svc.UploadAsync(file);

            var response = new ResponseDTO<string>
            {
                isSuccess = true,
                Result = file.File.FileName,
                Message = "File Uploaded Successfully",
            };

            return Ok();
        }

        [HttpGet("download")]
        [Authorize]
        public async Task<IActionResult> Download([FromQuery] string fileName)
        {
            if (string.IsNullOrEmpty(fileName)) return BadRequest();

            (byte[] bytes, string contentType, string name) = await _svc.DownloadAsync(fileName);

            return File(bytes, contentType, name);
        }

        [HttpPost("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int? id, [FromBody] FileUpdateDTO file)
        {
            if (id is null || !ModelState.IsValid) return BadRequest();

            var fileName = await _svc.DeleteFileAsync((int)id, file);

            var response = new ResponseDTO<string>
            {
                isSuccess = true,
                Result = fileName,
                Message = "File Deleted Successfully",
            };

            return Ok(response);
        }

        [HttpPost("restore/{id}")]
        [Authorize]
        public async Task<IActionResult> Restore(int? id, [FromBody] FileUpdateDTO file)
        {
            if (id is null || !ModelState.IsValid) return BadRequest();

            var fileName = await _svc.RestoreFileAsync((int)id, file);

            var response = new ResponseDTO<string>
            {
                isSuccess = true,
                Result = fileName,
                Message = "File Deleted Successfully",
            };

            return Ok(response);
        }

        [HttpGet("getdiscsize")]
        [Authorize]
        public IActionResult GetDiscSize()
        {
            DriveInfo dDrive = new DriveInfo("C");
            if (dDrive.IsReady)
            {
                return Ok(new { totalSize = dDrive.TotalSize, availableSize = dDrive.AvailableFreeSpace });
            }

            return Ok();
        }

        private String convertSize(double size)
        {
            String[] units = new String[] { "B", "KB", "MB", "GB", "TB", "PB" };

            double mod = 1024.0;

            int i = 0;

            while (size >= mod)
            {
                size /= mod;
                i++;
            }
            return Math.Round(size, 2) + units[i];//with 2 decimals
        }
    }
}
