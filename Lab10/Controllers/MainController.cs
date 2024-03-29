﻿using Lab10.Data;
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
    }
}
