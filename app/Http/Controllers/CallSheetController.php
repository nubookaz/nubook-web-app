<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\CallSheet; 
use App\Models\Location;  
use App\Models\FilmLocation;  
use App\Models\User;  


use Illuminate\Support\Facades\Auth;

use App\Http\Traits\CallSheetTrait;

use Inertia\Inertia;

class CallSheetController extends Controller
{

    use CallSheetTrait;

    public function fetchCallSheetData($id, $callSheetId)
    {
        try {
            // Fetch the specific call sheet data by ID
            $callSheet = CallSheet::with('filmLocation.location')->findOrFail($callSheetId);
            // dd($callSheet);
            // You can also add any additional logic here if needed
    
            return response()->json($callSheet);
        } catch (\Exception $e) {
            // Handle errors, e.g., call sheet not found
            return response()->json(['error' => 'Call sheet not found'], 404);
        }
    }
    




    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        // dd($id);
        // Retrieve the project based on the project ID from the route parameter
        $projects = Project::findOrFail($id);

        $callSheets = $projects->callSheets; // Assuming you have defined the relationship correctly in your Project model


        return Inertia::render('Projects/SubPages/CallSheets', [
            'projects' => $projects,
            'callSheets' => $callSheets,
        ]);
    }
 
    public function saveWeatherData(Request $request, $id, $callSheetId)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'weatherData' => 'required', // Ensure that weatherData is provided
        ]);
    
        $callSheet = CallSheet::find($callSheetId);
        if (!$callSheet) {
            return response()->json(['error' => 'Call Sheet not found'], 404);
        }
    
        // Directly use the validated data
        $callSheet->weather = $validatedData['weatherData'];

        $callSheet->weather_updated_at = now(); 
        
        if ($callSheet->save()) {
            return response()->json(['success' => 'Weather data saved successfully']);
        } else {
            return response()->json(['error' => 'Failed to save weather data'], 500);
        }
    }
    
    public function storeCallSheetDetails(Request $request, $projectId)
    {
        $callSheetData = $request['callSheetData'];
        $callSheetAddress = $request['callSheetAddress'];
        $filmLocation = null;

        if (!empty(array_filter($callSheetAddress, function($value) { return $value !== null; }))) {
            // Create or find the Location
            $location = $this->createOrUpdateLocation($callSheetAddress);
    
            // Create or find the FilmLocation and associate it with the Location
            $filmLocation = FilmLocation::firstOrCreate(['location_id' => $location->id]);
            
            $callSheet = $this->createCallSheet($callSheetData, $projectId, $filmLocation->id);
            

        } else {

            $callSheet = $this->createCallSheet($callSheetData, $projectId, null);

        }
 
        return redirect()->route('callSheets.edit.page', [
            'id' => $projectId,
            'callSheetId' => $callSheet->id,
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





    public function editDetailsPage($id, $callSheetId)
    {
        // Retrieve the project by its ID
        $project = Project::find($id);
        // dd(Auth::user());
        // $user = Auth::user();
        // $userCompany = $user->productionCompany;

        // Retrieve the call sheet by its ID
        $callSheet = CallSheet::with(['project', 'filmLocation.location'])->findOrFail($callSheetId);

        $filmLocationAddress = $callSheet->filmLocation ? $callSheet->filmLocation->location->address : null;


        // $locations = CallSheet::findOrFail($callSheetId)->locations()->with('parkingLocation', 'hospitalLocation')->get();

      
        return Inertia::render('Projects/CallSheets/CallSheetDetails', [
            // 'userCompany' => $userCompany,
            'project' => $project, // Pass the project data
            'callSheet' => $callSheet, // Pass the call sheet data to the edit page
            'location' => $filmLocationAddress, // Pass the associated locations data to the edit page
        ]);
    }





        
    public function updateCallSheetDetails(Request $request, $id, $callSheetId)
    {

        $callSheetData = $request['callSheetData'];
        $callSheetAddress = $request['callSheetAddress'];

        // Find the CallSheet based on $callSheetId
        $callSheet = CallSheet::find($callSheetId);
    
        if ($callSheet) {
            // Get the associated FilmLocation
            $filmLocation = $callSheet->filmLocation;
    
            if ($filmLocation) {
                // Update the existing FilmLocation with the new data


                $filmLocation->location->update([
                    'street_address' => $callSheetAddress['street_address'],
                    'city' => $callSheetAddress['city'],
                    'state' => $callSheetAddress['state'],
                    'zip_code' => $callSheetAddress['zip_code'],
                    // Update other location fields as needed
                ]);
    
                // Update the CallSheet name and date
                $callSheet->update([
                    'call_sheet_name' => $callSheetData['call_sheet_name'],
                    'call_sheet_date' => $callSheetData['call_sheet_date'],
                ]);
            } else {


                // If no FilmLocation exists, create a new one and associate it with the CallSheet
                $location = Location::create([
                    'street_address' => $callSheetAddress['street_address'],
                    'city' => $callSheetAddress['city'],
                    'state' => $callSheetAddress['state'],
                    'zip_code' => $callSheetAddress['zip_code'],
                    // Set other location fields as needed
                ]);
                // Create a new FilmLocation and associate it with the Location
                $filmLocation = new FilmLocation();
                $filmLocation->location_id = $location->id;
           
                $filmLocation->save();
                $callSheet->film_locations_id = $filmLocation->id;

                // Update the CallSheet name and date
                $callSheet->update([
                    'call_sheet_name' => $callSheetData['call_sheet_name'],
                    'call_sheet_date' => $callSheetData['call_sheet_date'],
                ]);
            }

 
            // Return the updated data as JSON
            return response()->json([
                'callSheet' => $callSheet->toArray(),
            ]);
        } else {
            // Handle the case where the CallSheet with the given ID doesn't exist
            // You may want to add error handling here
            return response()->json([
                'error' => 'CallSheet not found',
            ], 404); // Return a 404 status code for not found
        }
    }
    






    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, $id, $callSheetId)
    // {
    //     // Find the CallSheet by ID
    //     $callSheet = CallSheet::findOrFail($callSheetId);
    //     $project = Project::find($id);

    //     // Validate the incoming request data
    //     $validatedData = $request->validate([
    //         'status' => 'nullable',
    //         'bulletin' => 'nullable|string|max:400',
    //         'callSheetTitle' => 'nullable|string|max:255',
    //         'callSheetDate' => 'nullable|date',
    //     ]);

    //     // Remove null values from the validated data
    //     $validatedData = array_filter($validatedData, function ($value) {
    //         return $value !== null;
    //     });

    //     // Update the CallSheet with validated data
    //     $callSheet->update($validatedData);

    //     return redirect()->route('projects.callSheets.edit', ['id' => $id, 'callSheetId' => $callSheetId]);
    // }


    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
