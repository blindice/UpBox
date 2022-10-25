using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    [Route("api/[controller]/[action]")]
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
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var files = await _svc.GetAllFilesAsync();

            return Ok(files);
        }

        [HttpGet]
        public async Task<IActionResult> GetByFileTypeAndName([FromQuery] string fileName, [FromQuery] int? fileType)
        {
            var files = await _svc.GetFilesByNameAndFileTypeAsync(fileName, fileType);
            return Ok(files);
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload([FromForm] FileUploadDTO file)
        {

            if (file.File.Length > 0) await _svc.Upload(file);

            return Ok();
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Delete(int? id, [FromBody] FileUpdateDTO file)
        {
            await _svc.DeleteFileAsync((int)id, file);
            return Ok();
        }
    }
}
