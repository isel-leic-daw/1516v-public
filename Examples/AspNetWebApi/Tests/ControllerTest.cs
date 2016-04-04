using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using WebApiSelfHostKatana;
using Xunit;

namespace Tests
{
    
    public class ControllerTest
    {
        [Fact]
        public void SomeTest()
        {
            var controller = new ActionReturnController();
            controller.Configuration = new HttpConfiguration();
            var res = controller.Get1();
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            var content = res.Content as ObjectContent<TheModel>;
            Assert.NotNull(content);
            var value = content.Value as TheModel;            
            Assert.Equal(42, value.AnInt);
        }

        [Fact]
        public void AnotherTest()
        {
            var controller = new ActionReturnController();
            var result = controller.Get5();        
            Assert.Equal(42, result.Content.AnInt);
        }
    }
}
