<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Models\OrderTrackingHistory as TrackingHistory;
use App\Traits\FedexTrait;
use Illuminate\Console\Command;

class OrderTrackingHistroy extends Command
{
    use FedexTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order-tracking-history';

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
        $orders = Order::whereNotNull('tracking_id')->get();

        foreach ($orders as $order) {
            $trackingShipment = $this->trackShipment($order->tracking_id);
           
            if (isset($trackingShipment['output']['completeTrackResults'])) {
                $trackResults = $trackingShipment['output']['completeTrackResults'][0]['trackResults'][0];
               
                // Check if 'scanEvents' key exists before proceeding
                if (isset($trackResults['scanEvents'])) {
                    $encodeTracking = json_encode($trackResults['scanEvents'], true);
                   
                    TrackingHistory::updateOrCreate(['order_id' => $order->id], [
                        'order_id' => $order->id,
                        "tracking_history" => $encodeTracking,
                    ]);
                }
               
                // Check for 'latestStatusDetail' and 'statusByLocale' before updating order status
                if (isset($trackResults['latestStatusDetail']['statusByLocale']) && $trackResults['latestStatusDetail']['statusByLocale'] == "Delivered") {
                    $order->update(['fedex_status' => $trackResults['latestStatusDetail']['statusByLocale']]);
                }
            }
        }
        
       
        return 0;
    }
}
