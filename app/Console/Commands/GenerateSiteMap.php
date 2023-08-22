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
use Spatie\Sitemap\SitemapIndex;

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
        $urlsetAttributes = [
            'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9',
            'xmlns:xhtml' => 'http://www.w3.org/1999/xhtml',
            'xmlns:image' => 'http://www.google.com/schemas/sitemap-image/1.1',
            'xmlns:video' => 'http://www.google.com/schemas/sitemap-video/1.1',
        ];


        $baseUrl = config('app.url'); // Retrieve the base URL from the configuration

        SitemapGenerator::create($baseUrl)->getSitemap();

        $pagesSitemap = Sitemap::create();
        $blogsSitemap = Sitemap::create();
        $categoriesSitemap = Sitemap::create();

        $pagesRoutes = [
            '/',
            '/login',
            '/register',
            '/email-sent',
            '/forget-password',
            '/forgot_password',
//            '/products/{productId}',
//            '/products/search',
//            '/category/{categorySlug}',
//            '/account',
//            '/account/profile',
//            '/account/update-address',
//            '/account/update-password',
//            '/account/orders',
            '/cart',
            '/checkout/{productId}',
            '/privacy_policy',
//            '/shipping_policy',
//            '/blog',
//            '/blog-page',
            '/about-us',
//            '/what-we-do',
//            '/return_refund_policy',
            '/term_services',
//            '/checkout',
//            '/contact',
//            '/success-transaction',
//            '/thank-you',
//            '/test',
//            '/sku',
        ];

        $categoriesRoutes = [
            '/bto',
            '/gaming_laptops',
            '/gaming_desktops',
            '/laptops',
            '/2_in_1_laptops',
            '/touch_screen',
            '/windows_11',
            'windows_10',
            '/chromebook',
            '/xps',
            '/precision',
            '/latitude',
            '/screen_17_inch',
            '/screen_15_inch',
            '/screen_14_inch',
            '/screen_13_inch',
            '/core_i3',
            '/core_i5',
            '/core_i7',
            '/desktop',
            '/tablet',
            '/monitor',
            '/not_set',
            '/business_computers',
            '/sff',
            '/usff',
            '/tower',
            '/tiny',
            '/mini',
        ];


        foreach ($pagesRoutes as $route) {
            $pagesSitemap->add(Url::create($baseUrl . $route)); // Use the full URL with the base
        }

        $blogs = Blog::select('slug')
            ->where('status',Blog::PUBLISHED)
            ->get();

        foreach ($blogs as $blog) {
            $blogUrl = $baseUrl . '/' . $blog->slug;
            $blogsSitemap->add(Url::create($blogUrl));
        }

        foreach ($categoriesRoutes as $route) {
            $categoriesSitemap->add(Url::create($baseUrl . '/category' . $route)); // Use the full URL with the base
        }

//        $products = Product::select('asin')
//            ->where('quantity','>',0)
//            ->where('status',1)
//            ->get();
//
//        // Add product URLs to the sitemap
//        foreach ($products as $product) {
//            $productUrl = $baseUrl . '/products/' . $product->asin;
//            $sitemap->add(Url::create($productUrl));
//        }

        $xmlPagesContent = $pagesSitemap->render();
        $xmlBlogsContent = $blogsSitemap->render();
        $xmlCategoriesContent = $categoriesSitemap->render();

        /*
         * delete old file
         */
        Storage::delete('public/sitemap/pages-sitemap/pages_sitemap.xml');
        Storage::put('public/sitemap/pages-sitemap/pages_sitemap.xml', $xmlPagesContent);

        Storage::delete('public/sitemap/blogs-sitemap/blogs_sitemap.xml');
        Storage::put('public/sitemap/blogs-sitemap/blogs_sitemap.xml', $xmlBlogsContent);

        Storage::delete('public/sitemap/categories-sitemap/categories_sitemap.xml');
        Storage::put('public/sitemap/categories-sitemap/categories_sitemap.xml', $xmlCategoriesContent);
    }
}
