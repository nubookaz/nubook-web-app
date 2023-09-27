<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;  
use App\Models\Project;
use App\Models\CallSheet;
use App\Models\ParkingLocation;
use App\Models\HospitalLocation;

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
        $mainLocation = new Location($validatedData);
    
        // Conditionally create a parking location if provided
        if ($request->has('parking_location')) {
            $validatedParkingData = $request->validate([
                'parking_location.name' => 'required|string',
                'parking_location.street_address' => 'required|string',
                'parking_location.city' => 'required|string',
                'parking_location.state' => 'required|string',
                'parking_location.zip_code' => 'required|string',
                'parking_location.country' => 'required|string',
            ]);
    
            $parkingLocation = new ParkingLocation($validatedParkingData);
            $parkingLocation->save();
    
            // Associate the parking location with the main location
            $mainLocation->parkingLocation()->associate($parkingLocation);
        }
    
        // Conditionally create a hospital location if provided
        if ($request->has('hospital_location')) {
            $validatedHospitalData = $request->validate([
                'hospital_location.name' => 'required|string',
                'hospital_location.street_address' => 'required|string',
                'hospital_location.city' => 'required|string',
                'hospital_location.state' => 'required|string',
                'hospital_location.zip_code' => 'required|string',
                'hospital_location.country' => 'required|string',
            ]);
    
            $hospitalLocation = new HospitalLocation($validatedHospitalData);
            $hospitalLocation->save();
    
            // Associate the hospital location with the main location
            $mainLocation->hospitalLocation()->associate($hospitalLocation);
        }
    
        // Associate the main location with the call sheet and project
        $mainLocation->callSheet()->associate($callSheetId);
        $mainLocation->project()->associate($id);
    
        // Save the main location record to the database
        $mainLocation->save();
    
        // Redirect back to the call sheet edit page or another appropriate page
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
