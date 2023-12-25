<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\BetaEmail;
use App\Models\ProductionCompany;


class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function betaStore(Request $request) 
    {
        $userValidator = Validator::make($request->all()['data'], [
            'first_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company_name' => 'nullable|string|max:255',
            'number_of_employees' => 'required|string',
            'referral' => 'required|string',
        ]);
    

        // Check if validation fails
        if ($userValidator->fails()) {
            return response()->json(['error' => $userValidator->errors()], 400);
        }

        $temporaryPassword = Str::random(10);

        $data = $request->input('data');

        $userData = [
            'first_name' => $data['first_name'],
            'middle_initial' => $data['middle_initial'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => Hash::make($temporaryPassword),
            'is_password_temporary' => true,
        ];

 
        $userData['subscription_type'] = 'beta';


        $user = User::create($userData);

 
        $company = ProductionCompany::create([
            'company_name' => $data['company_name'],
            'number_of_employees' => $data['number_of_employees'],
            'referral' => $data['referral'], 
        ]);

        $user->productionCompanies()->attach($company->id);

        // Set the new company as the primary company
        $user->primary_production_company_id = $company->id;
        $user->save();


        Mail::to($user->email)->send(new BetaEmail($user, $temporaryPassword));


        return response()->json(['message' => 'Form submitted successfully']);

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
