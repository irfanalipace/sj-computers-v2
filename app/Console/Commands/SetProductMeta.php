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
            $metadescription = new MetaDescription();
            $metadescription->url = config('app.url').'/products/'.$product->asin;
            $metadescription->title = "Sjcomputers.us: ".$product->name." Electronics";
            $metadescription->description = "Sjcomputers.us: ".$product->name." Electronics";
            $metadescription->save();
            echo "roe insert \n";
        }

        return 0;
    }
}
