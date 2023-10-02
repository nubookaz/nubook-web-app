<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;  
use App\Models\Project;
use App\Models\CallSheet;
use App\Models\ParkingLocation;
use App\Models\HospitalLocation;

use Inertia\Inertia;
use DB;

class LocationsController extends Controller
{
    public function create($callSheetId)
    {
        // Show the create location form
        return view('locations.create', ['callSheetId' => $callSheetId]);
    }


    public function store(Request $request, $id, $callSheetId)
    {

            // Validate the request data for the main location
            $validatedData = $request->validate([
                'name' => 'required|string',
                'street_address' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'zip_code' => 'required|string',
                'country' => 'required|string',
            ]);
        
            // Create a new location record for the main location
            $mainLocation = Location::create($validatedData);
    
            // Associate the main location with the call sheet
    
            // Conditionally create a parking location if provided
            if ($request->has('parking_location')) {
                $parkingLocationData = $request->input('parking_location');
                
                // Create a new ParkingLocation model
                $parkingLocation = new ParkingLocation($parkingLocationData);
                
                // Save the ParkingLocation model
                $parkingLocation->save();
                
                // Set the parking_location_id on the main Location model
                $mainLocation->parking_location_id = $parkingLocation->id;
                
                // Save the main Location to update the foreign key
                $mainLocation->save();
            }

            // Conditionally create a hospital location if provided
            if ($request->has('hospital_location')) {
                $hospitalLocationData = $request->input('hospital_location');
                
                // Create a new HospitalLocation model
                $hospitalLocation = new HospitalLocation($hospitalLocationData);
                
                // Save the HospitalLocation model
                $hospitalLocation->save();
                
                // Set the hospital_location_id on the main Location model
                $mainLocation->hospital_location_id = $hospitalLocation->id;
                
                // Save the main Location to update the foreign key
                $mainLocation->save();
            }

            $mainLocation->callSheets()->attach($callSheetId);

    
            return redirect()->route('projects.callSheets.edit', [
                'id' => $id,
                'callSheetId' => $callSheetId,
            ])->with('success', 'Location added successfully');
    }
    
    


    public function edit($callSheetId, $locationId)
    {
        // Retrieve the CallSheet and Location using the provided IDs
        $callSheet = CallSheet::findOrFail($callSheetId);
        $location = Location::findOrFail($locationId);

        // Pass the CallSheet and Location to the view
        return view('locations.edit', compact('callSheet', 'location'));
    }


    public function update(Request $request, $locationId)
    {
        // Validate and update the location data
        // ...

        // Redirect back to the call sheet or another appropriate page
        return redirect()->route('projects.callSheets.edit', ['id' => $request->input('call_sheet_id')]);
    }
}
