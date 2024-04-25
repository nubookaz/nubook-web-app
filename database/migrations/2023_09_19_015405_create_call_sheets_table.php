<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCallSheetsTable extends Migration
{
    public function up()
    {
        Schema::create('call_sheets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreignId('production_company_id')->nullable()->constrained()->onDelete('set null');
            $table->string('status')->default('Draft');
            $table->string('call_sheet_name');
            $table->string('call_sheet_date');
            $table->string('general_call_Time');
            $table->text('bulletin')->nullable();
            $table->json('weather')->nullable();
            $table->timestamp('weather_updated_at')->nullable();
            $table->unsignedBigInteger('production_schedule_id')->nullable(); 
            $table->foreign('production_schedule_id')->references('id')->on('production_schedules')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('call_sheets');
    }
}
