<?php

namespace App\Http\Controllers\Api;

use App\Models\State;
use Illuminate\Http\Request;

class StateController extends BaseController
{
    public function getList(request $request){
        $data= State::all();
        return $this->sendResponse($data);
    }
}
