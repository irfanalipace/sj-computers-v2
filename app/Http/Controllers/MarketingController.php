<?php

namespace App\Http\Controllers;

use App\Exports\ExportMarketingProduct;
use App\Exports\ExportProduct;
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

        $export = new ExportMarketingProduct();
        $now = now();
        $now = str_replace(array(":", "-", ' '), "", $now);
        $filename = 'Inventory_' . $now . '.xlsx';

        Excel::store($export, $filename, 'public');

        $path = public_path('storage/' . $filename);

        return response()->download($path, 'products_list.xlsx', [
            'Content-Type' => 'application/vnd.ms-excel',
            'Content-Disposition' => "attachment; filename='products_list.xls'"
        ])->deleteFileAfterSend(true);
    }
}
