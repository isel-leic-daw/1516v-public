using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApiSelfHostKatana
{
    [RoutePrefix("examples")]
    public class DirectRoutingController : ApiController
    {
        [Route("all")]
        public string Get()
        {
            return "Get()";
        }

        [Route("byid/{id:int}")]
        public string Get(int id)
        {
            return "Get(int)";
        }

        [Route("byid/{id}")]
        public string Get(string id)
        {
            return "Get(string)";
        }

        [Route("json/example")]
        public ViewModel GetJsonExample()
        {
            return new ViewModel
            {
                AnArray = new[] { "test", "123" }
            };
        }

        public class ViewModel
        {
            public string AString { get; set; }
            public int AnInt { get; set; }
            public IEnumerable<string> AnArray { get; set; }            
        }
    }
}
