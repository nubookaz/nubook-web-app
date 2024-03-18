<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Role;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        // Get the authenticated user ID, who is the sponsor
        $sponsorId = auth()->id();
    
        // Now query the users table for clients associated with this sponsor ID
        $clients = User::whereHas('roles', function ($query) {
            $query->where('name', 'Client');
        })->whereHas('sponsors', function ($query) use ($sponsorId) {
            $query->where('client_sponsor.sponsor_id', $sponsorId);
        })
        ->with(['projects', 'callSheets'])
        ->orderBy('created_at', 'desc')
        ->get();
 
        return response()->json($clients);
    }
    
    
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $sponsorId = $request->input('sponsor_id');  
        $user->sponsors()->attach($sponsorId);

        // Generate a temporary password
        $temporaryPassword = Str::random(10); // Or use a more secure method
        $validatedData = $validator->validated();
        $validatedData['password'] = Hash::make($temporaryPassword);
        $validatedData['is_password_temporary'] = true; // Mark the password as temporary

        $user = User::create($validatedData);

        // Assign 'Client' role to user
        $clientRole = Role::where('name', 'Client')->first();
        $user->roles()->attach($clientRole);

        // TODO: Send an email to the user with the temporary password and instructions

        return response()->json($user, 201);
    }
    
    // Update an existing user (client) with validation
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->update($validator->validated());

        return response()->json($user, 200);
    }

    // Delete a user (client) and detach from relationships
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        // Detach roles and other relationships as necessary
        $user->roles()->detach();
        // Assuming projects and callSheets are related to users now
        $user->projects()->detach();
        $user->callSheets()->detach();
        $user->delete();

        return response()->json(null, 204);
    }
}
