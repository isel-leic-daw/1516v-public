using Drum;
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
            //config.MapHttpAttributeRoutes();
            config.MapHttpAttributeRoutesAndUseUriMaker();
            config.Routes.MapHttpRoute(
                "route name",
                "api/{controller}/{id}/{id2}",
                new { id = RouteParameter.Optional, id2=123 }, // defaults
                new { id = @"\d*"} // constraints
                );
            
            app.UseWebApi(config);
        }
    }
}
