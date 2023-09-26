<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParkingLocation extends Model
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

    public function mainLocation()
    {
        return $this->hasOne(Location::class, 'parking_location_id');
    }
}
