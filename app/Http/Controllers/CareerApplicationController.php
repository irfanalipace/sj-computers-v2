<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCareerApplicationRequest;
use App\Mail\CareerApplicationMail;
use App\Mail\LoginOtpMail;
use App\Models\Career;
use App\Models\CareerApplication;
use Illuminate\Support\Facades\Mail;

class CareerApplicationController extends Controller
{
    public function store(StoreCareerApplicationRequest $request)
    {
        if ($request->hasFile('resume')) {
            $user['resume'] = $request->file('resume')->storeAs('careers/resumes', time() . '_' . $request->resume->getClientOriginalName());
        }
        if ($request->hasFile('cover_letter')) {
            $user['cover_letter'] = $request->file('cover_letter')->storeAs('careers/cover_letters', time() . '_' . $request->cover_letter->getClientOriginalName());
        }

        $careerApplication = CareerApplication::query()->create($request->all());
        $files = [
            storage_path('app/' . $user['resume']),
            storage_path('app/' . $user['cover_letter']),
        ];

        $career = Career::find($request->get('career_id'));

        Mail::to(['99tech.ai@gmail.com', 'joe@sjcomputersmn.com'])->send(new CareerApplicationMail($career->job_title, $files));

        return response()->json([
            'data' => $careerApplication,
            'message' => 'Success creating career application'
        ]);
    }
}
