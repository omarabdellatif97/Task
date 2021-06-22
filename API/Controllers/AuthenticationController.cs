using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration configuration;
        public AuthenticationController(UserManager<IdentityUser> _userManager, IConfiguration _configuration)
        {
            userManager = _userManager;
            configuration = _configuration;
        }

        public class UserModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }
        }

        public class CustomResponse
        {
            public string Status { get; set; }
            public string Message { get; set; }
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {

                var authClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Email, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                var token = new JwtSecurityToken(
                    issuer: configuration["JWT:ValidIssuer"],
                    audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(12),
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    idToken = new JwtSecurityTokenHandler().WriteToken(token),
                    expiresIn = (token.ValidTo - DateTime.Now).TotalSeconds,
                    email = user.Email,
                    localId = user.Id
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] UserModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status400BadRequest, new CustomResponse { Status = "Error", Message = "User already exists!" });

            IdentityUser user = new IdentityUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Email
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomResponse { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            return Ok(new CustomResponse { Status = "Success", Message = "User created successfully!" });
        }
    }
}
