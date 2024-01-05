<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Location;
use App\Models\ProductionCompany;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;





class VerificationController extends Controller
{

    public function updatePassword(Request $request) 
    {
        $request->validate([
            'data.password' => ['required', Password::defaults(), 'confirmed'],
        ]);
    
        $user = $request->user();
        $verificationCode = Str::uuid();
        $expiresAt = now()->addMinutes(3)->toIso8601String();

        $user->update([
            'verification_code' => $verificationCode,
        ]);

        $user->update([
            'password' => Hash::make($request->input('data.password')),
            'is_password_temporary' => false,
        ]);

        Mail::to($user->email)->send(new VerificationEmail($user, $verificationCode));

        $user->update([
            'code_expires_at' => $expiresAt, 
        ]);

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

        // Check if the code is expired
        if (now()->greaterThan($user->code_expires_at)) {
            return response()->json(['error' => 'Verification code has expired.'], 422);
        }

        $user->update([
            'email_verified_at' => now(),
            'email_verified' => true, // Set email_verified to true
            'verification_code' => null, // Optionally clear the verification code
            'code_expires_at' => null, // Optionally clear the expiration time
        ]);

        // Log the verification
        info('Verification successful for user: ' . $user->id);

        // Update session
        $request->session()->put('registration.email_verified', true);

        // Return additional user information if needed
        return response()->json(['success' => true, 'user' => $user]);
    }

    public function resendCode(Request $request)
    {
        $user = Auth::user();
        $verificationCode = Str::uuid();
        $expiresAt = now()->addMinutes(3)->toIso8601String();
    
        // Update the user with the new verification code and expiration time
        $updateStatus = $user->update([
            'verification_code' => $verificationCode,
            'code_expires_at' => $expiresAt, 
        ]);
    
        // Ensure the user update was successful
        if (!$updateStatus) {
            return response()->json(['error' => 'Failed to update user verification code.'], 500);
        }
    
        // Retrieve the user again to ensure you have the latest data
        $updatedUser = $user->fresh();
    
        // Send the email
        Mail::to($updatedUser->email)->send(new VerificationEmail($updatedUser, $verificationCode));
    
        // Return a success response
        return response()->json([
            'success' => true, 
            'code_expires_at' => $updatedUser->code_expires_at, // Send back the updated expiration time
        ]);
    }
    


    public function storePersonalInfo(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'tel' => 'nullable|string|max:15',
            'street_address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $userId = $request->user()->id;

        if (!$userId) {
            return response()->json(['error' => 'User information missing'], 400);
        }

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $userIpAddress = $request->ip();

        // Update user with personal information
        $user->update([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'middle_initial' => $request->input('middle_initial'),
            'personal_info_completed' => true,
            'code_verified' => true, 
            'ip_address' => $userIpAddress,
        ]);

        $user->phone()->updateOrCreate([], ['tel' => $request->input('tel')]);

        $apiKey = env('GOOGLE_MAP_API_KEY');

        // Check if geocode data is provided
        if ($request->has('latitude') && $request->has('longitude')) {
            $latitude = $request->input('latitude');
            $longitude = $request->input('longitude');    

            $client = new Client();
            $response = $client->get("https://maps.googleapis.com/maps/api/timezone/json", [
                'query' => [
                    'location' => "{$latitude},{$longitude}",
                    'timestamp' => time(), 
                    'key' => $apiKey,
                ],
            ]);

            $data = json_decode($response->getBody());
            $timezoneId = $data->timeZoneId;
            $user->update(['timezone' => $timezoneId]);
        } else {
            // Use IP address to determine timezone
            $timezoneId = $this->getTimezoneFromIpAddress($userIpAddress);
            if ($timezoneId) {
                $user->update(['timezone' => $timezoneId]);
            }
        }

        if ($request->hasAny(['street_address', 'city', 'state', 'zip_code'])) {
            $locationData = [
                'street_address' => $request->input('street_address'),
                'city' => $request->input('city'),
                'state' => $request->input('state'),
                'zip_code' => $request->input('zip_code'),
            ];

            $location = Location::firstOrCreate($locationData);
            $user->location()->associate($location);
            $user->save();
        }
        
        return response()->json(['success' => true]);
    }

    private function getTimezoneFromIpAddress($ipAddress)
    {
        // Implementation to get timezone from IP address
        // Use an IP Geolocation API for actual implementation
        // The following is a placeholder

        try {
            $apiKey = env('GOOGLE_MAP_API_KEY');
            $client = new Client();
            $response = $client->get("https://api.ipgeolocation.io/timezone", [
                'query' => ['apiKey' => $apiKey, 'ip' => $ipAddress],
            ]);

            $data = json_decode($response->getBody());
            return $data->timezone ?? null;
        } catch (\Exception $e) {
            // Log error or handle exception
            return null;
        }
    }


    public function storeProductionCompanyInfo(Request $request)
    {
        $request->validate([
            'company_name' => 'nullable|string|max:255',
            'ein_number' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'number_of_employees' => 'nullable|string|max:255',
            'referral' => 'nullable|string|max:255',
         ]);

        $userId = $request->user()->id;

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $company = ProductionCompany::create([
            'company_name' => $request->input('company_name'),
            'ein_number' => $request->input('ein_number'),
            'job_title' => $request->input('job_title'),
            'number_of_employees' => $request->input('number_of_employees'),
            'referral' => $request->input('referral'),
        ]);

          // Link the company with the user
        $user->productionCompanies()->attach($company->id);

        // Set the new company as the primary company
        $user->primary_production_company_id = $company->id;
        $user->save();

        $user->update([
            'company_info_completed' => true,
            'registration_complete' => true,
        ]);

        return response()->json([
            'success' => 'Company Info saved successfully',
        ]);
        
    }

}
