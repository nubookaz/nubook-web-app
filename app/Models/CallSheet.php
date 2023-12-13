<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CallSheet extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id', 
        'status', 
        'call_sheet_name', 
        'call_sheet_date', 
        'weather',
        'bulletin',
        'film_location_id',
        'parking_location_id',
        'hospital_location_id',
        'production_company_id',
    ];

    // Belongs to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Belongs to ProductionCompany
    public function productionCompany()
    {
        return $this->belongsTo(ProductionCompany::class);
    }

    // Belongs to Project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function filmLocation()
    {
        return $this->belongsTo(FilmLocation::class, 'film_location_id');
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
