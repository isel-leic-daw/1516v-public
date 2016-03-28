using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApiSelfHostKatana
{
    public class ResourceController : ApiController
    {
        //public string Get()
        public Tuple<string,string> Get()
        {
            //return "Hello Web";
            return Tuple.Create(null as string, "World");
        }
    }
}
