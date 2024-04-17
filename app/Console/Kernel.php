<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Get today's date for the directory
        $date = Carbon::now()->format('Y-m-d');
        $directoryPath = storage_path('logs/cron/' . $date);
        // Ensure the directory exists
        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }

        // Define an array of commands and their scheduling methods
        $commands = [
            'amazon-product-update' => 'everyFifteenMinutes',
            'sj-products' => 'daily',
            'products:meta' => 'daily',
            'generate:marketing-feed' => 'everyFiveMinutes',
            'generate:site-map' => 'everyThirtyMinutes',
            'product-statistics' => 'weekly',
            'order-tracking-history' => 'everyThirtyMinutes',
            'log-clear' => 'daily',
            'reminder-cart' => 'everySixHours'
        ];

        foreach ($commands as $command => $scheduleMethod) {
            // Generate a unique filename for each command
            $filename = $command . '-' . Carbon::now()->format('Y-m-d_H-i-s') . '.txt';
            $filePath = $directoryPath . '/' . $filename;

            // Schedule the command with a dynamically generated filename
            $schedule->command($command)->{$scheduleMethod}()->sendOutputTo($filePath);
        }

        //  $schedule->command('amazon-product-update')->everyFifteenMinutes()->sendOutputTo($filePath);
        //  $schedule->command('sj-products')->daily()->sendOutputTo($filePath);
        //  $schedule->command('products:meta')->daily()->sendOutputTo($filePath);
        //  $schedule->command('generate:marketing-feed')->everyFiveMinutes()->sendOutputTo($filePath);
        //  $schedule->command('generate:site-map')->everyThirtyMinutes()->sendOutputTo($filePath);
        //  $schedule->command('product-statistics')->weekly()->sendOutputTo($filePath);
        //  $schedule->command('order-tracking-history')->everyMinute()->sendOutputTo($filePath);
        //  $schedule->command('log-clear')->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
