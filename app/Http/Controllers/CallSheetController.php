<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\CallSheet;
use App\Models\Location;
use App\Models\FilmLocation;
use App\Models\ParkingLocation;
use App\Models\HospitalLocation;
use App\Models\PhoneNumber;
use App\Models\User;  
use App\Models\Role;  
use App\Models\ProductionSchedule;  
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\CallSheetTrait;
use Inertia\Inertia;

class CallSheetController extends Controller
{

    use CallSheetTrait;
   
    public function fetchCallSheets($projectId)
    {
        Log::info('Fetching call sheets', ['project_id' => $projectId]);
        
        // Check if the project exists
        $project = Project::find($projectId);
        
        if (!$project) {
            Log::warning('Project not found', ['project_id' => $projectId]);
            return response()->json(['message' => 'Project not found'], 404);
        }
    
        // Retrieve call sheets associated with the project, along with related data
        $callSheets = CallSheet::with([
                            'users', 
                            'productionCompany', 
                            'project', 
                            'filmLocations', 
                            'productionSchedule'
                        ])
                        ->where('project_id', $projectId)
                        ->get();
    
        Log::info('Call sheets retrieved', ['project_id' => $projectId, 'count' => $callSheets->count()]);

        // Check if call sheets were found
        if ($callSheets->isEmpty()) {
            Log::info('No call sheets found for this project', ['project_id' => $projectId]);
            return response()->json(['message' => 'No call sheets found for this project'], 404);
        }

        return response()->json($callSheets);
    }
    
    public function getUsers($projectId, $callSheet_Id)
    {
        $callSheet = CallSheet::where('project_id', $projectId)->findOrFail($callSheet_Id);
        $users = $callSheet->users()->get(); 
        return response()->json($users);
    }

    public function index($projectId)
    {   
        $projects = Project::findOrFail($projectId);

        $callSheets = $projects->callSheets->load(
            'filmLocations'
        ); 
        $roles = Role::whereNotIn('name', ['Super-Admin', 'Admin', 'Editor'])->get();

        return Inertia::render('Projects/SubPages/CallSheets', [
            'projects' => $projects,
            'callSheets' => $callSheets,
            'roles' => $roles, 
        ]);
    }

