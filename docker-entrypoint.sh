#!/bin/sh
set -e

echo "Starting container..."

# copia secret se existir
if [ -f /etc/secrets/appsettings.Development.json ]; then
  cp /etc/secrets/appsettings.Development.json /app/appsettings.Development.json
fi

cd /app

echo "Starting ASP.NET..."
exec dotnet Backend.dll