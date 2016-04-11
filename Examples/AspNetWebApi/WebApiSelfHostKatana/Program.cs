using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebApiSelfHostKatana
{
    class Program
    {
        static void Main(string[] args)
        {
            using (WebApp.Start<Startup>("http://localhost:8080"))
            {
                Startup.HttpConfiguration.EnsureInitialized();
                var config = Startup.HttpConfiguration;
                IApiExplorer apiExplorer = config.Services.GetApiExplorer();
                foreach (var desc in apiExplorer.ApiDescriptions)
                {
                    Console.WriteLine("name={0}, method={1}, path={2}",
                        desc.ActionDescriptor.ActionName,
                        desc.HttpMethod,
                        desc.RelativePath
                        );
                }
                Console.ReadLine();
            }
        }
    }
}
