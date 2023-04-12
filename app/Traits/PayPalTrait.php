<?php
namespace App\Traits;

use Exception;

trait PayPalTrait {

 public function TransactionInProgress($request,$provider)
 {
    try{

        $data = [];
        $data['items'] = [
            [
                'name' => 'SJComputers Users',
                'price' => $request->amount,
                'desc'  => 'This Transaction is for testing purpose',
                'qty' => 1
            ]
        ];

        $data['invoice_id'] = rand(10,1000000);
        $data['invoice_description'] = "Order Invoice";
        $data['return_url'] = route('successTransaction');
        $data['cancel_url'] = route('cancelTransaction');
        $data['total'] = $request->amount;

        $response = $provider->setExpressCheckout($data);
        $response = $provider->setExpressCheckout($data, true);
    
        return $response;
    } catch(Exception $e) {
        return response()->json([
            'code' => 201,
            'Error' => "Something went wrong!" .$e
        ]);
    }
    
 }

}