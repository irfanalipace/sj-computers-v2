<?php

use App\Http\Controllers\Api\InventoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use Laravel\Fortify\Fortify;
use TCG\Voyager\Facades\Voyager;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm');

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
Route::get('export-inventory',[InventoryController::class,'downloadInventoryFile'])->name('export-inventory');
Route::get('/{path?}', function () {
    return view('index');
})->where('path', '^(?!api).*$')
    ->where('path', '^(?!storage).*$');

//Route::get('forgot_password', 'auth.reset_password')->name('password.reset');
Route::get('forgot_password',  function () {
    return view('index');
})->name('password.reset');

