<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'middle_initial', 
        'last_name', 
        'profile_photo', 
        'email',
        'password',
        'is_temporary',
        'subscription_type',
        'verification_code',
        'email_verified_at', 
        'email_verified',  
        'code_verified',    
        'personal_info_completed',  
        'company_info_completed',  
        'registration_complete', 
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    
    public function phone()
    {
        return $this->hasOne(PhoneNumber::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function productionCompany()
    {
        return $this->hasOne(ProductionCompany::class, 'user_id');
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
    
    public function clients()
    {
        return $this->belongsToMany(Client::class, 'user_client');
    }
    
    
}
