#!/bin/sh
set -e

echo "Starting container..."

# copia secret se existir
if [ -f /etc/secrets/appsettings.Development.json ]; then
  cp /etc/secrets/appsettings.Development.json /app/Backend/appsettings.Development.json
fi

cd /app/Backend

echo "Starting ASP.NET..."

exec dotnet ../publish/Backend.dll