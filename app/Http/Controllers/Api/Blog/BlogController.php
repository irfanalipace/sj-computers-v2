<?php

namespace App\Http\Controllers\Api\Blog;


use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Blog\GetBlogRequest;
use App\Http\Requests\Category\CategoryProductRequest;
use App\Models\Blog;
use App\Models\Brand;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogController extends BaseController
{
    public function getList(request $request)
    {
        $perPage = $request->per_page ?? 12;
        $records = Blog::whereDate('publish_date', '<=', Carbon::now()->toDateString())
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        $records->getCollection()->transform(function ($record) {
            $record['primary_image'] = is_null($record['primary_image']) ? $record['primary_image'] : config('app.url') . '/storage/' . $record['primary_image'];
            $record['thumbnail_image'] = is_null($record['thumbnail_image']) ? $record['thumbnail_image'] : config('app.url') . '/storage/' . $record['thumbnail_image'];
            $record['secondary_image'] = is_null($record['secondary_image']) ? $record['secondary_image'] : config('app.url') . '/storage/' . $record['secondary_image'];
            return $record;
        });

        return $this->sendResponse($records);
    }

    public function getBlog(GetBlogRequest $request)
    {
        try {
            $record = Blog::where('slug', $request->slug)->first();
            if ($record) {
                $record['primary_image'] = is_null($record['primary_image']) ? $record['primary_image'] : config('app.url') . '/storage/' . $record['primary_image'];
                $record['thumbnail_image'] = is_null($record['thumbnail_image']) ? $record['thumbnail_image'] : config('app.url') . '/storage/' . $record['thumbnail_image'];
                $record['secondary_image'] = is_null($record['secondary_image']) ? $record['secondary_image'] : config('app.url') . '/storage/' . $record['secondary_image'];


                return $this->sendResponse($record, 'blog is displayed');
            }
            return $this->sendError([], 'Blog not found');
        } catch (\Exception $e) {
            return $this->sendError('error', $e->getMessage());
        }
    }

    public function getCategoryProduct(Request $request)
    {
        try {
            $perPage = $request->per_page ?? 12;

            $category = Category::where('id', $request->category_id)->with('blogs')->first();
            $blogs = $category->blogs()->paginate($perPage);

            $blogs->map(function ($record) {

                $record['primary_image'] = is_null($record['primary_image']) ? $record['primary_image'] : config('app.url') . '/storage/' . $record['primary_image'];
                $record['thumbnail_image'] = is_null($record['thumbnail_image']) ? $record['thumbnail_image'] : config('app.url') . '/storage/' . $record['thumbnail_image'];
                $record['secondary_image'] = is_null($record['secondary_image']) ? $record['secondary_image'] : config('app.url') . '/storage/' . $record['secondary_image'];
                return $record;
            });

            return $this->sendResponse($blogs, 'Blogs are displayed');
        } catch (\Exception $e) {
            return $this->sendError('error', $e->getMessage());
        }
    }
}
