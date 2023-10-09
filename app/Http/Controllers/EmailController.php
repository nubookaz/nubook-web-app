<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\OneTimeCodeMail; // Assuming you have a Mailable class for the one-time code email

class EmailController extends Controller
{
    /**
     * Send a one-time code email.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendOneTimeCodeEmail(Request $request)
    {
        // Your validation logic for $request, e.g., checking if the email is present

        // Generate a one-time code (you need to implement this)
        $oneTimeCode = $this->generateOneTimeCode();

        // Send the one-time code email using Mailgun
        $recipientEmail = $request->input('email');
        Mail::to($recipientEmail)->send(new OneTimeCodeMail($oneTimeCode));

        // You can store the one-time code in the database or in the session for verification
        // ...

        return response()->json(['success' => true, 'code' => $oneTimeCode]);
    }

    /**
     * Generate a random one-time code.
     *
     * @return string
     */
    private function generateOneTimeCode()
    {
        // Implement your logic to generate a random code
        return strval(rand(100000, 999999));
    }
}
