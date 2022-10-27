using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UpBox.Interface;
using static UpBox.Helper.FileHelper;

namespace UpBox.Service
{
    public class FtpService : IFtpService
    {
        IConfiguration _config;
        public FtpService(IConfiguration config)
        {
            _config = config;
        }
        public async Task<(byte[], string, string)> DownloadFromFtpAsync(string fileName)
        {
            var fileExt = System.IO.Path.GetExtension(fileName).Substring(1);
            var fileFolder = GetFileFolder(fileExt);
            var path = Path.Combine(_config.GetSection("Ftp:Server").Value, fileFolder);
            var filePath = Path.Combine(path, fileName);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application /octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);

            return (bytes, contentType, filePath);
        }

        public async Task<string> UploadToFtpAsync(IFormFile file)
        {
            var fileExt = System.IO.Path.GetExtension(file.FileName).Substring(1);
            var fileFolder = GetFileFolder(fileExt);
            var path = Path.Combine(_config.GetSection("Ftp:Server").Value, fileFolder);

            if (!Directory.Exists(path)) Directory.CreateDirectory(path);

            var filepath = Path.Combine(path, file.FileName);

            if (System.IO.File.Exists(filepath)) throw new Exception("File Already Exists!");

            using (var stream = System.IO.File.Create(filepath))
            {
                await file.CopyToAsync(stream);
            }

            return filepath;
        }
    }
}
