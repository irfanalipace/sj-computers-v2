<?php

namespace App\Http\Controllers\Api\Meta;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Meta\GetMetaDetailRequest;
use App\Models\Brand;
use App\Models\MetaDescription;
use Illuminate\Http\Request;

class MetaDetailController extends BaseController
{
    public function getDetail(GetMetaDetailRequest $request){
        $data= MetaDescription::where('url',$request->url)->first();
        return $this->sendResponse($data);
    }
}
