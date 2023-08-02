<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Exports\ExportMarketingProduct;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
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
        $export = new ExportMarketingProduct();
        $now = now()->format('YmdHis');
        $filename = 'Inventory_' . $now . '.xlsx';

        Excel::store($export, 'public/gemarketing/' . $filename);

        $this->deleteOldFiles();

        $this->info('Marketing feed generated and stored successfully.');
    }

    private function deleteOldFiles()
    {
        $disk = Storage::disk('public');
        $directory = 'gemarketing';

        $files = $disk->files($directory);

        if (count($files) > 1) {
            $oldestFiles = collect($files)->sortBy('timestamp')->take(count($files) - 1);

            foreach ($oldestFiles as $file) {
                $disk->delete($file);
            }
        }
    }
}
