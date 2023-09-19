<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Company;
use Illuminate\Support\Facades\Validator;

trait ProjectTrait

{

    public function createProject(Request $request)
    {
        // Access the JSON data directly

        // dd("1", $projectData);

        if ($request->has('projectData')) {
            // Extract the projectData from the request
            $projectData = $request->json('projectData');
            
            // Now, $projectData contains the JSON data as an array
            // You can work with $projectData here
        } else {
            // Handle the case where projectData is not present in the request
            $projectData = $request->all();
        }
        

        // dd("2", $projectData);


        // Validate the incoming data within the projectData section
        $validatedData = Validator::make($projectData, [
            'projectName' => 'required|string',
            'projectDescription' => 'nullable|string',
            'projectBudget' => 'nullable|numeric',
            'projectType' => 'nullable|string',
            'categoryType' => 'nullable|string',
            'projectStage' => 'nullable|string',
            'projectDays' => 'nullable|integer',
            'projectMonths' => 'nullable|integer',
            'projectYears' => 'nullable|integer',
        ])->validate();

        // Assuming you have the user's ID available, replace $userId with the actual user ID
        $userId = auth()->user()->id; // Example: Get the user's ID from the authenticated user

        // Merge the validated projectData with user_id
        $projectData['user_id'] = $userId;

        // Create a new project record with the specified fields
        $project = Project::create($projectData);

        $projectId = $project->id;

        // Return the created project instance or any other relevant data
        return $project;
    }


    public function createCompany(Request $request)
    {
        // Access the JSON data directly
        $companyData = $request->json('companyData');

        // Validate the incoming JSON data
        $validatedData = Validator::make($companyData, [
            'companyName' => 'required|string|max:255',
            'einNumber' => 'nullable|string|max:255', // Optional EIN field
        ])->validate();

        // Create a new company instance and fill it with validated data
        $company = Company::create([
            'name' => $validatedData['companyName'],
            'ein' => $validatedData['einNumber'],
        ]);

        return $company;
    }
}
