<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;

// Middleware for authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {

    // Existing middleware for checking authenticated user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    

});
