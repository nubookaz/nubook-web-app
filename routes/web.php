<?php


use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Auth\VerificationController;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CompanyController; 
use App\Http\Controllers\CallSheetController; 
use App\Http\Controllers\LocationsController; 

use App\Http\Controllers\AssociationController; 

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['guest'])->group(function () {
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('registration.create');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
    Route::get('/', [LoginController::class, 'show'])->name('show.login');
});



Route::middleware(['auth', 'verified'])->group(function () {

    Route::middleware(['auth', 'verified'])->get('/fetch-user-data', [ProfileController::class, 'fetchUserData'])->name('fetch-user-data');




    

    Route::post('/verification/verify', [VerificationController::class, 'verifyCode'])->name('verification.verifyCode');
    Route::post('/verification/personal-info', [VerificationController::class, 'storePersonalInfo'])->name('verification.personal.store');
    Route::post('/verification/company-info', [VerificationController::class, 'storeCompanyInfo'])->name('verification.company.store');
    
    // Account Settings
    Route::get('/account-settings', fn () => Inertia::render('AccountSettings'))->name('account-settings');

    // Profile
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'updateProfileInfo'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Dashboard
    Route::get('/dashboard', function () {
        $user = Auth::user()->load('clients'); 
        $projects = $user->projects;
        return Inertia::render('Dashboard', ['auth' => $user, 'projects' => $projects ]);
    })->name('dashboard');


    Route::get('/get-profile-image', [ProfileController::class, 'getProfileImage'])->name('profile.get-image');
    Route::post('/upload-profile-image', [ProfileController::class, 'uploadProfileImage'])->name('profile.upload-image');

    
    Route::prefix('projects')->group(function () {
        // Your existing project-related routes here
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::get('/all-projects', [ProjectController::class, 'showList'])->name('projects.list');
        Route::post('/', [ProjectController::class, 'store'])->name('projects.create');
        Route::get('/{id}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
        Route::get('/{id}/estimate', [ProjectController::class, 'estimate'])->name('projects.estimate');
        Route::patch('/{id}', [ProjectController::class, 'update'])->name('projects.update');
    
        // New routes for the "Call Sheets" page
        Route::prefix('{id}/call-sheets')->group(function () {
            Route::get('/', [CallSheetController::class, 'index'])->name('projects.callSheets.index');
            Route::post('/', [CallSheetController::class, 'store'])->name('projects.callSheets.create');
            Route::get('{callSheetId}/edit', [CallSheetController::class, 'edit'])->name('projects.callSheets.edit');
            Route::patch('/{callSheetId}', [CallSheetController::class, 'update'])->name('projects.callSheets.update');

            Route::prefix('{callSheetId}/locations')->group(function () {
                // Create a location
                Route::get('create', [LocationsController::class, 'create'])->name('locations.create');
                Route::post('/', [LocationsController::class, 'store'])->name('locations.store');
    
                // Edit a location
                Route::get('{locationId}/edit', [LocationsController::class, 'edit'])->name('locations.edit');
    
                // Update a location
                Route::patch('{locationId}', [LocationsController::class, 'update'])->name('locations.update');
    
                // Soft delete a location
                Route::delete('{locationId}/soft-delete', [LocationsController::class, 'softDelete'])->name('locations.softDelete');
    
                // Destroy a location
                Route::delete('{locationId}/destroy', [LocationsController::class, 'destroy'])->name('locations.destroy');
    
                // Other routes for parking locations
                // Route::post('parking-locations', [LocationsController::class, 'storeParkingLocation'])->name('locations.storeParkingLocation');
                // Route::patch('parking-locations/{locationId}', [LocationsController::class, 'updateParkingLocation'])->name('locations.updateParkingLocation');
            });

        });

        // Routes related to associations within the project group
        Route::prefix('associations')->group(function () {
            Route::post('/create', [AssociationController::class, 'ProjectCompaniesCreate'])->name('associations.create');
        });

        
    });
    
    Route::prefix('companies')->group(function () {
        Route::get('/', [CompanyController::class, 'index'])->name('companies.index');
        Route::post('/create', [CompanyController::class, 'store'])->name('companies.create');
        Route::get('/{id}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
        Route::put('/{id}', [CompanyController::class, 'update'])->name('companies.update');
    });

});



require __DIR__.'/auth.php';
