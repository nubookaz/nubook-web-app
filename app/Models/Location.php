<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'street_address', 
        'city', 
        'state', 
        'zip_code',
        'latitude',
        'longitude',
    ];
 
    public function users()
    {
        return $this->belongsToMany(User::class); 
    }

    public function callSheet()
    {
        return $this->hasOne(CallSheet::class); 
    }

    public function filmLocation()
    {
        return $this->hasMany(FilmLocation::class);
    }

    public function parkingLocation()
    {
        return $this->hasMany(ParkingLocation::class);
    }

    public function hospitalLocation()
    {
        return $this->hasMany(HospitalLocation::class);
    }
}
