<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CallSheet extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'status', 'callSheetTitle', 'callSheetDate', 'bulletin'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // public function users()
    // {
    //     return $this->belongsToMany(User::class, 'call_sheet_users')
    //         ->withPivot('role_id')
    //         ->using(CallSheetUser::class);
    // }

    // public function locations()
    // {
    //     return $this->belongsToMany(Location::class, 'call_sheet_locations')
    //         ->using(CallSheetLocation::class);
    // }

    // public function schedule()
    // {
    //     return $this->hasOne(Schedule::class);
    // }
}
