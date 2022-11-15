using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Model;
using UpBox.Repository;

namespace UpBox.Interface
{
    public interface IFileService
    {

        Task<List<FileDTO>> GetAllFilesAsync();

        Task<List<FileDTO>> GetFilesByNameAndFileTypeAsync(string fileName, int? fileType, bool isDeleted);

        Task UploadAsync(FileUploadDTO file);

        Task<(byte[], string, string)> DownloadAsync(string fileName);

        Task<string> DeleteFileAsync(int id, FileUpdateDTO file);

        Task<string> RestoreFileAsync(int id, FileUpdateDTO file);

        Task PermaDeleteFileAsync(int id, FileUpdateDTO file);

    }
}
