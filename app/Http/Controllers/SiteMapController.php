<?php

namespace App\Http\Controllers;

use App\Exports\ExportProduct;
use App\Models\Blog;
use App\Models\Product;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;

class SiteMapController extends Controller
{

    public function generateSiteMap()
    {
        $file = public_path(). "/storage/sitemap/sitemap.xml";

        $headers = [
            'Content-Type' => 'application/xml',
            'Content-Disposition' => 'attachment; filename="sitemap.xml"',
        ];

        return response()->download($file, 'sitemap.xml', $headers);
    }
}
