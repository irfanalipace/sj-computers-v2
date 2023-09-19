<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\PayPal\PaypalController;
use App\Http\Controllers\Api\PayPal\PaypalwebhookController;
use App\Http\Controllers\Api\ShoppingCart\CartController;
use App\Http\Controllers\Api\Setting\ProfileController;
use App\Http\Controllers\Api\Square\SquareController;

use App\Http\Controllers\Api\Auth\VerificationController;
use App\Http\Controllers\Api\StateController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserStateController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Controllers\Api\ContactUs\ContactUsController;
use App\Http\Controllers\Api\SystemPages\SystemPagesController;
use App\Http\Controllers\Api\InventoryController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\Blog\BlogController;
use App\Http\Controllers\Api\RefundController;
use App\Http\Controllers\Api\Meta\MetaDetailController;

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

Route::get('estimated-days', [CartController::class, 'estimatedDays'])->name('estimated-days');

Route::post('verify-email', [AuthController::class, 'verifyEmail'])->name('verify-email');

Route::post('register', [AuthController::class, 'registerUser']);

Route::post('login', [AuthController::class, 'login']);

Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');

Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');


Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify'); // Make sure to keep this as your route name

Route::get('email/resend', [VerificationController::class, 'resend'])->name('verification.resend');

Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');

Route::get('states', [StateController::class, 'getList'])->name('states');

Route::get('categories', [CategoryController::class, 'getList'])->name('categories');


Route::get('brands', [BrandController::class, 'getList'])->name('brands');

Route::get('products', [ProductController::class, 'getList'])->name('products');

Route::get('inventory-data', [ProductController::class, 'getInventoryData'])->name('inventoryData');

Route::get('products-filter-list', [ProductController::class, 'getProductFilterList'])->name('getProductFilterList');



Route::get('product-detail', [ProductController::class, 'getProductDetail'])->name('productDetail');
Route::get('product-detail-asin', [ProductController::class, 'getProductDetailAsin'])->name('productDetailAsin');

/*
 * filters
 */
Route::get('search-product', [ProductController::class, 'searchProduct'])->name('searchProduct');
Route::get('category-product', [CategoryController::class, 'getCategoryProduct'])->name('getCategoryProduct');

Route::get('filter-products', [ProductController::class, 'getFilterProducts'])->name('getFilterProducts');


/*
*Add to Cart
*/
Route::get('get-items', [CartController::class, 'getItems'])->name('getItems');

Route::post('add-to-cart', [CartController::class, 'addCart'])->name('addCart');

Route::post('store-local-storage-items', [CartController::class, 'storelocalStorageItems'])->name('storelocalStorageItems');

Route::post('delete-item', [CartController::class, 'delete'])->name('deleteItem');

Route::get('get-details', [CartController::class, 'details'])->name('getItemDetail');

Route::get('clear-cart', [CartController::class, 'clearCart'])->name('clearCart');

Route::post('add-quantity-cart', [CartController::class, 'addQtyCart'])->name('addQtyCart');

Route::post('check-product-qty',[CartController::class,'checkProduct']);

/*
*Contact-us
*/
Route::post('contact-us', [ContactUsController::class, 'contactSubmit'])->name('customer-contact');

/*
 * blogs
 */
Route::get('blogs', [BlogController::class, 'getList'])->name('blogs');
Route::get('get-blogs', [BlogController::class, 'getBlog'])->name('get-blogs');
Route::get('category-blogs', [BlogController::class, 'getCategoryProduct'])->name('category-blogs');

/*
 * meta title and description
 */

Route::get('meta_detail', [MetaDetailController::class, 'getDetail'])->name('meta_detail');

/*
*Place Order
*/
Route::post('place-order', [OrderController::class, 'placeOrder'])->name('placeOrder')->middleware('auth:api');

Route::get('success-transaction', [PaypalController::class, 'successTransaction'])->name('successTransaction');

Route::get('cancel-transaction', [PaypalController::class, 'cancelTransaction'])->name('cancelTransaction');

Route::get('system-pages/{key?}', [SystemPagesController::class, 'getPages'])->name('getPages');

/*
*Square Integration
*/
Route::POST('square-charge', [SquareController::class, 'chargeCustomer'])->name('squreCharge');

/*
* Refund order
*/
Route::post('customer-email-verify', [AuthController::class, 'verifyCustomerEmail'])->name('customer-email-verify');

Route::post('customer-verify-otp', [AuthController::class, 'verifyOtpCustomerEmail'])->name('customer-verify-otp');

/*
 Apply shippment for guest
*/
Route::post('apply-shippment-guest',[CartController::class,'applyShipmentGuest']);


Route::group(['middleware' => 'refund'], function () {

    //list of orders
    Route::get('customer-orders-list', [RefundController::class, 'ordersList']);

    // details or orders
    Route::get('order-details', [RefundController::class, 'orderDetail'])->name('order-details');

    // refund submit
    Route::post('refund-submit', [RefundController::class, 'refundSubmit'])->name('refund-submit');

    // List of refund
    Route::get('customer-refund-list', [RefundController::class, 'refundList'])->name('refund-list');
});

Route::middleware(['auth:api', 'verified'])->group(function () {

    Route::post('get-inventory', [InventoryController::class, 'getInventory'])->name('getInventory');

    Route::post('action-perform', [InventoryController::class, 'ActionPerform'])->name('ActionPerform');

    //Route::post('user-details', UserDetailController::class)->name('user-details');

    Route::post('verify-otp', [AuthController::class, 'verifyOtp'])->name('verify-otp');

    Route::post('logout', [AuthController::class, 'logout']);

    /*
    *update profile
    *update password as well
    */
    Route::post('update-profile', [ProfileController::class, 'updateProfile'])->name('updateProfile');
    Route::post('change-password', [ProfileController::class, 'resetPassword'])->name('changePassword');
    Route::post('delete-profile-picture', [ProfileController::class, 'deleteProfilePic'])->name('deleteProfilePic');

    /*
    *Order shipping address
    */
    Route::get('get-shipping-address', [OrderController::class, 'getShippingAddress'])->name('getShippingAddress');
    Route::post('order-shipping-address', [OrderController::class, 'shippingAddress'])->name('OrderShippingAddress');



    /*
     * update state api
     */
    Route::post('update-state', [StateController::class, 'updateState'])->name('update-state');
    Route::get('user-state', [StateController::class, 'getState'])->name('getState');


    /*
    * PayPal integration
    */
    Route::post('paypalwebhooks', [PaypalwebhookController::class, 'webhooks'])->name('paypalwebhooks');

    Route::post('process-transaction', [PaypalController::class, 'processTransaction'])->name('processTransaction');

    /*
     * get order-record
     */
    Route::get('order-list', [OrderController::class, 'getOrders'])->name('getOrderList');
    Route::get('search-order', [OrderController::class, 'searchOrder'])->name('searchOrder');

    /*
    * Apply Shipment
    */
    Route::post('apply-shipment', [CartController::class, 'applyShipment'])->name('applyShipment');

    /*
     * place order
     */
    Route::post('place-order', [OrderController::class, 'placeOrder'])->name('placeOrder');

    /*
    * Download inventory Excel
    */
    Route::get('download-inventory', [InventoryController::class, 'downloadInventory'])->name('downloadInventory');
});
