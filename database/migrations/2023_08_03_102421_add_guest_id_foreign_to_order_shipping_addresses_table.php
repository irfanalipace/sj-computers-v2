<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGuestIdForeignToOrderShippingAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_shipping_addresses', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->change();
            $table->string('email')->after('phone_number')->nullable();
            $table->foreignId('guest_id')->nullable()->constrained('guests');
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
            $table -> dropColumn("guest_id");
            $table -> dropForeign("guest_id");
        });
    }
}
