<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCareerRequest;
use App\Models\Career;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            'data' => Career::query()->get(),
            'message' => 'Success fetching careers'
        ]);
    }
}
