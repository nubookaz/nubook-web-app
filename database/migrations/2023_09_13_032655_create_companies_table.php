<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Add foreign key to users table
            $table->string('name')->nullable();
            $table->string('ein')->nullable(); // Employer Identification Number, optional
            $table->string('job_title')->nullable();
            $table->string('number_of_employees')->nullable();
            $table->string('referral')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
