<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PayPal\PaypalController;
use App\Http\Controllers\Api\PayPal\PaypalwebhookController;
use App\Http\Controllers\Api\ShoppingCart\CartController;
use App\Http\Controllers\Api\Setting\ProfileController;


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

Route::get('test', [AuthController::class, 'test']);
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('password-forget', [AuthController::class, 'forgetPassword'])->name('password-forgot');
Route::post('password-reset', [AuthController::class, 'resetPassword'])->name('password-reset');
Route::post('verify-email', [AuthController::class, 'verifyEmail'])->name('verify-email');
Route::put('profile-update', [AuthController::class, 'updateProfile'])->name('profile-update');

//Paypal Integration 
Route::post('paypalwebhooks', [PaypalwebhookController::class, 'webhooks'])->name('paypalwebhooks');
Route::post('process-transaction', [PaypalController::class, 'processTransaction'])->name('processTransaction');
Route::get('success-transaction', [PaypalController::class, 'successTransaction'])->name('successTransaction');
Route::post('cancel-transaction', [PaypalController::class, 'cancelTransaction'])->name('cancelTransaction');

//Add to Cart
 Route::get('get-items', [CartController::class, 'getItems'])->name('getItems');
 Route::post('add-to-cart', [CartController::class, 'addCart'])->name('addCart');
 Route::post('delete-item', [CartController::class, 'delete'])->name('deleteItem');
 Route::get('get-details', [CartController::class, 'details'])->name('getItems');
 Route::get('clear-cart', [CartController::class, 'clearCart'])->name('clearCart');

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    //update profile
    Route::post('update-profile', [ProfileController::class, 'updateProfile'])->name('updateProfile');
    Route::post('reset-password', [ProfileController::class, 'resetPassword'])->name('resetPassword');
});
