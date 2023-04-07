<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;

//use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
 * Auth Apis
 */
Route::post('register', [AuthController::class, 'registerUser']);

Route::post('login', [AuthController::class, 'login']);

Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');

Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('reset-password');

Route::post('verify-email', [AuthController::class, 'verifyEmail'])->name('verify-email');


Route::middleware('auth:api')->group(function () {
    /*
     * Auth Apis
    */
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('verify-otp',[AuthController::class, 'verifyOtp'])->name('verify-otp');

    /*
     * profile apis
     */
    Route::put('profile-update', [AuthController::class, 'updateProfile'])->name('profile-update');
});
