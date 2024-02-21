<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_type');
            $table->string('video_type');
            $table->string('project_name');
            $table->text('project_description')->nullable();
            $table->decimal('project_budget', 15, 2)->nullable();

            $table->string('project_stage')->nullable();
            $table->string('project_status')->nullable();

            $table->json('video_production')->nullable(); // JSON column for video production details
            $table->boolean('is_favorite')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
