<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductionSchedule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'schedule', // JSON blob storing the schedule details
    ];

    protected $casts = [
        'schedule' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Optionally link to call sheets
    public function callSheets()
    {
        return $this->hasMany(CallSheet::class);
    }
}
