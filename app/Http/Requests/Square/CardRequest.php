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
        return [
            'card_brand' => ['required',],
            'card_holder_name' => ['required',],
            'card_bin' => ['required',],
            'card_last_4' => ['required',],
            'card_expiry_month' => ['required',],
            'card_expiry_year' => ['required',],
            'card_type' => ['required',],
            'card_CVV' => ['required',],
        ];
    }
}
