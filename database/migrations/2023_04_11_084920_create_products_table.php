<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->longText('name')->nullable();
            $table->longText('description')->nullable();
            $table->double('price')->nullable();

            $table->string('asin')->nullable();
            $table->string('sku')->nullable();
            $table->integer('quantity')->nullable();

            $table->integer('category_id_1')->nullable();
            $table->integer('category_id_2')->nullable();
            $table->foreignId('brand_id')->nullable()->constrained();

            $table->longText('others')->nullable();
            $table->longText('image')->nullable();
            $table->boolean('status')->default(false);

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
        Schema::dropIfExists('products');
    }
}
