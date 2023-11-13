<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCareerApplicationRequest extends FormRequest
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
            'career_id' => ['required', 'integer', 'exists:careers,id'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc,dns',],
            'resume' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:204800'],
            'cover_letter' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:204800'],
        ];
    }
}
