#!/bin/sh
chmod 777 -R ./storage
chmod 777 -R ./bootstrap/cache
php artisan storage:link
php artisan migrate --force
supervisord -c /etc/supervisor/supervisord.conf
