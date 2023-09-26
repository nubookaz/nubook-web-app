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

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id'); // Specify the foreign key for Project
    }

    public function callSheet()
    {
        return $this->belongsTo(CallSheet::class, 'call_sheet_id'); // Specify the foreign key for CallSheet
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
