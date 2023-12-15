<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreShippingAddressRequest extends FormRequest
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
            'country'=> ['required', 'string'],
            'full_name'=> ['required', 'string','max:50'],
            'phone_number'=> ['required', 'string'],
            'address'=> ['required', 'string'],
            'city'=> ['required', 'string'],
            'state'=> ['required', 'string'],
            'apartment' => ['required', 'string'],
            'zip_code'=> ['required', 'string'],
            'permanent_address' => ['required','boolean']
        ];
    }
}
