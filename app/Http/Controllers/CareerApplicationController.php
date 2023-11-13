<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCareerApplicationRequest;
use App\Models\CareerApplication;
use Illuminate\Support\Facades\Mail;

class CareerApplicationController extends Controller
{
    public function store(StoreCareerApplicationRequest $request)
    {
        if ($request->hasFile('resume')) {
            $filename = $request->file('resume')->store('public/resume');
            $user['resume'] = str_replace('public/', '', $filename);
        }
        if ($request->hasFile('cover_letter')) {
            $filename = $request->file('cover_letter')->store('public/cover_letter');
            $user['cover_letter'] = str_replace('public/', '', $filename);
        }
        $careerApplication = CareerApplication::query()->create($request->all());

//        Mail::send('emails.career-email', ['data' => $careerApplication], function ($m) use ($careerApplication) {
//            $m->from(env('MAIL_FROM_ADDRESS'), config('app.name', 'APP Name'));
//            $m->to('mahnoor@99technologies.co')->subject('New CV Submission for ' . $careerApplication->job_title . ' Position ');
//        });

        return response()->json([
            'data' => $careerApplication,
            'message' => 'Success creating career application'
        ]);
    }
}
