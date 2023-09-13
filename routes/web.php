<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;

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
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::post('/', [ProjectController::class, 'store'])->name('projects.create');
        Route::get('/{id}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
        
        // New route for projects with the "Estimate" stage
        Route::get('/{id}/estimate', [ProjectController::class, 'estimate'])->name('projects.estimate');
        
        Route::patch('/{id}', [ProjectController::class, 'update'])->name('projects.update');
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
