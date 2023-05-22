<?php

namespace App\Http\Controllers\Api;

use App\Classes\StatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Inventory\GetInventoryRequest;
use App\Http\Requests\Inventory\ActionPerfomRequest;
use App\Traits\Amazon\AmazonTrait;
use Exception;
use Illuminate\Http\Request;

class InventoryController extends BaseController
{
    use AmazonTrait;
    //Get inventory
    public function getInventory(GetInventoryRequest $request)
    {
        try {
            $inventory = $this->getAmazonInventory(null, $request->SKU);

            return $this->sendResponse([$inventory], 'Amazon product list');
        } catch (Exception $e) {
            $this->sendError(["Error", "Something went wrong." . $e]);
        }
    }

    //Hold Inventory
    public function ActionPerform(ActionPerfomRequest $request)
    {
        try {
            $inventory = $this->getAmazonInventory(null,$request->sku);

            if ($inventory['status']) {

                $this->updateAmazonInventory($inventory, $request->quantity,$request->action);

                $amazonInventory =  $this->getAmazonInventory(null,$request->sku);

                return $this->sendResponse([$amazonInventory], 'Amazon product list');
            }else{
                $this->sendError(["Error", "Sku not found."]);
            }
           
        } catch (Exception $e) {
            $this->sendError(["Error", "Something went wrong." . $e]);
        }
    }

}
