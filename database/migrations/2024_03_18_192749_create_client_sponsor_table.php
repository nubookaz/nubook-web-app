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
        Schema::create('client_sponsor', function (Blueprint $table) {
            $table->foreignId('client_id')->constrained('users');
            $table->foreignId('sponsor_id')->constrained('users');
            $table->timestamps();
        
            $table->primary(['client_id', 'sponsor_id']);
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_sponsor');
    }
};
