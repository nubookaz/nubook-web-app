<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\CallSheet; 
use App\Models\Location;  

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
     
         // Retrieve the call sheet by its ID
         $callSheet = CallSheet::findOrFail($callSheetId);
     // Controller
        //  dd($callSheet->locations()->with('parkingLocation', 'hospitalLocation'));

        $locations = CallSheet::findOrFail($callSheetId)->locations()->with('parkingLocation', 'hospitalLocation')->get();

         // Retrieve associated locations for the call sheet
        //  $locations = $callSheet->locations; // Assuming $callSheet is an instance of CallSheet
     
         // Render the project edit page using Inertia.js
         return Inertia::render('Projects/CallSheets/CallSheetEdit', [
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

    if ($request->has('callSheetTitle')) {
        // If "callSheetTitle" field is present in the request, make it required
        $validationRules['callSheetTitle'] = 'required|string|max:255'; // Customize validation rules as needed
    }

    if ($request->has('callSheetDate')) {
        // If "callSheetDate" field is present in the request, make it required
        $validationRules['callSheetDate'] = 'required|date'; // Customize validation rules as needed
    }

    dd($request->all());

    // Validate the incoming request data
    $validatedData = $request->validate($validationRules);

    // Update the CallSheet with validated data
    // $dataToUpdate = [
    //     'status' => $callSheet->status,
    //     'bulletin' => $callSheet->bulletin,
    //     'callSheetTitle' => $callSheet->callSheetTitle,
    //     'callSheetDate' => $callSheet->callSheetDate,
    // ];

    dd($callSheet->callSheetTitle);

    if ($request->has('status')) {
        $dataToUpdate['status'] = $validatedData['status'];
    }

    if ($request->has('bulletin')) {
        $dataToUpdate['bulletin'] = $validatedData['bulletin'];
    }

    if ($request->has('callSheetTitle')) {
        $dataToUpdate['callSheetTitle'] = $validatedData['callSheetTitle'];
    }

    if ($request->has('callSheetDate')) {
        $dataToUpdate['callSheetDate'] = $validatedData['callSheetDate'];
    }



    $callSheet->update($dataToUpdate);

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
