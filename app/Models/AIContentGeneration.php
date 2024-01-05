<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIContentGeneration extends Model
{
    use HasFactory;

    protected $table = 'ai_generation_limits'; // Define the table name

    protected $fillable = [
        'user_id',
        'content_type',
        'generation_count',
        'date'
    ]; 

    // If you have timestamps in your table
    public $timestamps = true;

    const DAILY_LIMIT = 5;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
    // public static function canGenerateContent($userId)
    // {
    //     $todayCount = self::where('user_id', $userId)
    //                      ->whereDate('created_at', now()->toDateString())
    //                      ->count();

    //     return $todayCount < self::DAILY_LIMIT;
    // }
}
