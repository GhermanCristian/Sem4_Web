using CS_ExampleUsersAssets.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using CS_ExampleUsersAssets.Models;

namespace CS_ExampleUsersAssets.Controllers{
    public class MainController : Controller{
        private readonly MyDBContext dBContext;
        public MainController(MyDBContext dbContext) {
            this.dBContext = dbContext;
        }

        private string returnInvalidStatus() {
            return JsonConvert.SerializeObject(new {
                status = "invalid"
            });
        }

        private string returnSuccessStatus() {
            return JsonConvert.SerializeObject(new {
                status = "valid"
            });
        }

        private bool isUserLoggedIn() {
            return HttpContext.Session.GetString("loggedIn") == "true";
        }

        [HttpGet]
        [Route("/exampleusersassets/isLoggedIn")]
        public string isLoggedIn() {
            if (this.isUserLoggedIn()) {
                return this.returnSuccessStatus();
            }
            return this.returnInvalidStatus();
        }

        [HttpGet]
        [Route("/exampleusersassets/getUserID")]
        public string getUserID() {
            if (!this.isUserLoggedIn()) {
                return this.returnInvalidStatus();
            }

            return JsonConvert.SerializeObject(new {
                userID = HttpContext.Session.GetInt32("userID")
            }) ;
        }

        [HttpGet]
        [Route("/exampleusersassets/getTempCount")]
        public string getTempCount() {
            if (!this.isUserLoggedIn()) {
                return this.returnInvalidStatus();
            }

            return JsonConvert.SerializeObject(new {
                tempCount = JsonConvert.DeserializeObject<List<Asset>>(HttpContext.Session.GetString("tempList")).Count
            }) ;
        }

        [HttpGet]
        [Route("/exampleusersassets/addTempAsset")]
        public string addTempAsset(string name, string description, int value) {
            if (!this.isUserLoggedIn()) {
                return this.returnInvalidStatus();
            }

            List<Asset> tempList = JsonConvert.DeserializeObject<List<Asset>>(HttpContext.Session.GetString("tempList"));
            tempList.Add(new Asset(name, description, value));
            HttpContext.Session.SetString("tempList", JsonConvert.SerializeObject(tempList));
            
            return this.returnSuccessStatus();
        }

        [HttpGet]
        [Route("/exampleusersassets/getAssets")]
        public string getAssets() {
            if (!this.isUserLoggedIn()) {
                return this.returnInvalidStatus();
            }

            int userID = (int)HttpContext.Session.GetInt32("userID");
            IQueryable<Asset> assets = this.dBContext.Assets
                .Where(asset => asset.userID == userID);
            return JsonConvert.SerializeObject(assets.ToList());
        }

        [HttpGet]
        [Route("/exampleusersassets/addAllAssetsToDB")]
        public string addAllAssetsToDB() {
            if (!this.isUserLoggedIn()) {
                return this.returnInvalidStatus();
            }

            List<Asset> tempList = JsonConvert.DeserializeObject<List<Asset>>(HttpContext.Session.GetString("tempList"));
            int userID = (int)HttpContext.Session.GetInt32("userID");
            tempList.ForEach(asset => {
                asset.userID = userID;
                this.dBContext.Assets.Add(asset);
            });
            this.dBContext.SaveChanges();
            HttpContext.Session.SetString("tempList", JsonConvert.SerializeObject(new List<Asset>())); // reset temp list

            return this.returnSuccessStatus();
        }
    }
}
