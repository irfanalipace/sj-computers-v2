<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class RefundController extends BaseController
{
    //
    public function ordersList(Request $request)
    {

        $orders_list = Order::where('user_id', $request->user_id)->select('orders.id')->without('Invoice','orderItem')->get();
        if (is_null($orders_list)) {
            return $this->sendError(['Error', 'Order list is not found.']);
        }
       
        return $this->sendResponse($orders_list, 'Successfully get order list.');
    }
    
    // ->select('orders.id', 'orders.total_amount', 'orders.sub_total', 'orders.shipment_price', 'orders.created_at')
}
