<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;




class VerificationController extends Controller
{
    public function verifyCode(Request $request)
    {
        // dd($request);
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
        // dd($request);
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'tel' => 'nullable|string|max:15',
            'street_address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
        ]);
    
        $userId = $request->user()->id;
    
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
            'personal_info_completed' => true,
            'code_verified' => true, 
        ]);
    
        $user->phone()->updateOrCreate([], ['tel' => $request->input('tel')]);
    
        $user->address()->updateOrCreate([], [
            'street_address' => $request->input('street_address'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'zip_code' => $request->input('zip_code'),
        ]);
 
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

        $userId = $request->user()->id;

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $companyData = [
            'company_name' => $request->input('company_name'),
            'ein_number' => $request->input('ein_number'),
            'job_title' => $request->input('job_title'),
            'number_of_employees' => $request->input('number_of_employees'),
            'referral' => $request->input('referral'),
        ];

        $user->productionCompany()->updateOrCreate([], $companyData);


        $user->update([
            'company_info_completed' => true,
            'registration_complete' => true,
        ]);

 
        
        return response()->json([
            'success' => 'Company Info saved successfully',
        ]);
        
        
    }

}
