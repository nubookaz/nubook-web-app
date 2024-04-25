<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HospitalLocation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'place_id',
        'name',
        'information',
        'vicinity',
        'latitude',
        'longitude',
    ];

    // Assuming each HospitalLocation is uniquely associated with a FilmLocation
    public function filmLocation()
    {
        return $this->hasMany(FilmLocation::class, 'hospital_location_id');
    }
}
