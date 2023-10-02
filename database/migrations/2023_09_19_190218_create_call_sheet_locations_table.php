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
        Schema::create('call_sheet_locations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('call_sheet_id');
            $table->unsignedBigInteger('location_id');
            $table->timestamps();
        
            $table->foreign('call_sheet_id')->references('id')->on('call_sheets')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('call_sheet_locations');
    }
};
