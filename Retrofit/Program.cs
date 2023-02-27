using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Retrofit.Models;
using Retrofit.Services;


namespace Retrofit
{

    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
//public class Program
//    {
//        var builder = WebApplication.CreateBuilder(args);

//        // Add services to the container.
//        builder.Services.AddRazorPages();

//builder.Services.AddSingleton<BechdelDataService>();

//        builder.Services.AddCors();

//        var app = builder.Build();

//                app.UseStaticFiles();

//        app.UseRouting();

//        app.UseCors(cfg => cfg.AllowAnyOrigin());

//        app.UseAuthorization();

//        app.MapRazorPages();

//        app.MapGet("api/films", async(BechdelDataService ds, int? page, int? pageSize) =>
//        {
//          if (ds is null) return Results.Problem("Server Error", statusCode: 500);
//          int pageNumber = page ?? 1;
//                int pagerTake = pageSize ?? 50;
//                FilmResult data = await ds.LoadAllFilmsAsync(pageNumber, pagerTake);
//          if (data.Results is null) return Results.NotFound();
//          return Results.Ok(data);
//        }).Produces<IEnumerable<Film>>(contentType: "application/json").Produces(404).ProducesProblem(500);

//            // app.UseSpa(cfg => {
//            //   cfg.UseProxyToSpaDevelopmentServer("http://localhost:5000");
//            // });

//            app.MapFallbackToPage("/FilmList/{*path}", "/FilmList");

//        app.Run();
//        }
