#!/bin/sh
set -e

echo "Starting container..."

# copia secret se existir
if [ -f /etc/secrets/appsettings.Development.json ]; then
  cp /etc/secrets/appsettings.Development.json /app/Backend/appsettings.Development.json
fi

cd /app/Backend

echo "Restoring .NET dependencies..."
dotnet restore

echo "Running database migrations..."

MIGRATION_NAME="AutoMigration_$(date +%s)"

dotnet ef migrations add $MIGRATION_NAME -o Infrastructure/Persistence/Migrations || true

dotnet ef database update

echo "Starting ASP.NET..."

exec dotnet ../publish/Backend.dll