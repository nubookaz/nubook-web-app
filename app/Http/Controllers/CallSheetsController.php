<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project; // Import the Project model
use Inertia\Inertia;

class CallSheetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        // Retrieve the project based on the project ID from the route parameter
        $project = Project::findOrFail($id);
    
        // Perform any necessary logic for the "Call Sheets" page here
        // You can use $project to access project-specific data
    
        // Return the view with the project data, including the project ID
        return Inertia::render('Projects/CallSheets/CallSheetOverview', [
            'project' => $project,
            'projectId' => $id, // Include the project ID in the data
        ]);
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
