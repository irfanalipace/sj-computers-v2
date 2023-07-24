<?php

namespace App\Http\Requests\Refund;

use Illuminate\Foundation\Http\FormRequest;

class RefundSubmit extends FormRequest
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
        return [
            'user_id' => 'required|exists:users,id',
            'orders.*.order_id' => 'required|integer|exists:orders,id', // Validate each 'order_id' within the 'orders' array
            'orders.*.refund_type' => 'required|in:partial,full', // Validate 'refund_type' for each order
            'orders.*.reasons' => 'required|string', // Validate 'reasons' for each order
            'orders.*.amount' => 'nullable|numeric|gt:0' // Validate 'amount' for each order
        ];
    }
}
