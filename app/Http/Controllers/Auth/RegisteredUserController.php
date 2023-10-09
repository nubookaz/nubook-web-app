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

class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Registration/RegistrationEmail');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $verificationCode = Str::random(25);
    
        $user = User::create([
            'first_name' => 'Placeholder',
            'last_name' => 'User',
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_code' => $verificationCode,
            'email_verified_at' => null,
        ]);

        $request->session()->put('registration.user_id', $user->id);
        $request->session()->put('registration.email_verified', false);

        // Send verification email with the one-time code
        Mail::to($user->email)->send(new VerificationEmail($user, $verificationCode));

        return redirect()->route('registration.verification.form', ['code' => $verificationCode]);

    }

    public function showVerificationForm()
    {
        return Inertia::render('Auth/Registration/RegistrationVerification');
    }

    public function verificationCode(Request $request)
    {
        $verificationCode = $request->input('code');
        $user = User::where('verification_code', $verificationCode)->first();
    
        if (!$user) {
            return redirect()->route('registration.verification.form')->with('error', 'Invalid verification code');
        }
    
        $user->update(['email_verified_at' => now()]);
        $request->session()->put('registration.email_verified', true);

        return redirect()->route('registration.personal');
    }
    
    public function verifyCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $user = User::where('verification_code', $request->input('code'))->first();

        if (!$user) {
            abort(404, 'User not found');
        }

        $user->update(['email_verified_at' => now()]);
        $request->session()->put('registration.email_verified', true);

        return redirect()->route('registration.personal.form');
    }
    
    public function showPersonalInfo()
    {
        return Inertia::render('Auth/Registration/RegistrationPersonalInfo');
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
            return redirect()->route('registration.create')->with('error', 'User information missing');
        }

        $user = User::find($userId);

        if (!$user) {
            return redirect()->route('registration.create')->with('error', 'User not found');
        }

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

        $request->session()->put('registration.personal_info_completed', true);
        $user->update(['personal_info_completed' => true]);

        return redirect()->route('registration.company.form');
    }

    public function showCompanyInfo()
    {
        return Inertia::render('Auth/Registration/RegistrationCompanyInfo');
    }

    public function storeCompanyInfo(Request $request)
    {
        $request->validate([
            'company_name' => 'nullable|string|max:255',
            'ein_number' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'number_of_employees' => 'nullable|integer',
            'referral' => 'nullable|string|max:255',
        ]);

        $userId = $request->session()->get('registration.user_id');

        if (!$userId) {
            return redirect()->route('registration.create')->with('error', 'User information missing');
        }

        $user = User::find($userId);

        if (!$user) {
            return redirect()->route('registration.create')->with('error', 'User not found');
        }

        $user->update([
            'company_name' => $request->input('company_name'),
            'ein_number' => $request->input('ein_number'),
            'job_title' => $request->input('job_title'),
            'number_of_employees' => $request->input('number_of_employees'),
            'referral' => $request->input('referral'),
        ]);

        if ($request->filled(['company_name', 'ein_number'])) {
            $companyData = [
                'name' => $request->input('company_name'),
                'ein' => $request->input('ein_number'),
            ];

            $user->company()->updateOrCreate([], $companyData);
        }

        $request->session()->put('registration.company_info_completed', true);
        $user->update(['company_info_completed' => true]);
        $user->update(['registration_complete' => true]);

        $request->session()->flush();

        return redirect()->route('login');
    }
}
