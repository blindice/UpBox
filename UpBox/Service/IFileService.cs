using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Model;
using UpBox.Repository;

namespace UpBox.Service
{
    public interface IFileService
    {

        Task<List<FileDTO>> GetAllFilesAsync();

        Task<List<FileDTO>> GetFilesByNameAndFileTypeAsync(string fileName, int? fileType);

        Task Upload(IFormFile file);

        Task Download();

    }
}
