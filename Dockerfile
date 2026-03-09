# ---------- BUILD FRONTEND ----------
FROM node:20 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend .

RUN echo "VITE_API_URL=" > .env

RUN npm run build


# ---------- BUILD BACKEND ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build

WORKDIR /src

COPY . .

# copia build do frontend
COPY --from=frontend-build /app/frontend/dist ./Backend/wwwroot

WORKDIR /src/Backend

RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish


# ---------- RUNTIME ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app

# copia código fonte (necessário para migrations)
COPY . .

# copia build publicado
COPY --from=backend-build /app/publish ./publish

# instala dotnet ef
RUN dotnet tool install --global dotnet-ef

ENV PATH="$PATH:/root/.dotnet/tools"

# script de inicialização
COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 5191

ENV ASPNETCORE_URLS=http://+:5191

ENTRYPOINT ["/entrypoint.sh"]