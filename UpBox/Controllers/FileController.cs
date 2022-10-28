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
        public async Task<IActionResult> GetByFileTypeAndName([FromQuery] string fileName, [FromQuery] int? fileType)
        {
            var files = await _svc.GetFilesByNameAndFileTypeAsync(fileName, fileType);

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
    }
}
