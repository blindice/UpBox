using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.Interface
{
    public interface IFtpService
    {
        Task<string> UploadToFtpAsync(IFormFile file);

        Task<(byte[], string, string)> DownloadFromFtpAsync(string fileName);

        string MoveFileToDeleteFolderAsync(string filePath);

        string RestoreFileAsync(string filePath);

        void PermaDeleteFileAsync(string filePath);
    }
}
