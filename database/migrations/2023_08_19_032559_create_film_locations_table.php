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
        Schema::create('film_locations', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('information')->nullable();
            $table->foreignId('location_id')->constrained()->onDelete('cascade');
            $table->foreignId('parking_location_id')->nullable()->constrained('parking_locations')->onDelete('set null');
            $table->foreignId('hospital_location_id')->nullable()->constrained('hospital_locations')->onDelete('set null');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('film_locations');
    }
};
