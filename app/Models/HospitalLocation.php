<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HospitalLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'street_address',
        'city',
        'state',
        'zip_code',
        'country',
    ];

    // Define the relationship to the Location model
    public function mainLocation()
    {
        return $this->hasOne(Location::class, 'hospital_location_id');
    }
}
