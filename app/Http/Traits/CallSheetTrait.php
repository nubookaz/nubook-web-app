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
 
        $validatedData = $request->validate([
            'call_sheet_name' => 'required|string|max:255', 
            'call_sheet_date' => 'required|date', 
        ]);
    
 
        $callSheet = new CallSheet;
        $callSheet->fill($validatedData);
        $callSheet->project_id = $projectId;
        $callSheet->save();
    
        return $callSheet; 
        
    }

}
