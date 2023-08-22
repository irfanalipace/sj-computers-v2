<?php

namespace App\Http\Controllers;

class SiteMapController extends Controller
{

    public function generateSiteMap()
    {
        $file = public_path(). '/storage/sitemap/pages-sitemap/pages_sitemap.xml';
//        dd($file, asset('/public/storage/sitemap/pages-sitemap/pages_sitemap.xml'));

        return response()->file($file, [
            'Content-Type' => 'application/xml',
        ]);
    }
    public function generateBlogsSiteMap()
    {
        $file = public_path(). "/storage/sitemap/blogs-sitemap/blogs_sitemap.xml";

        return response()->file($file, [
            'Content-Type' => 'application/xml',
        ]);
    }
    public function generateCategoriesSiteMap()
    {
        $file = public_path(). "/storage/sitemap/categories-sitemap/categories_sitemap.xml";

        return response()->file($file, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
