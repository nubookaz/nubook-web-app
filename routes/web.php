<?php

use App\Http\Controllers\WebsiteController;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Auth\VerificationController;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CompanyController; 
use App\Http\Controllers\CallSheetController; 
use App\Http\Controllers\RecipientController; 
use App\Http\Controllers\GoogleController; 

use App\Http\Controllers\AssociationController; 
use App\Http\Controllers\ChatGPTController;

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
  
});







Route::middleware(['auth', 'verified'])->group(function () {



    Route::get('/fetch-auth-status', [ProfileController::class, 'authStatus']);

    // Data Fetching
    Route::get('/fetch-user-data', [ProfileController::class, 'fetchUserData'])->name('fetch-user-data');
    Route::get('/fetch-project-data', [ProfileController::class, 'fetchUserProjects'])->name('fetch-project-data');

    Route::post('/chat', [ChatGPTController::class, 'chat'])->name('chat.gpt');
    Route::get('/ai-content-info', [ChatGPTController::class, 'getAIGeneratedContentInfo'])->name('ai-content.info');
    Route::get('/fetch-image', [ChatGPTController::class, 'fetchImage']);
    Route::post('/movie_poster', [ChatGPTController::class, 'createMoviePoster'])->name('chat.gpt.movie.poster');

    // Google Map Api 
    Route::get('/nearby-hospitals', [GoogleController::class, 'getNearbyHospitals']);





    // Verification 
    Route::post('/verification/update-password', [VerificationController::class, 'updatePassword'])->name('verification.updatePassword');
    Route::post('/verification/verify', [VerificationController::class, 'verifyCode'])->name('verification.verifyCode');
    Route::post('/verification/resend-code', [VerificationController::class, 'resendCode'])->name('verification.resendCode');
    Route::post('/verification/personal-info', [VerificationController::class, 'storePersonalInfo'])->name('verification.personal.store');
    Route::post('/verification/company-info', [VerificationController::class, 'storeProductionCompanyInfo'])->name('verification.production.company.store');
    



    // Account Settings
    Route::get('/profile-settings', fn () => Inertia::render('Profile/ProfileSettings'))->name('profile.settings');




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


    Route::prefix('tasks')->group(function () {
        Route::get('/', [TaskController::class, 'indexTask'])->name('tasks.index');
        Route::post('/', [TaskController::class, 'storeTask'])->name('tasks.create');
        Route::put('/{task}', [TaskController::class, 'updateTask'])->name('tasks.update');
        Route::delete('/{task}', [TaskController::class, 'destroyTask'])->name('tasks.delete');
    });

    Route::prefix('projects')->group(function () {

        Route::get('{projectId}/users', [ProjectController::class, 'getUsers'])->name('projects.users');
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::get('/all-projects', [ProjectController::class, 'showList'])->name('projects.list');
        Route::post('/', [ProjectController::class, 'store'])->name('projects.create');
        Route::get('/{projectId}/details', [ProjectController::class, 'edit'])->name('projects.details');
        Route::post('/{id}/favorite', [ProjectController::class, 'saveFavorite'])->name('projects.favorite');
        Route::get('/{id}/estimate', [ProjectController::class, 'estimate'])->name('projects.estimate');
        Route::post('/{id}', [ProjectController::class, 'update'])->name('projects.update');
        Route::post('/{id}/poster', [ProjectController::class, 'savePoster'])->name('projects.save.poster');
        Route::delete('/delete-project/{id}', [ProjectController::class, 'softDelete'])->name('projects.delete');

        // Call Sheet Routes
        Route::prefix('{projectId}/call-sheets')->group(function () {

            Route::get('/fetch-call-sheet-data', [CallSheetController::class, 'fetchUserCallSheets'])->name('fetch-user-call-sheets');
            Route::post('/', [CallSheetController::class, 'createCallSheet'])->name('callSheet.create');
            Route::get('{callSheetId}/details', [CallSheetController::class, 'callSheetDetailsPage'])->name('callSheet.details.page');




            

            Route::get('/{callSheetId}/users', [CallSheetController::class, 'getUsers'])->name('call-sheets.users');

            Route::get('/', [CallSheetController::class, 'index'])->name('projects.callSheets.index');
          
            Route::post('/{callSheetId}', [CallSheetController::class, 'updateCallSheetDetails'])->name('projects.callSheets.update');
            Route::post('{callSheetId}/details/locations', [CallSheetController::class, 'storeLocationDetails'])->name('projects.callSheets.save.locations');
            Route::put('{callSheetId}/details/locations/update', [CallSheetController::class, 'updateLocationDetails'])->name('projects.callSheets.update.locations');
            Route::delete('{callSheetId}/details/locations/{locationId}/delete', [CallSheetController::class, 'destroyLocationDetails'])
            ->name('projects.callSheets.delete.location');

            Route::put('/{callSheetId}/bulletin', [CallSheetController::class, 'updateBulletin'])->name('projects.callSheets.update.bulletin');
            Route::post('/{callSheetId}/weather', [CallSheetController::class, 'saveWeatherData'])->name('save.weather');
            
            Route::put('/{callSheetId}/general-call-time', [CallSheetController::class, 'updateGeneralCallTime'])->name('projects.callSheets.update.generalCallTime');

            Route::prefix('/{callSheetId}/schedule')->group(function () {
                Route::post('/', [CallSheetController::class, 'storeCallSheetSchedule'])->name('callSheets.schedule.store');
                Route::get('/', [CallSheetController::class, 'getCallSheetSchedule'])->name('callSheets.schedule.get');
                Route::put('/schedule', [CallSheetController::class, 'updateCallSheetSchedule'])->name('callSheets.schedule.update');

            });

            Route::post('/{callSheet_Id}/recipients', [RecipientController::class, 'saveRecipient'])->name('projects.callSheets.recipient');
            Route::post('/{callSheetId}/recipients/{recipientId}', [RecipientController::class, 'updateRecipient'])->name('projects.callSheets.update.recipient');
            Route::delete('/{callSheetId}/recipients/{recipientId}/delete', [RecipientController::class, 'deleteRecipientFromCallSheet'])->name('projects.callSheets.delete.recipient');

            Route::delete('/{callSheetId}/softDelete', [RecipientController::class, 'softDelete'])->name('callsheets.softDelete');

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
