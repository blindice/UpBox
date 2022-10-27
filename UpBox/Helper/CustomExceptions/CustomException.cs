using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpBox.Helper.CustomExceptions
{
    public class CustomException : Exception
    {
        public CustomException()
        {
        }

        public CustomException(string message) : base(message)
        {
        }
    }
}
