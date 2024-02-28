<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RecipientController extends Controller
{
    
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
}
