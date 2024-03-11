<?php

namespace App\Traits;

use Exception;
use Illuminate\Support\Facades\Http;

trait FedexTrait
{
    public function getAccessToken()
    {
        $api_app_id = config('app.fedex_sandbox_app_id');
        $api_secret_id = config('app.fedex_sandbox_secret_key');
        $apiUrl = config('app.fedex_sandbox_url') . '/oauth/token';
        // dd( $api_app_id,$api_secret_id,$apiUrl);
        $response = Http::asForm()->post($apiUrl, [
            'grant_type' => 'client_credentials',
            'client_id' => $api_app_id,
            'client_secret' => $api_secret_id,

        ]);
        
        $data = $response->json();
        $accessToken = $data['access_token'] ?? null;
       
        if ($accessToken) {
            return $accessToken;
        } else {
            throw new exception('Access token not found in the response');
        }
    }

    private function curlData($jsonPayload, $apiUrl, $accessToken, $method = 'POST')
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => $jsonPayload,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $accessToken, ],
        ]);

        $response = curl_exec($curl);

        curl_close($curl);

        $decodedResponse = json_decode($response, true);

        return $decodedResponse;
    }
    
    public function getTrackingInfoFedex($trackingId)
    {       
        $apiUrl = config('app.fedex_sandbox_url') . '/track/v1/trackingnumbers';
        $accessToken = $this->getAccessToken();
       
        // $payload = [
        //     "includeDetailedScans" => true,
        //     'trackingInfo' => [
        //         'trackingNumberInfo' => [
        //             "trackingNumber" => 775486523899
        //         ],
        //     ],
        // ];
        $payload = '{
            "trackingInfo": [
              {
                "trackingNumberInfo": {
                  "trackingNumber": "794843185271"
                }
              }
            ],
            "includeDetailedScans": true
          }';

        // // Convert the payload array to JSON
        // $jsonPayload = json_encode($payload);       
        $response = $this->curlData($payload, $apiUrl, $accessToken);

        if (isset($response['output']['completeTrackResults'])) {
            return $response['output']['completeTrackResults'];
        } else {
            throw new Exception('Error While fetching shipment details. '.$response['errors'][0]['message']);
        }

        return $response['output']['completeTrackResults'];
    }
}