<?php

namespace App\Console\Commands;

use App\Models\CartStorage;
use Carbon\Carbon;
use Darryldecode\Cart\Cart;
use Illuminate\Console\Command;

class ReminderCart extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reminder-cart';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Every 6 hours reminder send to customer';

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
       // Calculate the date 6 hours ago
        $sixHoursAgo = Carbon::now()->subHours(5);
        // Retrieve cart data created 6 hours ago
        $carts = CartStorage::where('updated_at', '<=', $sixHoursAgo)->where('wishlist_data','!=','a:0:{}')->get();       

        foreach ($carts as  $cart) {
           $customerId = $cart->id;
            
        }
        return 0;
    }
}
