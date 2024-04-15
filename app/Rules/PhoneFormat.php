<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PhoneFormat implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        // Define the regular expression pattern to match the phone number format
        $pattern = "/^\(\d{3}\) \d{3}-\d{4}$/";

        // Check if the value matches the pattern
        if (!preg_match($pattern, $value)) {
            return false;
        }

        // Check if the phone number has exactly 10 digits
        $digits = preg_replace("/[^0-9]/", "", $value);
        return strlen($digits) === 10;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The phone number must be in the format (xxx) xxx-xxxx and contain exactly 10 digits.';
    }
}
