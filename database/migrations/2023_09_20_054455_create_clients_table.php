<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company_email');
            $table->unsignedBigInteger('address_id')->nullable();
            $table->timestamps();

            $table->foreign('address_id')->references('id')->on('addresses');
        });
    }

    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
