<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Client;
use App\Models\Company;
use App\Models\Role;
use App\Models\User;
use App\Models\Media;
use App\Http\Traits\ProjectTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


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

    public function fetchUserProjects()
    {
        $user = auth()->user(); 
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
        $projects = $user->projects()->with([
            'callSheets',
            'media',
            'productionSchedules',
            'users',
            'productionCompany',
        ])->get();

        return response()->json($projects);
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
        Log::info('Store method in ProjectController started with request: ', $request->all());
    
        try {

            $userId = auth()->id();
            $user = User::find($userId);  

            if ($request->has('projectBudget')) {
                $budget = str_replace(',', '', $request->input('projectBudget'));
                $request->merge(['projectBudget' => $budget]);
            } else {
                $request->merge(['projectBudget' => 0.00]);
            }
    
            $imageValidationRule = is_string($request->input('uploadedImage')) ? 'nullable|string' : 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048';

            $validatedData = $request->validate([
                'selectedProjectType' => 'required|string',
                'selectedCorporateType' => 'nullable|string',
                'selectedFamilyEventType' => 'nullable|string',
                'selectedCreativeType' => 'nullable|string',
                'selectedLiveBroadcastType' => 'nullable|string',
                'selectedDigitalContentType' => 'nullable|string',
                'project_name' => 'required|string',
                'projectDescription' => 'nullable|string',
                'primaryGenre' => 'nullable|string',
                'secondaryGenre' => 'nullable|string',
                'viewerRating' => 'nullable|string',
                'selectedClientIds' => 'nullable|array',
                'project_stage' => 'required|string',
                'project_status' => 'required|string',
                'filmingDays' => 'nullable|integer',
                'projectBudget' => 'nullable|numeric',
                'uploadedImage' => $imageValidationRule,
            ]);
            
            Log::info('Validation passed', $validatedData);
    
            $project = new Project;
            $project->project_type = $validatedData['selectedProjectType'];
            $project->project_name = $validatedData['project_name'];
            $project->project_description = $validatedData['projectDescription'] ?? null;
            $project->project_budget = $validatedData['projectBudget']; 
            $project->project_stage = $validatedData['project_stage'];
            $project->project_status = $validatedData['project_status'];
    
            $project->category_type = $this->determineCategoryType($validatedData);
    
            $projectDetails = [
                'primaryGenre' => $validatedData['primaryGenre'] ?? null,
                'secondaryGenre' => $validatedData['secondaryGenre'] ?? null,
                'viewerRating' => $validatedData['viewerRating'] ?? null,
                'filmingDays' => $validatedData['filmingDays'] ?? null,
            ];

            $project->project_details = json_encode($projectDetails);

            $project->save();

            if ($request->hasFile('poster')) {
                Log::info('Uploaded image details:', ['poster' => $request->file('poster')]);
    
                $media = new Media;
                $storagePath = 'public/media/user_' . $userId;
                $path = $request->file('poster')->store($storagePath);
                $mediaPath = str_replace('public/', '', $path);

                $media->user_id = $userId;
                $media->media_path = $mediaPath;  
                $media->project_id = $project->id;
                $media->media_type = $request->input('media_type');
                $media->size = $request->input('size');
                $media->dimensions = $request->input('dimensions');
                $media->ai_generated = filter_var($request->input('ai_generated'), FILTER_VALIDATE_BOOLEAN);
                $media->save();
            
            }

            $adminRoleId = Role::where('name', 'Admin')->first()->id;
            $project->users()->attach([$userId => ['role_id' => $adminRoleId]]);

            Log::info('Project created successfully', ['project_id' => $project->id]);
    
            $viewName = $project->project_stage === "Estimate" ? 'projects.estimate' : 'project.details';
            
            $responseUrl = route($viewName, ['projectId' => $project->id]);

            Log::info('Returning response', ['url' => $responseUrl]);
    
            return response()->json([
                'url' => $responseUrl, 
                'projectId' => $project->id
            ]);

        } catch (\Exception $e) {

            Log::error('Error in ProjectController@store', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'requestData' => $request->all()  
            ]);
    
            return response()->json(['error' => 'An error occurred while creating the project'], 500);
        }
    }
    
    private function determineCategoryType($validatedData) {
        if (!empty($validatedData['selectedCorporateType'])) {
            return 'Corporate';
        }
    
        if (!empty($validatedData['selectedFamilyEventType'])) {
            return 'Family Event';
        }
    
        if (!empty($validatedData['selectedCreativeType'])) {
            $allowedCreativeTypes = ['Music Video', 'Documentary Film', 'Short Film', 'Fashion Show', 'Feature Film'];
    
            if (in_array($validatedData['selectedCreativeType'], $allowedCreativeTypes)) {
                return $validatedData['selectedCreativeType'];
            } else {
                return 'Creative';
            }
        }
    
        if (!empty($validatedData['selectedLiveBroadcastType'])) {
            return 'Live Broadcast';
        }
    
        if (!empty($validatedData['selectedDigitalContentType'])) {
            return 'Digital Content';
        }
    
        return 'General';
    }
    
    private function compileProjectDetails($validatedData) {
        return array_merge(
            $validatedData['weddingDetails'] ?: [],
            $validatedData['liveEventDetails'] ?: [],
            $validatedData['videoProjectDetails'] ?: [],
            $validatedData['additionalVideoDetails'] ?: []
        );
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
        $project = Project::with('media')->find($projectId);
 
        if (!$project) {
            abort(404, 'Project not found');
        }
        
        return Inertia::render('Projects/ProjectDetailsPage', [
            'project' => $project, 
        ]);
    }

    public function saveFavorite(Request $request, $projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
            $isFavorite = $request->input('isFavorite');

            // Validate the 'isFavorite' input to ensure it's a boolean
            if (!is_bool($isFavorite)) {
                return response()->json(['error' => 'Invalid input for favorite status.'], 400);
            }

            $project->is_favorite = $isFavorite;
            $project->save();

            return response()->json([
                'message' => 'Favorite status updated successfully.',
                'isFavorite' => $project->is_favorite,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the favorite status.'], 500);
        }
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
