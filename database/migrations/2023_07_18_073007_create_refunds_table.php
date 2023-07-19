<?php

use App\Classes\StatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refunds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('order_id')->constrained('orders');
            $table->enum('refund_type', [StatusEnum::PARTIAL, StatusEnum::FULL]);
            $table->text('reasons');
            $table->double('amount');
            $table->date('refund_delivery_date')->nullable();
            $table->enum('status', [StatusEnum::PENDING, StatusEnum::CANCELED, StatusEnum::APPROVED]);
            $table->softDeletes();
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
        Schema::dropIfExists('refunds');
    }
}
