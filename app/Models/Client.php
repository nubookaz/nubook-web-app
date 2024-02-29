<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['first_name', 'middle_name', 'last_name', 'title', 'company', 'email', 'phone'];

    public function getFullNameAttribute()
    {
        return trim($this->first_name . ' ' . ($this->middle_name ?? '') . ' ' . $this->last_name);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class)->withTimestamps();
    }

    public function callSheets()
    {
        return $this->belongsToMany(CallSheet::class)->withTimestamps();
    }
}
