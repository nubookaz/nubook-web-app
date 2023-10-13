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


    public function updateMainLocation(Request $request, $id, $callSheetId, $locationId)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'street_address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'country' => 'required|string',
            // Add other validation rules as needed
        ]);
    
        try {
            // Find the location by ID
            $location = Location::findOrFail($locationId);
    
            // Update the location with validated data
            $location->update($validatedData);
    
            // Redirect back to the call sheet or another appropriate page
            return redirect()->route('projects.callSheets.edit', [
                'id' => $id,
                'callSheetId' => $callSheetId, // Assuming 'callSheetId' is a property of the Location model
            ])->with('success', 'Location updated successfully');
        } catch (ModelNotFoundException $exception) {
            // Handle the case where the location with the given ID is not found
            // You might want to redirect with an error message or log the error
            return redirect()->back()->with('error', 'Location not found');
        }
    }

    public function storeParkingLocation(Request $request, $id, $callSheetId, $locationId)
    {
        try {
            // Find the location by ID
            $location = Location::findOrFail($locationId);

            // Check if there's already a parking location associated with the location
            $parkingLocation = $location->parkingLocation;

            if (!$parkingLocation) {
                // If not, create a new parking location
                $parkingLocation = new ParkingLocation();
            }
    
            // Validate and update parking location data
            $validatedParkingLocationData = $request->validate([
                'name' => 'required|string',
                'street_address' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'zip_code' => 'required|string',
                'country' => 'required|string',
                // Add other validation rules for parking location as needed
            ]);
            // Update the parking location attributes
            $parkingLocation->fill($validatedParkingLocationData);

            // Save the parking location to ensure it's in the database
            $parkingLocation->save();
    
            // Associate the parking location with the location
            $location->parkingLocation()->associate($parkingLocation)->save();

            // Redirect back to the call sheet or another appropriate page
            return redirect()->route('projects.callSheets.edit', [
                'id' => $id,
                'callSheetId' => $callSheetId, // Assuming 'callSheetId' is a property of the Location model
            ])->with('success', 'Parking location stored successfully');
        } catch (ModelNotFoundException $exception) {
            // Handle the case where the location with the given ID is not found
            // You might want to redirect with an error message or log the error
            return redirect()->back()->with('error', 'Location not found');
        } catch (\Exception $e) {
            // Add debugging statement
            dd($e->getMessage());
            // Handle other exceptions if needed
            return redirect()->back()->with('error', 'An error occurred while storing parking location');
        }
    }
    
    
    public function updateParkingLocation(Request $request, $locationId)
    {
        try {
            // Find the parking location by ID
            $parkingLocation = ParkingLocation::findOrFail($locationId);

            // Validate and update parking location data
            $validatedParkingLocationData = $request->validate([
                'name' => 'required|string',
                'street_address' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'zip_code' => 'required|string',
                'country' => 'required|string',
                // Add other validation rules for parking location as needed
            ]);

            // Update the parking location attributes
            $parkingLocation->update($validatedParkingLocationData);

            // Save the parking location to ensure it's in the database
            $parkingLocation->save();

            // Get the associated location
            $location = $parkingLocation->location;

            // Redirect back to the call sheet or another appropriate page
            return redirect()->route('projects.callSheets.edit', [
                'id' => $location->project_id,
                'callSheetId' => $location->call_sheet_id,
            ])->with('success', 'Parking location updated successfully');
        } catch (ModelNotFoundException $exception) {
            // Handle the case where the parking location with the given ID is not found
            // You might want to redirect with an error message or log the error
            return redirect()->back()->with('error', 'Parking location not found');
        } catch (\Exception $e) {
            // Handle other exceptions if needed
            return redirect()->back()->with('error', 'An error occurred while updating parking location');
        }
    }


    
    
    
}
