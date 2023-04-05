<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Otp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use Illuminate\Auth\Notifications\ResetPassword;
use App\Http\Requests\ForgetRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\LoginOtpMail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class AuthController extends BaseController
{
    public function register(RegisterRequest $request) :JsonResponse
    {
        $validator = $request->all();

        if(empty($validator)){
            return $this->sendError('Validation Error',$validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ]);

        $token = $user->createToken('authToken')->accessToken;

        return $this->sendResponse($token, 'User register successfully.');
    }

    public function login(LoginRequest $request) :JsonResponse
    {
        $validator = $request->all();

        if (empty($validator)) {
            return $this->sendError('Validation Error', $validator->errors(), 422);
        }

        $credentials = $request->only(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return $this->sendError('Invalid credentials.', 401);
        }

        $user = Auth::user();

        $otp = rand(1000, 9999);

        $otpModel = new Otp();
        $otpModel->user_id = $user->id;
        $otpModel->code = $otp;
        $otpModel->save();

        Cache::put('login_otp_'.$user->id, $otp, now()->addMinutes(5));
        Mail::to($user->email)->send(new LoginOtpMail($otp));

        $token = $user->createToken('authToken')->accessToken;

        return $this->sendResponse(['access_token' => $token], 'OTP sent to your email address.');
    }


    public function forgetPassword(ForgetRequest $request)
    {
        $validator = $request->all();

        if (empty($validator)) {
            return $this->sendError('Validation Error', $validator->errors(), 422);
        }

        $email = $request->email;
        $user = User::where('email', $email)->first();

        if (!$user) {
            return $this->sendError('User not found.', 404);
        }

        $token = app('auth.password.broker')->createToken($user);
        $user->sendPasswordResetNotification($token);

        return $this->sendResponse([], 'Password reset link sent to your email.');
    }


    public function resetPassword(ResetPassword $request)
    {
        $validator = $request->all();

        if (empty($validator)) {
            return $this->sendError('Validation Error', $validator->errors(), 422);
        }

        $credentials = $request->only(
            'email', 'password', 'password_confirmation', 'token'
        );

        $response = Password::reset($credentials, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });

        if ($response == Password::INVALID_TOKEN) {
            return $this->sendError('Invalid token.', 400);
        }

        return $this->sendResponse([], 'Password has been reset successfully.');
    }


    public function logout(LogoutRequest $request)
    {
        if (Auth::user()) {
            $user = Auth::user()->token();
            $user->revoke();

            return $this->sendResponse([], 'User logged out successfully.');
        }
    }

    public function verifyEmail(VerifyEmailRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->sendError('User not found.', 404);
        }
        return $this->sendResponse([], 'Email Verified.');
    }

    public function updateProfile(UpdateProfileRequest $request) {

        $validator = $request->all();
        dd($validator);
        $user = Auth::user();

        if (isset($validator['password'])) {
            $validator['password'] = bcrypt($validator['password']);
        }

        $user->update($validator);

        return $this->sendResponse([], 'Profile Updated Successfully.');
    }

    public function verifyOtp(Request $request) {
        $otp = $request->get('otp');

        $data = Otp::where('user_id', '=', $request->user_id)
            ->where('code',$otp)
            ->exists();

        if ($data) {
            $user = User::where('id', '=', $request->user_id)->update(['otp_verified' => 1]);
        }
    }

    public function test()
    {
        dd('test');
    }

}
