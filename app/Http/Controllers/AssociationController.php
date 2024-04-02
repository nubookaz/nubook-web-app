<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Company;
use App\Http\Traits\ProjectTrait;
use App\Http\Traits\CallSheetTrait;

use Inertia\Inertia;


class AssociationController extends Controller
{

    use ProjectTrait;
    use CallSheetTrait;


    public function ProjectCompaniesCreate(Request $request)
    {
        // Create a project
        $project = $this->createProject($request);
    
        // Create a company
        $company = $this->createCompany($request);
    
        // Attach the company to the project using the relationship
        $project->companies()->attach($company);
    
        $viewName = $project->project_stage === "Estimate" ? 'projects.estimate' : 'project.details';

        // Redirect based on the project's project_stage
        return redirect()->route($viewName, ['id' => $project->id]);
    }
    


    public function ProjectCallSheetCreate(Request $request)
    {
        
    }

}
