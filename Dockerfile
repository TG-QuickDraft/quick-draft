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
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=backend-build /app/publish .

COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 10000
ENV ASPNETCORE_URLS=http://+:10000

ENTRYPOINT ["/entrypoint.sh"]