<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ForgetRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends BaseController
{
    /**
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        $user = User::query()
            ->create(array_merge($validatedData,
                ['password' => bcrypt($validatedData['password'])]));

        $token = $user->createToken('authToken')->accessToken;
        event(new Registered($user));

        return $this->sendResponse($token, 'User registered successfully.');
    }

    public function login(LoginRequest $request): JsonResponse
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
        $token = $user->createToken('authToken')->accessToken;

        return $this->sendResponse(['access_token' => $token], 'User logged in successfully.');
    }


    public function forget(ForgetRequest $request)
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


    public function reset(ResetPassword $request)
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

    public function updateProfile(Request $request)
    {

        $user = Auth::user();

        $validator = $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|unique:users,email,' . $user->id,
            'password' => 'string|min:8|confirmed'
        ]);

        if (isset($validator['password'])) {
            $validator['password'] = bcrypt($validator['password']);
        }

        $user->update($validator);

        return $this->sendResponse([], 'Profile Updated Successfully.');
    }

    public function test()
    {
        dd('test');
    }

}
