## Comandos para criação do projeto

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

## Comandos úteis

### Para criar novas migrações

```sh
cd Backend

# Criando as migrações
dotnet ef migrations add NomeMigracao -o Infrastructure/Persistence/Migrations

# Aplicando migrações ao banco 
dotnet ef database update
```

Obs.: Esses comandos foram usados especificamente no Linux.