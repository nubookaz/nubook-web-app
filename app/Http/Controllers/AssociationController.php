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

        // dd($project, $company);

        return $project->projectStage === "Estimate"
        ? Inertia::render('Projects/ProjectEstimate', ['project' => $project, 'id' => $project->id])
        : Inertia::render('Projects/ProjectEdit', ['project' => $project, 'id' => $project->id]);

    }


    public function ProjectCallSheetCreate(Request $request)
    {
        
    }

}