    public function saveWeatherData(Request $request, $projectId, $callSheetId)
    {
        $validatedData = $request->validate([
            'weatherData' => 'required', 
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
    
    public function createCallSheet(Request $request, $projectId)
    {
        $validatedData = $request->validate([
            'call_sheet_name' => 'required',
            'call_sheet_date' => 'required',
            'general_call_time' => 'required', // Ensure this matches your database column exactly
            'selfRole' => 'nullable|string',
            'selfPosition' => 'nullable|string',
            'selfRate' => 'nullable|numeric',
            'payFrequency' => 'nullable|string|in:Day Rate,Hourly Rate', 
        ]);

        // Create the call sheet
        $callSheet = new CallSheet();
        $callSheet->fill($validatedData);
        $callSheet->project_id = $projectId;
        $callSheet->save();

        // Always attach the user as an admin to the call sheet
        $adminRole = Role::where('name', 'admin')->firstOrFail();
        $callSheet->users()->attach(Auth::id(), ['role_id' => $adminRole->id]);

        // Additionally, attach the user with a specified role and position if requested
        if (!empty($request->input('selfRole')) && !empty($request->input('selfPosition'))) {
            $role = Role::where('name', $request->input('selfRole'))->firstOrFail();
            
            $attachData = [
                'role_id' => $role->id,
                'position' => $request->input('selfPosition'),
                // Include rate in the attach data, make sure to handle null values appropriately
            ];

            // If a rate and pay frequency are provided, include them in the attach data
            if ($request->filled('selfRate') && $request->filled('payFrequency')) {
                $attachData['rate'] = $request->input('selfRate');
                $attachData['pay_frequency'] = $request->input('payFrequency'); // Include pay frequency
            }

            if ($adminRole->id !== $role->id) {
                // Attach the user with the specified non-admin role, position, and rate
                $callSheet->users()->attach(Auth::id(), $attachData);
            }
        }
        return response()->json([
            'url' => route('callSheet.details.page', ['projectId' => $projectId, 'callSheetId' => $callSheet->id])
        ]);
    }

    public function updateCallSheetDetails(Request $request, $projectId, $callSheetId)
    {
        $data = $request->validate([
            'id' => 'required|exists:call_sheets,id',
            'call_sheet_name' => 'required|string',
            'call_sheet_date' => 'required|date', 
            'general_call_time' => 'required',  
        ]);
    
        $callSheet = CallSheet::find($data['id']);
        if ($callSheet) {
            $callSheet->update([
                'call_sheet_name' => $data['call_sheet_name'],
                'call_sheet_date' => $data['call_sheet_date'],  
                'general_call_time' => $data['general_call_time'], 
            ]);
            return response()->json(['message' => 'Call sheet updated successfully.', 'callSheet' => $callSheet]);
        }
    
        return response()->json(['message' => 'Call sheet not found.'], 404);
    }    

    public function callSheetDetailsPage($projectId, $callSheetId)
    {
        $project = Project::with([
            'users' => function ($query) {
                $query->with(['roles', 'phone']);
            },
            'productionSchedules'  
        ])->find($projectId);
    
        $callSheet = CallSheet::with(['users' => function($query) {
            $query->with(['phone'])->withPivot('role_id', 'position', 'call_time');
        }])->find($callSheetId);
 
        $roles = Role::all()->keyBy('id');
 
        foreach ($callSheet->users as $user) {
            $roleId = $user->pivot->role_id;
            $user->pivot->role_name = $roles[$roleId]->name ?? 'Unknown Role';
        }
    
        $filteredRoles = Role::whereNotIn('name', ['Super-Admin', 'Admin', 'Editor'])->get();
    
        return Inertia::render('Projects/CallSheets/CallSheetDetailsPage', [
            'roles' => $filteredRoles,
            'project' => $project,
            'callSheet' => $callSheet,
        ]);
    }

    public function updateBulletin(Request $request, $projectId, $callSheetId)
    {
        try {
            $callSheet = CallSheet::findOrFail($callSheetId);
    
            // Authorization check
            // if (Gate::denies('update', $callSheet)) {
            //     return response()->json(['message' => 'Unauthorized'], 403);
            // }
    
            $validatedData = $request->validate([
                'bulletin' => 'required|max:365',
            ]);
    
            // Input sanitization
            // $validatedData['bulletin'] = sanitize($validatedData['bulletin']);
    
            $callSheet->bulletin = $validatedData['bulletin'];
    
            if ($callSheet->isDirty('bulletin')) {
                $callSheet->save();
            }
    
            return response()->json(['message' => 'Bulletin updated successfully']);
        } catch (\Exception $e) {
            // Log the exception message
            // Log::error($e->getMessage());
    
            return response()->json(['message' => 'Failed to update bulletin'], 500);
        }
    }
    
    public function updateGeneralCallTime(Request $request, $projectId, $callSheetId)
    {
        try {
            $callSheet = CallSheet::where('project_id', $projectId)->findOrFail($callSheetId);
    
            // Authorization check
            // if (Gate::denies('update', $callSheet)) {
            //     return response()->json(['message' => 'Unauthorized'], 403);
            // }
    
            $validatedData = $request->validate([
                'generalCallTime' => 'required|date_format:"g:i A"',
            ]);
    
            // Input sanitization
            // $validatedData['generalCallTime'] = sanitize($validatedData['generalCallTime']);
    
            // Parse the string into a Carbon object
            $currentDateTime = \Carbon\Carbon::parse($callSheet->call_sheet_date_time);
    
            // Format the date part
            $currentDate = $currentDateTime->format('Y-m-d');
    
            // Combine the current date with the new time
            $newDateTime = $currentDate . ' ' . $validatedData['generalCallTime'];
    
            $callSheet->call_sheet_date_time = $newDateTime;
    
            if ($callSheet->isDirty('call_sheet_date_time')) {
                $callSheet->save();
            }
    
            return response()->json(['message' => 'General call time updated successfully']);
        } catch (\Exception $e) {
            // Log the exception message
            Log::error($e->getMessage());
    
            return response()->json(['message' => 'Failed to update general call time'], 500);
        }
    }

 
    public function storeLocationDetails(Request $request, $projectId, $callSheetId)
    {
        // Debugging line to display incoming request data, can be removed in production
        // dd($request->all());
    
        $locationData = $request->get('location');
        $parkingData = $request->get('parking');
        $hospitalData = $request->get('hospital');
        $accordionInfo = $request->get('accordionInfo');
    
        $hospitalLocation = null;
        // Check if $hospitalData is not empty and has an 'address' array that is also not empty
        if (!empty($hospitalData) && !empty($hospitalData['address']) && array_filter($hospitalData['address'])) {
            $hospitalAttributes = [
                'name' => $hospitalData['name'] ?? null,
                'information' => $accordionInfo['hospital'] ?? null,
                'vicinity' => $hospitalData['address']['street_address'] ?? null,
                'place_id' => $hospitalData['address']['place_id'] ?? null,
                'latitude' => $hospitalData['address']['latitude'] ?? null,
                'longitude' => $hospitalData['address']['longitude'] ?? null,
            ];
            $hospitalLocation = HospitalLocation::create($hospitalAttributes);
        }
    
        // Create or update other locations (film and parking)
        $filmLocation = $this->createOrUpdateLocation($locationData, 'film', $accordionInfo['location'] ?? null);
        $parkingLocation = null;
    
        // Check if $parkingData is not empty and has an 'address' array that is also not empty
        if (!empty($parkingData) && !empty($parkingData['address']) && array_filter($parkingData['address'])) {
            $parkingLocation = $this->createOrUpdateLocation($parkingData, 'parking', $accordionInfo['parking'] ?? null);
        }
    
        // Update the film location with the parking and hospital IDs
        $filmLocation->update([
            'parking_location_id' => $parkingLocation?->id,
            'hospital_location_id' => $hospitalLocation?->id,
        ]);
    
        // Construct response
        $response = [
            'location' => $filmLocation->load('location')->toArray(),
            'parking' => $parkingLocation ? $parkingLocation->load('location')->toArray() : null,
            'hospital' => $hospitalLocation ? $hospitalLocation->toArray() : null,
            'accordionInfo' => $accordionInfo,
        ];
    
        // Attach the film location to the call sheet
        $callSheet = CallSheet::find($callSheetId);
        if ($callSheet->filmLocations()->count() >= 5) {
            // Redirect or return an error message if the limit is reached
            return redirect()->back()->withErrors('Maximum of 6 film locations allowed per call sheet.');
        }
    
        $callSheet->filmLocations()->syncWithoutDetaching([$filmLocation->id]);
    
        return response()->json($response);
    }
    
    
    public function updateLocationDetails(Request $request, $projectId, $callSheetId)
    {
        $locationData = $request->get('location');
        $parkingData = $request->get('parking');
        $hospitalData = $request->get('hospital');
        $accordionInfo = $request->get('accordionInfo');
    
        // Retrieve the existing film location for the call sheet
        $callSheet = CallSheet::find($callSheetId);
        $filmLocation = $callSheet->filmLocations()->first();

        if ($hospitalData) {
            $hospitalAttributes = [
 
                'name' => $hospitalData['name'],
                'information' => $accordionInfo['hospital'] ?? null,
                'vicinity' => $hospitalData['address']['street_address'] ?? null,
                'place_id' => $hospitalData['address']['place_id'] ?? null,
                'latitude' => $hospitalData['address']['latitude'] ?? null,
                'longitude' => $hospitalData['address']['longitude'] ?? null,
 
            ];
            $hospitalLocation = HospitalLocation::updateOrCreate(
                ['id' => $filmLocation->hospital_location_id ?? null],
                $hospitalAttributes
            );
        }
    
        // Update film and parking locations
        $filmLocation = $this->createOrUpdateLocation($locationData, 'film', $accordionInfo['location'] ?? null, null, $filmLocation->location_id ?? null);

        // Update parking location only if provided
        if ($parkingData) {
            $parkingLocation = $this->createOrUpdateLocation($parkingData, 'parking', $accordionInfo['parking'] ?? null, null, $filmLocation->parking_location_id ?? null);
        }    
        // Update the film location with the parking and hospital IDs
        $filmLocation->update([
            'parking_location_id' => $parkingLocation?->id,
            'hospital_location_id' => $hospitalLocation?->id
        ]);
    
        return redirect()->route('callSheet.details.page', [
            'projectId' => $projectId,
            'callSheetId' => $callSheetId,
        ]);
    }
   
    private function createOrUpdateLocation($data, $type, $info, $existingLocationId = null)
    {
        if (empty($data['name']) && empty($data['address'])) {
            return null;
        }
    
        $locationId = null;
        if (!empty($data['address'])) {
            // Check if a new location needs to be created or updated
            if ($existingLocationId) {
                $existingLocation = Location::find($existingLocationId);
    
                // Update existing location if it exists
                if ($existingLocation) {
                    $existingLocation->update($data['address']);
                    $locationId = $existingLocation->id;
                } else {
                    // Create a new location if the existing one doesn't exist
                    $location = Location::create($data['address']);
                    $locationId = $location->id;
                }
            } else {
                // Create a new location if there's no existing location ID
                $location = Location::create($data['address']);
                $locationId = $location->id;
            }
        }
    
        $model = null;
        $attributes = ['location_id' => $locationId, 'name' => $data['name'], 'information' => $info];
    
        switch ($type) {
            case 'film':
                $model = FilmLocation::class;
                break;
            case 'parking':
                $model = ParkingLocation::class;
                break;
        }
    
        // Update or create the specific location type (film, parking)
        return $model::updateOrCreate(
            ['id' => $existingLocationId],
            $attributes
        );
    }    
    
    
    public function softDelete($projectId, $callSheetId)
    {
        $callSheet = CallSheet::find($callSheetId);

        if (!$callSheet) {
            return response()->json(['error' => 'Call Sheet not found.'], 404);
        }

        // Soft delete the call sheet
        $callSheet->delete();

        // Soft delete related FilmLocations and their related ParkingLocation and HospitalLocation
        foreach ($callSheet->filmLocations as $filmLocation) {
            $filmLocation->delete(); // This will trigger soft delete

            // Check if there's a related ParkingLocation and soft delete it
            if ($filmLocation->parking_location_id) {
                ParkingLocation::find($filmLocation->parking_location_id)?->delete();
            }

            // Check if there's a related HospitalLocation and soft delete it
            if ($filmLocation->hospital_location_id) {
                HospitalLocation::find($filmLocation->hospital_location_id)?->delete();
            }
        }

        // Optionally, you can also handle any other related data here

        return response()->json(['success' => 'Call Sheet and related locations soft deleted successfully.']);
    }


    public function destroyLocationDetails($projectId, $callSheetId, $filmLocationId)
    {
        $callSheet = CallSheet::find($callSheetId);
        if (!$callSheet) {
            return response()->json(['error' => 'Call Sheet not found.'], 404);
        }
    
        // Soft delete FilmLocation
        $filmLocation = FilmLocation::find($filmLocationId);
        if ($filmLocation) {
            $filmLocation->delete();
    
            // Soft delete associated ParkingLocation and HospitalLocation
            if ($filmLocation->parking_location_id) {
                ParkingLocation::find($filmLocation->parking_location_id)?->delete();
            }
            if ($filmLocation->hospital_location_id) {
                HospitalLocation::find($filmLocation->hospital_location_id)?->delete();
            }
    
            // Detach the film location from the call sheet
            $callSheet->filmLocations()->detach($filmLocationId);
    
            // Refresh the callSheet to get updated data
            $callSheet->refresh();
    
            // Optionally load any related data you need
            // $callSheet->load('filmLocations', 'otherRelatedData');
    
            // Return the updated callSheet data
            return response()->json([
                'success' => 'Location details removed successfully.',
                'updatedCallSheet' => $callSheet
            ]);
        }
    
        return response()->json(['error' => 'Film Location not found.'], 404);
    }
    
     
    
    public function storeCallSheetSchedule(Request $request, $projectId, $callSheetId)
    {
        $validatedData = $request->validate([
            'schedule' => 'required|array', // Validate the schedule as an array
            'callSheetId' => 'nullable|exists:call_sheets,id', // Optional call sheet ID
        ]);
    
        // Assuming you have a unique way to identify a schedule, such as a schedule ID within the data.
        // Adjust this part based on your actual requirements.
        $uniqueScheduleIdentifier = $request->input('scheduleId'); // Example placeholder
    
        // Update or create the production schedule
        $productionSchedule = ProductionSchedule::updateOrCreate(
            [
                'project_id' => $projectId,
                // Add more criteria here if necessary to uniquely identify the schedule
                // For example: 'id' => $uniqueScheduleIdentifier,
            ],
            [
                'schedule' => json_encode($validatedData['schedule']), // Encode the array as JSON
            ]
        );
    
        // If a callSheetId is provided, ensure it is linked to the updated/created production schedule
        if (!empty($validatedData['callSheetId'])) {
            $callSheet = CallSheet::find($validatedData['callSheetId']);
            $callSheet->production_schedule_id = $productionSchedule->id;
            $callSheet->save();
        }
    
        return response()->json([
            'success' => true,
            'message' => 'Production schedule saved successfully.',
            'productionScheduleId' => $productionSchedule->id,
        ]);
    }
    
    
}
