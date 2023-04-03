<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgetRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetRequest;
use App\Http\Requests\VerifyEmailRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

//use App\Providers\RouteServiceProvider;
use App\Models\User;

//use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    /**
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $input = $request->validated();
        $input['password'] = bcrypt($input['password']);
        $user = User::query()->create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['name'] = $user->name;

        return response()->json([
            "message" => "Successfully registered",
            "success" => true,
            "data" => $success
        ]);
    }

    /**
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->validated()['email'], 'password' => $request->validated()['password']])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('appToken')->accessToken;
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $success
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password',
            ], 401);
        }
    }

    /**
     * @return JsonResponse
     */
    public function forget(ForgetRequest $request): JsonResponse
    {
        $credentials = $request->validated()['email'];
        Password::sendResetLink($credentials);

        return response()->json([
            "msg" => 'Reset password link sent on your email id.'
        ]);
    }

    /**
     * @return JsonResponse
     */
    public function reset(ResetRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $reset_password_status = Password::reset($credentials, function ($user, $password) {
            $user->password = $password;
            $user->save();
        });

        if ($reset_password_status == Password::INVALID_TOKEN) {
            return response()->json([
                "msg" => "Invalid token provided"
            ], 400);
        }

        return response()->json([
            "msg" => "Password has been successfully changed"
        ]);
    }


    /**
     * @return JsonResponse
     */
    public function logout(LogoutRequest $request): JsonResponse
    {
        if (Auth::user()) {
            $user = Auth::user()->token();
            $user->revoke();

            return response()->json([
                'success' => true,
                'message' => 'Logout successfully'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unable to Logout'
            ]);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function verifyEmail(VerifyEmailRequest $request): JsonResponse
    {
        $user = User::query()
            ->where('email', $request->validated()['email'])
            ->first();

        if (!$user) {
            return response()->json([
                'message' => 'Email not found'
            ], 404);
        }
        return response()->json([
            'message' => 'email verified'
        ]);
    }
}
