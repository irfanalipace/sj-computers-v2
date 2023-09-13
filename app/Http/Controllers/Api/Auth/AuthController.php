<?php

namespace App\Http\Controllers\Api\Auth;

use App\Classes\StatusEnum;
use App\Http\Controllers\Api\BaseController;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Http\Requests\Auth\ForgetPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\Auth\VerifyEmailRequest;
use App\Jobs\SendotpMail;
use App\Jobs\SendVerificationMail;
use App\Mail\LoginOtpMail;
use App\Models\CustomerVerification;
use App\Models\Otp;
use App\Models\Product;
use App\Models\User;
use App\Providers\RegisterUser;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

use Cart;
use Exception;
use Illuminate\Support\Facades\DB;

class AuthController extends BaseController
{
    public function verifyEmail(VerifyEmailRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->sendError(['email' => ['Invalid Email.']], 404);
        }

        if (empty($user->email_verified_at)) {
            return $this->sendError(['email_verification' => ['Verify the email for further process.']], 401);
        }

        return $this->sendResponse([], 'Email Verified.');
    }

    public function registerUser(RegisterUserRequest $request): JsonResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $user = User::create(
                    array_merge(
                        $request->only('name', 'email'),
                        ['role_id' => User::USER_ROLE_ID, 'password' => bcrypt($request->password)]
                    )
                );
                SendVerificationMail::dispatch($request->email);
                event(new RegisterUser($user));
            });

            return $this->sendResponse([], 'User register successfully, Kindly verify the email for further process.');
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError(['Email' => 'Something went wrong.' . $e]);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->sendError(['credentials' => ['Invalid credentials.']], 401);
        }

        $user = Auth::user();
        $this->sendOtp(StatusEnum::LOGIN, $user);
        // Cache::put('login_otp_'.$user->id, $otp, now()->addMinutes(5));
        // SendotpMail::dispatch($user->email, $otp);

        $token = $user->createToken(User::AUTH_TOKEN)->accessToken;

        return $this->sendResponse(['access_token' => $token, 'user' => $user->name, 'email' => $user->email, 'profile_pic' => $user->profile_pic, 'state' => $user->userState, 'id' => $user->id], 'OTP sent to your email address.');
    }

    public function setCart($userId)
    {

        \Cart::session(StatusEnum::DUMMY)->getContent()->each(function ($item) use (&$userId) {
            \Cart::session($userId)->add(array(
                'id' => $item->id,
                'name' => $item->name,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'attributes' => array(),
                'associatedModel' => Product::class
            ));
        });

        Cart::session(StatusEnum::DUMMY)->clear();
    }

    public function forgotPassword(ForgetPasswordRequest $request)
    {
        try {
            Password::sendResetLink($request->all());
            return $this->sendResponse([], 'Reset password link sent on your email id.');
        } catch (Exception $e) {
            return $this->sendError('Something went wrong, error in processing email', 406, 406);
        }
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $reset_password_status = Password::reset($request->all(), function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });

        if ($reset_password_status == Password::INVALID_TOKEN) {
            return $this->sendError(['token' => ['Invalid token.']], 400);
        }

        return $this->sendResponse([], 'Password has been reset successfully.');
    }

    public function logout(Request $request)
    {
        if (Auth::user()) {
            $user = Auth::user()->token();
            $user->revoke();

            return $this->sendResponse([], 'User logged out successfully.');
        }
        return $this->sendError(['error' => ['Invalid operation.']]);
    }

    public function verifyOtp(VerifyOtpRequest $request)
    {

        $otp = $request->get('otp_code');

        $data = Otp::where('user_id', '=', auth()->user()->id)
            ->where('code', $otp)
            ->exists();

        if (empty($data)) {
            return $this->sendError(['otp' => ['Invalid OTP Code,  Try again.']]);
        }
        //after verify OTP deleting OTP for a user
        Otp::where('user_id', '=', auth()->user()->id)
            ->where('code', $otp)->delete();

        $this->setCart(auth()->user()->id);

        return $this->sendResponse(auth()->user()->only(['name', 'profile_pic', 'email']), 'OTP Verified Successfully.');

        //        $otpTried = Otp::where('user_id', $request->user_id);
        //        if ($otp != $data) {
        //            $otpTried->increment('tried');
        //
        //            if ($otpTried->value('tried') >= 3) {
        //                $otpTried->update([
        //                    'updated_at' => Carbon::now()->addMinutes(2),
        //                    'tried' => 0,
        //                    'resend_code_limit' => DB::raw('resend_code_limit + 1'),
        //                ]);
        //                return $this->sendError('Too many attempts. Please try again in 2 minutes.');
        //            }
        //            return $this->sendError('Invalid OTP', 422);
        //        }

        //        if ($data = true) {
        //            User::where('id', '=', $request->user_id)->update(['otp_verified' => 1]);
        //            $otpTried->update(['tried' => 0,'resend_code_limit' => 0]);
        //        }
    }

    public function updateProfile(UpdateProfileRequest $request)
    {

        $data = $request->all();
        $user = Auth::user();

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        return $this->sendResponse([], 'Profile Updated Successfully.');
    }

    // verify customer email of refund
    public function verifyCustomerEmail(Request $request)
    {
        try {
            DB::beginTransaction();
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return $this->sendError(['error' => ['Invalid Email Please try again.']], 404);
            }

            $this->sendOtp(StatusEnum::REFUND, $user);
            DB::commit();
            return $this->sendResponse($user, 'OTP sent to your email address.');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError(['error' => [$e->getMessage()]], 401);
        }
    }
    //verify method

    //sent otp code to customer email
    private function sendOtp($type, $user)
    {
        $otpCode = rand(1000, 9999);
        switch ($type) {
            case StatusEnum::REFUND:
                $otp = CustomerVerification::updateOrCreate(
                    ['email' => $user->email],
                    [
                        'email' => $user->email,
                        'otp_code' => $otpCode,
                        'is_verified' => 0
                    ]
                );
                $type = "RefundVerify";
                break;

            default:
                //Deleted previous otps of user
                $user->otps()->delete();
                $otp = new Otp();
                $otp->user_id = $user->id;
                $otp->code = $otpCode;
                $otp->save();
                $type = null;
                break;
        }

        SendotpMail::dispatch($user->email, $otp, $type);

        return $otp;
    }

    public function verifyOtpCustomerEmail(VerifyOtpRequest $request)
    {
        $otp = $request->get('otp_code');

        $data = CustomerVerification::where('email', $request->email)->where('otp_code', $otp)
            ->exists();

        if (empty($data)) {
            return $this->sendError(['error' => ['Invalid OTP Code,  Try again.']]);
        }
        //after verify OTP updating CustomerVerification for a user
        CustomerVerification::where('email', $request->email)->where('otp_code', $otp)->update(['is_verified' => 1]);

        return $this->sendResponse('OTP Verified Successfully.');
    }
}
