<?php
namespace App\Traits;
use Cart;
use Exception;

trait PayPalTrait {

 public function TransactionInProgress($request,$provider,$userId)
 {

    try{
      
        $data = ['items' => []];

        Cart::session($userId)->getContent()->each(function ($item) use (&$data) {
            // Add the name,price,desc and quantity to the $items array
            $data['items'][] = ['name' => $item->name,'price' => $item->price,'desc'  => 'This Laptop is for Developer','qty' => $item->quantity];

        });
        $shippingAdress = $request->shipping_address;


        $data['invoice_id'] = rand(10,1000000);
        $data['invoice_description'] = "Order Invoice {$data['invoice_id']}";
        $data['return_url'] = route('successTransaction',['id' => $userId, 'address' => $shippingAdress]);
        $data['cancel_url'] = route('cancelTransaction');
        $data['total'] = Cart::session($userId)->getSubTotal();

        $response = $provider->setExpressCheckout($data);

        return $response;
    } catch(Exception $e) {

        return response()->json([
            'code' => 201,
            'Error' => "Something went wrong!" .$e
        ]);
    }

 }

}
