<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    
    protected $fillable = ['first_name', 'last_name', 'job_title', 'email', 'phone_id'];

    // Define the relationship with the PhoneNumbers table
    public function phoneNumber()
    {
        return $this->belongsTo(PhoneNumber::class, 'phone_id');
    }
}
