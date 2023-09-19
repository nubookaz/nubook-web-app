<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\CallSheet; 

use App\Http\Traits\CallSheetTrait;

use Inertia\Inertia;

class CallSheetController extends Controller
{

    use CallSheetTrait;

    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        // dd($id);
        // Retrieve the project based on the project ID from the route parameter
        $projects = Project::findOrFail($id);

        $callSheets = $projects->callSheets; // Assuming you have defined the relationship correctly in your Project model
        return Inertia::render('Projects/CallSheets/CallSheetOverview', [
            'projects' => $projects,
            'callSheets' => $callSheets,
        ]);
    }
    
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $projectId)
    {
        // Retrieve the project data based on $projectId
        $project = Project::find($projectId);
    
        // Call createCallSheet method with the project ID
        $callSheets = $this->createCallSheet($request, $projectId);
    
        // Pass the $project and $callSheets variables to the view
        return Inertia::render('Projects/CallSheets/CallSheetOverview', [
            'project' => $project, // Pass the project data
            'callSheets' => $callSheets,
        ]);
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id, $callSheetId)
    {
        // Retrieve the project by its ID
        $project = Project::find($id);

        $callSheet = CallSheet::findOrFail($callSheetId);
    
        // Render the project edit page using Inertia.js
        return Inertia::render('Projects/CallSheets/CallSheetEdit', [
            'project' => $project, // Pass the project data
            'callSheet' => $callSheet, // Pass the project data to the edit page
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
