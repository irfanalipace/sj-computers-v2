<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateColumnsToCareersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('careers', function (Blueprint $table) {
            $table->longText('job_title')->change();
            $table->longText('job_description')->change();
            $table->longText('job_requirements')->change();
            $table->longText('primary_worksite')->change();
            $table->longText('work_hours')->change();
            $table->longText('salary')->change();
            $table->longText('applications')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('careers', function (Blueprint $table) {
            //
        });
    }
}
