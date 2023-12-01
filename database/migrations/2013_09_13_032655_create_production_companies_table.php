<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductionCompaniesTable extends Migration
{
    public function up()
    {
        Schema::create('production_companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable();
            $table->string('ein_number')->nullable();
            $table->string('job_title')->nullable();
            $table->string('number_of_employees')->nullable();
            $table->string('referral')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('production_companies');
    }
}
