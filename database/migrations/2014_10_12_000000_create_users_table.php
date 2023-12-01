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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('middle_initial')->nullable();
            $table->string('last_name');
            $table->string('profile_image')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->foreignId('location_id')->nullable()->constrained('locations')->onDelete('cascade');

            $table->foreignId('primary_production_company_id')->nullable()->constrained('production_companies')->onDelete('set null');

            $table->boolean('is_password_temporary')->default(false);
            $table->string('verification_code')->nullable();
            $table->timestamp('code_expires_at')->nullable();

            $table->boolean('email_verified')->default(false); // Track email verification step
            $table->boolean('code_verified')->default(false); // Track code verification step
            $table->boolean('personal_info_completed')->default(false); // Track personal info completion step
            $table->boolean('company_info_completed')->default(false); // Track company info completion step
            $table->boolean('registration_complete')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
