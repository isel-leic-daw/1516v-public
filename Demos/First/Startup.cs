using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace First
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                "route name",
                "api/{controller}/{id:int}",
                new { id = RouteParameter.Optional });
            config.Routes.MapHttpRoute(
                "route name 2",
                "api/{controller}/{id2}",
                new { id2 = RouteParameter.Optional });
            app.UseWebApi(config);
        }
    }
}
