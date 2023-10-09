<?php

namespace App\Mail;

use App\Models\User; // Import the User model
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $verificationCode;

    public function __construct(User $user, $verificationCode)
    {
        $this->user = $user;
        $this->verificationCode = $verificationCode;
    }

    public function build()
    {
        return $this->markdown('emails.verification')->with([
            'user' => $this->user,
            'verificationCode' => $this->verificationCode,
            'verificationUrl' => route('registration.verification.form'), // Update to the form route
        ]);
    }
    
    
    
}


