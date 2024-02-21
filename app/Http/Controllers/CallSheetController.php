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
   
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
         // Retrieve the project based on the project ID from the route parameter
        $projects = Project::findOrFail($id);

        $callSheets = $projects->callSheets->load(
            'filmLocations'
        ); 
        $roles = Role::whereNotIn('name', ['Super-Admin', 'Admin', 'Editor'])->get();

        return Inertia::render('Projects/SubPages/CallSheets', [
            'projects' => $projects,
            'callSheets' => $callSheets,
            'roles' => $roles, // Pass roles to the frontend
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
    
    public function storeCallSheetDetails(Request $request, $id)
    {
        $validatedData = $request->validate([
            'call_sheet_name' => 'required',
            'call_sheet_date_time' => 'required',
            'selfRole' => 'nullable|string',
            'selfPosition' => 'nullable|string',
            'selfRate' => 'nullable|numeric',
            'payFrequency' => 'nullable|string|in:Day Rate,Hourly Rate', 
        ]);
    
        // Create the call sheet
        $callSheet = new CallSheet($validatedData);
        $callSheet->project_id = $id;
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
  
            // Check to prevent attaching the same user twice with different roles
            if ($adminRole->id !== $role->id) {
                // Attach the user with the specified non-admin role, position, and rate
                $callSheet->users()->attach(Auth::id(), $attachData);
            }
        }

        
        // Return a response with success message and URL to the call sheet details page
        return response()->json([
            'message' => 'Call sheet created successfully. You have been added as an admin.',
            'url' => route('projects.callSheets.details.page', ['id' => $id, 'callSheetId' => $callSheet->id])
        ]);
    }

    public function updateCallSheetDetails(Request $request, $id, $callSheetId)
    {
        $data = $request->validate([
            'id' => 'required|exists:call_sheets,id',
            'call_sheet_name' => 'required|string',
            'call_sheet_date_time' => 'required|date'
        ]);

        $callSheet = CallSheet::find($data['id']);
        if ($callSheet) {
            $callSheet->update([
                'call_sheet_name' => $data['call_sheet_name'],
                'call_sheet_date_time' => $data['call_sheet_date_time']
            ]);
            return response()->json(['message' => 'Call sheet updated successfully.', 'callSheet' => $callSheet]);
        }

        return response()->json(['message' => 'Call sheet not found.'], 404);
    }


    public function editDetailsPage($id, $callSheetId)
    {
        $project = Project::with(['users' => function ($query) {
            $query->with(['roles', 'phone']);
        }])->find($id);
    
        $callSheet = CallSheet::with(['users' => function($query) {
            $query->with(['phone'])->withPivot('role_id', 'position', 'call_time');
        }])->find($callSheetId);
    
        // Fetch roles once to avoid repeated queries
        $roles = Role::all()->keyBy('id');
    
        // Manually iterate over users to append role names
        foreach ($callSheet->users as $user) {
            $roleId = $user->pivot->role_id;
            $user->pivot->role_name = $roles[$roleId]->name ?? 'Unknown Role';
        }
    
        $filteredRoles = Role::whereNotIn('name', ['Super-Admin', 'Admin', 'Editor'])->get();
    
        return Inertia::render('Projects/CallSheets/CallSheetDetails', [
            'roles' => $filteredRoles,
            'project' => $project,
            'callSheet' => $callSheet,
        ]);
    }
    
    
    public function saveRecipient(Request $request, $projectId, $callSheetId)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'tel' => 'nullable|string|max:255',
            'position' => 'required|string|max:255',
            'call_time' => 'required|string',
            'role' => 'required|numeric',
        ]);
        
        $validated['call_time'] = date("H:i", strtotime($validated['call_time']));

        DB::beginTransaction();

        try {
            // Assuming this is part of the try block where you create or find the user
            $user = User::where('email', $validated['email'])->firstOrCreate([
                'email' => $validated['email'],
            ], [
                'first_name' => $validated['first_name'],
                'middle_initial' => $validated['middle_initial'] ?? '',
                'last_name' => $validated['last_name'] ?? '',
                'password' => Hash::make(Str::random(10)), // Temporary password
                'is_password_temporary' => true,
                'email_verified' => false, // Since they haven't gone through verification
                'personal_info_completed' => false,
                'company_info_completed' => false,
                'registration_complete' => false,
                // Omit the 'verification_code' and related fields
            ]);

            $phoneNumber = $user->phone()->updateOrCreate([], ['tel' => $validated['tel'] ?? '']);
 
            $project = Project::findOrFail($projectId);
            $callSheet = CallSheet::findOrFail($callSheetId);
    
            // Directly use the role ID from the validated data
            $roleId = $validated['role'];

            // Ensure the role exists
            $role = Role::findOrFail($roleId);

            // Attach the user to the project and call sheet with the specified role
            $project->users()->syncWithoutDetaching([$user->id => ['role_id' => $role->id]]);
            $callSheet->users()->syncWithoutDetaching([$user->id => [
                'position' => $validated['position'],
                'call_time' => $validated['call_time'],
                'role_id' => $role->id, // Assuming you're storing the role ID in the pivot table
            ]]);
    
            DB::commit();

            $userWithAssociations = $user->load(['callSheets', 'roles', 'phone']);

            return response()->json([
                'success' => true,
                'message' => 'Recipient saved successfully.',
                'data' => [
                    'user' => $userWithAssociations,
                    'role' => $role->name,
                    'position' => $validated['position'],
                    'call_time' => $validated['call_time'],
                    'phone' => $phoneNumber->tel, // Include the phone number in the response
                ],
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error in saveRecipient', ['message' => $e->getMessage()]);
            // Return an error JSON response
            return response()->json([
                'success' => false,
                'message' => 'There was a problem saving the information: ' . $e->getMessage(),
            ], 422); // Use HTTP status code 422 for validation errors
        }
    }
    
    public function updateRecipient(Request $request, $projectId, $callSheetId, $recipientId)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $recipientId,
            'tel' => 'nullable|string|max:255',
            'position' => 'required|string|max:255',
            'call_time' => 'required|string',
            'role' => 'required|numeric',
        ]);
    
        $validated['call_time'] = date("H:i", strtotime($validated['call_time']));
    
        DB::beginTransaction();
    
        try {
            $user = User::findOrFail($recipientId);
    
            $user->update([
                'first_name' => $validated['first_name'],
                'middle_initial' => $validated['middle_initial'] ?? '',
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
            ]);
    
            $phoneNumber = $user->phone()->updateOrCreate([], ['tel' => $validated['tel']]);
    
            $role = Role::findOrFail($validated['role']);
    
            $user->callSheets()->sync([$callSheetId => [
                'position' => $validated['position'],
                'call_time' => $validated['call_time'],
                'role_id' => $role->id,
            ]]);
    
            DB::commit();
    
            // Optionally, fetch and return the updated user with related data as needed.
            $updatedUser = User::with(['phone', 'callSheets', 'roles'])->find($user->id);
    
            return response()->json([
                'success' => true,
                'message' => 'Recipient updated successfully.',
                'data' => [
                    'user' => $updatedUser,
                    'role' => $role->name, // Include the role name in the response
                    'position' => $validated['position'],
                    'call_time' => $validated['call_time'],
                ],
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'There was a problem updating the recipient: ' . $e->getMessage(),
            ], 422);
        }
    }
    
    public function deleteRecipientFromCallSheet(Request $request, $projectId, $callSheetId, $recipientId)
    {
        DB::beginTransaction();
    
        try {
            $callSheet = CallSheet::findOrFail($callSheetId);
            // Detach the recipient from the call sheet
            $callSheet->users()->detach($recipientId);
    
            DB::commit();
    
            return response()->json([
                'success' => true,
                'message' => 'Recipient removed from call sheet successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error removing recipient from call sheet: ' . $e->getMessage(),
            ], 422);
        }
    }
    

    public function updateBulletin(Request $request, $id, $callSheetId)
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
    
    public function updateGeneralCallTime(Request $request, $id, $callSheetId)
    {
        try {
            $callSheet = CallSheet::where('project_id', $id)->findOrFail($callSheetId);
    
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
    
    public function storeLocationDetails(Request $request, $id, $callSheetId)
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
    
    
    public function updateLocationDetails(Request $request, $id, $callSheetId)
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
    
        return redirect()->route('projects.callSheets.details.page', [
            'id' => $id,
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
    
    
    public function softDelete($id, $callSheetId)
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


    public function destroyLocationDetails($id, $callSheetId, $filmLocationId)
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
