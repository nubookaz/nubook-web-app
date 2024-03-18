<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'project_id',
        'media_path',   
        'media_type',    // To specify the type of media (image, video, audio, etc.)
        'ai_generated',  // To indicate if the media was AI-generated
        'size',          // To store the size of the file
        'dimensions',    // To store dimensions (useful for images and videos)
        'duration',      // To store duration (useful for videos and audio files)
        'format',        // To store the file format
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
