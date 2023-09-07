<?php

namespace App\Http\Controllers\Api\ShoppingCart;

use App\Classes\StatusEnum;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\shipment\ApplyShipmentDaysRequest;
use App\Http\Requests\shipment\EstimatedDaysRequest;
use Carbon\Carbon;
use Cart;
use Exception;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\DeleteCartRequest;
use App\Http\Requests\Cart\LocalStorageItemsRequest;
use App\Http\Requests\Cart\UpdateQuantityRequest;
use App\Models\Guest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use multitypetest\model\Car;

class CartController extends BaseController
{
    private $userId;
    private $user;

    public function __construct(Request $request)
    {

        $this->user = auth('api')->user();

        if ($this->user) {
            $this->userId = $this->user->id;
        } else {

            $this->userId = StatusEnum::DUMMY;
        }
    }

    //show items of cart
    public function getItems($returnItems = false)
    {
        $items = [];

        \Cart::session($this->userId)->getContent()->each(function ($item) use (&$items) {
            $price = (int)$item->quantity * (float)$item->price;
            $item['price'] = number_format((float)$price, 2, '.', '');
            $items[] = $item;
        });

        $items['details'] = $this->cartDetails();

        if ($returnItems) {
            return $items;
        }
        return response(array('success' => true, 'data' => $items, 'message' => 'cart get items success'), 200, []);
    }

