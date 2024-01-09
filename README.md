# About Project

## Backend Setup

### Installation

1. Generate Laravel application key:

    ```bash
    php artisan key:generate
    ```

2. Install dependencies using Composer:

    ```bash
    composer install
    # If you encounter version issues in the lock file, delete the composer.lock file and run again.
    ```

3. Publish Fortify assets:

    ```bash
    # Uncomment the following line if needed
    # php artisan vendor:publish --provider="Laravel\Fortify\FortifyServiceProvider"
    ```

4. Migrate the database and seed with data:

    ```bash
    php artisan migrate:fresh --seed
    php artisan passport:install
    ```

5. Install Voyager admin:

    ```bash
    php artisan voyager:install
    # Optionally, with dummy data:
    # php artisan voyager:install --with-dummy
    ```

6. Create a Voyager admin user:

    ```bash
    php artisan voyager:admin admin@admin.com
    ```

7. Seed additional data:

    ```bash
    php artisan db:seed --class=CategoryProductSeeder
    php artisan db:seed --class=SystemPagesSeeder
    ```

8. Start the Laravel development server:

    ```bash
    php artisan serve
    ```

9. Environment Changes

    After making changes to the environment, run the following commands:

    ```bash
    php artisan config:clear
    php artisan config:cache
    php artisan optimize:clear
    ```

## Frontend Setup

### Prerequisites

Ensure you have the following tools installed:

-   [Node.js](https://nodejs.org/) v18 or greater - JavaScript runtime
-   [PNPM](https://github.com/pnpm/pnpm) v8 or greater - Fast, disk space efficient package manager

### Installation

1. Run Following command to install pnpm if not already installed:

    ```bash
    npm install -g pnpm
    ```

2. Install project dependencies:

    ```bash
    pnpm install --frozen-lock
    ```

3. Run Following command to start development server:

    ```bash
    pnpm run dev
    ```

4. Run Following command to create production build :
    ```bash
    pnpm run build
    ```

Feel free to customize the commands according to your project requirements.
