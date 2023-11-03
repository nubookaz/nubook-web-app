<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductionCompanyProjectTable extends Migration
{
    public function up()
    {
        Schema::create('production_company_project', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('project_id');
            // Add any additional columns if needed for this join table.
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('production_companies');
            $table->foreign('project_id')->references('id')->on('projects');
        });
    }

    public function down()
    {
        Schema::dropIfExists('production_company_project');
    }
}
