using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.Enum;

namespace UpBox.Helper
{
    public class FileHelper
    {

        public static string GetFileFolder(string extension)
        {
            if (extension == "pdf" || extension == "doc" || extension == "docx" || extension == "html" ||
               extension == "htm" || extension == "xls" || extension == "xlsx" || extension == "txt" ||
               extension == "ppt " || extension == "pptx" || extension == "odp" || extension == "key")
            {
                return Convert.ToString((FileType)1);
            }
            else if (extension == "mp4" || extension == "avi" || extension == "mov" || extension == "flv" ||
                extension == "AVCHD")
            {
                return Convert.ToString((FileType)2);
            }
            else if (extension == "m4a" || extension == "mp3" || extension == "wav" || extension == "flv" ||
                extension == "AVCHD")
            {
                return Convert.ToString((FileType)3);
            }
            else if (extension == "apng" || extension == "avif" || extension == "gif" || extension == "jpg" ||
                extension == "jpeg" || extension == "jfif" || extension == "pjpeg" || extension == "pjp" ||
                extension == "png" || extension == "svg" || extension == "webp" || extension == "pjp")
            {
                return Convert.ToString((FileType)4);
            }
            else
            {
                throw new Exception("Invalid File Format");
            }
        }


        public static int GetFileType(string extension)
        {
            if (extension == "pdf" || extension == "doc" || extension == "docx" || extension == "html" ||
                extension == "htm" || extension == "xls" || extension == "xlsx" || extension == "txt" ||
                extension == "ppt " || extension == "pptx" || extension == "odp" || extension == "key")
            {
                return (int)FileType.Document;
            }
            else if (extension == "mp4" || extension == "avi" || extension == "mov" || extension == "flv" ||
                extension == "AVCHD")
            {
                return (int)FileType.Video;
            }
            else if (extension == "m4a" || extension == "mp3" || extension == "wav" || extension == "flv" ||
                extension == "AVCHD")
            {
                return (int)FileType.Audio;
            }
            else if (extension == "apng" || extension == "avif" || extension == "gif" || extension == "jpg" ||
                extension == "jpeg" || extension == "jfif" || extension == "pjpeg" || extension == "pjp" ||
                extension == "png" || extension == "svg" || extension == "webp" || extension == "pjp")
            {
                return (int)FileType.Image;
            }
            else
            {
                throw new Exception("Invalid File Format");
            }
        }
    }
}
