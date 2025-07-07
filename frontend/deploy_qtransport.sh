#!/bin/bash

echo "🔁 Building frontend..."
cd ~/Quantum-Transport-Simulations/frontend

# Optional: set base path dynamically if needed
# sed -i 's|base: .*,|base: "/qtransport/",|' vite.config.js

npm run build

echo "🚛 Deploying to /var/www/html/qtransport/"
sudo rm -rf /var/www/html/qtransport/*
sudo cp -r dist/* /var/www/html/qtransport/

echo "♻️ Reloading NGINX..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment complete: http://silalabs.io/qtransport/"
