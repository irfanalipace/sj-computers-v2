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

    public function generateXML()
    {
        $baseUrl = config('app.url'); // Retrieve the base URL from the configuration

        SitemapGenerator::create($baseUrl)->getSitemap();

        $sitemap = Sitemap::create();

        $routes = [
            '/',
            '/login',
            '/register',
            '/email-sent',
            '/forget-password',
            '/forgot_password',
            '/products/{productId}',
            '/products/search',
            '/category/{categorySlug}',
            '/account',
            '/account/profile',
            '/account/update-address',
            '/account/update-password',
            '/account/orders',
            '/cart',
            '/checkout/{productId}',
            '/privacy_policy',
            '/shipping_policy',
            '/blog',
            '/blog-page',
            '/about-us',
            '/what-we-do',
            '/return_refund_policy',
            '/term_services',
            '/checkout',
            '/contact',
            '/success-transaction',
            '/thank-you',
            '/test',
            '/sku',
        ];

        $products = Product::all();
        $productAsins = $products->pluck('asin');

        // Add product URLs to the sitemap
        foreach ($productAsins as $asin) {
            $productUrl = $baseUrl . '/products/' . $asin;
            $sitemap->add(Url::create($productUrl));
        }

        $blogs = Blog::all();
        $blogsSlugs = $blogs->pluck('slug');

        foreach ($blogsSlugs as $slug) {
            $blogUrl = $baseUrl . '/' . $slug;
            $sitemap->add(Url::create($blogUrl));
        }

        foreach ($routes as $route) {
            $sitemap->add(Url::create($baseUrl . $route)); // Use the full URL with the base
        }

        $xmlContent = $sitemap->render();

        // Generate a temporary file path
        $tempFilePath = storage_path('app/sitemap.xml');

        // Write the XML content to the temporary file
        File::put($tempFilePath, $xmlContent);

        $headers = [
            'Content-Type' => 'application/xml',
            'Content-Disposition' => 'attachment; filename="sitemap.xml"',
        ];

        return Response::download($tempFilePath, 'sitemap.xml', $headers)->deleteFileAfterSend();
    }

}
