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
            $type =  $this->search($request->search);

            $inventory = $this->getAmazonInventory(null, $type, $request->search);

            return $this->sendResponse([$inventory], 'Amazon product list');
        } catch (Exception $e) {
            $this->sendError(["Error", "Something went wrong." . $e]);
        }
    }

    //Hold and Realease action perform in Inventory
    public function ActionPerform(ActionPerfomRequest $request)
    {
        try {
            $type =  $this->search($request->search);

            $inventory = $this->getAmazonInventory(null, $type, $request->search);


            if ($inventory['status']) {

                $this->updateAmazonInventory($inventory, $request->quantity, $request->action);

                $amazonInventory =  $this->getAmazonInventory(null, $type, $request->search);

                return $this->sendResponse([$amazonInventory], 'Amazon product list');
            } else {
                $this->sendError(["Error", "Sku not found."]);
            }
        } catch (Exception $e) {
            $this->sendError(["Error", "Something went wrong." . $e]);
        }
    }

    // Search a value where get a asin and sku type
    public function search($search)
    {
        if (preg_match('/^B0/', $search)) {
            // Value starts with "B0", treat it as ASIN
            $type = StatusEnum::ASIN;
        } elseif (strpos($search, '-') !== false) {
            // Value contains a hyphen "-", treat it as SKU
            $type = StatusEnum::SKU;
        }
        return $type;
    }
}
