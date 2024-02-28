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

    public function getUsers($projectId)
    {
        $project = Project::findOrFail($projectId);
        $users = $project->users()->get();  
        return response()->json($users);
    }

    public function index()
    {
         return Inertia::render('Projects');    
    }

    public function showList()
    {
        $user = Auth::user();
        $projects = $user->projects()->with('productionCompany')->get();
    
        return Inertia::render('Projects/ProjectListPage', [
            'projects' => $projects,
        ]);    
    
    }

    public function store(Request $request)
    {       

         // Validate the incoming data
        $project = $this->createOrUpdateProject($request);
 
        $viewName = $project->project_stage === "Estimate" ? 'projects.estimate' : 'projects.details';
        
        return response()->json([
            'url' => route($viewName, ['projectId' => $project->id])
        ]);
    }
    
    // Helper function to check if all values in an array are null
    private function isDataEmpty($data)
    {
        return count(array_filter($data, function ($value) {
            return !is_null($value);
        })) === 0;
    }
 
    public function saveFavorite(Request $request, $projectId) {
        // Authorization checks (if necessary)
        // $this->authorize('update', $project);
        $project = Project::find($projectId);
        $project->is_favorite = $request->input('isFavorite');
        $project->save();
    
        return response()->json(['message' => 'Favorite status updated successfully']);
    }
    

    public function savePoster(Request $request)
    {
        // dd($request->all());
        // Validate the incoming request
        $validatedData = $request->validate([
            'image_url' => 'required|url',
            'project_id' => 'required|integer',
        ]);

        // Find the project by ID
        $project = Project::find($validatedData['project_id']);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // Assuming you have the user's ID available
        $userId = auth()->user()->id; 

        // Download and save the image from the URL
        $imageContent = file_get_contents($validatedData['image_url']);
        $imageName = 'poster_' . time() . '.jpg'; // Generate a unique name
        $imagePath = Storage::put("public/user{$userId}/projects/images/{$imageName}", $imageContent);

        // Get image URL
        $imageUrl = asset(str_replace('public/', 'storage/', $imagePath));

        // Optionally get image file size and dimensions
        // $fileSize = (size of the image file)
        // $dimensions = (dimensions of the image)

        // Assign movie poster details to the video production data
        $videoProductionData = $project->video_production;
        $videoProductionData['movie_poster'] = [
            'url' => $imageUrl,
            // 'size' => $fileSize,     // Uncomment if you include file size
            // 'dimensions' => $dimensions, // Uncomment if you include dimensions
        ];

        // Update the video production data of the project
        $project->video_production = $videoProductionData;
        $project->save();

        // Return a response
        return response()->json(['message' => 'Poster saved successfully', 'poster' => $videoProductionData['movie_poster']]);
    }

    public function edit($projectId)
    {
        // Retrieve the project by its ID
        $project = Project::find($projectId);
    
        // Check if the project exists
        if (!$project) {
            abort(404, 'Project not found');
        }
    
        // Render the project edit page using Inertia.js
        return Inertia::render('Projects/ProjectDetailsPage', [
            'project' => $project, // Pass the project data to the edit page
        ]);
    }

    public function estimate($projectId)
    {
        // Retrieve the project by its ID
        $project = Project::find($projectId);

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

    public function update(Request $request)
    {       

         // Validate the incoming data
        $project = $this->createOrUpdateProject($request);
 
        return response()->json([
            'project' => $project
        ]);
    }


    public function softDelete(Request $request, $projectId)
    {
        $project = Project::find($projectId);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->delete();  // Soft delete the project

        return response()->json(['message' => 'Project deleted successfully']);
    }


}
