# Sistema Freelancer

## Tecnologias utilizadas:
- ASP.NET 8.0
- Entity Framework Core
- Banco PostgreSQL
- React com Vite

## Configurando o projeto

Para configurar as credenciais do banco PostgreSQL, deve ser criado um arquivo dentro do diretório 'Backend' com o nome ```appsettings.Development.json```, seguindo a estrutura do arquivo ```appsettings.Development.json.example```, dentro do mesmo diretório.

Também é necessário criar um arquivo ```.env``` na pasta 'frontend', seguindo a estrutura do arquivo ```.env.example```. 

## Iniciando o projeto

### Backend

- Instalando ASP.NET e dependências:
```
# Exemplo de instalação no Linux
sudo apt-get install -y dotnet-sdk-8.0
sudo apt-get install -y aspnetcore-runtime-8.0
```

Para criar o banco:
```
cd Backend/

dotnet tool install --global dotnet-ef
dotnet ef database update
```

### Frontend

Para iniciar o frontend:
```
cd frontend
npm install
npm run dev
```

Obs.: Para acessar o site, navegue para ```localhost:5173```.

## Testes

### Testes Unitários

Para executar testes do .NET:
```
dotnet test
```

### Testes Cypress

Para executar os testes automatizados do Cypress:
```
# Testes no terminal
cd frontend/
npx cypress run

# Testes na interface do cypress
cd frontend/
npx cypress open
```

## Comandos úteis

### Para criar novas migrações

```
dotnet ef migrations add NomeMigracao
```

## Referências

- [Vite](https://vite.dev)
- [React](https://react.dev)