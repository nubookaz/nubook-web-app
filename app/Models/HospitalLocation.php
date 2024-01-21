<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HospitalLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'hospital_name',
        'information',
    ];

    
    public function callSheet()
    {
        return $this->hasMany(CallSheet::class); 
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
