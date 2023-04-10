<?php

namespace App\Http\Controllers\Api\Dropdowns;

use App\Http\Controllers\Api\BaseController;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class StateController extends BaseController
{
    /**
     * @return JsonResponse
     */
    public function __invoke()
    {
        $state = Category::query()->get();
        return $this->sendResponse($state);
    }
}
