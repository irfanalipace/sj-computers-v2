<?php

namespace App\Http\Controllers\Api\ShoppingCart;

use App\Http\Controllers\Api\BaseController;
use Exception;
use Cart;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\DeleteCartRequest;
use App\Http\Requests\Cart\LocalStorageItemsRequest;
use App\Http\Requests\Cart\UpdateQuantityRequest;
use App\Models\Product;
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
        $items['details'] = $this->cartDetails();
        return response(array('success' => true, 'data' => $items, 'message' => 'cart get items success'), 200, []);
    }

    //adding item to cart
    public function addCart(AddToCartRequest $request)
    {
        try {
            $product = Product::find($request->product_id);

            $item = Cart::session($this->userId)->add($product->id, $product->name, $product->price ?? 0, $request->qty, array(), array(), $product);

            return response(array('success' => true, 'data' => $item, 'message' => 'Item added.'), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }


    //delete item from cart
    public function delete(DeleteCartRequest $request)
    {
        try {

            $cart = \Cart::session($this->userId)->remove($request->id);

            return response(array('success' => true, 'data' => $cart, 'message' => "cart item {$request->id} removed."), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }
    //show details of items
    public function details()
    {
        $details = $this->cartDetails();

        return response(array('success' => true, 'data' => $details, 'message' => "Get cart details success."), 200, []);
    }

    //clear cart of all items
    public function clearCart()
    {
        try {
            $clear = Cart::session($this->userId)->clear();
            return response(array('success' => true, 'data' => $clear, 'message' => "Get cart details success."), 200, []);
        } catch (Exception $e) {
            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }

    //After shipping address add quantity
    public function addQtyCart(UpdateQuantityRequest $request)
    {
        try {
            $item = Cart::session($this->userId)->update($request->item_id, array(
                'quantity' => $request->qty, // so if the current product has a quantity of 4, another 2 will be added so this will result to 6
            ),);

            return response(array('success' => true, 'data' => $item, 'message' => 'Quantity added in cart.'), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }

    //details of cart items
    protected function cartDetails()
    {
        $details = [
            'total_quantity' => \Cart::session($this->userId)->getTotalQuantity(),
            'sub_total' => \Cart::session($this->userId)->getSubTotal(),
            'total' => \Cart::session($this->userId)->getTotal(),
        ];
        return $details;
    }

    //saving local storage items to DB from frontend side
    public function storelocalStorageItems(LocalStorageItemsRequest $request)
    {
        try {
            foreach ($request->cartItems as $value) {

                $product = Product::find($value['product_id']);

                $item =  Cart::session($this->userId)->add($product->id, $product->name, $product->price ?? 0, $value['qty'], array(), array(), $product);
            }
            return response(array('success' => true, 'data' => $item, 'message' => 'Item added.'), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }
}
