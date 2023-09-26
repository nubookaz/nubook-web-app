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
    
    


    public function store(Request $request, $projectId)
    {
        // Retrieve the project data based on $projectId
        $projects = Project::find($projectId);
        // Call createCallSheet method with the project ID
        $callSheets = $this->createCallSheet($request, $projectId);
    
        return redirect()->route('projects.callSheets.index', [
            'id' => $projectId,
            'projects' => $projects, 
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
    public function update(Request $request, $id, $callSheetId)
    {
        // Find the CallSheet by ID
        $callSheet = CallSheet::findOrFail($callSheetId);
        $project = Project::find($id);
    
        // Define validation rules based on the presence of fields in the request
        $validationRules = [];
    
        if ($request->has('status')) {
            // If "status" field is present in the request (dropdown option selected), make it required
            $validationRules['status'] = 'required'; // Customize validation rules as needed
        }
    
        if ($request->has('bulletin')) {
            // If "bulletin" field is present in the request (save button clicked), validate it
            $validationRules['bulletin'] = 'nullable|string|max:400'; // Make bulletin field optional
        }
        
    
        // Validate the incoming request data
        $validatedData = $request->validate($validationRules);
    
        // Update the CallSheet with validated data
        $callSheet->update([
            'status' => $validatedData['status'] ?? $callSheet->status, // Use the existing status if not in the request
            'bulletin' => $validatedData['bulletin'] ?? $callSheet->bulletin, // Use the existing bulletin if not in the request
        ]);
    
        // Return a response indicating success
        return Inertia::render('Projects/CallSheets/CallSheetEdit', [
            'id' => $id,
            'project' => $project, // Pass the project data
            'callSheet' => $callSheet, // Pass the project data to the edit page
        ]);
    }
    
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
