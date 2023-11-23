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
        'bulletin'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function filmLocation()
    {
        return $this->belongsTo(FilmLocation::class, 'film_locations_id');
    }

}
