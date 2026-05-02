using AutoMapper;

namespace Backend.Tests.Common.Factories
{
    public static class MapperTestFactory
    {
        public static IMapper Create()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddMaps(AppDomain.CurrentDomain.GetAssemblies());
            });

            return config.CreateMapper();
        }
    }
}