<?php

namespace App\Http\Traits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Location;  

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

        $user->phone()->updateOrCreate([], ['tel' => $personalInfo['tel'] ?? null]);

        // Check if all necessary location fields are provided
        if (isset($personalInfo['street_address'], $personalInfo['city'], $personalInfo['state'], $personalInfo['zip_code'])) {
            // Find the user's current location
            $existingLocation = $user->location;

            // Check if an existing location exists
            if ($existingLocation) {
                // Update the existing location with the provided data
                $existingLocation->update([
                    'street_address' => $personalInfo['street_address'],
                    'city' => $personalInfo['city'],
                    'state' => $personalInfo['state'],
                    'zip_code' => $personalInfo['zip_code'],
                ]);
            } else {
                // If no existing location, create a new one
                $location = Location::create([
                    'street_address' => $personalInfo['street_address'],
                    'city' => $personalInfo['city'],
                    'state' => $personalInfo['state'],
                    'zip_code' => $personalInfo['zip_code'],
                ]);

                // Associate the new location with the user
                $user->location()->associate($location);
                $user->save();
            }
        }
 
        if (!empty($companyInfo['company_name'])) {
            $company = ProductionCompany::create([
                'company_name' => $companyInfo['company_name'],
                'ein_number' => $companyInfo['ein_number'],
                'job_title' => $companyInfo['job_title'],
                'number_of_employees' => $companyInfo['number_of_employees'],
                'referral' => $companyInfo['referral'],
            ]);
    
            // Link the new company with the user
            $user->productionCompanies()->attach($company->id);
    
            // Optionally set the new company as the primary company
            $user->primary_production_company_id = $company->id;
            $user->save();
        }
    
        return response()->json(['success' => true, 'user' => $user->fresh()]);
    }
    

}