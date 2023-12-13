<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CallSheet;  
use App\Models\Location;  
use App\Models\ParkingLocation;  
use App\Models\HospitalLocation;  
use Illuminate\Support\Facades\DB;





class LocationController extends Controller
{
    public function storeCallSheetLocations(Request $request, $id, $callSheetId)
    {
        $validated = $request->validate([
            'parking_address' => 'nullable|array',
            'parking_instructions' => 'nullable|string',
            'hospital_address' => 'nullable|array',
            'hospital_instructions' => 'nullable|string',
        ]);
    
        $callSheet = CallSheet::findOrFail($callSheetId);
    
        // Handle Parking Location
        $parkingLocation = $callSheet->parkingLocation()->firstOrNew([]);
        $parkingLocation->parking_instructions = $validated['parking_instructions'];
        
        $parkingAddress = $validated['parking_address'] ?? [];
        if (!empty(array_filter($parkingAddress))) {
            $location = Location::firstOrCreate($parkingAddress);
            $parkingLocation->location_id = $location->id;
        }
        $parkingLocation->save();
    
        // Update parking_location_id in CallSheet
        $callSheet->parking_location_id = $parkingLocation->id;
    
        // Handle Hospital Location
        $hospitalLocation = $callSheet->hospitalLocation()->firstOrNew([]);
        $hospitalLocation->hospital_instructions = $validated['hospital_instructions'];
    
        $hospitalAddress = $validated['hospital_address'] ?? [];
        if (!empty(array_filter($hospitalAddress))) {
            $location = Location::firstOrCreate($hospitalAddress);
            $hospitalLocation->location_id = $location->id;
        }
        $hospitalLocation->save();
    
        // Update hospital_location_id in CallSheet
        $callSheet->hospital_location_id = $hospitalLocation->id;
    
        // Save the CallSheet with updated references
        $callSheet->save();
    
        // Reload the CallSheet to reflect changes
        $callSheet->load('parkingLocation.location', 'hospitalLocation.location');
    
        return response()->json([
            'callSheet' => $callSheet->toArray(),
        ]);
    }
    
    






    // public function storeCallSheetLocations(Request $request, $id, $callSheetId)
    // {
    //     $validated = $request->validate([
    //         'parking_address' => 'nullable|array',
    //         'parking_instructions' => 'nullable|string',
    //         'hospital_address' => 'nullable|array',
    //         'hospital_instructions' => 'nullable|string',
    //     ]);
    
    //     $callSheet = CallSheet::findOrFail($callSheetId);

    
    //     // Handle Parking Location
    //     $parkingAddress = $validated['parking_address'] ?? [];
    //     if (!empty(array_filter($parkingAddress))) {
    //         $location = Location::firstOrCreate($parkingAddress);
    //         $parkingLocationId = $location->id;
    //     } else {
    //         $parkingLocationId = null;
    //     }
    
    //     $parkingLocation = ParkingLocation::updateOrCreate(
    //         ['location_id' => $parkingLocationId],
    //         ['parking_instructions' => $validated['parking_instructions']]
    //     );
    //     $callSheet->parking_location_id = $parkingLocation->id;
    
    //     // Handle Hospital Location
    //     $hospitalAddress = $validated['hospital_address'] ?? [];
    //     if (!empty(array_filter($hospitalAddress))) {
    //         $location = Location::firstOrCreate($hospitalAddress);
    //         $hospitalLocationId = $location->id;
    //     } else {
    //         $hospitalLocationId = null;
    //     }
    
    //     $hospitalLocation = HospitalLocation::updateOrCreate(
    //         ['location_id' => $hospitalLocationId],
    //         ['hospital_instructions' => $validated['hospital_instructions']]
    //     );
    //     $callSheet->hospital_location_id = $hospitalLocation->id;

    //     $callSheet->save();

    //     $callSheet = CallSheet::with(['project', 'filmLocation.location', 'parkingLocation.location', 'hospitalLocation.location'])->findOrFail($callSheetId);

    //     return response()->json([
    //         'callSheet' => $callSheet->toArray(),
    //     ]);
    // }
    
    
    
}
