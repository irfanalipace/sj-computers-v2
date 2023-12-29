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

        $generalSitemap = SitemapIndex::create();
        $pagesSitemap = Sitemap::create();
        $blogsSitemap = Sitemap::create();
        $categoriesSitemap = SitemapIndex::create();


        $generalRoutes = [
            '/sitemap/pages.xml',
            '/sitemap/categories.xml',
            '/sitemap/blogs.xml',
        ];

        foreach ($generalRoutes as $route) {
            $generalSitemap->add($route); // Use the full URL with the base
        }

        $xmlGeneralContent = $generalSitemap->render();

        $publicPath = public_path('sitemap_index.xml');
        File::makeDirectory(dirname($publicPath), 0777, true, true);
        file_put_contents($publicPath, $xmlGeneralContent);

//        $generalSitemapPath = public_path('sitemap_index.xml');
//        $xmlContent = file_get_contents($generalSitemapPath);
//        $xmlContent = str_replace(' xmlns:xhtml="http://www.w3.org/1999/xhtml"', '', $xmlContent);
//        file_put_contents($generalSitemapPath, $xmlContent);

        $pagesRoutes = [
            '/',
            '/login',
            '/about-us',
            '/contact',
            '/term_services',
            '/return_refund_policy',
            '/privacy_policy',
            '/refund-order',
            '/blogs'
        ];

        foreach ($pagesRoutes as $route) {
            $pagesSitemap->add($route);
            if ($route == '/') {
            $sitemapTags = $pagesSitemap->getTags();
            foreach ($sitemapTags as $tag) {
                $tag->setPriority(1);
                $pagesSitemap->add($tag);
            }
        }

        }




        $xmlPagesContent = $pagesSitemap->render();

        $publicPath = public_path('sitemap/pages.xml');
        File::makeDirectory(dirname($publicPath), 0777, true, true);
        file_put_contents($publicPath, $xmlPagesContent);


//        $pageSitemapPath =  public_path('sitemap/pages.xml');
//        $xmlContent = file_get_contents($pageSitemapPath);
//        $xmlContent = str_replace(' xmlns:xhtml="http://www.w3.org/1999/xhtml"', '', $xmlContent);
//        file_put_contents($pageSitemapPath, $xmlContent);


        $blogs = Blog::select('slug')
            ->where('status',Blog::PUBLISHED)
            ->get();

        foreach ($blogs as $blog) {
            $blogUrl = '/' . $blog->slug;
            $blogsSitemap->add($blogUrl);
        }

        $xmlBlogsContent = $blogsSitemap->render();

        $publicPath = public_path('sitemap/blogs.xml');
        File::makeDirectory(dirname($publicPath), 0777, true, true);
        file_put_contents($publicPath, $xmlBlogsContent);


//        $blogSitemapPath =  public_path('sitemap/blogs.xml');
//        $xmlContent = file_get_contents($blogSitemapPath);
//        $xmlContent = str_replace(' xmlns:xhtml="http://www.w3.org/1999/xhtml"', '', $xmlContent);
//        file_put_contents($blogSitemapPath, $xmlContent);

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


        foreach ($categoriesRoutes as $route) {
            $route = trim($route);
            $url =  '/sitemap/category/' . $route.'.xml';
            $categoriesSitemap->add($url);

            $categoryProductSitemap = Sitemap::create();

            $category = Category::where('slug', $route)->first();

            if(!empty($category)) {
                $productIds = CategoryProduct::where('category_id',$category->id)->pluck('product_id');

                if(!empty($productIds)){
                    $productUrls = Product::whereIn('id',$productIds)
                        ->pluck('url');


                    foreach ($productUrls as $productUrl){

                        $string = $productUrl;

                        $removedString = str_replace('https://sjcomputers.us', '', $string);
                        $categoryProductUrl = $removedString;
                        $categoryProductSitemap->add($categoryProductUrl);

                    }
                    $xmlCategoryProductContent = $categoryProductSitemap->render();
                    $publicPath = public_path('sitemap/category/'.$route.'.xml');
                    File::makeDirectory(dirname($publicPath), 0777, true, true);
                    file_put_contents($publicPath, $xmlCategoryProductContent);

//                    $categoryProductSitemapPath =  public_path('sitemap/category/'.$route.'.xml');
//                    $xmlContent = file_get_contents($categoryProductSitemapPath);
//                    $xmlContent = str_replace(' xmlns:xhtml="http://www.w3.org/1999/xhtml"', '', $xmlContent);
//                    file_put_contents($categoryProductSitemapPath, $xmlContent);
                }
            }

        }

        $xmlCategoriesContent = $categoriesSitemap->render();

        /*
         * delete old file
         */

        $publicPath = public_path('sitemap/categories.xml');
        File::makeDirectory(dirname($publicPath), 0777, true, true);
        file_put_contents($publicPath, $xmlCategoriesContent);


//        $categorySitemapPath =  public_path('sitemap/categories.xml');
//        $xmlContent = file_get_contents($categorySitemapPath);
//        $xmlContent = str_replace(' xmlns:xhtml="http://www.w3.org/1999/xhtml"', '', $xmlContent);
//        file_put_contents($categorySitemapPath, $xmlContent);

    }
}
