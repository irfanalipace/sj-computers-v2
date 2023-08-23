<?php

namespace App\Console\Commands;

use App\Models\Blog;
use App\Models\Category;
use App\Models\CategoryProduct;
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
        $baseUrl = config('app.url'); // Retrieve the base URL from the configuration

        SitemapGenerator::create($baseUrl)->getSitemap();

        $pagesSitemap = SitemapIndex::create();
        $blogsSitemap = SitemapIndex::create();
        $categoriesSitemap = SitemapIndex::create();

        $pagesRoutes = [
            '/',
            '/login',
//            '/register',
//            '/email-sent',
//            '/forget-password',
//            '/forgot_password',
           '/category.xml',

            '/cart',
//            '/checkout/{productId}',

            '/about-us',
            '/contact',
            '/blogs.xml',

            '/term_services',
            '/return_refund_policy',
            '/privacy_policy',
            '/refund-order'
        ];

        $categoriesRoutes = [
            'bto',
            'gaming_laptops',
            'gaming_desktops',
            'laptops',
            '2_in_1_laptops',
            'touch_screen',
            'windows_11',
            'windows_10',
            'chromebook',
            'xps',
            'precision',
            'latitude',
            'screen_17_inch',
            'screen_15_inch',
            'screen_14_inch',
            'screen_13_inch',
            'core_i3',
            'core_i5',
            'core_i7',
            'desktop',
            'tablet',
            'monitor',
            'not_set',
            'business_computers',
            'sff',
            'usff',
            'tower',
            'tiny',
            'mini',
        ];


        foreach ($pagesRoutes as $route) {
            $pagesSitemap->add($route); // Use the full URL with the base
        }

        $blogs = Blog::select('slug')
            ->where('status',Blog::PUBLISHED)
            ->get();

        foreach ($blogs as $blog) {
            $blogUrl = '/' . $blog->slug;
            $blogsSitemap->add($blogUrl);
        }

        foreach ($categoriesRoutes as $route) {
            $route = trim($route);
            $url =  '/category/' . $route.'xml';
            $categoriesSitemap->add($url);

            $categoryProductSitemap = SitemapIndex::create();

            $category = Category::where('slug', $route)->first();

            $productIds = CategoryProduct::where('category_id',$category->id)->limit(10)->pluck('product_id');

            $productAsins = Product::whereIn('id',$productIds)
                ->where('quantity','>',0)
                ->where('status',1)
                ->pluck('asin');

//            if(isset($productAsins[0])) {
//                $categoryProductUrl = '/products/'.$productAsins[0];
//                $categoryProductSitemap->add($categoryProductUrl);
//
//                Storage::delete('public/sitemap/categories-sitemap/category/'.$route.'.xml');
//                Storage::put('public/sitemap/categories-sitemap/category/'.$route.'.xml', $categoryProductSitemap);
//            }


            foreach ($productAsins as $productAsin){
                $categoryProductUrl = '/products/'.$productAsin;
                $categoryProductSitemap->add($categoryProductUrl);
            }

            Storage::delete('public/sitemap/categories-sitemap/category/'.$route.'.xml');
            Storage::put('public/sitemap/categories-sitemap/category/'.$route.'.xml', $categoryProductSitemap);
        }

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
