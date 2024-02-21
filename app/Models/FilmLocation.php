<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilmLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'name',
        'information',
        'parking_location_id',  // Ensure these are in your fillable array if they're to be mass assigned
        'hospital_location_id',
    ];
    
    public function callSheets()
    {
        return $this->belongsToMany(CallSheet::class);
        // Removed the 'call_sheet_locations' pivot table reference
    }
    
    public function location()
    {
        return $this->belongsTo(Location::class); // A FilmLocation is located at a Location
    }

    // Each FilmLocation is linked to one ParkingLocation
    public function parkingLocation()
    {
        return $this->belongsTo(ParkingLocation::class, 'parking_location_id');
    }

    // Each FilmLocation is linked to one HospitalLocation
    public function hospitalLocation()
    {
        return $this->belongsTo(HospitalLocation::class, 'hospital_location_id');
    }
}
