<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    
    protected $fillable = ['first_name', 'last_name', 'job_title', 'email', 'phone_id', 'address_id'];

    // Define the relationship with the PhoneNumbers table
    public function phoneNumber()
    {
        return $this->hasOne(PhoneNumber::class, 'phone_id');
    }

    public function address()
    {
        return $this->hasOne(Address::class, 'address_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_client');
    }
    
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'client_project');
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'client_company');
    }
}
