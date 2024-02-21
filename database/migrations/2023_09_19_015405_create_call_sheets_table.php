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
            $table->string('call_sheet_date_time'); 
            $table->text('bulletin')->nullable(); 
            $table->json('weather')->nullable();
            $table->timestamp('weather_updated_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('call_sheets');
    }
}
