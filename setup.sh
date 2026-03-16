#!/bin/bash
set -e

echo "================================"
echo "  Установка demo-sait на сервер"
echo "================================"
echo ""

# Запрашиваем домен
read -p "Введите ваш домен (например: mysite.ru): " DOMAIN
read -p "Введите GEMINI_API_KEY: " GEMINI_KEY

echo ""
echo ">> Обновление системы..."
apt update -y && apt upgrade -y

echo ">> Установка Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx certbot python3-certbot-nginx

echo ">> Установка PM2..."
npm install -g pm2

echo ">> Клонирование репозитория..."
mkdir -p /var/www
cd /var/www
rm -rf demo-sait
git clone https://github.com/snackcs/SAIT-DEMO.git demo-sait
cd demo-sait

echo ">> Создание .env.local..."
cat > .env.local << EOF
GEMINI_API_KEY=${GEMINI_KEY}
EOF

echo ">> Установка зависимостей и сборка..."
npm install
npm run build

echo ">> Запуск через PM2..."
pm2 start npm --name "demo-sait" -- start
pm2 save
pm2 startup | tail -1 | bash

echo ">> Настройка Nginx..."
cat > /etc/nginx/sites-available/demo-sait << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/demo-sait /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

echo ">> Установка SSL сертификата..."
certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos --email admin@${DOMAIN} --redirect

echo ""
echo "================================"
echo "  Готово! Сайт доступен по:"
echo "  https://${DOMAIN}"
echo "================================"
