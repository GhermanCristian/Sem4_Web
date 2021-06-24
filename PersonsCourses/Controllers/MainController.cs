using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PersonsCourses.Data;
using PersonsCourses.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonsCourses.Controllers {
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
        [Route("/personscourses/getPersonsByCourse")]
        public string getPersonsByCourse(string courseName) {
            IQueryable<Courses> courses = this.dBContext.Courses
                .Where(course => course.courseName == courseName);
            if (courses.Count() > 0) {
                string[] participants = courses.ToList()[0].participants.Split(' ');
                string names = "";
                participants.ToList().ForEach(participant => {
                    names += (this.dBContext.Persons
                    .Where(person => person.ID == int.Parse(participant)).ToList()[0].name + " | ");
                });
                return names;
            }
            return "";
        }

        [HttpGet]
        [Route("/personscourses/getCoursesByStudent")]
        public string getCoursesByStudent(string studentID) {
            List <Courses> courses = this.dBContext.Courses.ToList();
            return JsonConvert.SerializeObject(
                courses
                    .FindAll(course => {
                        string participants = course.participants;
                        string[] splitParticipants = participants.Split(' ');
                        return splitParticipants.Contains(studentID);
                    })
                    .Select(course => course.courseName));
        }

        [HttpGet]
        [Route("/personscourses/getCoursesByProfessor")]
        public string getCoursesByProfessor() {
            string professorName = HttpContext.Session.GetString("name");
            List<Persons> persons = this.dBContext.Persons.Where(person => person.name == professorName && person.role == "professor").ToList();
            if (persons.Count() == 0) {
                return "";
            }
            int profID = persons[0].ID;
            return JsonConvert.SerializeObject(this.dBContext.Courses.Where(course => course.PID == profID).Select(course => course.ID).ToList());
        }

        [HttpPost]
        [Route("/personscourses/gradeStudent")]
        public void gradeStudent(string courseID, string studentID, string studentGrade) {
            List<Courses> courses = this.dBContext.Courses.Where(course => course.ID == int.Parse(courseID)).ToList();
            if (courses.Count() == 0) {
                return;
            }
            Courses c = courses[0];
            string[] participants = c.participants.Split(' ');
            string[] grades = c.grades.Split(' ');
            if (participants.Contains(studentID) == false) {
                c.participants += " " + studentID;
                c.grades += " " + studentGrade;
            }
            else {
                int position = participants.ToList().IndexOf(studentID);
                grades[position] = studentGrade;
                c.grades = grades.Aggregate((a, b) => a + " " + b);
            }
            this.dBContext.SaveChanges();
        }

        [HttpPost]
        [Route("/personscourses/enterName")]
        public void enterName(string name) {
            this.initialiseSession();
            HttpContext.Session.SetString("name", name);
        }
    }
}
