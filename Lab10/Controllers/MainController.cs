using Lab10.Data;
using Lab10.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;

namespace Lab10.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class MainController : Controller {
        private readonly MyDBContext dBContext;
        public MainController(MyDBContext dbContext) {
            this.dBContext = dbContext;
        }

        [HttpGet]
        [EnableCors("Angular")]
        [Route("/lab10/getAllAlbums")]
        public IEnumerable<Object> GetAllAlbums(string currentGenre, int currentPage, int elementsPerPage) {
            // set some values in case no arguments are provided
            if (currentGenre is null) {
                currentGenre = "";
            }
            if (currentPage == 0) { // basically currentPage is null, but ints are not nullable
                currentPage = 1;
            }
            if (elementsPerPage == 0) {
                elementsPerPage = 4;
            }
            
            IQueryable<Album> filteredAlbums = this.dBContext.Album
                .Where(album => album.Genre.Contains(currentGenre));
            List<Object> response = new();
            
            response.Add(filteredAlbums.Count());
            response.AddRange(filteredAlbums
                .OrderBy(album => album.ID)
                .Skip((currentPage - 1) * elementsPerPage) // pages are 1-indexed
                .Take(elementsPerPage)); // basically slice the result to get only the required page)
            return response;
        }

        [HttpPost]
        [EnableCors("Angular")]
        [Route("/lab10/login")]
        public string Login([FromBody] UserDTO NewUser) {
            IQueryable<User> currentUser = this.dBContext.User
                .Where(user => user.Username == NewUser.Username && user.Password == NewUser.Password);
            // i have absolutely no idea why it crashes when we don't use ToList
            if (currentUser.ToList().Count() == 1) { // correct login
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
    }
}
