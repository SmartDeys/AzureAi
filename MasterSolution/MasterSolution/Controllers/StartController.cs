using MasterSolution.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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
        [AcceptVerbs("GET")]
        [Route("api/getTopics")]
        public async Task<Dictionary<string, object>> GetTopics(string userPrompt)
        {
            return await QuizBot.GetTopicsByPromtAsync(userPrompt);
        }
        [AcceptVerbs("GET")]
        [Route("api/getGameData")]
        public async Task<List<Dictionary<string, object>>> GetGameData(string selectedTopic)
        {
            //string selectedTopic = requestData["selectedTopic"]?.ToString();

            return  await QuizBot.GetGameData(selectedTopic);
        }
    }
}
