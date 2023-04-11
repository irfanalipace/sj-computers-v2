<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Dropdowns\StateController;
use App\Http\Controllers\Api\UserDetail\UserDetailController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\VerificationController;

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
Route::post('verify-email', [AuthController::class, 'verifyEmail'])->name('verify-email');

Route::post('register', [AuthController::class, 'registerUser']);

Route::post('login', [AuthController::class, 'login']);

Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');

Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('reset-password');

Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify'); // Make sure to keep this as your route name

Route::get('email/resend', [VerificationController::class, 'resend'])->name('verification.resend');

Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');


Route::middleware(['auth:api', 'verified'])->group(function () {
    Route::get('states', StateController::class)->name('states');
    Route::post('user-details', UserDetailController::class)->name('user-details');
    Route::post('verify-otp', [AuthController::class, 'verifyOtp'])->name('verify-otp');

    /*
     * profile apis
     */
    Route::put('profile-update', [AuthController::class, 'updateProfile'])->name('profile-update');
});
