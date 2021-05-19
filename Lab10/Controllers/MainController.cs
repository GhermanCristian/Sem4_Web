using Lab10.Data;
using Lab10.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Lab10.Controllers {
    public class MainController : Controller {
        private readonly MyDBContext dBContext;
        public MainController(MyDBContext dbContext) {
            this.dBContext = dbContext;
        }

        [HttpGet]
        [EnableCors("Angular")]
        [Route("/lab10/getAllAlbums")]
        public IEnumerable<Object> GetAllAlbums(string currentGenre, int currentPage, int elementsPerPage) {
            if (HttpContext.Session.GetString("loggedIn") != "true") {
                List<Object> invalidResponse = new();
                invalidResponse.Add("invalid");
                return invalidResponse;
            }

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

        private void initialiseSession() {
            HttpContext.Session.SetString("loggedIn", "true");
            // list[albumID] = albumCount
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
        [Route("/lab10/addToShoppingCart")]
        public string AddToShoppingCart(int albumID, int itemCount) {
            if (HttpContext.Session.GetString("loggedIn") != "true") {
                return JsonConvert.SerializeObject(new {
                    status = "invalid"
                });
            }
            Dictionary<int, int> shoppingCart = JsonConvert.DeserializeObject<Dictionary<int, int>>(HttpContext.Session.GetString("shoppingCart"));
            if (shoppingCart.ContainsKey(albumID)) {
                shoppingCart[albumID] += itemCount;
            }
            else {
                shoppingCart[albumID] = itemCount;
            }
            HttpContext.Session.SetString("shoppingCart", JsonConvert.SerializeObject(shoppingCart));

            return shoppingCart.Values.Sum().ToString();
        }

        [HttpGet]
        [EnableCors("Angular")]
        [Route("/lab10/getAlbumsFromShoppingCart")]
        public IEnumerable<Object> GetAlbumsFromShoppingCart(int currentPage, int elementsPerPage) {
            if (HttpContext.Session.GetString("loggedIn") != "true") {
                if (HttpContext.Session.GetString("loggedIn") != "true") {
                    List<Object> invalidResponse = new();
                    invalidResponse.Add("invalid");
                    return invalidResponse;
                }
            }

            List<Object> response = new();
            Dictionary<int, int> shoppingCart = JsonConvert.DeserializeObject<Dictionary<int, int>>(HttpContext.Session.GetString("shoppingCart"));
            int positionInShoppingCart = 1;
            shoppingCart.Keys.ToList().ForEach(albumID => {
                if ((currentPage - 1) * elementsPerPage < positionInShoppingCart &&
                    positionInShoppingCart <= currentPage * elementsPerPage) {
                    Album currentAlbum = this.dBContext.Album.Where(album => album.ID == albumID).First();
                    response.Add(JsonConvert.SerializeObject(new {
                        currentAlbum,
                        TimesInCart = shoppingCart[albumID],
                    }));
                } // select just the elements from the current page
                positionInShoppingCart++;
            });
            return response;
        }

        [HttpGet]
        [EnableCors("Angular")]
        [Route("/lab10/removeFromShoppingCart")]
        public string RemoveFromShoppingCart(int modifiedElementID, string removeOne) {
            if (HttpContext.Session.GetString("loggedIn") != "true") {
                return JsonConvert.SerializeObject(new {
                    status = "invalid"
                });
            }

            Dictionary<int, int> shoppingCart = JsonConvert.DeserializeObject<Dictionary<int, int>>(HttpContext.Session.GetString("shoppingCart"));
            if (removeOne == "true") {
                shoppingCart[modifiedElementID]--;
            }
            else {
                shoppingCart[modifiedElementID] = 0;
            }

            if (shoppingCart[modifiedElementID] <= 0) {
                shoppingCart.Remove(modifiedElementID);
            }
            HttpContext.Session.SetString("shoppingCart", JsonConvert.SerializeObject(shoppingCart));
            return JsonConvert.SerializeObject(new {
                status = "valid"
            });
        }
    }
}
