<?php

use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Controllers\MarketingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use Laravel\Fortify\Fortify;
use TCG\Voyager\Facades\Voyager;
use App\Http\Controllers\HoldRelease\HoldReleaseController;
use App\Http\Controllers\SiteMapController;

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


//Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm');

Route::get('hold-release-product',[HoldReleaseController::class,'updateRecord'])->name('hold-release-product');

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
Route::get('export-inventory',[InventoryController::class,'downloadInventoryFile'])->name('export-inventory');

Route::get('gmarketingfeed',[MarketingController::class,'gmarketingfeed'])->name('gmarketingfeed');

Route::get('order-show-detail/{id}',[OrderController::class,'showOrderDetail'])->name('order-show-detail');

//Route::get('sitemap/index.xml', [SiteMapController::class, 'generateSiteMap']);
//Route::get('sitemap_pages.xml', [SiteMapController::class, 'pageSiteMap']);
//Route::get('sitemap_blogs.xml', [SiteMapController::class, 'blogsSiteMap']);
//Route::get('sitemap_categories.xml', [SiteMapController::class, 'categoriesSiteMap']);
//Route::get('category/{sitemap_?}.xml', [SiteMapController::class, 'categoryProductSiteMap']);

Route::get('/{path?}', function () {
    return view('index');
})->where('path', '^(?!api).*$')
    ->where('path', '^(?!storage).*$');




