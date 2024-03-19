<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnTypeOrderAddress extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_shipping_addresses', function (Blueprint $table) {
            $table->string('apartment')->nullable()->change();
        });

        Schema::table('user_addresses', function (Blueprint $table) {
            $table->string('apartment')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {        
        Schema::table('order_shipping_addresses', function (Blueprint $table) {
            $table->string('apartment')->change();
        });

        Schema::table('user_addresses', function (Blueprint $table) {
            $table->string('apartment')->change();
        });
    }
}
