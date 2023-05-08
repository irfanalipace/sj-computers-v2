<?php

namespace App\Http\Controllers\Api\ContactUs;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\ContactUsRequest;
use App\Jobs\SendContactMail;
use App\Models\ContactUs;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class ContactUsController extends BaseController
{
    //
    public function contactSubmit(ContactUsRequest $request)
    {
        try {
            
            DB::Transaction(function () use($request) {
                $contact = ContactUs::create(['subject_name' => $request->subject_name, 'email' => $request->email, 'message' => $request->message,'status'=>'active']); 
            
            });
            SendContactMail::dispatch($request->all());
            return $this->sendResponse([], 'Contact send successfully');
            // If we reach here, then
            // data is valid and working.
            // Commit the queries!
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError(['contact-us' => ['Something went wrong.'.$e]], 401);
        }
    }
}
