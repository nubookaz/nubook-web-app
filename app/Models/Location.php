<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'street_address',
        'city',
        'state',
        'zip_code',
        'country',
        'parking_location_id',
        'hospital_location_id',
    ];


    public function callSheets()
    {
        return $this->belongsToMany(CallSheet::class, 'call_sheet_locations');
    }
    
    public function parkingLocation()
    {
        return $this->belongsTo(ParkingLocation::class, 'parking_location_id');
    }
    
    public function hospitalLocation()
    {
        return $this->belongsTo(HospitalLocation::class, 'hospital_location_id');
    }
    
}
