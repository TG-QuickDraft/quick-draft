### Comandos para criação do projeto

Foram utilizados os seguintes comandos para criar o projeto:

- Criação do projeto React
```sh
npm create vite@latest frontend -- --template react-ts
```

- Criando projeto ASP.NET:
```sh
# Criando o Backend
dotnet new webapp -n Backend

# Adicionando pacotes do Backend
cd Backend/
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

# Criando testes
cd ..
dotnet new xunit -n Backend.Tests
dotnet sln add Backend.Tests/Backend.Tests.csproj
dotnet add Backend.Tests/Backend.Tests.csproj reference Backend/Backend.csproj

# Adicionando pacotes dos testes
cd Backend.Tests/
dotnet add package xunit
dotnet add package xunit.runner.visualstudio
dotnet add package Microsoft.NET.Test.Sdk
dotnet add package Moq
```

Obs.: Esses comandos foram usados especificamente no Linux.