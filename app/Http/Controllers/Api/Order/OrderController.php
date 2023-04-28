<?php

namespace App\Http\Controllers\Api\Order;

use App\Classes\StatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreShippingAddressRequest;
use App\Models\OrderShippingAddress;
use Exception;
use Illuminate\Http\RedirectResponse;

class OrderController extends Controller
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
}
