namespace Backend.Tests;

public class TesteExemplo
{
    [Fact]
    public void Teste()
    {
        int a = 2;
        int b = 3;

        Assert.Equal(5, Soma(a, b));
    }

    public static int Soma(int a, int b)
    {
        return a + b;
    }
}