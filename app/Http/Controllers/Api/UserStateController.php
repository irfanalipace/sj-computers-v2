<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserState;
use Illuminate\Http\Request;

class UserStateController extends BaseController
{
    public function updateState(Request  $request){

        UserState::updateOrCreate(['user_id' => auth()->user()->id],
            [
                'zip_code'=> $request->zip_code,
                'state_id' => $request->state_id

            ]
        );

        return $this->sendResponse();

    }
}
