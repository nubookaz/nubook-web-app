<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CallSheetController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\MediaController;





Route::post('/login', [AuthenticatedSessionController::class, 'store']);


// Middleware for authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
 
    Route::prefix('profile')->group(function () {
        Route::get('/get-profile-image', [ProfileController::class, 'getProfileImage'])->name('profile.get-image');
        Route::post('/upload-profile-image', [ProfileController::class, 'uploadProfileImage'])->name('profile.upload-image');
    });


    Route::prefix('clients')->group(function () {
        Route::get('/', [ClientController::class, 'index']);
        Route::post('/', [ClientController::class, 'store']);
        Route::put('/{id}', [ClientController::class, 'update']);
        Route::delete('/{id}', [ClientController::class, 'destroy']);
    });

    Route::prefix('projects')->group(function () {
        Route::get('/fetch-project-data', [ProjectController::class, 'fetchUserProjects'])->name('fetch-user-projects');

        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::post('/', [ProjectController::class, 'store'])->name('projects.create');
        Route::get('/list', [ProjectController::class, 'showList'])->name('projects.list');
        Route::get('/{projectId}/details', [ProjectController::class, 'edit'])->name('project.details');

        Route::post('/{projectId}/favorite', [ProjectController::class, 'saveFavorite'])->name('projects.favorite');

        Route::prefix('{projectId}/call-sheets')->group(function () {
            Route::get('/fetch-call-sheets', [CallSheetController::class, 'fetchCallSheets'])->name('fetch-call-sheets');

        });

    });
 
    Route::prefix('/media')->group(function () {
        Route::get('/', [MediaController::class, 'index']);
        Route::post('/', [MediaController::class, 'store']);
        Route::put('/{id}', [MediaController::class, 'update']);
        Route::post('/generateAiImage', [MediaController::class, 'generateAiImage']);

        Route::delete('/{id}', [MediaController::class, 'destroy']);

        
    });



});
