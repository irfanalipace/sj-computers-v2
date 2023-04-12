<?php

namespace App\Http\Controllers\Api\ShoppingCart;

use App\Http\Controllers\Api\BaseController;
use Exception;
use Illuminate\Http\Request;
use Cart;
use App\Http\Requests\AddToCart;
use Illuminate\Support\Facades\Auth;

class CartController extends BaseController
{
    //show items of cart
    public function getItems()
    {
        $items = [];

        \Cart::session(Auth::user()->id)->getContent()->each(function ($item) use (&$items) {
            $items[] = $item;
        });

        return response(array('success' => true,'data' => $items,'message' => 'cart get items success' ), 200, []);
    }
    //adding item to cart
    public function addCart(AddToCart $request)
    {
        try {

            $id = rand(1, 9999);
            $item = Cart::session(Auth::user()->id)->add($id, $request->name, $request->price, $request->qty, array());

            return response(array('success' => true, 'data' => $item,'message' => 'Item added.'), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true,'data' => $e,'message' => "Something went wrong."), 400, []);
        }
    }
    //delete item from cart
    public function delete(Request $request)
    {
        try {
           $validation = validator($request->all(),[
                'id'=>'required'
             ]);
             if($validation->fails())
             {
                 return response(array('success' => false,'data' => [],'message' => $validation->errors()->first()),400,[]);
             }
            $cart = \Cart::session(Auth::user()->id)->remove($request->id);

            return response(array('success' => true,'data' => $cart,'message' => "cart item {$request->id} removed."), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true,'data' => $e,'message' => "Something went wrong."), 400, []);
        }
    }
    //show details of items
    public function details()
    {
        $userId = Auth::user()->id; // get this from session or wherever it came from

        $details = [];
        $details = [
            'total_quantity' => \Cart::session($userId)->getTotalQuantity(),
            'sub_total' => \Cart::session($userId)->getSubTotal(),
            'total' => \Cart::session($userId)->getTotal(),
        ];

        return response(array('success' => true,'data' => $details,'message' => "Get cart details success."), 200, []);
    }
}
