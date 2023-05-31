<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportProduct implements FromCollection, WithHeadings, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Product::select("name", "price","quantity", "sku","asin")->get();
    }

    public function headings(): array
    {
        return ["Name", "Quantity", "Price", "SKU","ASIN"];
    }
}
