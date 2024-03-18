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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // Add user_id column
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('media_path', 2048);
            $table->string('media_type');
            $table->bigInteger('size');  
            $table->json('dimensions')->nullable(); 
            $table->boolean('ai_generated')->default(false);
            $table->string('format')->nullable(); 
            $table->integer('duration')->nullable(); 
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
