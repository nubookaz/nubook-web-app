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
    $mainLocation = new Location([
        'name' => $validatedData['name'],
        'street_address' => $validatedData['street_address'],
        'city' => $validatedData['city'],
        'state' => $validatedData['state'],
        'zip_code' => $validatedData['zip_code'],
        'country' => $validatedData['country'],
    ]);

    // Validate and create a parking location if provided
    if ($request->has('parking_location')) {
        $validatedParkingData = $request->validate([
            'parking_location.name' => 'required|string',
            'parking_location.street_address' => 'required|string',
            'parking_location.city' => 'required|string',
            'parking_location.state' => 'required|string',
            'parking_location.zip_code' => 'required|string',
            'parking_location.country' => 'required|string',
        ]);

        $parkingLocation = new ParkingLocation([
            'name' => $validatedParkingData['parking_location']['name'],
            'street_address' => $validatedParkingData['parking_location']['street_address'],
            'city' => $validatedParkingData['parking_location']['city'],
            'state' => $validatedParkingData['parking_location']['state'],
            'zip_code' => $validatedParkingData['parking_location']['zip_code'],
            'country' => $validatedParkingData['parking_location']['country'],
        ]);

        $parkingLocation->save();

        // Associate the parking location with the main location
        $mainLocation->parkingLocation()->associate($parkingLocation);
    }

    // Validate and create a hospital location if provided
    if ($request->has('hospital_location')) {
        $validatedHospitalData = $request->validate([
            'hospital_location.name' => 'required|string',
            'hospital_location.street_address' => 'required|string',
            'hospital_location.city' => 'required|string',
            'hospital_location.state' => 'required|string',
            'hospital_location.zip_code' => 'required|string',
            'hospital_location.country' => 'required|string',
        ]);

        $hospitalLocation = new HospitalLocation([
            'name' => $validatedHospitalData['hospital_location']['name'],
            'street_address' => $validatedHospitalData['hospital_location']['street_address'],
            'city' => $validatedHospitalData['hospital_location']['city'],
            'state' => $validatedHospitalData['hospital_location']['state'],
            'zip_code' => $validatedHospitalData['hospital_location']['zip_code'],
            'country' => $validatedHospitalData['hospital_location']['country'],
        ]);

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
        // Show the edit location form
        return view('locations.edit', ['callSheetId' => $callSheetId, 'locationId' => $locationId]);
    }

    public function update(Request $request, $locationId)
    {
        // Validate and update the location data
        // ...

        // Redirect back to the call sheet or another appropriate page
        return redirect()->route('projects.callSheets.edit', ['id' => $request->input('call_sheet_id')]);
    }
}
