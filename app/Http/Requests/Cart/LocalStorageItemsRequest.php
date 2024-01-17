<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class LocalStorageItemsRequest extends FormRequest
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
            'cartItems' => ['nullable'],
            'cartItems.*.product_id' => 'required|exists:products,id',
            'cartItems.*.qty' => 'required',
            'cartItems.*.protective_plan_id' => 'nullable|exists:protective_plans,id',
        ];
    }
}
