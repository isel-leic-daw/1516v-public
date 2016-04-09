using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace WebApiSelfHostKatana
{
    class ConsoleLogAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            Console.WriteLine("before {0}", actionContext.ActionDescriptor.ActionName);
            //base.OnActionExecuting(actionContext);
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            Console.WriteLine("after");
            //base.OnActionExecuted(actionExecutedContext);
        }
    }
}
