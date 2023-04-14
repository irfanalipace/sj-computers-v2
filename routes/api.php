<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PayPal\PaypalController;
use App\Http\Controllers\Api\PayPal\PaypalwebhookController;
use App\Http\Controllers\Api\ShoppingCart\CartController;
use App\Http\Controllers\Api\Setting\ProfileController;


use App\Http\Controllers\Api\Auth\VerificationController;
use App\Http\Controllers\Api\StateController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserStateController;
use App\Http\Controllers\Api\Order\OrderController;

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

Route::get('states',[StateController::class,'getList'])->name('states');

Route::get('categories',[CategoryController::class,'getList'])->name('categories');

Route::get('brands',[BrandController::class,'getList'])->name('brands');

Route::get('products',[ProductController::class,'getList'])->name('brands');


/*
 * PayPal integration
 */
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



Route::middleware(['auth:api'])->group(function () {

//    Route::post('user-details', UserDetailController::class)->name('user-details');

    Route::post('verify-otp', [AuthController::class, 'verifyOtp'])->name('verify-otp');

    Route::post('logout', [AuthController::class, 'logout']);
    //update profile
    Route::post('update-profile', [ProfileController::class, 'updateProfile'])->name('updateProfile');
    Route::post('reset-password', [ProfileController::class, 'resetPassword'])->name('resetPassword');

    /*
    *Order shipping address
    */
    Route::get('get-shipping-address', [OrderController::class, 'getShippingAddress'])->name('getShippingAddress');
    Route::post('order-shipping-address', [OrderController::class, 'shippingAddress'])->name('OrderShippingAddress');
});
