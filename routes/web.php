<?php

use App\Http\Controllers\WebsiteController;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Auth\VerificationController;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CompanyController; 
use App\Http\Controllers\CallSheetController; 
use App\Http\Controllers\LocationController; 

use App\Http\Controllers\AssociationController; 

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

     Route::get('/', [WebsiteController::class, 'index'])->name('website.home');
     Route::post('/beta-register', [WebsiteController::class, 'betaStore'])->name('website.beta.register');

    
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('registration.create');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
    // Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('show.login');
 
});



Route::middleware(['auth', 'verified'])->group(function () {

    // Data Fetching
    Route::get('/fetch-user-data', [ProfileController::class, 'fetchUserData'])->name('fetch-user-data');
 




    Route::post('/verification/update-password', [VerificationController::class, 'updatePassword'])->name('verification.updatePassword');
    Route::post('/verification/verify', [VerificationController::class, 'verifyCode'])->name('verification.verifyCode');
    Route::post('/verification/resend-code', [VerificationController::class, 'resendCode'])->name('verification.resendCode');
    Route::post('/verification/personal-info', [VerificationController::class, 'storePersonalInfo'])->name('verification.personal.store');
    Route::post('/verification/company-info', [VerificationController::class, 'storeProductionCompanyInfo'])->name('verification.production.company.store');
    
    // Account Settings
    Route::get('/account-settings', fn () => Inertia::render('AccountSettings'))->name('account-settings');

    // Profile
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'updateProfileInfo'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
        
        Route::get('/get-profile-image', [ProfileController::class, 'getProfileImage'])->name('profile.get-image');
        Route::post('/upload-profile-image', [ProfileController::class, 'uploadProfileImage'])->name('profile.upload-image');

    });

    // Dashboard
    Route::get('/dashboard', function () {
        $user = Auth::user(); 
        $projects = $user->projects;
        return Inertia::render('Dashboard', ['projects' => $projects ]);
    })->name('dashboard');

    Route::prefix('projects')->group(function () {
        // Your existing project-related routes here
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::get('/all-projects', [ProjectController::class, 'showList'])->name('projects.list');
        Route::post('/', [ProjectController::class, 'store'])->name('projects.create');
        Route::get('/{id}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
        Route::get('/{id}/estimate', [ProjectController::class, 'estimate'])->name('projects.estimate');
        Route::patch('/{id}', [ProjectController::class, 'update'])->name('projects.update');

        Route::get('/{id}/settings', [ProjectController::class, 'showSettings'])->name('project.settings');
    
        // New routes for the "Call Sheets" page
        Route::prefix('{id}/call-sheets')->group(function () {

            Route::get('/', [CallSheetController::class, 'index'])->name('projects.callSheets.index');
            Route::post('/', [CallSheetController::class, 'storeCallSheetDetails'])->name('projects.callSheets.create');
          
            Route::put('/{callSheetId}', [CallSheetController::class, 'updateCallSheetDetails'])->name('projects.callSheets.update.details');
            Route::get('{callSheetId}/details', [CallSheetController::class, 'editDetailsPage'])->name('projects.callSheets.edit.page');
            Route::post('/{callSheetId}/save-weather', [CallSheetController::class, 'saveWeatherData'])->name('save.weather');

            Route::prefix('{callSheetId}/locations')->group(function () {
                Route::post('/', [LocationController::class, 'storeCallSheetLocations'])->name('callSheets.location.store');
                // Update a location
                Route::patch('{locationId}', [LocationController::class, 'updateCallSheetLocations'])->name('callSheets.locatios.update');

    
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
