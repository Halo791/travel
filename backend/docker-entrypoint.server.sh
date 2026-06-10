#!/bin/sh
set -e

if [ ! -f .env ]; then
    cp .env.example .env
fi

mkdir -p storage/app storage/framework/cache storage/framework/sessions storage/framework/views storage/logs
touch "${DB_DATABASE:-/app/storage/database.sqlite}"

php artisan config:clear
php artisan migrate --force

if [ ! -f storage/.seeded ]; then
    php artisan db:seed --force
    touch storage/.seeded
fi

exec "$@"
