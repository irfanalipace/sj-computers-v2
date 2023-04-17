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

                    break;
                default:
                    # code...
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

            ($row = OrderShippingAddress::whereUser_id(auth()->user()->id)->first()) ? $order = $this->updateShippingAddress($row, $request) : $order = $this->createShippingAddress($request);

            return response(array('success' => true, 'data' => true, 'message' => $order), 200, []);
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }

    //create shipping address
    public function createShippingAddress($created)
    {
        try {
            OrderShippingAddress::create(['country' => $created['country'], 'full_name' => $created['full_name'], 'phone_number' => $created['phone_number'], 'address' => $created['address'], 'city' => $created['city'], 'state' => $created['state'], 'zip_code' => $created['zip_code'], 'user_id' => auth()->user()->id]);
            return StatusEnum::SHIPPINGADDRESSCREATED;
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }

    //update shipping address
    public function updateShippingAddress($update, $request)
    {
        try {

            $update->country = $request->country;
            $update->full_name = $request->full_name;
            $update->phone_number = $request->phone_number;
            $update->address = $request->address;
            $update->city = $request->city;
            $update->state = $request->state;
            $update->zip_code = $request->zip_code;
            $update->save();

            return StatusEnum::SHIPPINGADDRESSUPDATED;
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }
}
