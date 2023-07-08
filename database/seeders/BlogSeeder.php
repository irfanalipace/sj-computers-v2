<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = Category::first(); // Retrieve the first category record

        Blog::create(
            [
                'meta_title' => 'product',
                'meta_description' => 'electronic product',
                'title' => 'computer',
                'content' => 'nothing',
                'primary_keyword' => 'product, electronic, computer',
                'lsi' => 'product is empty',
                'category_id' => $category ? $category->id : null, // Assign category ID if it exists, otherwise set as null
                'primary_image' => 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.britannica.com%2Ftechnology%2Fcomputer&psig=AOvVaw14mJVbNojFRzFyyXmQ1265&ust=1687243366886000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJjfjcHdzv8CFQAAAAAdAAAAABAI',
                'all_text' => 'here is all electronics products',
                'thumbnail_image' => 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fe0.pxfuel.com%2Fwallpapers%2F488%2F96%2Fdesktop-wallpaper-background-thumbnail-gaming-thumbnail-background-good-thumbnail-background-and-youtube-thumbnail-background.jpg&tbnid=yUSnebGe3QsDqM&vet=12ahUKEwjipsqM3s7_AhXjKrcAHeY6CAwQMygoegUIARDGAg..i&imgrefurl=https%3A%2F%2Fwww.pxfuel.com%2Fen%2Fdesktop-wallpaper-xwjxi&docid=OjheeAHnEul2TM&w=850&h=453&q=thumbnail%20image&hl=en&ved=2ahUKEwjipsqM3s7_AhXjKrcAHeY6CAwQMygoegUIARDGAg',
                'secondary_image' => 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.dell.com%2Fis%2Fimage%2FDellContent%2Fcontent%2Fdam%2Fss2%2Fproduct-images%2Fpage%2Fcategory%2Fdesktop%2Fdbcs-255750-aio-desktop-optiplex-7410-keyboard-mouse-km7321w-inspiron-27-7710-km5221w-800x620.png%3Ffmt%3Dpng-alpha%26wid%3D800%26hei%3D620&tbnid=_XYt6WZnH0uosM&vet=12ahUKEwjDlcS93c7_AhXXmycCHboxBg0QMygNegUIARD5AQ..i&imgrefurl=https%3A%2F%2Fwww.dell.com%2Fen-us%2Fshop%2Fdesktop-computers%2Fsc%2Fdesktops&docid=eKcN7V2pOa4QTM&w=800&h=620&itg=1&q=computer&ved=2ahUKEwjDlcS93c7_AhXXmycCHboxBg0QMygNegUIARD5AQ',
                'tags' => 'products, computer, laptop, systems',
                'publish_date' => '2023-06-19 06:27:58',
                'draft_date' => '2023-06-19 06:27:58',
                'status' => 'active'
            ]
        );
    }
}
