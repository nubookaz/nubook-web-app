<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationEmail;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Log;



class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Registration/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $messages = [
            'email.required' => 'Please provide an email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'The email address must not exceed :max characters.',
            'email.unique' => 'This email address is already in use.',
            'password.required' => 'A password is required.',
            'password.confirmed' => 'Password confirmation does not match.',
            // Add more messages for password rules as needed
        ];

        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
    
        $verificationCode = Str::uuid();
    
        $user = User::create([
            'first_name' => 'Placeholder',
            'last_name' => 'User',
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_code' => $verificationCode,
            'email_verified_at' => null,
            'email_verified' => false,
        ]);
        // $request->session()->put('registration.user_id', $user->id);
        // $request->session()->put('registration.email_verified', false);


        event(new Registered($user));
        Auth::login($user);

    
        // try {
            Mail::to($user->email)->send(new VerificationEmail($user, $verificationCode));
        // } catch (\Exception $e) {
        //     Log::error("Error sending verification email to {$user->email}: " . $e->getMessage());
        //     Log::error($e->getTraceAsString());

        //     return response()->json(['error' => 'Failed to send verification email. Please try again.'], 500);
        // }

        return redirect(RouteServiceProvider::HOME);    }
    
}
