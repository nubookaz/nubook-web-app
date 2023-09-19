<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company; // Replace with your Company model
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        // Implement your logic to retrieve and display a list of companies
        $companies = Company::all(); // Example: Get all companies

        return view('companies.index', ['companies' => $companies]);
    }

    // public function store(Request $request)
    // {
    //     // Validate the incoming request data
    //     $validatedData = $request->validate([
    //         'companyName' => 'required|string|max:255',
    //         'einNumber' => 'nullable|string|max:255', // Optional EIN field
    //     ]);
    
    //     // Create a new company instance and fill it with validated data
    //     $company = new Company;
    //     $company->name = $validatedData['companyName'];
    //     $company->ein = $validatedData['einNumber'];
    
    //     // Save the company record to the database
    //     $company->save();
    
    //     // return redirect()->route('project.index')->with('success', 'Company created successfully');
    //     return redirect()->route('projects.edit', ['id' => $project->id]);

    // }

    public function store(Request $request)
    {

        $company = $this->createCompany($request);

        // Redirect back to the project edit page with a success message.
        // return redirect()->route('projects.edit', ['id' => $projectId])->with('success', 'Company created successfully');
    }

    
    public function edit($id)
    {
        // Implement your logic to retrieve and edit a specific company
        $company = Company::findOrFail($id);

        return view('companies.edit', ['company' => $company]);
    }

    public function update(Request $request, $id)
    {
        // Implement your logic to update a specific company
        $company = Company::findOrFail($id);
        $company->name = $request->input('name');
        // Other fields and validation here
        $company->save();

        return redirect()->route('companies.index')->with('success', 'Company updated successfully');
    }
}
