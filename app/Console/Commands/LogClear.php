<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class LogClear extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'log-clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Log::info('Log clear cron start');
        // Clear logs in storage/logs
        $logFiles = File::files(storage_path('logs'));
        foreach ($logFiles as $file) {
            File::delete($file);
        }

        // Optionally, clear other logs if they exist and are required
        // Example for base_path logs, adjust according to your actual log file locations
        $rootLogFiles = File::glob(base_path('*.log'));
        File::delete($rootLogFiles);

        $this->comment('Logs have been cleared!');
        Log::info('Logs have been cleared');
        return 0;
    }
}
