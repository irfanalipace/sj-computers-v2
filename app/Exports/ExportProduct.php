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
        return Product::select("name", "price", "sku","asin", "category_id_1", 'category_id_2',"status")->get();
    }

    public function headings(): array
    {
        return ["Name", "Price", "SKU","ASIN", "Category 1", 'Category 2', "Image","Status"];
    }
}
