using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore;
using Lab10.Models;

namespace Lab10.Data {
    public class MyDBContext : DbContext {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options) {

        }
    }
}
