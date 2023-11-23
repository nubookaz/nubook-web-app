<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilmLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id'
    ];
    
    public function callSheet()
    {
        return $this->hasMany(CallSheet::class); 
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
