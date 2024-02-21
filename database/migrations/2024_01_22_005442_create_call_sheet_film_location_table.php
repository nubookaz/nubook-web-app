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
        Schema::create('call_sheet_film_location', function (Blueprint $table) {
            $table->id();
            $table->foreignId('call_sheet_id')->constrained()->onDelete('cascade');
            $table->foreignId('film_location_id')->constrained()->onDelete('cascade');
            // If you need a composite primary key, uncomment the line below
            // $table->primary(['call_sheet_id', 'film_location_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('call_sheet_film_location');
    }
};
