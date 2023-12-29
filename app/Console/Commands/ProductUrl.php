<?php

namespace App\Console\Commands;

use App\Models\Product;
use App\Traits\ProductTrait;
use Illuminate\Console\Command;

class ProductUrl extends Command
{
    use ProductTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'product:set-url';

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
            $this->setProductUrl($product->id);
            echo "product url is set  ".$product->id." \n";
        }
        return 0;
    }
}
