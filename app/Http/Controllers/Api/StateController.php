<?php

namespace App\Http\Controllers\Api;

use App\Models\State;
use App\Models\User;
use App\Models\UserState;
use Illuminate\Http\Request;

class StateController extends BaseController
{
    public function getList(request $request){
        $data= State::all();
        return $this->sendResponse($data);
    }

    public function updateState(Request  $request){

        UserState::updateOrCreate(['user_id' => auth()->user()->id],
            [
                'zip_code'=> $request->zip_code,
                'state_id' => $request->state_id
            ]
        );

        return $this->sendResponse();

    }

    public function getState(){
        $data = auth()->user()->userState;
        return $this->sendResponse($data);
    }
}
