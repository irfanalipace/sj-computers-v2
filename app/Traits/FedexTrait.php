<?php

namespace App\Traits;

use Exception;
use Illuminate\Support\Facades\Http;

trait FedexTrait
{
    // public function getAccessToken()
    // {
    //     $api_app_id = config('app.fedex_sandbox_app_id');
    //     $api_secret_id = config('app.fedex_sandbox_secret_key');
    //     $apiUrl = config('app.fedex_sandbox_url') . '/oauth/token';
    //     // dd( $api_app_id,$api_secret_id,$apiUrl);
    //     $response = Http::asForm()->post($apiUrl, [
    //         'grant_type' => 'client_credentials',
    //         'client_id' => $api_app_id,
    //         'client_secret' => $api_secret_id,

    //     ]);
        
    //     $data = $response->json();
    //     $accessToken = $data['access_token'] ?? null;
       
    //     if ($accessToken) {
    //         return $accessToken;
    //     } else {
    //         throw new exception('Access token not found in the response');
    //     }
    // }

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

    protected function trackShipment($trackingNumber) {
        $accessToken = $this->getAccessToken();
        
        $curl = curl_init();
       
        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://apis.fedex.com/track/v1/trackingnumbers',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => json_encode([
            "trackingInfo" => [
                [
                    "trackingNumberInfo" => [
                        "trackingNumber" => $trackingNumber
                    ]
                ]
            ],
            "includeDetailedScans" => true
          ]),
          CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json'
          ),
        ));
    
        $response = curl_exec($curl);
  
        
        // Check if response code is 401, indicating token expiration
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    
        if ($httpCode == 401) {
            // Token expired, get a new one and retry the tracking request
            $_SESSION['access_token'] = null;
            $_SESSION['token_expiry'] = null;
    
            $accessToken = $this->getAccessToken();
    
            // Retry the tracking request
            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'Authorization: Bearer ' . $accessToken,
                'Content-Type: application/json'
            ));
          
            $response = curl_exec($curl);
        }
        $result = json_decode($response,true);
        $reponse = curl_close($curl);
    
        return $result;
    }
    
    public function getAccessToken() {
    
        $curl = curl_init();
    
        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://apis.fedex.com/oauth/token',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => 'grant_type=client_credentials&client_id=l75354a0bb8bd6470db4e98bea235a872e&client_secret=ab4132a056c1401798b32a3d096030eb',
          CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
            'Cookie: _abck=C7D1413B18A9B17A2CA3B3E3886D825E~-1~YAAQ5qs0F2SBmfWMAQAAbSaiEAvVFmCG7ZdpOQR6/Wnhxmf5WcMPnWgp33aJItEWNUPFbi2mg1VwGdj6tJ363M65e9QieZRyVZPNrCaKTx3oM8ln+lMYXU1tW9eCe9+QvNX+BEdNpBUvvfqo7Mn2iTQH8UyPhAwelUAdNS0vaOCqW5wyMcnCh4YRdy5EDZOOjeQTUqVp9lJ5z6eqK+rsnKzvC9h/mvqLyCNgwhCTiwjUh5+QRIET3hHFkqimeHUQiEmS2KLijyfJ+KDb5NWZ/C/i5IJXormKENhHM5OoTEV6lgFgG9pf5fDvZTfSrxWhTSGyIXHKPMX1Tf49Ve10SxluQzdzoF0vzlLXvMJ6MHzhCx5eG6jz6ZWORZUQyOk9XCV5I9Pl~-1~-1~-1; bm_sz=03DC2EDD3E214C28D43BD4275412BF83~YAAQ5qs0F2WBmfWMAQAAbSaiEBZEfJLzcvB2opxTIxyjWCjyUK7rzSdom+dD/EZ0Gkx1w29Ws7lh0jijVGOyqwGVuFT0jIfTbx9wTDG+S2CDPfUfddg/AT+wVCrWrIxAtdO2F7WNPQ3SzIwh3let+ATU7y5KIcZWRcomha8I39MaavmMYuzohgDan/zH2bK5PTBeeAnVSxSkwMGDS8AxK/3Q1KpfWg+wK00vRTHv0sC3AGBYCRb/uyvmUicJpAe3ss2Iv2yDGXZwa0eG7YnpdPuITOkhRfmWnx2tQZgyygphvw==~3158577~4601653'
          ),
        ));
    
        $response = curl_exec($curl);
    
        curl_close($curl);
    
        $result = json_decode($response, true);
    
        // Save the access token and its expiry time in session
        $_SESSION['access_token'] = $result['access_token'];
        $_SESSION['token_expiry'] = time() + $result['expires_in'];
        return $result['access_token'];
    }
}