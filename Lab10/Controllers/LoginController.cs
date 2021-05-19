using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Lab10.Data;
using Lab10.Models;

namespace Lab10.Controllers {
    public class LoginController : Controller {
        private readonly MyDBContext dBContext;
        public LoginController(MyDBContext dbContext) {
            this.dBContext = dbContext;
        }

        private void initialiseSession() {
            HttpContext.Session.Clear(); // this doesn't delete the cookie; how do I do that ?
            HttpContext.Session.SetString("loggedIn", "true");
            // basically shoppingCart[albumID] = albumCount
            HttpContext.Session.SetString("shoppingCart", JsonConvert.SerializeObject(new Dictionary<int, int>()));
        }

        [HttpPost]
        [EnableCors("Angular")]
        [Route("/lab10/login")]
        public string Login([FromBody] UserDTO NewUser) {
            IQueryable<User> currentUser = this.dBContext.User
                .Where(user => user.Username == NewUser.Username && user.Password == NewUser.Password);
            // i have absolutely no idea why it crashes when we don't use ToList
            if (currentUser.ToList().Count() == 1) { // correct login
                this.initialiseSession();
                return JsonConvert.SerializeObject(new {
                    status = "valid"
                });
            }
            else {
                return JsonConvert.SerializeObject(new {
                    status = "invalid"
                });
            }
        }

        [HttpGet]
        [EnableCors("Angular")]
        [Route("/lab10/logout")]
        public string Logout() {
            HttpContext.Session.Clear();
            return JsonConvert.SerializeObject(new {
                status = "valid"
            });
        }
    }
}
