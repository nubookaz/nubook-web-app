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
        Schema::create('call_sheet_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('call_sheet_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->time('call_time')->nullable();
            $table->string('position')->nullable()->default(null);
            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('roles');
            $table->decimal('rate', 8, 2)->nullable();
            $table->string('pay_frequency')->nullable(); // Add pay_frequency column
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('call_sheet_user');
    }
};
