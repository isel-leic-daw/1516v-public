using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace WebApiSelfHostKatana
{
    [RoutePrefix("action/return/examples")]
    public class ActionReturnController : ApiController
    {
        [Route("httpresponsemessage")]
        public HttpResponseMessage Get()
        {
            var res = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(new byte[] { 1, 2, 3 }),
            };
            return res;
        }

        [Route("objectcontent")]
        public HttpResponseMessage Get1()
        {
            var model = new TheModel
            {
                AnInt = 42,
                AString = "abc",
            };

            var content = new ObjectContent<TheModel>(
                model, 
                Configuration.Formatters.JsonFormatter);


            var res = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = content,
            };
            return res;
        }
        
        [Route("createresponse")]
        public HttpResponseMessage Get2()
        {
            var model = new TheModel
            {
                AnInt = 42,
                AString = "abc",
            };
            HttpResponseMessage res = 
                Request.CreateResponse<TheModel>(model);

            return res;
        }

        [Route("model")]
        public TheModel Get3()
        {
            var model = new TheModel
            {
                AnInt = 42,
                AString = "abc",
            };
            return model;
        }

        [Route("exception")]
        public TheModel Get4()
        {
            throw new HttpResponseException(
                new HttpResponseMessage(HttpStatusCode.NotFound));
        }              

        [Route("actionresult")]
        public JsonResult<TheModel> Get5()
        {
            var model = new TheModel
            {
                AnInt = 42,
                AString = "abc",
            };

            return Json(model);
            
        }

    }

    public class TheModel
    {
        public int AnInt { get; set; }
        public string AString { get; set; }
    } 
}
