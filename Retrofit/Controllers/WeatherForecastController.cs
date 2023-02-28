using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Retrofit.Models;
using Retrofit.Services;

namespace Retrofit.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly BechdelDataService _bechdelService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, BechdelDataService bechdelDataService)
        {
            _logger = logger;
            _bechdelService = bechdelDataService;
        }

        [HttpGet]
        public async Task<FilmResult> Get(  bool succeeded,
                                            int year,
                                            int page,
                                            int pageSize)
        {                    
                var data = await _bechdelService.LoadAsync();

                if (data is null) return FilmResult.Default;

                IOrderedEnumerable<Film> qry = data
                  .Where(y => y.Year == year)
                  .Where(f => f.Passed == succeeded)
                  .OrderBy(f => f.Title);

                return _bechdelService.GetFilmResult(qry, page, pageSize);              
        }
    }
}
