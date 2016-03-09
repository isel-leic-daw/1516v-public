using Drum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace First
{
    [RoutePrefix("api/other")]
    public class DirectResourcesController : ApiController
    {
        [Route("")]
        public SomeModel Get()
        {
            //return string.Format("Route all: {0}, id:{1}",
            //    Url.Link("direct.all", new { }),
            //    Url.Link("direct.getById", new { id = 123, a="b" }));
            //var uriMaker = Request.TryGetUriMakerFor<DirectResourcesController>();
            //return string.Format("Route all: {0}, id:{1}",
            //    //uriMaker.UriFor(c => c.Get()),
            //    uriMaker.UriFor(c => c.Get()),
            //    uriMaker.UriFor(c => c.Get(123, "b")));

            //return NotFound();

            return new SomeModel
            {
                AString = "a string",
                AnInt = 42,
            };
                

        }

        [Route("{id:int}/{a}")]
        public HttpResponseMessage Get(int id, string a)
        {
            var res = new HttpResponseMessage(HttpStatusCode.OK);
            res.Headers.Add("My-Header", "my-value");

            var md = new MediaTypeHeaderValue("text/plain");            
            res.Content = new StringContent("Get(int id, string a)");

            md.Parameters.Add(new NameValueHeaderValue("charset", "utf-8"));
            res.Content.Headers.ContentType = md;

            res.Content.Headers.ContentLanguage.Add("en-US");
            res.Content.Headers.ContentLanguage.Add("en-EN"); 
            return res;
        }

    }

    public class SomeModel
    {
        public string AString { get; set; }
        public int AnInt { get; set; }
    }
}
