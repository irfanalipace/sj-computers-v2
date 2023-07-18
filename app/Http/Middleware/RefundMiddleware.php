<?php

namespace App\Http\Middleware;

use App\Models\CustomerVerification;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class RefundMiddleware
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
        $user = User::whereId($request->user_id)->select(['id', 'email'])->first();

        if ($this->isRefundVerified($user->email)) {
            return $next($request);
        }
        return response()->json(['error' => 'Unauthorized.'], 401);
    }
    private function isRefundVerified($user_email)
    {
        // Fetch the CustomerVerification record for the user
        $verification = CustomerVerification::where('email', $user_email)->first();

        // Check if the verification record exists and is_verified is 1 (true)
        return $verification && $verification->is_verified === 1;
    }
}
