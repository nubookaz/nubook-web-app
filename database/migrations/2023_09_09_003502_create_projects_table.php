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
            $table->string('projectName'); // Use 'projectName' based on your variable
            $table->text('projectDescription')->nullable(); // Use 'projectDescription' based on your variable
            $table->decimal('projectBudget', 10, 2)->nullable(); // Use 'projectBudget' based on your variable
            $table->string('project_image')->nullable();
            $table->string('projectType'); // Use 'projectType' based on your variable
            $table->string('categoryType'); // Use 'categoryType' based on your variable
            $table->string('projectStage'); // Use 'projectStage' based on your variable
            $table->unsignedInteger('projectDays')->nullable(); // Use 'projectDays' based on your variable
            $table->unsignedInteger('projectMonths')->nullable(); // Use 'projectMonths' based on your variable
            $table->unsignedInteger('projectYears')->nullable(); // Use 'projectYears' based on your variable

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
