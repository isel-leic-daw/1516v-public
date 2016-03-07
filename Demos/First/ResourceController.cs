using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace First
{
    public class ResourceController : ApiController
    {
        public string Get()
        {
            return "Get()";
        }

        public string Get(int id)
        {
            return "Get(int)";
        }

        public string Get(string id2)
        {
            return "Get(string)";
        }

    }
}
