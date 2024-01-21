<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Client;
use App\Models\Company;
use App\Models\AIContentGeneration;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

trait ProjectTrait

{
    public function createOrUpdateProject(Request $request)
    {
        // Retrieve the consolidated project data from the request
        $projectData = $request->all();
    
        // Separate video production data from the main project data
        $videoProductionData = [
            'movie_poster' => null,
            'viewer_rating' => $projectData['viewer_rating'] ?? null,
            'primary_genre' => $projectData['primary_genre'] ?? null,
            'secondary_genre' => $projectData['secondary_genre'] ?? null,
            'filming_days' => $projectData['filming_days'] ?? null,
        ];
    
        // Remove video production specific fields from the main project data
        unset(
            $projectData['movie_poster'], 
            $projectData['viewer_rating'], 
            $projectData['primary_genre'],
            $projectData['secondary_genre'], 
            $projectData['filming_days']
        );
    
        // Validation rules for project data
        $projectValidator = Validator::make($projectData, [
            'project_type' => 'required|string',
            'video_type' => 'required|string',
            'project_stage' => 'required|string',
            'project_name' => 'required|string',
            'project_status' => 'required|string',
            'project_description' => 'nullable|string',
            'project_budget' => 'nullable|numeric',
        ])->validate();
    
        // Validation rules for video production data
        $videoProductionValidator = Validator::make($videoProductionData, [
            'viewer_rating' => 'nullable|string', 
            'primary_genre' => 'nullable|string',  
            'secondary_genre' => 'nullable|string',  
            'filming_days' => 'nullable|integer',  
        ])->validate();
    
        $videoProductionData['viewer_rating'] = $videoProductionData['viewer_rating'] ?? 'Not Rated';
    
        // Assuming you have the user's ID available
        $userId = auth()->user()->id; 
    
        // Merge the validated projectData with user_id
        $projectData['user_id'] = $userId;
    
        $project = null;
        $isUpdating = isset($projectData['id']) && $projectData['id'];
    
        // Check if an existing project ID is provided
        if ($isUpdating) {
            // Find the existing project
            $project = Project::find($projectData['id']);
            if (!$project) {
                return response()->json(['message' => 'Project not found'], 404);
            }
    
            // Retain existing movie poster if a new one isn't uploaded
            if (!isset($projectData['uploadedImage']) || !$projectData['uploadedImage']) {
                $videoProductionData['movie_poster'] = $project->video_production['movie_poster'] ?? null;
            }
        }
    
        // Handle the image upload and save it to the storage folder
        if (isset($projectData['uploadedImage']) && $projectData['uploadedImage']) {
            $uploadedImage = $projectData['uploadedImage'];
    
            // Store the image in the storage folder
            $imagePath = $uploadedImage->store('public/user'.$userId.'/projects/images');
    
            // Get image URL
            $imageUrl = asset(str_replace('public/', 'storage/', $imagePath));
    
            // Get image file size
            $fileSize = $uploadedImage->getSize();
    
            // Get image dimensions from request
            $width = $request->input('posterWidth', 0);
            $height = $request->input('posterHeight', 0);
    
            // Assign movie poster details to the video production data array
            $videoProductionData['movie_poster'] = [
                'url' => $imageUrl,
                'size' => $fileSize,
                'dimensions' => "{$width}x{$height}"
            ];
        }
    
        // Add the video production data to projectData
        $projectData['video_production'] = $videoProductionData;
    
        if ($isUpdating) {
            // Update the existing project
            $project->update($projectData);
        } else {
            // Create a new project record with the specified fields
            $project = Project::create($projectData);
        }
    
        // Return the created/updated project instance or any other relevant data
        return $project;
    }

    
    
    

}
