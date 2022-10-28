using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpBox.DTO;
using UpBox.Interface;

namespace UpBox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IAccountService _service;
        public AccountController(IAccountService service)
        {
            _service = service;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDTO account)
        {
            if (account is null) return BadRequest("Invalid Account!");

            if (!ModelState.IsValid) return BadRequest("Invalid Account");

            var result = await _service.VerifyUserAsync(account);

            if (result is null) return NotFound("Account Not Found!");

            var tokenString = await _service.GenerateJWTTokenAsync(result);

            return Ok(new { Token = tokenString });
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDTO account)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Account");

            await _service.RegisterAccountAsync(account);

            var response = new ResponseDTO<RegisterDTO>
            {
                isSuccess = true,
                Result = account,
                Message = "Registered Successfully",              
            };

            return Ok(response);
        }

    }
}
