<?php

namespace App\Http\Traits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait ProfileTrait

{
    public function updateProfileInfoTrait($user, $profileInfo)
    {
        $personalInfo = $profileInfo['personalInfo'];
        $companyInfo = $profileInfo['companyInfo'];
    
        // Validate personal information
        $personalValidator = Validator::make($personalInfo, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'tel' => 'nullable|string|max:15', // Assuming 'tel' is your phone field
            'street_address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
        ]);

        if ($personalValidator->fails()) {
            // Handle validation failure, e.g., return response with validation errors
            return response()->json(['error' => $personalValidator->errors()], 422);
        }

        // Validate company information
         $companyValidator = Validator::make($companyInfo, [
            'company_name' => 'nullable|string|max:255',
            'ein_number' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'number_of_employees' => 'nullable|string|max:255',
            'referral' => 'nullable|string|max:255',
        ]);


        if ($companyValidator->fails()) {
            // Handle validation failure, e.g., return response with validation errors
            return response()->json(['error' => $companyValidator->errors()], 422);
        }
        
        $user->update([
            'first_name' => $personalInfo['first_name'],
            'last_name' => $personalInfo['last_name'],
            'middle_initial' => $personalInfo['middle_initial'],
        ]);
        
        $user->phone()->updateOrCreate([], ['tel' => $personalInfo['tel']]);

        $user->address()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'street_address' => $personalInfo['street_address'],
                'city' => $personalInfo['city'],
                'state' => $personalInfo['state'],
                'zip_code' => $personalInfo['zip_code'],
            ]
        );
    
        $user->productionCompany()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'company_name' => $companyInfo['company_name'],
                'ein_number' => $companyInfo['ein_number'],
                'job_title' => $companyInfo['job_title'],
                'number_of_employees' => $companyInfo['number_of_employees'],
                'referral' => $companyInfo['referral'],
            ]
        );
    
        return true; // Indicate success
    }
    

}