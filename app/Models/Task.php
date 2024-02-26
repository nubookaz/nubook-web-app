<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'status', 'user_id', 'project_id', 'call_sheet_id'];
    
    // User relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Optional project relationship
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Optional call sheet relationship
    public function callSheet()
    {
        return $this->belongsTo(CallSheet::class);
    }
}
