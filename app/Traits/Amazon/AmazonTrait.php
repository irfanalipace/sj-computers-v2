<?php

namespace App\Traits\Amazon;

use App\Classes\StatusEnum;
use App\Models\Product;
use Exception;

trait AmazonTrait
{

    public function getAmazonInventory($productId = '',$type = '', $search = '')
    {
        
        $status = false;
        $quantity = 0;
        if (empty($productId)) {
            $product = Product::where($type, $search)->first();
        } else {
            $product = Product::find($productId);
        }

        if (empty($sku)) {
            $sku = $product->sku;
        }

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
            // CURLOPT_POSTFIELDS => json_encode(array('SKU' => $sku)),
            CURLOPT_POSTFIELDS => json_encode(array('SKU' => 'AI-NRCD-SNXP')),
            CURLOPT_HTTPHEADER => array(
                'apikey: ' . config('app.amazon_apikey'),
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
            'sku' => $product->sku,
            'quantity' => $quantity,
            'status' => $status,
            'product' => $product
        ];
    }

    public function updateAmazonInventory($productInfo, $qty, $type = " ")
    {
        switch ($type) {
            case StatusEnum::RELEASE:
                # code...

                $totalQuantity = (int) $productInfo['quantity'] + (int) $qty;

                break;
            default:
                # code...
                $totalQuantity = (int) $productInfo['quantity'] - (int) $qty;
                break;
        }

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://server5.sjops.us/api/inventory/data/update/Prod_05162023/',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            //            CURLOPT_POSTFIELDS => json_encode(array('SKU' => $productInfo['sku'], 'quantity' => $totalQuantity)),
            CURLOPT_POSTFIELDS => json_encode(array('SKU' => 'AI-NRCD-SNXP', 'quantity' => $totalQuantity)),
            CURLOPT_HTTPHEADER => array(
                'apikey: ' . config('app.amazon_apikey'),
                'Content-Type: application/json',

            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return true;
    }
}
