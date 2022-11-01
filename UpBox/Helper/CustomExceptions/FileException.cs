using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.Helper.CustomExceptions
{
    public class FileException : Exception
    {
        public FileException()
        {
        }

        public FileException(string message) : base(message)
        {
        }
    }
}
