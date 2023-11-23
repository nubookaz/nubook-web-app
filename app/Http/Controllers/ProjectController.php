<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Client;
use App\Models\Company;
use App\Http\Traits\ProjectTrait;
use Illuminate\Support\Facades\Auth;


use Inertia\Inertia;


class ProjectController extends Controller
{

    use ProjectTrait;

    public function index()
    {
        // Retrieve the user's projects
        $projects = Project::where('user_id', auth()->id())->with('productionCompany')->get();
        $user = Auth::user();
 
         return Inertia::render('Projects', [
            'auth' => $user,
            'projects' => $projects,
        ]);    
    
    }

    public function showList()
    {
        
        $projects = Project::where('user_id', auth()->id())->with('productionCompany')->get();

        return Inertia::render('Projects/ProjectListPage', [
            'projects' => $projects,
        ]);    
    
    }


    public function showSettings($id)
    {
        
        // Retrieve the project by its ID
        $project = Project::find($id);
    
        // Check if the project exists
        if (!$project) {
            abort(404, 'Project not found');
        }
    
        // Render the project edit page using Inertia.js
        return Inertia::render('Projects/SubPages/Settings', [
            'project' => $project, // Pass the project data to the edit page
        ]);
    
    }












    public function store(Request $request)
    {       
        // Validate the incoming data
        $project = $this->createProject($request);

        $viewName = $project->projectStage === "Estimate" ? 'projects.estimate' : 'projects.edit';
    
        // Render the view using Inertia.js and pass project data
        return redirect()->route($viewName, ['id' => $project->id]);
    }
    
    // Helper function to check if all values in an array are null
    private function isDataEmpty($data)
    {
        return count(array_filter($data, function ($value) {
            return !is_null($value);
        })) === 0;
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
        return Inertia::render('Projects/ProjectEditPage', [
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

        return Inertia::render('Projects/ProjectEditPage', [
            'project' => $project, // Pass the project data to the edit page
        ]);
    }
}
