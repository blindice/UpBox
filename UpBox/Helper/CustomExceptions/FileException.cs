using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.Helper.CustomExceptions
{
    [Serializable()]
    public class FileException : Exception
    {
        public string FilePath { get; set; }
        public FileException(){}

        public FileException(string message) : base(message){}

        public FileException(string message, string fileName)
                : base(message)
        {
            this.FilePath = fileName;
        }
    }
}
