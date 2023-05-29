<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\State\UpdateStateRequest;
use App\Models\State;
use App\Models\User;
use App\Models\UserState;
use Illuminate\Http\Request;

class StateController extends BaseController
{
    public function getList(request $request)
    {
        $data= State::orderBy('name')->get();
        return $this->sendResponse($data);
    }

    public function updateState(UpdateStateRequest $request)
    {
        UserState::updateOrCreate(['user_id' => auth()->user()->id],
            [
                'zip_code'=> $request->zip_code,
                'state_id' => $request->state_id
            ]
        );

        return $this->sendResponse();

    }

    public function getState(){
        $userState = auth()->user()->userState;
        if($userState){
            $data = $userState->toArray();
            $data['state'] = $userState->state->toArray();

            return $this->sendResponse($data);
        }

        return $this->sendResponse($userState);
    }
}
