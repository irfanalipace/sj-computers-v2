<?php

namespace App\Http\Controllers\Api\Blog;


use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Blog\GetBlogRequest;
use App\Models\Blog;
use App\Models\Brand;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BlogController extends BaseController
{
    public function getList(request $request)
    {
        $data = Blog::whereDate('publish_date', '<=', Carbon::now()->toDateString());
        return $this->sendResponse($data);
    }

    public function getBlog(GetBlogRequest $request)
    {
        try {
            $data = Blog::where('slug', $request->slug)->first();
            if ($data) {
                return $this->sendResponse($data, 'blog is displayed');
            }
            return $this->sendError([], 'Blog not found');
        } catch (\Exception $e) {
            return $this->sendError('error', $e->getMessage());
        }
    }

}
