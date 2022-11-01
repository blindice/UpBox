using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Helper.CustomExceptions;

namespace UpBox.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        public ExceptionMiddleware(RequestDelegate next) => _next = next;

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (CustomException ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (FileException ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }
        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            context.Response.StatusCode = exception switch
            {
                CustomException => (int)HttpStatusCode.OK,
                _ => (int)HttpStatusCode.InternalServerError
            };
            await context.Response.WriteAsync(new ResponseDTO<object>
            {
                isSuccess = false,
                Message = exception.Message,
                ErrorCode = context.Response.StatusCode
            }.ToString());
        }
    }
}
