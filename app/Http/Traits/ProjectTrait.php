<?php
namespace App\Http\Traits;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Role;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait ProjectTrait
{

    public function createOrUpdateProject(Request $request)
    {
        // Retrieve the consolidated project data from the request
        $projectData = $request->except(['uploadedImage', 'viewer_rating', 'primary_genre', 'secondary_genre', 'filming_days']);
    
        // Handle video production data separately
        $videoProductionData = $this->getVideoProductionDataFromRequest($request);
    
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
    
        // Create or find the project
        $project = $this->createOrFindProject($projectData, $videoProductionData);
    
        // If there's an image uploaded, handle the image upload
        if ($request->hasFile('uploadedImage')) {
            $videoProductionData['movie_poster'] = $this->handleImageUpload($request, $project);
        }
    
        // Add or update the video production data
        $project->video_production = $videoProductionData;
        $project->save();
    
        // Fetch the admin role ID
        $adminRole = Role::where('name', 'admin')->firstOrFail();
    
        // Check if the project is being updated or created
        $isUpdating = isset($projectData['id']) && $projectData['id'];
    
        if ($isUpdating) {
            // If updating, sync without detaching to preserve other relationships
            $project->users()->syncWithoutDetaching([Auth::id() => ['role_id' => $adminRole->id]]);
        } else {
            // If creating, attach the authenticated user as admin
            $project->users()->attach(Auth::id(), ['role_id' => $adminRole->id]);
        }
    
        // Return the created/updated project instance
        return $project;
    }
    

    protected function getVideoProductionDataFromRequest(Request $request)
    {
        return [
            'movie_poster' => null,
            'viewer_rating' => $request->input('viewer_rating'),
            'primary_genre' => $request->input('primary_genre'),
            'secondary_genre' => $request->input('secondary_genre'),
            'filming_days' => $request->input('filming_days'),
        ];
    }

    protected function createOrFindProject($projectData, $videoProductionData)
    {
        $project = null;
        $isUpdating = isset($projectData['id']) && $projectData['id'];

        if ($isUpdating) {
            $project = Project::findOrFail($projectData['id']);
            $project->fill($projectData);
        } else {
            $project = new Project($projectData);
            $project->save();
        }

        return $project;
    }

    protected function handleImageUpload(Request $request, Project $project)
    {
        $uploadedImage = $request->file('uploadedImage');
        $userId = Auth::id();
        $imagePath = $uploadedImage->store("public/user{$userId}/projects/images");
        $imageUrl = Storage::url($imagePath);

        return [
            'url' => $imageUrl,
            'size' => $uploadedImage->getSize(),
            'dimensions' => $this->getImageDimensions($uploadedImage)
        ];
    }

    protected function getImageDimensions($image)
    {
        list($width, $height) = getimagesize($image);
        return "{$width}x{$height}";
    }
}