<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
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
        return Inertia::render('Auth/Registration/RegistrationEmail');
    }

    public function store(Request $request)
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
        $request->session()->put('registration.user_id', $user->id);
        $request->session()->put('registration.email_verified', false);
    
        try {
            Mail::to($user->email)->send(new VerificationEmail($user, $verificationCode));
        } catch (\Exception $e) {
            Log::error("Error sending verification email to {$user->email}: " . $e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json(['error' => 'Failed to send verification email. Please try again.'], 500);
        }

        return response()->json(['success' => true]);
    }





    public function verifyCode(Request $request)
    {
        $request->validate([
            'verificationCode' => 'required|string',
        ]);
    
        $user = User::where('verification_code', $request->input('verificationCode'))->first();
    
        if (!$user) {
            return response()->json(['error' => 'Invalid verification code.'], 422);
        }
    
        $user->update([
            'email_verified_at' => now(),
            'email_verified' => true, // Set email_verified to true
        ]);
    
        // Log the verification
        info('Verification successful for user: ' . $user->id);
    
        // Update session
        $request->session()->put('registration.email_verified', true);
    
        // Return additional user information if needed
        return response()->json(['success' => true, 'user' => $user]);
    }
    



    public function storePersonalInfo(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'phone' => 'nullable|string|max:15',
            'street_address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
        ]);
    
        $userId = $request->session()->get('registration.user_id');
    
        if (!$userId) {
            return response()->json(['error' => 'User information missing'], 400);
        }
    
        $user = User::find($userId);
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        // Update user with personal information
        $user->update([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'middle_initial' => $request->input('middle_initial'),
        ]);
    
        $user->phone()->updateOrCreate([], ['number' => $request->input('phone')]);
    
        $user->address()->updateOrCreate([], [
            'street_address' => $request->input('street_address'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'zip_code' => $request->input('zip_code'),
        ]);
    
        if (!$request->session()->get('registration.personal_info_completed')) {
            $request->session()->put('registration.personal_info_completed', true);
            $user->update([
                'personal_info_completed' => true,
                'code_verified' => true, // Set code_verified to true
            ]);
        }
    
        return response()->json(['success' => true]);
    }

    public function storeCompanyInfo(Request $request)
    {
        $request->validate([
            'company_name' => 'nullable|string|max:255',
            'ein_number' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'number_of_employees' => 'nullable|string|max:255',
            'referral' => 'nullable|string|max:255',
        ]);

        $userId = $request->session()->get('registration.user_id');

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $companyData = [
            'name' => $request->input('company_name'),
            'ein' => $request->input('ein_number'),
            'job_title' => $request->input('job_title'),
            'number_of_employees' => $request->input('number_of_employees'),
            'referral' => $request->input('referral'),
        ];

        $user->company()->updateOrCreate([], $companyData);

        // Mark company info as completed
        if (!$request->session()->get('registration.company_info_completed')) {
            $request->session()->put('registration.company_info_completed', true);
            $user->update([
                'company_info_completed' => true,
                'registration_complete' => true,
            ]);
        }

        $request->session()->flush();

        return redirect()->route('login');
    }

    
    
    
}
