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
            $table->string('project_name');
            $table->string('category_type');  
            $table->string('project_type');
            $table->string('project_status'); 
            $table->json('service_types'); 
            $table->string('project_stage'); 
            $table->text('project_description')->nullable();
            $table->decimal('project_budget', 10, 2)->nullable();

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
