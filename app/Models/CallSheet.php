<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CallSheet extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'production_company_id',
        'production_schedule_id',  
        'status',
        'call_sheet_name',
        'call_sheet_date_time',
        'weather',
        'bulletin',
    ];
    

    protected $casts = [
        'weather' => 'array',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('role_id');
    }

    public function productionCompany()
    {
        return $this->belongsTo(ProductionCompany::class);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class)->withTimestamps();
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function filmLocations()
    {
        return $this->belongsToMany(FilmLocation::class);
    }

    // Link to ProductionSchedule
    public function productionSchedule()
    {
        return $this->belongsTo(ProductionSchedule::class);
    }
}