    //adding item to cart
    public function addCart(AddToCartRequest $request)
    {

        try {
            $product = Product::find($request->product_id);
            // Check if quantity is less than product quantity
            if ($request->qty > $product->quantity) {
                return response(array('error' => true, 'data' => null, 'message' => 'Product quantity is out of stock.'), 400, []);
            } else {
                $minusQtyPrd = $this->updateProduct($product, $request->qty);
            }

            Cart::session($this->userId)->add($product->id, $product->name, number_format((float)$product->price, 2, '.', '') ?? 0, $request->qty, array(), array(), $product);

            $items = $this->getItems(true);

            return response(array('success' => true, 'data' => $items, 'message' => 'Item added.'), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }

    // update product table (update quantity field)
    public function updateProduct($product, $quantity)
    {
        $totalQty = $product->quantity - $quantity;
        $updateProduct = $product->update(['quantity' => $totalQty]);

        return $updateProduct;
    }

    //delete item from cart
    public function delete(DeleteCartRequest $request)
    {
        try {

            $cart = Cart::session($this->userId);
//            $cart->getContent()->each(function ($item) {
//                $product = Product::find($item->id);
//                $product->update(['quantity' => ($item->quantity + $product->quantity)]);
//            });
            $cart = $cart->remove($request->id);

            $data = $this->getItems(true);

            return response(array('success' => true, 'data' => $data, 'message' => "cart item {$request->id} removed."), 200, []);
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
            $cart = Cart::session($this->userId);
            $cart->getContent()->each(function ($item) {
                $product = Product::find($item->id);
                $product->update(['quantity' => ($item->quantity + $product->quantity)]);
            });
            $cart->clearCartConditions();
            $clear = $cart->clear();

            return response(array('success' => true, 'data' => $clear, 'message' => "cart clear success."), 200, []);
        } catch (Exception $e) {
            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }

    //After shipping address add quantity
    public function addQtyCart(UpdateQuantityRequest $request)
    {
        try {
            $product = Product::find($request->item_id);
            $quantity = $request->qty;
            if ($request->qty < 0) {
                $quantity = $product->quantity + $request->qty;
            }

            // Check if quantity is less than product quantity
            if ($quantity > $product->quantity) {
                return response(array('error' => true, 'data' => null, 'message' => 'Product quantity is out of stock.'), 400, []);
            } else {
                $minusQtyPrd = $this->updateProduct($product, abs($request->qty));
            }
            $item = \Cart::session($this->userId)->update($request->item_id, [
                'quantity' => $quantity, // so if the current product has a quantity of 4, another 2 will be added so this will result to 6
                'associatedModel' => $product
            ]);
            $data = $this->getItems(true);

            return response(array('success' => true, 'data' => $data, 'message' => 'Quantity added in cart.'), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }

    public function estimatedDays(EstimatedDaysRequest $request)
    {

        if (isset($request->state_id) && $request->state_id == 23) {
            $data = [
                'free_shipment_amount' => [
                    'estimate_day' => Carbon::now()->addWeekdays(0)->format('l d-m-Y'),
                ],
                '2_day_shipment_amount' => [
                    'estimate_day' => Carbon::now()->addWeekdays(0)->format('l d-m-Y'),
                ],
                '1_day_shipment_amount' => [
                    'estimate_day' => Carbon::now()->addWeekdays(0)->format('l d-m-Y'),
                ],
            ];
        } else {
            $data = [
                'free_shipment_amount' => [
                    'estimate_day' => Carbon::now()->addWeekdays(5)->format('l d-m-Y'),
                ],
                '2_day_shipment_amount' => [
                    'estimate_day' => Carbon::now()->addWeekdays(2)->format('l d-m-Y'),
                ],
                '1_day_shipment_amount' => [
                    'estimate_day' => Carbon::now()->addWeekdays(1)->format('l d-m-Y'),
                ],
            ];
        }

        return $this->sendResponse($data);
    }

    //details of cart items
    protected function cartDetails()
    {

        $totalAmount = \Cart::session($this->userId)->getTotal();

        $details = [
            'total_quantity' => \Cart::session($this->userId)->getTotalQuantity(),
            'total_items' => count(\Cart::session($this->userId)->getContent()),
            'sub_total' => number_format(\Cart::session($this->userId)->getSubTotal(), 2, '.', ''),
            'total' => number_format($totalAmount, 2, '.', ''),
            'shipment_info' => $this->getShipmentAmount(true),
            'free_shipment_amount' => [
                'amount' => number_format(0, 2, '.', ''),
                'estimate_amount' => number_format((float)$totalAmount, 2, '.', ''),
                'estimate_day' => Carbon::now()->addWeekdays(5)->format('l d-m-Y'),
            ],

            '2_day_shipment_amount' => [
                'amount' => number_format(14.99, 2, '.', ''),
                'estimate_amount' => number_format((float)$totalAmount + (float)$this->getShipmentAmount(false, 2), 2, '.', ''),
                'estimate_day' => Carbon::now()->addWeekdays(2)->format('l d-m-Y'),
            ],
            '1_day_shipment_amount' => [
                'amount' => number_format(29.99, 2, '.', ''),
                'estimate_amount' => number_format((float)$totalAmount + (float)$this->getShipmentAmount(false, 1), 2, '.', ''),
                'estimate_day' => Carbon::now()->addWeekdays(1)->format('l d-m-Y'),
            ],
        ];
        return $details;
    }

    //saving local storage items to DB from frontend side
    public function storelocalStorageItems(LocalStorageItemsRequest $request)
    {
        try {

            if ($request->filled('carItems')) {
                return $this->sendError([]);
            }
            foreach ($request->cartItems as $value) {

                $product = Product::find($value['product_id']);

                // Check if quantity is less than product quantity
                if ($request->qty > $product->quantity) {
                    return response(array('error' => true, 'data' => null, 'message' => 'Product quantity is out of range.'), 400, []);
                } else {
                    $this->updateProduct($product, $value['qty']);
                }
                Cart::session($this->userId)->add($product->id, $product->name, $product->price ?? 0, $value['qty'], array(), array(), $product);
            }

            $items = $this->getItems();
            return response(array('success' => true, 'data' => $items, 'message' => 'Item added.'), 200, []);
        } catch (Exception $e) {

            return response(array('error' => true, 'data' => $e, 'message' => "Something went wrong."), 400, []);
        }
    }

    public function getShipmentAmount($oldShipmenDays = false, $days = '')
    {

        $amount = 0;

        if ($oldShipmenDays) {

            $record = [];

            $record['amount'] = $amount;
            $record['other_info'] = [
                'days' => 5,
                "estimate_day" => Carbon::now()->addWeekdays(5)->format('l d-m-Y')
            ];

            $cartConditions = Cart::session($this->userId)->getConditions('shipment_days');

            foreach ($cartConditions as $condition) {
                $amount = $condition->getValue(); // the value of the condition
                $record['amount'] = $amount;
                $record['other_info'] = $condition->getAttributes();
            }

            return $record;
        }


        $quantity = \Cart::session($this->userId)->getTotalQuantity();

        switch ($days) {
            case "1":
                $amount = 29.99;
                break;
            case "2":
                $amount = 14.99;
                break;
            default:
                $amount = 0;
        }

        return $amount * (int)$quantity;
    }

    public function applyShipment(ApplyShipmentDaysRequest $request)
    {

        $amount = $this->getShipmentAmount(false, $request->get('shipment_days'));

        $condition = new \Darryldecode\Cart\CartCondition(array(
            'name' => 'shipment_day',
            'type' => 'shipping',
            'target' => 'total', // this condition will be applied to cart's subtotal when getSubTotal() is called.
            'value' => $amount,
            'attributes' => [
                'days' => $request->get('shipment_days'),
                'estimate_day' => Carbon::now()->addWeekdays($request->get('shipment_days'))->format('l d-m-Y')
            ]
        ));

        Cart::session($this->userId)->condition($condition);

        $items = $this->getItems(true);
        return response(array('success' => true, 'data' => $items, 'message' => 'Item added.'), 200, []);
    }

    // Apply shipping for guest
    public function applyShipmentGuest(ApplyShipmentDaysRequest $request)
    {
        switch ($request->shipment_days) {
            case "1":
                $amount = 29.99;
                $days = $request->get('shipment_days');
                break;
            case "2":
                $amount = 14.99;
                $days = $request->get('shipment_days');
                break;
            default:
                $amount = 0;
                $days = 5;
        }
        $total_amount = number_format((float)$request->total_amount + (float)($amount * (int)$request->total_quantity), 2, '.', '');
        $data = [
            'shipment_amount' => $amount,
            'estimate_amount' => $total_amount,
            'estimate_days' => Carbon::now()->addWeekdays($days)->format('l d-m-Y')
        ];
        return response(array('success' => true, 'data' => $data, 'message' => 'Shipping Details.'), 200, []);
    }
}
