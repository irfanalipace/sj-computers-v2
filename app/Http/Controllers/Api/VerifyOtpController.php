<?php
//
//namespace App\Http\Controllers\Api;
//
//use App\Http\Controllers\Controller;
//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\Cache;
//use Illuminate\Validation\ValidationException;
//
//class VerifyOtpController extends Controller
//{
//    public function verify (Request $request)
//    {
//        $request->validate([
//            'otp' => 'required',
//        ]);
//
//        $user = Auth::user();
//
//        $opt = Cache::get('login_otp_'.$user->id);
//
//        if (! $opt || $request->otp !== $opt) {
//            throw ValidationException::withMessages([
//                'otp' => ['The provided OTP is incorrect or has expired.']
//            ]);
//        }
//        Cache::forget('login_otp_'.$user->id);
//
//        $tokenResult = $user->createToken('Login Token');
//
//        return response()->json([
//            'access_token' => $tokenResult->accessToken,
//            'token_type' => 'Bearer']);
//    }
//
//}
