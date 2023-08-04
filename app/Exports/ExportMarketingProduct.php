<?php

namespace App\Exports;

use App\Models\CategoryProduct;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportMarketingProduct implements FromCollection, WithHeadings, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $products =  Product::with('brand')->select("created_at","quantity","id", "name", "description", "price", "asin", "image", "brand_id")
            ->where('quantity','>',0)
            ->where('status',1)
            ->get();

        $data = [];
        foreach($products as $key => $product){
            $dummyData = [];

            $desc = '';

            $bulletPoints =  $product->description->bullet_point ?? [];

            foreach ($bulletPoints as $bulletPoint){
                $desc .= $bulletPoint->value;
            }

            $dummyData['id']    =   $key + 1;
            $dummyData['title']    =   "Refurbished ".$product->name;
            $dummyData['description']    =   empty($desc) ? $product->name : $desc;
            $dummyData['brand']    =   ucfirst($product->brand->name) ?? '';
            $dummyData['condition']    =   "refurbished";
            $dummyData['price']    =   $product->price." USD";
            $dummyData['sale_price']    =   $product->price." USD";
            $dummyData['availability']    =   "In stock";
            $dummyData['availability_date']    =   $product->created_at->format('Y-d-m')."T".$product->created_at->format('H:m')."+0100";
            $dummyData['quantity']    =   $product->quantity;
            $dummyData['link']    =   "https://sjcomputers.us/products/".$product->asin;
            $dummyData['image_link']    =   $product->image[0] ?? '';
            $dummyData['additional_image_link']    =   implode(',', $product->image);
            $dummyData['google_product_category']    =  "Electronics > Computers > ".$this->getType($product->id);
            $dummyData['identifier_exists']    =   "no";
            $dummyData['shipping_weight']    =   "10 kg";

            $data[] = $dummyData;
        }

        return collect($data);
    }

    public function getType($productId){

        $categoryProduct = CategoryProduct::where('product_id',$productId)->first();

        if(empty($categoryProduct)){
            return "Laptops";
        }

        $categoryName = $categoryProduct->category->slug ?? 'sluger';

        $desktopCat = ["gaming_desktops", "desktop", "monitor", "business_computers"];

        if(in_array($categoryName,$desktopCat)){
            return "Desktop Computers";
        }

        return "Laptops";

    }

    public function headings(): array
    {
        return ["id", "title","description", "brand", "condition", "price", "sale_price",
            "availability", "availability_date", "quantity", "link", "image_link", "additional_image_link",
            "google_product_category", "identifier_exists", "weight"];
    }
}
