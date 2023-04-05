<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

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
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('password-forget', [AuthController::class, 'forgetPassword'])->name('password-forgot');
Route::post('password-reset', [AuthController::class, 'resetPassword'])->name('password-reset');
Route::post('verify-email', [AuthController::class, 'verifyEmail'])->name('verify-email');
Route::put('profile-update', [AuthController::class, 'updateProfile'])->name('profile-update');
Route::apiResource('category', CategoryController::class);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});
