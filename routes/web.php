<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CompanyController; 
use App\Http\Controllers\CallSheetController; 
use App\Http\Controllers\LocationsController; 

use App\Http\Controllers\AssociationController; 

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\VerificationController;

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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/', function () {
    // Redirect to the login route when the root URL is accessed
    return redirect()->route('login');
});


// Route::middleware(['guest'])->group(function () {
//     // Registration routes
//     Route::get('/register', [RegisteredUserController::class, 'create'])->name('registration.create');
//     Route::post('/register', [RegisteredUserController::class, 'store'])->name('registration.store');

//     // Verification route
//     Route::get('/register/verify/form', [RegisteredUserController::class, 'showVerificationForm'])->name('registration.verification.form');
//     Route::get('/register/verify/{code}', [RegisteredUserController::class, 'verificationCode'])->name('registration.verification');
//     Route::post('/register/verify', [RegisteredUserController::class, 'verifyCode'])->name('registration.verifyCode');

//     Route::get('/register/personal-info/form', [RegisteredUserController::class, 'showPersonalInfo'])->name('registration.personal.form');
//     Route::post('/register/personal-info', [RegisteredUserController::class, 'storePersonalInfo'])->name('registration.storePersonalInfo');

//     Route::get('/register/company-info/form', [RegisteredUserController::class, 'showCompanyInfo'])->name('registration.company.form');
//     Route::post('/register/company-info', [RegisteredUserController::class, 'storeCompanyInfo'])->name('registration.storeCompanyInfo');
// });



Route::middleware(['guest'])->group(function () {
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('registration.create');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('registration.store');
});

Route::middleware(['requires_email_verification'])->group(function () {
    Route::get('/register/verify/form', [RegisteredUserController::class, 'showVerificationForm'])->name('registration.verification.form');
    Route::get('/register/verify/{code}', [RegisteredUserController::class, 'verificationCode'])->name('registration.verification');
    Route::post('/register/verify', [RegisteredUserController::class, 'verifyCode'])->name('registration.verifyCode');
});

Route::middleware(['requires_email_verification', 'requires_code_verification'])->group(function () {
    Route::get('/register/personal-info/form', [RegisteredUserController::class, 'showPersonalInfo'])->name('registration.personal.form');
    Route::post('/register/personal-info', [RegisteredUserController::class, 'storePersonalInfo'])->name('registration.personal.store');
});

Route::middleware(['requires_email_verification', 'requires_code_verification', 'requires_personal_info'])->group(function () {
    Route::get('/register/company-info/form', [RegisteredUserController::class, 'showCompanyInfo'])->name('registration.company.form');
    Route::post('/register/company-info', [RegisteredUserController::class, 'storeCompanyInfo'])->name('registration.company.store');
});









Route::middleware(['auth', 'verified'])->group(function () {
    // Authenticated and verified routes

    // Dashboard
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    Route::prefix('projects')->group(function () {
        // Your existing project-related routes here
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
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

                    // Add routes for managing locations within a call sheet
            Route::prefix('{callSheetId}/locations')->group(function () {
                Route::get('create', [LocationsController::class, 'create'])->name('');
                Route::post('/', [LocationsController::class, 'store'])->name('locations.store');
                Route::get('{locationId}/edit', [LocationsController::class, 'edit'])->name('locations.edit');
                Route::patch('/{locationId}', [LocationsController::class, 'update'])->name('locations.update');
            });
            
        });

    // Routes related to associations within the project group
    Route::prefix('associations')->group(function () {
        // Original route using AssociationController
        Route::post('/create', [AssociationController::class, 'ProjectCompaniesCreate'])->name('associations.create');
        
        // Additional routes related to associations
        // ...
    });
});
    

    Route::prefix('companies')->group(function () {
        Route::get('/', [CompanyController::class, 'index'])->name('companies.index');
        Route::post('/create', [CompanyController::class, 'store'])->name('companies.create');
        Route::get('/{id}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
        Route::put('/{id}', [CompanyController::class, 'update'])->name('companies.update');
    });

    // Account Settings
    Route::get('/account-settings', fn () => Inertia::render('AccountSettings'))->name('account-settings');

    // Profile
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
        // Add more profile-related routes here
    });



    
});



require __DIR__.'/auth.php';
