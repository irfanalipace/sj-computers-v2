<?php

namespace App\Http\Controllers\Api;

use App\Classes\StatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Refund\OrderDetailRequest;
use App\Http\Requests\Refund\OrderListRequest;
use App\Http\Requests\Refund\RefundListRequest;
use App\Http\Requests\Refund\RefundSubmit;
use App\Jobs\SendRefundMail;
use App\Models\Order;
use App\Models\Refund;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RefundController extends BaseController
{
    // orders list
    public function ordersList(OrderListRequest $request)
    {
        $orders_list = Order::where('user_id', $request->user_id)->select('orders.id')->without('Invoice', 'orderItem')->get();
        if (is_null($orders_list)) {
            return $this->sendError(['error', 'Order list is not found.']);
        }

        return $this->sendResponse($orders_list, 'Successfully get order list.');
    }

    // order details
    public function orderDetail(OrderDetailRequest $request)
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
            DB::beginTransaction();
            $checkIfExists = Refund::where('order_id', $request->order_id)->exists();
            if (is_null($checkIfExists)) {
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
            } else {
                return $this->sendError(['error', 'This order has already refunded']);
            }
            SendRefundMail::dispatch(User::whereId($request->user_id)->without('shippingAddress')->first(), $refund);
            DB::commit();
            return $this->sendResponse($refund, 'Successfully added refund.');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError(['error', $e->getMessage()]);
        }
    }

    //list of refund
    public function refundList(RefundListRequest $request)
    {
        $refund = Refund::where('user_id', $request->user_id)->paginate(10);
        if (is_null($refund)) {
            return $this->sendError(['error', 'Refund list is not found']);
        }
        return $this->sendResponse($refund, 'Successfully fetch refund.');
    }
}
