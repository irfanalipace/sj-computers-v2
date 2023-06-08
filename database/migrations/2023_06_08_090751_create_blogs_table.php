<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->longText('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
            $table->longText('title')->nullable();
            $table->longText('content')->nullable();
            $table->longText('primary_keyword')->nullable();
            $table->longText('lsi')->nullable();
            $table->integer('category_id')->unsigned()->nullable()->default(null);
            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('set null');
            $table->longText('primary_image')->nullable();
            $table->longText('all_text')->nullable();
            $table->longText('thumbnail_image')->nullable();
            $table->longText('secondary_image')->nullable();
            $table->longText('tags')->nullable();
            $table->date('publish_date')->nullable();
            $table->date('draft_date')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogs');
    }
}
