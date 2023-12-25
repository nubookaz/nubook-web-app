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
            'project_type' => 'required|string',
            'category_type' => 'required|string',
            'project_stage' => 'required|string',
            'project_name' => 'required|string',
            'project_status' => 'required|string',
            'service_types' => 'array',
            'project_description' => 'nullable|string',
            'project_budget' => 'nullable|numeric',
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

}
