using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab10.Models {
    public class User {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        override
        public string ToString() {
            return ID.ToString() + " | " + Username + " | " + Password + "\n";
        }
    }
}
