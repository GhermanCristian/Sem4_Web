using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonsCourses.Models {
    public class Courses {
        public int ID { get; set; }
        public int PID { get; set; }
        public string courseName { get; set; }
        public string participants { get; set; }
        public string grades { get; set; }
    }
}
