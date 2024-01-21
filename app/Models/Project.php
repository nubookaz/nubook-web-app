<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;



class Project extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'is_favorite',
        'project_type',
        'project_name',
        'project_description',
        'project_budget',
        'project_stage',
        'project_status',
        'video_type',
        'video_production',  
    ];


    protected $casts = [
        'video_production' => 'array',
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
 

}
