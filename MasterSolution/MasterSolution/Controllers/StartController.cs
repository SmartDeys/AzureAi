using MasterSolution.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;


namespace MasterSolution.Controllers
{
    public class StartController : Controller
    {
        public IActionResult Index()
        {

            return View();
        }

        [AcceptVerbs("GET")]
        [Route("api/start")]
        public string Get()
        {
            return Storage.GetValue();
        }
    }
}
