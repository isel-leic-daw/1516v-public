using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class ImageFromTextFormatter : MediaTypeFormatter
    {
        public ImageFromTextFormatter()
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("image/jpeg"));
            this.AddQueryStringMapping("accept", "jpeg", "image/jpeg");
        }

        public override bool CanReadType(Type type)
        {
            return false;
        }

        public override bool CanWriteType(Type type)
        {
            return type == typeof(string);
        }

        public override Task WriteToStreamAsync(Type type, object value, Stream stream, HttpContent content,
            TransportContext transportContext)
        {
            var text = value as string;
            const int pts = 40;
            var bm = new Bitmap(text.Length * pts, 2 * pts);
            var g = Graphics.FromImage(bm);
            g.DrawString(text, new Font("Arial", pts), Brushes.White, 1.0f, 1.0f);


            var jgpEncoder = GetEncoder(ImageFormat.Jpeg);
            var myEncoder =
                System.Drawing.Imaging.Encoder.Quality;
            var myEncoderParameters = new EncoderParameters(1);
            var myEncoderParameter = new EncoderParameter(myEncoder, 100L);
            myEncoderParameters.Param[0] = myEncoderParameter;

            bm.Save(stream, jgpEncoder, myEncoderParameters);
            return Task.FromResult<object>(null);
        }

        private static ImageCodecInfo GetEncoder(ImageFormat format)
        {
            return ImageCodecInfo.GetImageDecoders()
                .FirstOrDefault(codec => codec.FormatID == format.Guid);
        }
    }
}
