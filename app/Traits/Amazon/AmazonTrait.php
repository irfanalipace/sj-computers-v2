<?php

namespace App\Traits\Amazon;

use App\Models\Product;
use Exception;

trait AmazonTrait
{

    public function getAmazonInventory($productId)
    {
        $status = false;
        $quantity = 0;
        $product = Product::find($productId);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://server5.sjops.us/api/inventory/data/get/Prod_05162023/',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode(array('SKU' => $product->sku)),
            CURLOPT_HTTPHEADER => array(
                'apikey: 810f8ad0-8585-4845-9954-9a82bdbc18bc',
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $response = json_decode($response, true);
        if (isset($response['message']) && !empty($response['message'])) {

            $data = json_decode($response['message'], true);
            $quantity = (int) $data['attributes']['fulfillment_availability'][0]['quantity'];
            $status = true;
        }

        return [
            'sku' => $product->sku ?? '',
            'quantity' => $quantity,
            'status' => $status
        ];
    }
}
