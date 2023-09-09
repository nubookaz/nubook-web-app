<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'budget',
        'project_image',
        'genres',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
