<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiteMapController extends Controller
{

    public function generateSiteMap()
    {
        $file = public_path('sitemap/general-sitemap/general_sitemap.xml');

        return response()->file($file, [
            'Content-Type' => 'application/xml',
        ])->setStatusCode(200);
    }

    public function pageSiteMap()
    {
        $file = public_path('sitemap/pages-sitemap/pages_sitemap.xml');

        return response()->file($file, [
            'Content-Type' => 'application/xml',
        ])->setStatusCode(200);
    }
    public function blogsSiteMap()
    {
        $file = public_path('sitemap/blogs-sitemap/blogs_sitemap.xml');

        return response()->file($file, [
            'Content-Type' => 'application/xml',
        ])->setStatusCode(200);
    }
    public function categoriesSiteMap()
    {
        $file = public_path('sitemap/categories-sitemap/categories_sitemap.xml');

        return response()->file($file, [
            'Content-Type' => 'application/xml',
        ])->setStatusCode(200);
    }

    public function categoryProductSiteMap(Request $request)
    {
        $file = public_path('sitemap/categories-sitemap/category/'.$request->segment(2));

        return response()->file($file, [
            'Content-Type' => 'application/xml',
        ])->setStatusCode(200);
    }
}
