<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'ein'];

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'company_project', 'company_id', 'project_id');
    }

}
