<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController; // Import the ProjectController

// Existing middleware for checking authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// New route for creating a project
Route::middleware('auth:sanctum')->post('/projects', [ProjectController::class, 'store']);
