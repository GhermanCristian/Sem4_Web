using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CS_Name_NoAng.Data;
using CS_Name_NoAng.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CS_Name_NoAng.Controllers {
    public class MainController : Controller {
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

        private void initialiseSession() {
            HttpContext.Session.Clear(); // this doesn't delete the cookie; how do I do that ?
        }

        [HttpGet]
        [Route("/personscourses/getName")]
        public string getName() {
            if (HttpContext.Session.GetString("name") != null) {
                return HttpContext.Session.GetString("name");
            }
            return "";
        }

        [HttpGet]
        [Route("/personscourses/getTeams")]
        public string getTeams() {
            return JsonConvert.SerializeObject(this.dBContext.Teams.ToList());
        }

        private bool belongsToTeam(string playerName, Teams team) {
            string members = team.members;
            string[] splitMembers = members.Split(',');
            return splitMembers.Contains(playerName);
        }

        [HttpGet]
        [Route("/personscourses/getYourTeams")]
        public string getYourTeams() {
            string yourName = HttpContext.Session.GetString("name");
            List<Teams> teams = this.dBContext.Teams.ToList();
            return JsonConvert.SerializeObject(
                teams
                    .FindAll(team => belongsToTeam(yourName, team))
                );
        }

        [HttpPost]
        [Route("/personscourses/enterName")]
        public void enterName(string name) {
            this.initialiseSession();
            HttpContext.Session.SetString("name", name);
        }

        [HttpPost]
        [Route("/personscourses/addPlayerToTeams")]
        public void addPerson(string playerName, string teams) {
            if (this.dBContext.Players.Where(player => player.name == playerName).ToList().Count() == 0) {
                return;
            }

            List<string> separatedTeams = teams.Split(",").ToList();
            separatedTeams.ForEach(crtTeam => {
                if (this.dBContext.Teams.Where(team => team.name == crtTeam).ToList().Count() == 0) {
                    // team doesn't exist
                    this.dBContext.Teams.Add(new Teams(-1, crtTeam, "", playerName));
                }
                else { // team exists
                    Teams team = this.dBContext.Teams.Where(team => team.name == crtTeam).ToList()[0];
                    if (! this.belongsToTeam(playerName, team)) {
                        // player is not already in this team
                        team.members += ("," + playerName);
                    }
                }
                this.dBContext.SaveChanges();
            });
        }
    }
}
