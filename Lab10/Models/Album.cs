using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab10.Models {
    public class Album {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public string Genre { get; set; }
        public int Sales { get; set; }

        override
        public string ToString() {
            return this.ID.ToString() + " | " + this.Title + " | " + this.Artist + " | " + this.Genre + " | " + this.Sales.ToString() + "\n";
        }
    }
}
