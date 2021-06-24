using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore;
using PersonsCourses.Models;

namespace PersonsCourses.Data {
    public class MyDBContext : DbContext {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options) {

        }

        public DbSet<Courses> Courses {
            get; set;
        }

        public DbSet<Persons> Persons {
            get; set;
        }
    }
}
