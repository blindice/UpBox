using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace UpBox.DTO
{
    public class ResponseDTO<T>
    {
        public bool isSuccess { get; set; }

        public T Result { get; set; }

        public string Message { get; set; }

        public int? ErrorCode { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
