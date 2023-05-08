<?php

namespace App\Http\Controllers\Api\Order;

use App\Classes\StatusEnum;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderListRequest;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\StoreShippingAddressRequest;
use App\Models\OrderShippingAddress;
use Exception;
use Illuminate\Http\RedirectResponse;

class OrderController extends BaseController
{
    //
    public function placeOrder(Request $request)
    {
        try {

            switch ($request->payment_type) {
                case StatusEnum::PAYMENTTYPEPAYPAL:
                    # code...
                    $url = route('processTransaction');
                    $response = new RedirectResponse($url, 307);
                    return $response;
                    break;
                case StatusEnum::PAYMENTTYPESQUARE:
                    $url = route('squreCharge');
                    $response = new RedirectResponse($url, 307);
                    return $response;
                    break;
                default:
                    # code...
                    return response()->json(['code' => 400 ,'msg' => "Please choose one option"]);
                    break;
            }
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }

    public function getShippingAddress()
    {
        $shippingAdress = OrderShippingAddress::where('user_id', auth()->user()->id)->first();
        return response(array('success' => true, 'data' => $shippingAdress, 'message' => "Get Shipping address success"));
    }

    public function shippingAddress(StoreShippingAddressRequest $request)
    {
        try {

            $order = OrderShippingAddress::updateOrCreate(
                ['user_id' => auth()->user()->id],
                ['country' => $request['country'], 'full_name' => $request['full_name'], 'phone_number' => $request['phone_number'], 'address' => $request['address'], 'city' => $request['city'], 'state' => $request['state'], 'zip_code' => $request['zip_code'], 'user_id' => auth()->user()->id]
            );

            return response(array('success' => true, 'data' => $order, 'message' => "Shipping address added."), 200, []);
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }

    public function getOrders(OrderListRequest $request){

        $perPageRecord = $request->get('per_page') ?? 10;

        $sql = Order::query();

        if($request->month) {
            $from = Carbon::now()->subMonth($request->get('month'));
            $to = Carbon::now();
            $sql = Order::whereBetween('created_at',[$from,$to]);
        }

        $data = $sql->paginate($perPageRecord);

       return $this->sendResponse($data);
    }
}
