<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\CallSheet;

use Illuminate\Support\Facades\Validator;

trait CallSheetTrait

{

    public function createCallSheet(Request $request, $projectId) // Add $projectId as a parameter
    {

        // dd( $request);
        // Validate the incoming data
        $validatedData = $request->validate([
            'callSheetTitle' => 'required|string|max:255', // Customize validation rules as needed
            'callSheetDate' => 'required|date', // Add validation for the date field
            // Add validation rules for other fields as needed
        ]);
    
        // Create a new call sheet using the validated data and associate it with the project
        $callSheet = new CallSheet($validatedData);
        $callSheet->project_id = $projectId; // Assuming there's a 'project_id' column in your CallSheet model
        $callSheet->save();
    
        return $callSheet; // Optionally, you can return the created call sheet if needed
    }

}
