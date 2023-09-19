<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'projectName', // Use 'projectName' based on your variable
        'projectDescription', // Use 'projectDescription' based on your variable
        'projectBudget', // Use 'projectBudget' based on your variable
        'project_image',
        'projectType', // Use 'projectType' based on your variable
        'categoryType', // Use 'categoryType' based on your variable
        'projectStage', // Use 'projectStage' based on your variable
        'projectDays', // Use 'projectDays' based on your variable
        'projectMonths', // Use 'projectMonths' based on your variable
        'projectYears', // Use 'projectYears' based on your variable
        'user_id', // Add 'user_id' to the fillable array
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_project', 'project_id', 'company_id');
    }

}