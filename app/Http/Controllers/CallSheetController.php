<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\CallSheet; 
use App\Models\Location;  
use App\Models\User;  
use Illuminate\Support\Facades\Auth;

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
    
    

    public function store(Request $request, $projectId)
    {
        // Retrieve the project data based on $projectId
        $project = Project::find($projectId);

        // Call createCallSheet method with the project ID
        $callSheet = $this->createCallSheet($request, $projectId);
    
        // Redirect to the call sheet edit page with the project ID and call sheet ID
        return redirect()->route('projects.callSheets.edit', [
            'id' => $projectId,
            'callSheetId' => $callSheet->id, // Pass the ID of the newly created call sheet
            'projects' => $project,
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
        $user = User::find($project->user_id);
        $userCompany = $user->productionCompany;

        // Retrieve the call sheet by its ID
        $callSheet = CallSheet::findOrFail($callSheetId);
        // Controller
        //  dd($callSheet->locations()->with('parkingLocation', 'hospitalLocation'));

        $locations = CallSheet::findOrFail($callSheetId)->locations()->with('parkingLocation', 'hospitalLocation')->get();

            // Retrieve associated locations for the call sheet
        //  $locations = $callSheet->locations; // Assuming $callSheet is an instance of CallSheet

        // Render the project edit page using Inertia.js
        return Inertia::render('Projects/CallSheets/CallSheetDetails', [
            'userCompany' => $userCompany,
            'project' => $project, // Pass the project data
            'callSheet' => $callSheet, // Pass the call sheet data to the edit page
            'locations' => $locations, // Pass the associated locations data to the edit page
        ]);
    }
        
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id, $callSheetId)
    {
        // Find the CallSheet by ID
        $callSheet = CallSheet::findOrFail($callSheetId);
        $project = Project::find($id);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'status' => 'nullable',
            'bulletin' => 'nullable|string|max:400',
            'callSheetTitle' => 'nullable|string|max:255',
            'callSheetDate' => 'nullable|date',
        ]);

        // Remove null values from the validated data
        $validatedData = array_filter($validatedData, function ($value) {
            return $value !== null;
        });

        // Update the CallSheet with validated data
        $callSheet->update($validatedData);

        return redirect()->route('projects.callSheets.edit', ['id' => $id, 'callSheetId' => $callSheetId]);
    }


    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
