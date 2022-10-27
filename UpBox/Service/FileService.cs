using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Enum;
using UpBox.Interface;
using UpBox.Model;
using UpBox.Repository;
using static UpBox.Helper.FileHelper;

namespace UpBox.Service
{
    public class FileService : IFileService
    {
        IFileRepository _repo;
        IMapper _mapper;
        IFtpService _ftpSvc;
        public FileService(IFileRepository repo, IMapper mapper, IFtpService ftpSvc)
        {
            _repo = repo;
            _mapper = mapper;
            _ftpSvc = ftpSvc;
        }
        public async Task<(byte[], string, string)> DownloadAsync(string fileName)
        {
            (byte[] bytes, string contentType, string filePath) = await _ftpSvc.DownloadFromFtpAsync(fileName);

            return (bytes, contentType, Path.GetFileName(filePath));
        }

        public async Task<List<FileDTO>> GetAllFilesAsync()
        {
            var files = await _repo.GetAllFiles().OrderByDescending(f => f.LastEditedDate).ToListAsync();
            var fileDTO = _mapper.Map<List<FileDTO>>(files);

            return fileDTO;
        }

        public async Task<List<FileDTO>> GetFilesByNameAndFileTypeAsync(string fileName, int? fileType)
        {
            var files = await _repo.GetByCondition(f => (f.Name.Contains(fileName) || fileName == null) && f.TypeId == fileType || fileType == null)
                .OrderByDescending(f => f.LastEditedDate).ToListAsync();
            var fileDTO = _mapper.Map<List<FileDTO>>(files);

            return fileDTO;
        }

        public async Task UploadAsync(FileUploadDTO file)
        {
            var filePath = await _ftpSvc.UploadToFtpAsync(file.File);

            FileInfo fi = new FileInfo(filePath);

            var fileEntity = new tbl_file()
            {
                Name = fi.Name,
                Size = fi.Length,
                TypeId = GetFileType(fi.Extension.Substring(1)),
                Path = fi.FullName,
                LastEditedDate = fi.LastWriteTime,
                CreatedBy = file.CreatedBy,
                CreateDate = DateTime.Now
            };

            _repo.Create(fileEntity);
            await _repo.SaveAsync();
        }

        public async Task DeleteFileAsync(int id, FileUpdateDTO file)
        {
            var fileEntity = await _repo.GetByCondition(f => f.Id == id).FirstOrDefaultAsync();

            fileEntity.IsDeleted = file.IsDeleted;
            fileEntity.UpdatedBy = file.UpdatedBy;
            fileEntity.UpdatedDate = DateTime.Now;

            _repo.Update(fileEntity);
            await _repo.SaveAsync();
        }
     
    }
}
