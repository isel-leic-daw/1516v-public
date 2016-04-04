using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApiSelfHostKatana
{
    [RoutePrefix("input")]
    public class InputController : ApiController
    {
        [Route("pathandquery/{a}")]
        public string Get(string a, string b, int c)
        {
            return string.Format("Get: a={0},b={1},c={2}", a, b, c);
        }

        [Route("pathandquery/{a}")]
        public string Post(string a, InputModel input)
        {
            //var s = await Request.Content.ReadAsStringAsync();
            //return s;
            return string.Format("Post: a={0},b={1},c={2}", a, input.B, input.C);
        }


        [Route("fromuri/{a}")]
        public string Get(string a, [FromUri] InputModel input)
        {
            return string.Format("a={0},b={1},c={2}, ModelState.IsValid={3}", 
                a, input.B, input.C,
                ModelState.IsValid);
        }
    }

    public class InputModel
    {
        public string B { get; set; }
        public int C { get; set; }          
    }
}
