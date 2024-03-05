<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryRequest extends FormRequest
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
            'category' => 'required|in:budget-friendly,workstation,professional-laptop,touch-screen,top-rated-product',
            'per_page' => 'nullable|gt:0',
            'filter' => 'nullable|array',
        ];
    }
}
