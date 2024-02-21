<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParkingLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'name',
        'information',
    ];

    public function location()
    {
        return $this->belongsTo(Location::class); // Each ParkingLocation is associated with a physical address
    }

    // Assuming each ParkingLocation is uniquely associated with a FilmLocation
    public function filmLocation()
    {
        return $this->hasMany(FilmLocation::class, 'parking_location_id');
    }
}
