<?php

namespace App\Http\Requests\Square;

use Illuminate\Foundation\Http\FormRequest;

class CardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'payment_type' => 'required','in:SQUARE,PAYPAL',
            'source_id' => 'required_if:payment_type,SQUARE',
            'shipping_address' => ['required', 'array'],
            'shipping_address.email' => 'required|email',
            'shipping_address.country' => 'required',
            'shipping_address.full_name' => 'required|max:50',
            'shipping_address.phone_number' => 'required',
            'shipping_address.address' => 'required',
            'shipping_address.city' => 'required',
            'shipping_address.state' => 'required',
            'shipping_address.apartment' => 'nullable',
            'shipping_address.zip_code' => 'required',
            'shipping_address.permanent_address' => 'nullable|in:true,false'
        ];

        // If the user is a guest, add email as a required field
        if (is_null(auth('api')->user())) {
            $rules = [
                'shipping_address.email' => 'required|email',
                'shipping_address.country' => 'required',
                'shipping_address.full_name' => 'required|max:50',
                'shipping_address.phone_number' => 'required',
                'shipping_address.address' => 'required',
                'shipping_address.city' => 'required',
                'shipping_address.state' => 'required',
                'shipping_address.apartment' => 'nullable',
                'shipping_address.zip_code' => 'required',
                'is_guest' => 'required|boolean',
                'cart_items' => 'required|array',
                'cart_items.*.product_id' => 'required',
                'cart_items.*.qty' => 'required|gt:0|lt:31',
                'details' => 'required|array',
                'details.total' => 'required|gt:0',
                'details.sub_total' => 'required|gt:0',
                'details.total_items' => 'required|gt:0',
                'details.total_quantity' => 'required|gt:0',
                'details.shipment_amount' => 'required',
                'details.estimate_days' => 'required',
                'is_buy_now' => 'nullable|in:true,false',
                "cart_id" => 'required_if:is_buy_now,true'
            ];
        }

        return $rules;
    }
}
