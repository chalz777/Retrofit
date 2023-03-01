using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Retrofit.Models;
using Retrofit.Services;
using Microsoft.VisualStudio.Services.TestManagement.TestPlanning.WebApi;

namespace Retrofit
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddRazorPages();
            //services.AddSingleton<BechdelDataService>();
            //services.AddCors();
            services.AddControllersWithViews();

            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "wwwroot/dist";
            //});
        }
        //var builder = WebApplication.CreateBuilder(args);

        //        // Add services to the container.
        //        builder.Services.AddRazorPages();

        //builder.Services.AddSingleton<BechdelDataService>();

        //        builder.Services.AddCors();

        //        var app = builder.Build();

        //                app.UseStaticFiles();


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //builder.Services.AddSingleton<BechdelDataService>();
            app.UseHttpsRedirection();

            //app.UseDefaultFiles();
  
            app.UseStaticFiles();

            app.UseCors(cfg => cfg.AllowAnyOrigin());

            app.UseRouting();

            app.UseAuthorization();

            //app.MapRazorPages();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                //endpoints.MapFallbackToPage("/FilmList/{*path}", "/FilmList");

                endpoints.MapGet("api/films", async context =>
                {
                    await context.Response.WriteAsync("Home");
                });
                //endpoints.MapGet("api/films", async context =>
                //{
                //    await context.Response.WriteAsync("Home");
                //});
                //endpoints.MapGet("api/films", async context =>
                //{
                //    if (ds is null) return Results.Problem("Server Error", statusCode: 500);
                //    int pageNumber = page ?? 1;
                //    int pagerTake = pageSize ?? 50;
                //    FilmResult data = await ds.LoadAllFilmsAsync(pageNumber, pagerTake);
                //    if (data.Results is null) return Results.NotFound();
                //    return Results.Ok(data);
                //}).Produces<IEnumerable<Film>>(contentType: "application/json").Produces(404).ProducesProblem(500);
            });

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "ClientApp";

            //    //if (env.IsDevelopment())
            //    //{
            //    //    spa.UseViteDevelopmentServer();
            //    //}
            //});



            //app.MapGet("api/films", async (BechdelDataService ds, int? page, int? pageSize) =>
            //{
            //    if (ds is null) return Results.Problem("Server Error", statusCode: 500);
            //    int pageNumber = page ?? 1;
            //    int pagerTake = pageSize ?? 50;
            //    FilmResult data = await ds.LoadAllFilmsAsync(pageNumber, pagerTake);
            //    if (data.Results is null) return Results.NotFound();
            //    return Results.Ok(data);
            //}).Produces<IEnumerable<Film>>(contentType: "application/json").Produces(404).ProducesProblem(500);

            // app.UseSpa(cfg => {
            //   cfg.UseProxyToSpaDevelopmentServer("http://localhost:5000");
            // });



            //        app.Run();
        }
    }
}
