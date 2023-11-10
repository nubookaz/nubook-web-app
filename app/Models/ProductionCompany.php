<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionCompany extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'company_name', 
        'ein_number', 
        'job_title', 
        'number_of_employees', 
        'referral'];

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'company_project', 'company_id', 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
