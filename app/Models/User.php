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
        'timezone',
        'first_name',
        'middle_initial', 
        'last_name', 
        'profile_photo', 
        'email',
        'password',
        'location_id',
        'primary_production_company_id',
        'is_password_temporary',
        'consent',
        'verification_code',
        'code_expires_at',
        'email_verified_at', 
        'email_verified',  
        'code_verified',    
        'personal_info_completed',  
        'company_info_completed',  
        'registration_complete', 
        'ip_address'
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

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function phone()
    {
        return $this->hasOne(PhoneNumber::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function productionCompanies()
    {
        return $this->belongsToMany(ProductionCompany::class, 'user_production_company');
    }

    public function primaryProductionCompany()
    {
        return $this->belongsTo(ProductionCompany::class, 'primary_production_company_id');
    }

    public function callSheets()
    {
        return $this->belongsToMany(CallSheet::class, 'call_sheet_user')
                    ->withPivot('role_id', 'position', 'call_time');
    }
    
    // Method to check if the user has a specific role
    public function hasRole($role)
    {
        return in_array($role, $this->roles->pluck('name')->toArray());
    }
    

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_user');
    }
    
    
    public function aiContentGenerations()
    {
        return $this->hasMany(AIContentGeneration::class);
    }
    
}
