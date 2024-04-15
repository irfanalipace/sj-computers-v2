<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Jobs\AccountCreationEmailJob;
use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends BaseController
{
    public function verify($user_id, Request $request) {

        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            AccountCreationEmailJob::dispatch($user);
            $user->markEmailAsVerified();
        }

        return redirect()->to('/login');
    }

    public function resend() {
        if (auth()->user()->hasVerifiedEmail()) {
            return $this->sendError(["msg" => ["Email already verified."]], 400);
        }

        auth()->user()->sendEmailVerificationNotification();

        return $this->sendError(["msg" => ["IEmail verification link sent on your email id."]], 401);
    }
}
