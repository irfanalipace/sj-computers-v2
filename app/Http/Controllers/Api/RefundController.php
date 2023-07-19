<?php

namespace App\Http\Controllers\Api;

use App\Classes\StatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Refund\RefundSubmit;
use App\Models\Order;
use App\Models\Refund;
use Exception;
use Illuminate\Http\Request;

class RefundController extends BaseController
{
    // orders list
    public function ordersList(Request $request)
    {

        $orders_list = Order::where('user_id', $request->user_id)->select('orders.id')->without('Invoice', 'orderItem')->get();
        if (is_null($orders_list)) {
            return $this->sendError(['error', 'Order list is not found.']);
        }

        return $this->sendResponse($orders_list, 'Successfully get order list.');
    }

    // order details
    public function orderDetail(Request $request)
    {
        $order_details = Order::whereIn("id", $request->order_id)->where('user_id', $request->user_id)->select('orders.id', 'orders.total_amount', 'orders.sub_total', 'orders.shipment_price', 'orders.created_at')->get();
        if (is_null($order_details)) {
            return $this->sendError(['error', 'Order Details is not found.']);
        }
        return $this->sendResponse($order_details, 'successfully fetch Details');
    }

    // refund submit
    public function refundSubmit(RefundSubmit $request)
    {
        try {

            $refund = collect($request->orders)->map(function ($order) use ($request) {
                return Refund::create([
                    'user_id' => $request->user_id,
                    'order_id' => $order['order_id'],
                    'refund_type' => $order['refund_type'],
                    'reasons' => $order['reasons'],
                    'amount' => $order['amount'],
                    'status' => StatusEnum::PENDING
                ]);
            });
            return $this->sendResponse($refund, 'Successfully added refund.');
        } catch (Exception $e) {
            return $this->sendError(['error', $e->getMessage()]);
        }
    }
}
