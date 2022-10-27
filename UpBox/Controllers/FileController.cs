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
using UpBox.Service;

namespace UpBox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        IConfiguration _config;
        IFileService _svc;

        public FileController(IConfiguration config, IFileService svc)
        {
            _config = config;
            _svc = svc;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var files = await _svc.GetAllFilesAsync();

            return Ok(files);
        }

        [HttpGet("getbyfiletypeandname")]
        public async Task<IActionResult> GetByFileTypeAndName([FromQuery] string fileName, [FromQuery] int? fileType)
        {
            var files = await _svc.GetFilesByNameAndFileTypeAsync(fileName, fileType);
            return Ok(files);
        }

        [HttpPost("upload")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Upload([FromForm] FileUploadDTO file)
        {
            if (file.File.Length > 0) await _svc.UploadAsync(file);

            return Ok();
        }

        [HttpGet("download")]
        public async Task<IActionResult> Download([FromQuery] string fileName)
        {
            (byte[] bytes, string contentType, string filePath) = await _svc.DownloadAsync(fileName);

            return File(bytes, contentType, Path.GetFileName(filePath));
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int? id, [FromBody] FileUpdateDTO file)
        {
            await _svc.DeleteFileAsync((int)id, file);
            return Ok();
        }
    }
}
