using Microsoft.AspNetCore.Mvc;

namespace pa181.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
