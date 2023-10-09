<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['street_address', 'city', 'state', 'zip_code'];

    // Define the relationship with the Users table
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the Clients table
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}