<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCareerApplicationRequest;
use App\Mail\CareerApplicationMail;
use App\Mail\LoginOtpMail;
use App\Models\CareerApplication;
use Illuminate\Support\Facades\Mail;

class CareerApplicationController extends Controller
{
    public function store(StoreCareerApplicationRequest $request)
    {
        if ($request->hasFile('resume')) {
            $filename = $request->file('resume')->store('public/resume');
            $user['file']['resume'] = str_replace('public/', '', $filename);
        }
        if ($request->hasFile('cover_letter')) {
            $filename = $request->file('cover_letter')->store('public/cover_letter');
            $user['file']['cover_letter'] = str_replace('public/', '', $filename);
        }

        $careerApplication = CareerApplication::query()->create($request->all());
        Mail::to(['99tech.ai@gmail.com', 'joe@sjcomputersmn.com'])->send(new CareerApplicationMail($careerApplication->job_title));

        return response()->json([
            'data' => $careerApplication,
            'message' => 'Success creating career application'
        ]);
    }
}
