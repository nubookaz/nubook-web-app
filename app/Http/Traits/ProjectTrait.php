<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Client;
use App\Models\Company;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

trait ProjectTrait

{

    public function createProject(Request $request)
    {
        $projectData = $request->json('projectData');

        $projectValidator = Validator::make($projectData, [
            'project_name' => 'required|string',
            'project_description' => 'nullable|string',
            'project_budget' => 'nullable|numeric',
            'project_type' => 'required|string',
            'category_type' => 'required|string',
            'project_stage' => 'required|string',
        ])->validate();
        
        // Assuming you have the user's ID available, replace $userId with the actual user ID
        $userId = auth()->user()->id; 

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
        $clientData = $request->json('clientData');

        // Validate the incoming JSON data
        $clientValidator = Validator::make($clientData, [
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'middle_initial' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255', 
            'email_address' => 'nullable|string|max:255',
            'tel' => 'nullable|max:255', 
            'company_name' => 'nullable|string|max:255', 
        ])->validate();

        $clientInfo = [
            'first_name' => $clientData['first_name'],
            'last_name' => $clientData['last_name'],
            'middle_initial' => $clientData['middle_initial'],
            'job_title' => $clientData['job_title'],
            'email_address' => $clientData['email_address'],
        ];

        $companyInfo = [
            'name' => $clientData['company_name'],
        ];

        $user = auth()->user(); 

        $client = Client::create($clientInfo);
        $company = Company::create($companyInfo);

        $client->companies()->attach($company->id, ['client_id' => $client->id]);
        $user->clients()->attach($client->id);

        return $client;
    }
}
