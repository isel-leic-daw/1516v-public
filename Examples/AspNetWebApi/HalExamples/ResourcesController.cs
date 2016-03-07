using Drum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using WebApi.Hal;

namespace HalExamples
{
    [RoutePrefix("api/resources")]
    public class ResourcesController : ApiController
    {
        [Route("{ix}")]
        public Resource Get(int ix)
        {
            var uriMaker = Request.TryGetUriMakerFor<ResourcesController>();
            var rep = new Resource
            {
                Index = ix,
            };
            rep.Links.Add(new Link("next", uriMaker.UriFor(c => c.Get(ix + 1)).AbsoluteUri));
            rep.Links.Add(new Link("previous", uriMaker.UriFor(c => c.Get(ix - 1)).AbsoluteUri));
            return rep;
        }
    }
}
