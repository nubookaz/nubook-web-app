<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CompanyController; 
use App\Http\Controllers\CallSheetsController; 

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
            Route::get('/', [CallSheetsController::class, 'index'])->name('projects.callSheets.index');
            // Add more routes related to Call Sheets here
        });
    });
    

    Route::prefix('companies')->group(function () {
        Route::get('/', [CompanyController::class, 'index'])->name('companies.index');
        Route::post('/create', [CompanyController::class, 'store'])->name('companies.create');
        Route::get('/{id}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
        Route::put('/{id}', [CompanyController::class, 'update'])->name('companies.update');
    });

    Route::prefix('associations')->group(function () {
        Route::post('/create', [AssociationController::class, 'ProjectCompaniesCreate'])->name('associations.create');
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
