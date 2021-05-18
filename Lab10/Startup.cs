using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lab10.Data;
using Microsoft.EntityFrameworkCore;

namespace Lab10 {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddDistributedMemoryCache();

            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromSeconds(1000);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            services.AddControllers();
            services.AddCors(options => {
                options.AddPolicy(name: "Angular",
                    builder => {
                        builder.WithOrigins("http://localhost:4200", "https://localhost:4200").WithMethods("GET", "POST").AllowAnyHeader().AllowCredentials();
                    });
            });
            services.AddDbContext<MyDBContext>(options =>
                options.UseMySQL(Configuration.GetConnectionString("WPDatabase"))); // declared in appsettings json
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseSession();
            app.UseCors();
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
