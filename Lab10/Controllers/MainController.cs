using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lab10.Models;
using Lab10.Data;

namespace Lab10.Controllers {
    public class MainController : Controller {
        private readonly MyDBContext dBContext;
        public MainController(MyDBContext dbContext) {
            this.dBContext = dbContext;
        }
        public IActionResult Index() {
            return View();
        }

        public string Test() {
            return "It's working";
        }
        public string Test1(string param1 = "hello", int param2 = 0) {
            return "Result: " + param1 + param2.ToString();
        }

        public string GetAlbums() {
            List<Album> albums = this.dBContext.Album.ToList();
            string result = "";
            albums.ForEach(album => result += album.ToString());
            return result;
        }
    }
}
