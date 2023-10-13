<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\CallSheet;
use App\Models\ParkingLocation;
use App\Models\HospitalLocation;
use App\Http\Traits\LocationTrait;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    use LocationTrait;

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
        $mainLocation->callSheets()->attach($callSheetId);
        // dd("Store Method 1",$request, $mainLocation, $request->has('parking_location'));

    
        // Conditionally create a parking location if provided
        if ($request->has('parking_location')) {
            $this->storeLocation($request, $mainLocation, 'parking');
        }

        // Conditionally create a hospital location if provided
        if ($request->has('hospital_location')) {
            $this->storeLocation($request, $mainLocation, 'hospital');
        }
    
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

    // LocationsController.php

    public function update(Request $request, $id, $callSheetId, $locationId)
    {
        dd("Update Method",$request);

        try {
            // Find the location by ID
            $location = Location::with(['parkingLocation', 'hospitalLocation'])->findOrFail($locationId);

            // Update the main location and associated location types
            $this->updateLocation($request, $location, 'main');
            $this->updateLocation($request, $location, 'parking');
            $this->updateLocation($request, $location, 'hospital');

            // Redirect back to the call sheet or another appropriate page
            return redirect()->route('projects.callSheets.edit', [
                'id' => $id,
                'callSheetId' => $callSheetId,
            ])->with('success', 'Location updated successfully');
        } catch (ModelNotFoundException $exception) {
            // Handle the case where the location with the given ID is not found
            return redirect()->back()->with('error', 'Location not found');
        } catch (\Exception $e) {
            // Handle other exceptions if needed
            return redirect()->back()->with('error', 'An error occurred while updating location');
        }
    }


    public function softDelete($id, $callSheetId, $locationId)
    {
        try {
            // Find the location by ID
            $location = Location::with(['parkingLocation', 'hospitalLocation'])->findOrFail($locationId);

            // Soft delete the main location and associated location types
            $this->softDeleteLocation($location);

            // Redirect back to the call sheet or another appropriate page
            return redirect()->route('projects.callSheets.edit', [
                'id' => $id,
                'callSheetId' => $callSheetId,
            ])->with('success', 'Location soft deleted successfully');
        } catch (ModelNotFoundException $exception) {
            // Handle the case where the location with the given ID is not found
            return redirect()->back()->with('error', 'Location not found');
        } catch (\Exception $e) {
            // Handle other exceptions if needed
            return redirect()->back()->with('error', 'An error occurred while soft deleting location');
        }
    }

    public function destroy($id, $callSheetId, $locationId)
    {
        try {
            // Find the location by ID
            $location = Location::with(['parkingLocation', 'hospitalLocation'])->findOrFail($locationId);

            if ($location->parkingLocation) {
                $parkingLocationId = $location->parkingLocation->id;
            }

            $parkingLocation = ParkingLocation::find($parkingLocationId);


            try {
                $parkingLocation->forceDelete();
            } catch (\Exception $e) {
                // Log or dump the exception
                dd($e->getMessage());
            }

            // Destroy the main location and associated location types
            $this->destroyLocation($location);

            // Redirect back to the call sheet or another appropriate page
            return redirect()->route('projects.callSheets.edit', [
                'id' => $id,
                'callSheetId' => $callSheetId,
            ])->with('success', 'Location destroyed successfully');
        } catch (ModelNotFoundException $exception) {
            // Handle the case where the location with the given ID is not found
            return redirect()->back()->with('error', 'Location not found');
        } catch (\Exception $e) {
            // Handle other exceptions if needed
            return redirect()->back()->with('error', 'An error occurred while destroying location');
        }
    }

}
