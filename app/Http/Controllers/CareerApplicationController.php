<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCareerApplicationRequest;
use App\Models\CareerApplication;

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

        return response()->json([
            'data' => $careerApplication,
            'message' => 'Success creating career application'
        ]);
    }
}
