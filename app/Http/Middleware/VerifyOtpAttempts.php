<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Otp;

class VerifyOtpAttempts
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = User::where('id', $request->user_id);
        if (Otp::where('user_id', $request->user_id)->value('resend_code_limit') >= 3) {
            $user->update(['status' => 'blocked']);
            return response()->json('Your account has been blocked due to too many failed OTP attempts.');
        }
        return $next($request);
    }
}
