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
            'source_id' => ['required'],
            'shipping_address' => ['required', 'array'],
        ];

        // If the user is a guest, add email as a required field
        if (is_null(auth('api')->user())) {

            $rules['shipping_address.email'] = ['required', 'email'];
        }

        return $rules;
    }
}
