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
use App\Models\Role;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;



class RegisteredUserController extends Controller
{


    use HasApiTokens;

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
            'consent.required' => 'Please make sure to agree to the privacy policy and data collection.',
            'consent.boolean' => 'Invalid consent value.',
        ];
    
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'consent' => 'required|boolean', 
        ], $messages);
    
        Log::info('Attempting to register a new user', ['email' => $request->email]);
    
        $verificationCode = Str::uuid();
        $expiresAt = now()->addMinutes(3)->toIso8601String();
    
        try {
            $user = User::create([
                'first_name' => 'Placeholder',
                'last_name' => 'User',
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'verification_code' => $verificationCode,
                'code_expires_at' => $expiresAt, 
                'email_verified_at' => null,
                'email_verified' => false,
                'consent' => $request->boolean('consent'),
            ]);
    
            $adminRoleId = DB::table('roles')->where('name', 'admin')->first()->id;
            
            $user->roles()->attach($adminRoleId);    
    
            event(new Registered($user));
            Auth::login($user);
    
            Mail::to($user->email)->send(new VerificationEmail($user, $verificationCode));

            $token = $user->createToken('api_token')->plainTextToken;

            Log::info('User registered successfully', ['user_id' => $user->id]);
    
            return redirect(RouteServiceProvider::HOME);
        } catch (\Exception $e) {
            Log::error('Registration failed', [
                'email' => $request->email,
                'error' => $e->getMessage(),
            ]);
            session()->flash('error', 'An unexpected error occurred. Please try again.');
            return redirect('/');
        }
    }
    
    
}
