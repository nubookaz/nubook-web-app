<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use Inertia\Inertia;


class ProjectController extends Controller
{

    public function index()
    {
        // Retrieve the user's projects
        $projects = Project::where('user_id', auth()->id())->get();
        
        // // Render the projects index page using Inertia.js
        return Inertia::render('Projects/ProjectsOverview', [
            'projects' => $projects,
        ]);    
    
    }


    public function store(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'projectName' => 'required|string',
            'projectDescription' => 'nullable|string',
            'projectBudget' => 'nullable|numeric',
            'projectType' => 'nullable|string',
            'categoryType' => 'nullable|string',
            'projectStage' => 'nullable|string',
            'projectDays' => 'nullable|integer',
            'projectMonths' => 'nullable|integer',
            'projectYears' => 'nullable|integer',
        ]);

        // Assuming you have the user's ID available, replace $userId with the actual user ID
        $userId = auth()->user()->id; // Example: Get the user's ID from the authenticated user

        // Create a new project record with the specified fields and user_id
        $project = Project::create([
            'projectName' => $validatedData['projectName'],
            'projectDescription' => $validatedData['projectDescription'],
            'projectBudget' => $validatedData['projectBudget'],
            'projectType' => $validatedData['projectType'],
            'categoryType' => $validatedData['categoryType'],
            'projectStage' => $validatedData['projectStage'],
            'projectDays' => $validatedData['projectDays'],
            'projectMonths' => $validatedData['projectMonths'],
            'projectYears' => $validatedData['projectYears'],
            'user_id' => $userId, // Use the user's ID
        ]);

        // Simulate a success response with an alert message
        return redirect()->route('projects.index');

    }

    public function edit($id)
    {
        // Retrieve the project by its ID
        $project = Project::find($id);
    
        // Check if the project exists
        if (!$project) {
            abort(404, 'Project not found');
        }
    
        // Render the project edit page using Inertia.js
        return Inertia::render('Projects/ProjectEdit', [
            'project' => $project, // Pass the project data to the edit page
        ]);
    }

    public function estimate($id)
    {
        // Retrieve the project by its ID
        $project = Project::find($id);

        // Check if the project exists
        if (!$project) {
            abort(404, 'Project not found');
        }

        // Check the project stage
     
        // If the project stage is "Estimate," render the estimate view
        return Inertia::render('Projects/ProjectEstimate', [
            'project' => $project,
        ]);

    }

    

    public function update(Request $request, $id)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'projectName' => 'required|string',
            'projectDescription' => 'nullable|string',
            'projectBudget' => 'nullable|numeric',
            'projectType' => 'nullable|string',
            'categoryType' => 'nullable|string',
            'projectStage' => 'nullable|string',
            'projectDays' => 'nullable|integer',
            'projectMonths' => 'nullable|integer',
            'projectYears' => 'nullable|integer',
        ]);

        // Retrieve the project by its ID
        $project = Project::find($id);

        // Check if the project exists
        if (!$project) {
            abort(404, 'Project not found');
        }

        // Update the project with the validated data
        $project->update([
            'projectName' => $validatedData['projectName'],
            'projectDescription' => $validatedData['projectDescription'],
            'projectBudget' => $validatedData['projectBudget'],
            'projectType' => $validatedData['projectType'],
            'categoryType' => $validatedData['categoryType'],
            'projectStage' => $validatedData['projectStage'],
            'projectDays' => $validatedData['projectDays'],
            'projectMonths' => $validatedData['projectMonths'],
            'projectYears' => $validatedData['projectYears'],
        ]);

        // Simulate a success response with an alert message
        $response = [
            'message' => 'Project updated successfully!',
            'project' => $project,
        ];

        // Return the response as JSON
        return response()->json($response, 200);
    }
}
