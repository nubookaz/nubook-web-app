<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('street_address');
            $table->string('city');
            $table->string('state');
            $table->string('zip_code');
            $table->string('country');
            $table->unsignedBigInteger('parking_location_id')->nullable();
            $table->unsignedBigInteger('hospital_location_id')->nullable();
            $table->unsignedBigInteger('project_id'); // Added foreign key for project
            $table->unsignedBigInteger('call_sheet_id'); // Added foreign key for callSheet
            $table->timestamps();
    
            $table->foreign('parking_location_id')->references('id')->on('locations');
            $table->foreign('hospital_location_id')->references('id')->on('locations');
            $table->foreign('project_id')->references('id')->on('projects'); // Foreign key for project
            $table->foreign('call_sheet_id')->references('id')->on('call_sheets'); // Foreign key for callSheet
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
