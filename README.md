<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

## About Project

To run the project run following commands

-   php artisan key:generate
-   composer install (delete composer lock if get error of version in lock file).

[//]: # '- php artisan vendor:publish --provider="Laravel\\Fortify\FortifyServiceProvider"'

-   php artisan migrate:fresh --seed
-   php artisan passport:install

[//]: # "- composer require tcg/voyager"

-   php artisan voyager:install

[//]: # "- php artisan voyager:install --with-dummy"

-   php artisan voyager:admin admin@admin.com
-   php artisan db:seed --class=CategoryProductSeeder
-   php aritsan db:seed --class=SystemPagesSeeder
-   php artisan serve

# After Environment change

-   php artisan config:clear
-   php artisan config:cache
-   php artisan optimize:clear

For Frontend:

-   npm install --force
-   npm start (to start the development server)
-   npm build (creates production build)
