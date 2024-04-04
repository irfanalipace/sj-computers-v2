<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Exports\ExportMarketingProduct;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class GenerateMarketingFeed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:marketing-feed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate and store marketing feed';

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
//    public function handle()
//    {
//        return 0;
//    }

    public function handle()
    { 
        Log::info('Marketing cron start');
        /*
         * delete old file
         */
        Storage::deleteDirectory('public/gmarketing');
        /*
         * make new marketing feed file
         */
        Excel::store(new ExportMarketingProduct(), 'public/gmarketing/' . 'marketing_feed.csv');

        Log::info('Marketing cron end');
    }
}
