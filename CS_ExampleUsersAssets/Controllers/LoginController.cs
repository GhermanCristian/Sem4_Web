using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using CS_ExampleUsersAssets.Data;
using CS_ExampleUsersAssets.Models;

namespace CS_ExampleUsersAssets.Controllers {
    public class LoginController : Controller {
        private readonly MyDBContext dBContext;
        public LoginController(MyDBContext dbContext) {
            this.dBContext = dbContext;
        }

        private void initialiseSession() {
            HttpContext.Session.Clear(); // this doesn't delete the cookie; how do I do that ?
            HttpContext.Session.SetString("loggedIn", "true");
            HttpContext.Session.SetString("tempList", JsonConvert.SerializeObject(new List<Asset>()));
        }

        [HttpPost]
        [Route("/exampleusersassets/login")]
        public string Login(string username, string password) {
            IQueryable<User> currentUser = this.dBContext.Users
                .Where(user => user.Username == username && user.Password == password);
            // i have absolutely no idea why it crashes when we don't use ToList
            if (currentUser.ToList().Count() == 1) { // correct login
                this.initialiseSession();
                HttpContext.Session.SetInt32("userID", currentUser.ToList()[0].ID);
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
        [Route("/exampleusersassets/logout")]
        public void Logout() {
            HttpContext.Session.Clear();
        }
    }
}
