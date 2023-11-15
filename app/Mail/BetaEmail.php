<?php

namespace App\Mail;

use App\Models\User; 
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class BetaEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $temporaryPassword;

    public function __construct(User $user, $temporaryPassword)
    {
        $this->user = $user;
        $this->temporaryPassword = $temporaryPassword;
    }

    public function build()
    {
        return $this->markdown('emails.beta')->with([
            'user' => $this->user,
            'temporaryPassword' => $this->temporaryPassword,
        ]);
    }
    
    
    
}


