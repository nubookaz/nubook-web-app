<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Project;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => 'required|string',
        ]);

        // Create a new project record with just the name
        $project = Project::create([
            'name' => $validatedData['name'],
        ]);

        // Return a response (e.g., the created project)
        return response()->json($project, 201);
    }
}
