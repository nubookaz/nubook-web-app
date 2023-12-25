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
   
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
         // Retrieve the project based on the project ID from the route parameter
        $projects = Project::findOrFail($id);

        $callSheets = $projects->callSheets->load(
            'filmLocation',
            'parkingLocation',
        ); 


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

        // Initialize $filmLocationId as null in case the address is not provided
        $filmLocationId = null;

        // Check if callSheetAddress is provided and not just empty fields
        if (!empty(array_filter($callSheetAddress))) {
            // Create or find the Location
            $location = $this->createOrUpdateLocation($callSheetAddress);
            
            // Create or find the FilmLocation and associate it with the Location
            $filmLocation = FilmLocation::firstOrCreate(['location_id' => $location->id]);
            
            // Set the filmLocationId to be used as the third argument
            $filmLocationId = $filmLocation->id;
        }

        // Create the CallSheet with or without the film location id
        $callSheet = $this->createCallSheet($callSheetData, $projectId, $filmLocationId);

        // Redirect to the edit page
        return redirect()->route('projects.callSheets.edit.page', [
            'id' => $projectId,
            'callSheetId' => $callSheet->id,
        ]);
    }


    public function editDetailsPage($id, $callSheetId)
    {
        // Retrieve the project by its ID
        $project = Project::find($id);
    
        // Retrieve the call sheet by its ID
        $callSheet = CallSheet::with(['project', 'filmLocation.location', 'parkingLocation.location', 'hospitalLocation.location', 'project.user.primaryProductionCompany'])->findOrFail($callSheetId);
      
        return Inertia::render('Projects/CallSheets/CallSheetDetails', [
            // 'userCompany' => $userCompany,
            'project' => $project, // Pass the project data
            'callSheet' => $callSheet, // Pass the call sheet data to the edit page
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


                $validated = $request->validate([
                    'callSheetAddress.latitude' => 'nullable|numeric|between:-90,90',
                    'callSheetAddress.longitude' => 'nullable|numeric|between:-180,180',
                ]);
        
                // dd($callSheetAddress['latitude']);

                $filmLocation->location->update([
                    'street_address' => $callSheetAddress['street_address'],
                    'city' => $callSheetAddress['city'],
                    'state' => $callSheetAddress['state'],
                    'zip_code' => $callSheetAddress['zip_code'],
                    'latitude' => array_key_exists('latitude', $callSheetAddress) ? (float) $callSheetAddress['latitude'] : null,
                    'longitude' => array_key_exists('longitude', $callSheetAddress) ? (float) $callSheetAddress['longitude'] : null,                
                ]);

                // Update the CallSheet name and date
                $callSheet->update([
                    'call_sheet_name' => $callSheetData['call_sheet_name'],
                    'call_sheet_date_time' => $callSheetData['call_sheet_date_time'],
                ]);

            } else {

                $locationData = [
                    'street_address' => $callSheetAddress['street_address'],
                    'city' => $callSheetAddress['city'],
                    'state' => $callSheetAddress['state'],
                    'zip_code' => $callSheetAddress['zip_code'],
                ];
    
                if (array_key_exists('latitude', $callSheetAddress)) {
                    $locationData['latitude'] = $callSheetAddress['latitude'];
                }
    
                if (array_key_exists('longitude', $callSheetAddress)) {
                    $locationData['longitude'] = $callSheetAddress['longitude'];
                }
    
                $location = Location::create($locationData);

                // Create a new FilmLocation and associate it with the Location
                $filmLocation = new FilmLocation();
                $filmLocation->location_id = $location->id;
           
                $filmLocation->save();
                $callSheet->film_location_id = $filmLocation->id;
                $locationId = $callSheet->film_location_id;

                // Update the CallSheet name and date
                $callSheet->update([
                    'call_sheet_name' => $callSheetData['call_sheet_name'],
                    'call_sheet_date_time' => $callSheetData['call_sheet_date_time'],
                ]);
            }
            
            $locationData = Location::find($filmLocation->location_id);

            // Attach location data to the callSheet object
            $callSheet->locationData = $locationData;
            $callSheet = CallSheet::with(['project', 'filmLocation.location', 'parkingLocation.location', 'hospitalLocation.location'])->findOrFail($callSheetId);

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
    
 
    /**
     * Update the specified resource in storage.
     */
    public function saveBulletin(Request $request, $id, $callSheetId)
    {
        // Find the CallSheet by ID
        $callSheet = CallSheet::findOrFail($callSheetId);
        $project = Project::find($id);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'bulletin' => 'nullable|string|max:300',
        ]);

        // Update the CallSheet with validated data
        $callSheet->update($validatedData);

        // Return a JSON response
        return response()->json([
            'message' => 'Bulletin updated successfully',
        ]);
    }

    public function storeCallSheetSchedule(Request $request, $projectId, $callSheetId)
    {
        // Find the CallSheet based on $callSheetId
        $callSheet = CallSheet::find($callSheetId);
    
        if ($callSheet) {
            // Decode the JSON data from the request
            $scheduleData = json_decode($request->input('schedule'), true);
    
            // Update the 'schedule' column in your CallSheet model
            $callSheet->schedule = $scheduleData;
            $callSheet->save();
    
            return response()->json([
                'success' => 'Schedule updated successfully.',
                'callSheet' => $callSheet
            ]);
        } else {
            return response()->json(['error' => 'CallSheet not found'], 404);
        }
    }
    

    public function getCallSheetSchedule($id, $callSheetId)
    {
        // Find the call sheet by ID
        $callSheet = CallSheet::find($callSheetId);

        if (!$callSheet) {
            return response()->json(['message' => 'Call Sheet not found'], 404);
        }

        // Assuming the schedule data is stored as JSON in a 'schedule' column
        $scheduleData = $callSheet->schedule;

        // If the schedule data is not empty, return it
        if (!empty($scheduleData)) {
            return response()->json($scheduleData);
        }

        // If the schedule data is empty, you can decide how to handle this.
        // For example, return an empty array or a default value.
        return response()->json([]);
    }

    /**
     * Update the schedule data for a specific call sheet.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @param  int  $callSheetId
     * @return \Illuminate\Http\Response
     */
    public function updateCallSheetSchedule(Request $request, $id, $callSheetId)
    {
        $callSheet = CallSheet::find($callSheetId);

        if (!$callSheet) {
            return response()->json(['message' => 'Call Sheet not found'], 404);
        }

        // Validate the incoming data if necessary
        $validatedData = $request->validate([
            'schedule' => 'required|json',
        ]);

        // Update the schedule data
        $callSheet->schedule = json_decode($request->schedule, true);
        $callSheet->save();

        return response()->json(['message' => 'Schedule updated successfully']);
    }

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
