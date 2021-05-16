using Lab10.Data;
using Lab10.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab10.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class MainController : Controller {
        private readonly MyDBContext dBContext;
        public MainController(MyDBContext dbContext) {
            this.dBContext = dbContext;
        }
        public IActionResult Index() {
            return View();
        }

        [Route("/lab10/main")]
        public IEnumerable<Album> getAllAlbums() {
            return this.dBContext.Album.ToArray();
        }
    }
}
