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

        try {
            $user->update([
                'verification_code' => $verificationCode,
                'password' => Hash::make($request->input('data.password')),
                'is_password_temporary' => false,
                'code_expires_at' => $expiresAt, 
            ]);

            Mail::to($user->email)->send(new VerificationEmail($user, $verificationCode));

            Log::info('Password updated and verification email sent', ['user_id' => $user->id]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error updating password', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => 'Failed to update password.'], 500);
        }
    }


    public function verifyCode(Request $request)
    {
        $request->validate([
            'verificationCode' => 'required|string',
        ]);
    
        Log::info('Attempting to verify code', ['verificationCode' => $request->input('verificationCode')]);
    
        $user = User::where('verification_code', $request->input('verificationCode'))->first();
    
        if (!$user) {
            Log::warning('Verification attempt with invalid code', ['verificationCode' => $request->input('verificationCode')]);
            return response()->json(['error' => 'Invalid verification code.'], 422);
        }
    
        // Check if the code is expired
        if (now()->greaterThan($user->code_expires_at)) {
            Log::warning('Verification attempt with expired code', [
                'userId' => $user->id,
                'verificationCode' => $request->input('verificationCode'),
                'codeExpiresAt' => $user->code_expires_at,
            ]);
            return response()->json(['error' => 'Verification code has expired.'], 422);
        }
    
        try {
            $user->update([
                'email_verified_at' => now(),
                'email_verified' => true, // Set email_verified to true
                'verification_code' => null, // Optionally clear the verification code
                'code_expires_at' => null, // Optionally clear the expiration time
            ]);
    
            Log::info('Verification successful', ['userId' => $user->id]);
    
            // Return additional user information if needed
            return response()->json(['success' => true, 'user' => $user]);
        } catch (\Exception $e) {
            Log::error('Error during verification process', [
                'userId' => $user->id,
                'error' => $e->getMessage(),
            ]);
    
            return response()->json(['error' => 'An error occurred during verification.'], 500);
        }
    }

    public function resendCode(Request $request)
    {
        $user = Auth::user();
        Log::info('Resending verification code', ['user_id' => $user->id]);
    
        $verificationCode = Str::uuid();
        $expiresAt = now()->addMinutes(3)->toIso8601String();
    
        // Attempt to update the user with the new verification code and expiration time
        try {
            $user->update([
                'verification_code' => $verificationCode,
                'code_expires_at' => $expiresAt, 
            ]);
    
            // Assuming update is always successful if no exception is thrown
            Log::info('Updated user with new verification code', ['user_id' => $user->id, 'verification_code' => $verificationCode]);
    
            // Retrieve the user again to ensure you have the latest data
            $updatedUser = $user->fresh();
    
            // Attempt to send the email
            Mail::to($updatedUser->email)->send(new VerificationEmail($updatedUser, $verificationCode));
            Log::info('Verification email sent', ['user_id' => $updatedUser->id, 'email' => $updatedUser->email]);
    
            // Return a success response
            return response()->json([
                'success' => true, 
                'code_expires_at' => $updatedUser->code_expires_at, // Send back the updated expiration time
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to resend verification code', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
            return response()->json(['error' => 'Failed to update user verification code.'], 500);
        }
    }
    
    


    public function storePersonalInfo(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'middleInitial' => 'nullable|string|max:1',
            'phoneNumber' => 'nullable|string|max:15',
            'address.streetAddress' => 'nullable|string|max:255',
            'address.city' => 'nullable|string|max:255',
            'address.state' => 'nullable|string|max:255',
            'address.zipCode' => 'nullable|string|max:20',
            'address.latitude' => 'nullable|numeric|between:-90,90',
            'address.longitude' => 'nullable|numeric|between:-180,180',
        ]);
    
        $userId = $request->user()->id;
        Log::info('Storing personal information', ['user_id' => $userId]);
    
        if (!$userId) {
            Log::error('User information missing during personal info storage', ['user_id' => $userId]);
            return response()->json(['error' => 'User information missing'], 400);
        }
    
        $user = User::find($userId);
    
        if (!$user) {
            Log::error('User not found during personal info storage', ['user_id' => $userId]);
            return response()->json(['error' => 'User not found'], 404);
        }
    
        try {
            $userIpAddress = $request->ip();
            $user->update([
                'first_name' => $request->input('firstName'),
                'last_name' => $request->input('lastName'),
                'middle_initial' => $request->input('middleInitial'),
                'personal_info_completed' => true,
                'code_verified' => true, 
                'ip_address' => $userIpAddress,
            ]);
    
            $user->phone()->updateOrCreate([], ['tel' => $request->input('phoneNumber')]);
    

            $apiKey = env('GOOGLE_MAP_API_KEY');

            // Check if geocode data is provided
            if ($request->has('address.latitude') && $request->has('address.longitude')) {
                $latitude = $request->input('address.latitude');
                $longitude = $request->input('address.longitude');    

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

            if ($request->has('address')) {
                $addressData = $request->input('address');
                $locationData = [
                    'street_address' => $addressData['streetAddress'] ?? null,
                    'city' => $addressData['city'] ?? null,
                    'state' => $addressData['state'] ?? null,
                    'zip_code' => $addressData['zipCode'] ?? null,
                    'latitude' => $addressData['latitude'] ?? null,
                    'longitude' => $addressData['longitude'] ?? null,
                ];
            
                $location = Location::updateOrCreate($locationData);
                $user->location()->associate($location);
                $user->save();
            }
            
            Log::info('Personal information stored successfully', ['user_id' => $userId]);
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Failed to store personal information', [
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);
            return response()->json(['error' => 'Failed to store personal information'], 500);
        }
    }

    private function getTimezoneFromIpAddress($ipAddress)
    {
        Log::info('Retrieving timezone for IP address', ['ip' => $ipAddress]);
    
        try {
            $apiKey = env('GOOGLE_MAP_API_KEY');
            $client = new Client();
            $response = $client->get("https://api.ipgeolocation.io/timezone", [
                'query' => ['apiKey' => $apiKey, 'ip' => $ipAddress],
            ]);
    
            $data = json_decode($response->getBody());
            if (isset($data->timezone)) {
                Log::info('Timezone retrieved successfully', ['ip' => $ipAddress, 'timezone' => $data->timezone]);
                return $data->timezone;
            } else {
                Log::warning('Timezone data missing in response', ['ip' => $ipAddress, 'response' => $data]);
                return null;
            }
        } catch (\Exception $e) {
            Log::error('Failed to retrieve timezone for IP address', [
                'ip' => $ipAddress,
                'error' => $e->getMessage(),
            ]);
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
        Log::info('Storing production company info', ['user_id' => $userId]);
    
        $user = User::find($userId);
    
        if (!$user) {
            Log::error('User not found during production company info storage', ['user_id' => $userId]);
            return response()->json(['error' => 'User not found'], 404);
        }
    
        try {
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
    
            Log::info('Production company info stored successfully', ['user_id' => $userId, 'company_id' => $company->id]);
            return response()->json(['success' => 'Company Info saved successfully']);
        } catch (\Exception $e) {
            Log::error('Failed to store production company info', [
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);
            return response()->json(['error' => 'Failed to store production company information'], 500);
        }
    }
    

}
