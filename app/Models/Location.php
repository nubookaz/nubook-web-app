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
        return $this->hasMany(FilmLocation::class, 'location_id');
    }

    public function parkingLocation()
    {
        return $this->hasMany(ParkingLocation::class, 'location_id');
    }

    public function hospitalLocation()
    {
        return $this->hasMany(HospitalLocation::class, 'location_id');
    }



    public static function createOrUpdate(array $attributes)
    {
        // Assuming 'street_address', 'city', 'state', 'zip_code' are the unique identifiers for a location
        $location = self::where([
            'street_address' => $attributes['street_address'],
            'city' => $attributes['city'],
            'state' => $attributes['state'],
            'zip_code' => $attributes['zip_code']
        ])->first();

        if ($location) {
            // Update existing location
            $location->update($attributes);
        } else {
            // Create new location
            $location = self::create($attributes);
        }

        return $location;
    }
}
