using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApiSelfHostKatana
{
    using Common;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using System.IO;
    using AppFunc = Func<IDictionary<string, object>, Task>;
    using MidFunc = Func<Func<IDictionary<string, object>, Task>, Func<IDictionary<string, object>, Task>>;

    public class Startup
    {   

        async Task M(IDictionary<string, object> ctx, AppFunc next)
        {
            var path = ctx["owin.RequestPath"] as string;
            if (path.Contains("owin"))
            {
                await next(ctx);
            }
            else
            {
                var body = ctx["owin.ResponseBody"] as Stream;
                var bytes = Encoding.ASCII.GetBytes("hello from owin");
                await body.WriteAsync(bytes, 0, bytes.Length);
            }
        }

        public void Configuration(IAppBuilder appBuilder)
        {
            var config = new HttpConfiguration();

            MidFunc mw = next => async ctx =>
            {
                var path = ctx["owin.RequestPath"] as string;
                if (!path.Contains("owin"))
                {
                    await next(ctx);
                }
                else
                {
                    var headers = ctx["owin.ResponseHeaders"] as IDictionary<string, string[]>;
                    headers["Content-Type"] = new[] { "text/plain" };
                    var body = ctx["owin.ResponseBody"] as Stream;
                    var bytes = Encoding.ASCII.GetBytes("hello from owin");
                    await body.WriteAsync(bytes, 0, bytes.Length);                    
                }
            };         
                        
            appBuilder.Use(mw);

            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                "routename",
                "api/{controller}");
            config.Formatters.Add(new ImageFromTextFormatter());
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            var jsonSettings = config.Formatters.JsonFormatter.SerializerSettings;
            jsonSettings.NullValueHandling = NullValueHandling.Ignore;
            jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                        
            appBuilder.UseWebApi(config);
                            
        }            
    }
}
