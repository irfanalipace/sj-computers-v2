<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs_categories', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('blog_id')->nullable()->constrained('blogs');
//
//            $table->integer('category_id')->unsigned()->nullable()->default(null);
//            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('set null');
//
//            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::dropIfExists('blogs_categories');
    }
}
