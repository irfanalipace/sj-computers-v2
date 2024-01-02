<?php

namespace App\Console\Commands;


use App\Models\MetaDescription;
use App\Models\Product;
use Illuminate\Console\Command;

class SetProductMeta extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:meta';

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
        $products = Product::all();

        foreach ($products as $product){

            MetaDescription::updateOrCreate(
                ['url' => $product->url], // Attributes to search for existing record
                [
                    'title' => "Sjcomputers.us: ".$product->name." Electronics",
                    'description' => "Sjcomputers.us: ".$product->name." Electronics",
                    ] // Values to update or create
            );

            echo "row insert ".$product->id." \n";
        }

        return 0;
    }
}
