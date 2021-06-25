using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore;
using CS_Name_NoAng.Models;

namespace CS_Name_NoAng.Data {
    public class MyDBContext : DbContext {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options) {

        }

        public DbSet<Players> Players {
            get; set;
        }

        public DbSet<Teams> Teams {
            get; set;
        }
    }
}
