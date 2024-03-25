<?php

namespace App\Http\Controllers\Api\Order;

use App\Classes\StatusEnum;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderListRequest;
use App\Models\Order;
use Carbon\Carbon;
use Darryldecode\Cart\Cart;
use Illuminate\Http\Request;
use App\Http\Requests\StoreShippingAddressRequest;
use App\Traits\FedexTrait;
use App\Models\OrderShippingAddress;
use App\Models\UserAddress;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;

class OrderController extends BaseController
{
    use FedexTrait;
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
                    # code..                  
                    return $this->sendError('Please choose one option',400);
                    break;
            }
        } catch (Exception $e) {
            
            return $this->sendError('Something went wrong.'. $e,400);
        }
    }

    public function getShippingAddress()
    {
        $shippingAdress = UserAddress::where('user_id', auth()->user()->id)->first();
        return response(array('success' => true, 'data' => $shippingAdress, 'message' => "Get Shipping address success"));
    }

    public function shippingAddress(StoreShippingAddressRequest $request)
    {
        try {

            $order = UserAddress::updateOrCreate(
                ['user_id' => auth()->user()->id],
                ['country' => $request['country'], 'full_name' => $request['full_name'], 'phone_number' => $request['phone_number'], 'address' => $request['address'], 'city' => $request['city'], 'state' => $request['state'], 'apartment' => $request['apartment'], 'zip_code' => $request['zip_code'], 'status' => 'Active', 'user_id' => auth()->user()->id]
            );

            // else {

            //     $order = OrderShippingAddress::create(
            //         ['country' => $request->country, 'full_name' => $request->full_name, 'phone_number' => $request->phone_number, 'address' => $request->address, 'city' => $request->city, 'state' => $request->state, 'zip_code' => $request->zip_code, 'user_id' => auth()->user()->id]
            //     );
            // }
            return response(array('success' => true, 'data' => $order, 'message' => "Shipping address added."), 200, []);
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }

    public function getOrders(OrderListRequest $request)
    {
       
        $perPageRecord = $request->get('per_page') ?? 12;

        $sql = Order::query();

        if ($request->month) {
            $search = $request->search ?? [];
            $from = Carbon::now()->subMonth($request->get('month'));
            $to = Carbon::now();
            $sql = Order::whereBetween('created_at', [$from, $to])->where('tracking_id',$search);
        }

        $successOrder =  $sql->where('status', StatusEnum::COMPLETE)->paginate($perPageRecord);
        $deliveredOrder = $sql->where('fedex_status',StatusEnum::DELIVERED)->paginate($perPageRecord);
        $cancelOrder = $sql->where('status',StatusEnum::CANCELED)->paginate($perPageRecord);

        $data = [
            'success_orders' => $successOrder,
            'delivered_orders' => $deliveredOrder,
            'cancel_orders' => $cancelOrder
        ];

        return $this->sendResponse($data);
    }

    public function searchOrder(Request $request)
    {
        $data = Order::where('invoice_id', $request->invoice_id)->OrWhere('id', $request->order_id)->get();
        return $this->sendResponse($data);
    }

    public function showOrderDetail($id)
    {
        $order = Order::query()->find($id);
        $invoiceOrder = $order->load(['user.shippingAddress','guest']);

        return view('vendor.voyager.orders.show_details', compact('invoiceOrder'));

    }

    public function getTrackingInfo(Request $request)
    {
        try{          
            $trackingId = $request->tracking_id;
            $shipmentDetail = $this->trackShipment($trackingId ?? null);
           
            return $this->sendResponse($shipmentDetail,'Successfully fetched shipment details.');
        } catch(Exception $e){
            return $this->sendError('error',$e->getMessage());
        }        
    }

    public function getOrderByNo($orderNo)
    {
        try{   
            $order = Order::where('id',$orderNo)->firstOrFail();
            return $this->sendResponse($order,'Successfully fetched Order details.');
        }catch(ModelNotFoundException $e){
            return $this->sendError('error',"Order is not found.");
        } catch(Exception $e){
            return $this->sendError('error',$e->getMessage());
        }  
    }
}
