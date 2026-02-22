using Backend.Infrastructure.Settings;
using Backend.Infrastructure.Url;
using Microsoft.Extensions.Options;

namespace Backend.Tests.Infrastructure.Url;

public class UrlBuilderTest
{
    public static IOptions<ImageSettings> ObterImageSettings()
    {
        return Options.Create(
            new ImageSettings
            {
                BaseUrl = "http://images.com"
            }
        );
    }

    [Fact]
    public void ConstruirUrl_DeveMontarUrlCorretamente()
    {
        var urlBuilder = new UrlBuilder(ObterImageSettings());

        Assert.Equal("http://images.com/foto.jpg", urlBuilder.ConstruirUrl("foto.jpg"));
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void ConstruirUrl_PathInvalido_DeveRetornarStringVazia(string? path)
    {
        var urlBuilder = new UrlBuilder(ObterImageSettings());

        Assert.Equal("", urlBuilder.ConstruirUrl(path));
    }

}