# sistema-freelancer

## Tecnologias utilizadas:
- React com Typescript
- ASP.NET 8.0
- Entity Framework Core
- Banco PostgreSQL

### Configurando o projeto
A conexão padrão é a com o PostgreSQL. As configurações podem ser encontradas em Backend/appsettings.json.

Deve ser criado um arquivo chamado appsettings.Development.json com a seguinte estrutura:

```
{
  "DetailedErrors": true,
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}

```

### Iniciando o projeto

Para iniciar o frontend:
```
cd frontend
npm install
npm run dev
```

Obs.: Para acessar o site, navegue para ```localhost:5191```.

Obs.: Esses comandos foram usados especificamente no Linux.

- Instalando ASP.NET e dependências:
```
sudo apt-get install -y dotnet-sdk-8.0
sudo apt-get install -y aspnetcore-runtime-8.0
```

Para criar o banco:
```
cd Backend/

dotnet tool install --global dotnet-ef
dotnet ef database update
```

Para criar novas migrações:
```
dotnet ef migrations add NomeMigracao
```

Para rodar testes:
```
dotnet test
```


### Comandos para criação do projeto

- Criação do projeto React
```
npm create vite@latest frontend -- --template react-ts
```

- Criando projeto ASP.NET:
```
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
