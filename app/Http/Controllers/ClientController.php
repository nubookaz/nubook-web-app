<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    // Fetch all clients with their related projects and callSheets
    public function index()
    {
        $clients = Client::with(['projects', 'callSheets'])->get();
        return response()->json($clients);
    }

    // Create a new client with validation
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'phone' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $client = Client::create($validator->validated());
 
        if ($request->has('project_ids')) {
            $client->projects()->attach($request->project_ids);
        }

        if ($request->has('callsheet_ids')) {
            $client->callSheets()->attach($request->callsheet_ids);
        }

        return response()->json($client, 201);
    }

    // Update an existing client with validation
    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'phone' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $client->update($validator->validated());

        // Optionally, update relationships if provided
        if ($request->has('project_ids')) {
            $client->projects()->sync($request->project_ids);
        }

        if ($request->has('callsheet_ids')) {
            $client->callSheets()->sync($request->callsheet_ids);
        }

        return response()->json($client, 200);
    }

    // Delete a client and detach from relationships
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->projects()->detach();
        $client->callSheets()->detach();
        $client->delete();

        return response()->json(null, 204);
    }
}
