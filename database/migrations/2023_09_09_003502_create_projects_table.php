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
            $table->unsignedBigInteger('user_id');
            $table->string('project_name'); // Use 'project_name' based on your variable
            $table->text('project_description')->nullable(); // Use 'project_description' based on your variable
            $table->decimal('project_budget', 10, 2)->nullable(); // Use 'project_budget' based on your variable
            $table->string('project_type'); // Use 'project_type' based on your variable
            $table->string('category_type'); // Use 'category_type' based on your variable
            $table->string('project_stage'); // Use 'project_stage' based on your variable        
            $table->timestamps();
            
            // Define the foreign key relationship with the users table
            $table->foreign('user_id')->references('id')->on('users');
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
