<?php

namespace App\Http\Controllers\Api\SystemPages;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\SystemPages\SystemPageRequest;
use App\Models\SystemPage;
use Exception;
use Illuminate\Http\Request;

class SystemPagesController extends BaseController
{
    
    //Get pages from DB
    public function getPages(SystemPageRequest $request)
    {
        try {
            
            $page = SystemPage::where('key', $request->key)->select('value')->first();           
            return $this->sendResponse($page);
            
        } catch (Exception $e) {
            return $this->sendError(['Something went wrong.',$e]);
        }
    }
}
