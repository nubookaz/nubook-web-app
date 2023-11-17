<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhoneNumber extends Model
{
    use HasFactory;

    protected $fillable = ['tel'];

    // Define the relationship with the Users table
    public function user()
    {
        return $this->belongsTo(User::class);
    }
 
}
