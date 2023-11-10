<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use App\Models\Location;
use App\Models\ParkingLocation;
use App\Models\HospitalLocation;

use Illuminate\Support\Facades\Validator;

trait LocationTrait

{
  public function storeLocation(Request $request, Location $mainLocation, $locationType)
    {
        // Validate the request data for the specified location type
        $validatedData = $request->validate([
            "{$locationType}_location.name" => 'required|string',
            "{$locationType}_location.street_address" => 'required|string',
            "{$locationType}_location.city" => 'required|string',
            "{$locationType}_location.state" => 'required|string',
            "{$locationType}_location.zip_code" => 'required|string',
            "{$locationType}_location.country" => 'required|string',
        ]);

        // Create a new location record for the specified location type
        $locationModelClass = $this->getLocationModel($locationType . "_location");
        $locationTypeModel = $locationType . "Location";

        if (!$locationModelClass) {
            // Handle the case where the location type is not recognized
            return response()->json(['error' => 'Invalid location type'], 422);
        }

        $locationModel = new $locationModelClass(); // Instantiate the model class
        $location = $locationModel->create($validatedData["{$locationType}_location"]);

        // Associate the location with the main location using the relationship
        $mainLocation->{$locationTypeModel}()->associate($location);
        $mainLocation->save();
    }

        

        
    private function getLocationModel($locationType)
    {
        // Map location type to the corresponding model
        $modelMap = [
            'parking_location' => ParkingLocation::class,
            'hospital_location' => HospitalLocation::class,
        ];

        return $modelMap[$locationType] ?? null;
    }
    
    
    
    
    public function updateLocation(Request $request, $location, $locationType)
    {
        // Validate the request data based on the location type (e.g., parking or hospital)
        $validatedLocationData = $request->validate([
            'name' => 'required|string',
            'street_address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'country' => 'required|string',
            // Add other validation rules as needed
        ]);

        // Check if the location is null
        if ($location) {
            // Update the location attributes
            $location->update($validatedLocationData);

            // If it's a parking location, update the parking location attributes
            if ($locationType === 'parking' && $location->parkingLocation) {
                $this->updateParkingLocation($request, $location->parkingLocation);
            }

            // If it's a hospital location, update the hospital location attributes
            if ($locationType === 'hospital' && $location->hospitalLocation) {
                $this->updateHospitalLocation($request, $location->hospitalLocation);
            }
        }

        // Return the updated location or null if it was null
        return $location;
    }


    public function softDeleteLocation($location)
    {
        // Soft delete the main location
        $location->delete();
    }

    public function destroyLocation(Location $location)
    {

        // Delete associated parking location
        if ($location->parkingLocation) {
            $location->parkingLocation->forceDelete();
        }

        // Delete associated hospital location
        if ($location->hospitalLocation) {
            $location->hospitalLocation->forceDelete();
        }

        // Force delete the main location
        $location->forceDelete();

    }
    

}