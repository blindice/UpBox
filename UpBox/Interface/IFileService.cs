﻿using Microsoft.AspNetCore.Http;
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

        Task<List<FileDTO>> GetFilesByNameAndFileTypeAsync(string fileName, int? fileType);

        Task UploadAsync(FileUploadDTO file);

        Task<(byte[], string, string)> DownloadAsync(string fileName);

        Task DeleteFileAsync(int id, FileUpdateDTO file);

    }
}