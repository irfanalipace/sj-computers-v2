<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class AddToCartRequest extends FormRequest
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
            'qty' => ['required','gt:0','lt:76'],
            'product_id' => ['required','exists:products,id'],
            'protective_plan_id' => 'nullable|exists:protective_plans,id'
        ];
    }
}
