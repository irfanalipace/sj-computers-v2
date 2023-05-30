<?php

namespace App\Http\Controllers\HoldRelease;

use App\Classes\StatusEnum;
use App\Http\Controllers\Controller;
use App\Models\HoldReleaseUser;
use App\Traits\Amazon\AmazonTrait;
use Illuminate\Http\Request;

class HoldReleaseController extends Controller
{
    use AmazonTrait;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function updateRecord(Request $request)
    {
        $holdRelease = HoldReleaseUser::where('id',$request->id)->first();

        if($holdRelease->status == StatusEnum::RELEASE){
            return redirect()->back()->with(['message' => "Product is already Released", 'alert-type' => 'error']);
        }

        $inventory = $this->getAmazonInventory($holdRelease->product->id);


        if ($inventory['status']) {

            $this->updateAmazonInventory($inventory, $holdRelease->quantity, StatusEnum::RELEASE,false);

            $holdRelease->status = StatusEnum::RELEASE;
            $holdRelease->save();

            return redirect()->back()->with(['message' => "Product is Released", 'alert-type' => 'success']);

        }

    }
}
