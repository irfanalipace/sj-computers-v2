<?php

namespace App\Console\Commands;

use App\Models\Blog;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;
use function Symfony\Component\Translation\t;

class GenerateSiteMap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:site-map';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate and store site map';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
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

        $products = Product::select('asin')
            ->where('quantity','>',0)
            ->where('status',1)
            ->get();


        // Add product URLs to the sitemap
        foreach ($products as $product) {
            $productUrl = $baseUrl . '/products/' . $product->asin;
            $sitemap->add(Url::create($productUrl));
        }

        $blogs = Blog::select('slug')
            ->where('status',Blog::PUBLISHED)
            ->get();

        foreach ($blogs as $blog) {
            $blogUrl = $baseUrl . '/' . $blog->slug;
            $sitemap->add(Url::create($blogUrl));
        }

        foreach ($routes as $route) {
            $sitemap->add(Url::create($baseUrl . $route)); // Use the full URL with the base
        }

        $xmlContent = $sitemap->render();
        /*
         * delete old file
         */
        Storage::delete('public/sitemap/sitemap.xml');

        Storage::put('public/sitemap/sitemap.xml', $xmlContent);
    }
}
