<?php

namespace App\Http\Requests\Product;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductReview extends FormRequest
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
            'user_id' => 'nullable|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'body' => 'required',
            'media_type' =>  'nullable|in:image,video',
            'in:image,video',
            'rating' => 'required|numeric|min:1|max:5',
            'media' => 'nullable'
        ];
    }
}
