<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'project_name',
        'project_description',
        'project_budget',
        'project_image',
        'project_type',
        'category_type',
        'project_stage',
        'project_days',
        'project_months',
        'project_years',
        'user_id',
    ];
    
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function productionCompany()
    {
        return $this->belongsToMany(ProductionCompany::class, 'production_company_project', 'project_id', 'company_id');
    }

    public function callSheets()
    {
        return $this->hasMany(CallSheet::class);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'client_project');
    }

}
