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
        'bulletin'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function locations()
    {
        return $this->belongsToMany(Location::class, 'call_sheet_locations');
    }

}
