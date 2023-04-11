<?php

namespace App\Http\Controllers\Api\UserDetail;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\UserDetailRequest;
use App\Models\State;
use App\Models\UserDetail;
use Illuminate\Http\JsonResponse;

class UserDetailController extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param UserDetailRequest $request
     * @return JsonResponse
     */
    public function __invoke(UserDetailRequest $request)
    {
        $zipcode = State::query()
            ->find($request->state_id)
            ->where('zip_code_start', '<=', $request->zipcode)
            ->where('zip_code_end', '>=', $request->zipcode)
            ->exists();

        if ($zipcode) {
            $userDetail = UserDetail::query()->create([
                'user_id' => $request->user_id,
                'state_id' => $request->state_id,
                'zipcode' => $request->zipcode
            ]);
            return $this->sendResponse($userDetail);
        }
        return $this->sendError(['error' => ['The zipcode does not match with the state']]);
    }
}
