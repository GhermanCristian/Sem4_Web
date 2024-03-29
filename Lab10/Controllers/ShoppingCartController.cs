﻿using Microsoft.AspNetCore.Mvc;
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
    public class ShoppingCartController : Controller {
        private readonly MyDBContext dBContext;
        public ShoppingCartController(MyDBContext dbContext) {
            this.dBContext = dbContext;
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
                List<Object> invalidResponse = new();
                invalidResponse.Add("invalid");
                return invalidResponse;
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
