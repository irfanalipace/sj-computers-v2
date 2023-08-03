<?php

namespace App\Http\Controllers;

use App\Exports\ExportMarketingProduct;
use App\Exports\ExportProduct;
use http\Env\Response;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


class MarketingController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function gmarketingfeed()
    {
        return  response()->download();
    }
}
