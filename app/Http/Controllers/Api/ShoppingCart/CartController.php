<?php

namespace App\Http\Controllers\Api\ShoppingCart;

use App\Http\Controllers\Api\BaseController;
use Exception;
use Illuminate\Http\Request;
use Cart;
use App\Http\Requests\AddToCartRequest;
use App\Http\Requests\DeleteCartRequest;
use Illuminate\Support\Facades\Auth;

class CartController extends BaseController
{
    private $userId;
    public function __construct()
    {
        $this->userId = (Auth::check()) ? auth()->user()->id  : 'dummy';
    }
   
    //show items of cart
    public function getItems()
    {        
        $items = [];
        
        \Cart::session($this->userId)->getContent()->each(function ($item) use (&$items) {
            $items[] = $item;
        });

        return response(array('success' => true,'data' => $items,'message' => 'cart get items success' ), 200, []);
    }
    //adding item to cart
    public function addCart(AddToCartRequest $request)
    {
        try {

            $id = rand(1, 9999);
            $item = Cart::session($this->userId)->add($id, $request->name, $request->price, $request->qty, array());

            return response(array('success' => true, 'data' => $item,'message' => 'Item added.'), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true,'data' => $e,'message' => "Something went wrong."), 400, []);
        }
    }
    //delete item from cart
    public function delete(DeleteCartRequest $request)
    {
        try {
        
            $cart = \Cart::session($this->userId)->remove($request->id);

            return response(array('success' => true,'data' => $cart,'message' => "cart item {$request->id} removed."), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true,'data' => $e,'message' => "Something went wrong."), 400, []);
        }
    }
    //show details of items
    public function details()
    {
        $userId = $this->userId; // get this from session or wherever it came from

        $details = [];
        $details = [
            'total_quantity' => \Cart::session($userId)->getTotalQuantity(),
            'sub_total' => \Cart::session($userId)->getSubTotal(),
            'total' => \Cart::session($userId)->getTotal(),
        ];

        return response(array('success' => true,'data' => $details,'message' => "Get cart details success."), 200, []);
    }

    //clear cart of all items
    public function clearCart()
    {
        try {
           $clear = Cart::session($this->userId)->clear();
            return response(array('success' => true,'data' => $clear,'message' => "Get cart details success."), 200, []);    

        } catch(Exception $e) {
            return response(array('error' => true,'data' => $e,'message' => "Something went wrong."), 400, []);
        }
        
    }
}
