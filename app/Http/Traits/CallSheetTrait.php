<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\CallSheet;
use App\Models\Location;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;

trait CallSheetTrait

{


    public function createCallSheet(array $data, $projectId, $filmLocationsId)
    {
        // Create a new call sheet
        $callSheet = new CallSheet;
        $callSheet->fill($data);
        $callSheet->project_id = $projectId;
        $callSheet->film_locations_id = $filmLocationsId;
        $callSheet->save();
    
        return $callSheet;
    }
    

    public function updateCallSheet($callSheetId, array $data, $projectId, $filmLocationsId)
    {
        // Fetch the call sheet by its ID
        $callSheet = CallSheet::findOrFail($callSheetId);

        // Update the call sheet with new data
        $callSheet->fill($data);
        $callSheet->project_id = $projectId;
        $callSheet->film_locations_id = $filmLocationsId;
        $callSheet->save();

        return $callSheet;
    }
 
    public function createOrUpdateLocation(array $data)
    {
        // Validate the data
        $validatedData = Validator::make($data, [
            'street_address' => 'string|max:255',
            'city' => 'string|max:255',
            'state' => 'string|max:255',
            'zip_code' => 'string|max:255',
        ])->validate();
    
        // Find an existing location based on the provided data
        $location = Location::where([
            'street_address' => $validatedData['street_address'],
            'city' => $validatedData['city'],
            'state' => $validatedData['state'],
            'zip_code' => $validatedData['zip_code'],
        ])->first();
    
        if (!$location) {
            // If the location doesn't exist, create it
            $location = Location::create($validatedData);
        }
    
        return $location;
    }

}
