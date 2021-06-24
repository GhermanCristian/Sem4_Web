using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore;
using CS_ExampleUsersAssets.Models;

namespace CS_ExampleUsersAssets.Data {
    public class MyDBContext : DbContext {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options) {

        }

        public DbSet<Asset> Assets {
            get; set;
        }

        public DbSet<User> Users {
            get; set;
        }
    }
}
