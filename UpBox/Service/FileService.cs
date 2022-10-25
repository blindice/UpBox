using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Enum;
using UpBox.Model;
using UpBox.Repository;
using static UpBox.Helper.FileHelper;

namespace UpBox.Service
{
    public class FileService : IFileService
    {
        IFileRepository _repo;
        IMapper _mapper;
        public FileService(IFileRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public Task Download()
        {
            throw new NotImplementedException();
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

        public async Task Upload(FileUploadDTO file)
        {
            var fileExt = System.IO.Path.GetExtension(file.File.FileName).Substring(1);
            var fileFolder = GetFileFolder(fileExt);
            var path = Path.Combine(Directory.GetCurrentDirectory(), "Files", fileFolder);

            if (!Directory.Exists(path)) Directory.CreateDirectory(path);

            var filepath = Path.Combine(path, file.File.FileName);

            using (var stream = System.IO.File.Create(filepath))
            {
                await file.File.CopyToAsync(stream);
            }


            FileInfo fi = new FileInfo(filepath);

            var fileEntity = new tbl_file()
            {
                Name = fi.Name,
                Size = fi.Length,
                TypeId = GetFileType(fileExt),
                Path = fi.FullName,
                LastEditedDate = fi.LastWriteTime,
                CreatedBy = file.CreatedBy,
                CreateDate = DateTime.Now
            };

            _repo.Create(fileEntity);
            await _repo.SaveAsync();
            //var fileName = fi.Name;
            //var fileExt = fi.Extension.Substring(1); ;
            //var fileSize = fi.Length;
            //var filePath = fi.FullName;
            //var fileLastModified = fi.LastWriteTime;

            //var fileName = file.FileName;
            //var fileExt = System.IO.Path.GetExtension(file.FileName).Substring(1);
            //var fileSize = file.Length / 1024;
            //var filePath = filepath;
            //var fileLastEdited = System.IO.Path.GetCre
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
