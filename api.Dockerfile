FROM public.ecr.aws/v8a3y0o0/php82-node18:latest AS base

RUN mkdir /app
WORKDIR /app
COPY ./ /app

COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY ./etc/nginx-site.conf /etc/nginx/conf.d/default.conf
COPY ./etc/entrypoint.sh /entrypoint.sh
COPY ./etc/.env /app/.env

COPY ./etc/php.ini /usr/local/etc/php/php.ini
COPY ./etc/php-fpm.conf /usr/local/etc/php-fpm.d/dev.conf

COPY ./etc/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./etc/crontab /etc/cron/crontab

RUN dos2unix /etc/cron/crontab
RUN crontab /etc/cron/crontab

RUN apt-get update && apt-get install -y nginx
RUN apt install -y build-essential gcc make libpng-dev

WORKDIR /app

RUN chmod 777 -R /app/storage
RUN chmod 777 -R /app/bootstrap/cache
RUN chmod 777 -R /entrypoint.sh

RUN composer install
EXPOSE 80
ENTRYPOINT /entrypoint.sh

