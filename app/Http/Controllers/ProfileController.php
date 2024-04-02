<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Http\Traits\ProfileTrait;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Log;




class ProfileController extends Controller
{
    use ProfileTrait;

    public function authStatus(Request $request)
    {
        $user = $request->user()->load([
            'projects.callSheets',
            'phone',
            'location.filmLocation',
            'location.parkingLocation',
            'primaryProductionCompany',
            'productionCompanies',
            'roles',
            'subscriptions',
            'callSheets',
            'projects',
            'aiContentGenerations',
            'media',
            'sponsoredClients',
            'sponsors'
        ]);
        
        $status = [
            'loggedIn' => true,
            'user' => $user->makeHidden(['sensitiveAttribute1', 'sensitiveAttribute2']),
            'isPasswordTemporary' => $user->is_password_temporary,
            'consentGiven' => $user->consent,
            'emailVerified' => $user->email_verified,
            'codeVerified' => $user->code_verified,
            'personalInfoCompleted' => $user->personal_info_completed,
            'companyInfoCompleted' => $user->company_info_completed,
            'registrationComplete' => $user->registration_complete,
        ];
 
        return response()->json($status);
    }
    
    // public function fetchUserData()
    // {
 
    //     $user = auth()->user()->load([
    //         'projects.callSheets',
    //         'phone',
    //         'location.filmLocation',
    //         'location.parkingLocation',
    //         'primaryProductionCompany',
    //         'productionCompanies',
    //         'roles',
    //         'subscriptions',
    //         'callSheets',
    //         'projects',
    //         'aiContentGenerations',
    //         'media',
    //         'sponsoredClients',
    //         'sponsors'
    //     ]);
    //     return response()->json($user);
    // }
    
    // public function edit(Request $request): Response
    // {
    //     // $user = Auth::user()->load([
    //     //     'phone',
    //     //     'location',
    //     //     'primaryProductionCompany',
    //     //     'roles',
    //     //     'subscriptions',
    //     //     'productionCompanies',
    //     //     'projects',
    //     //     'media'
    //     // ]);
    //     return Inertia::render('Profile/SettingsPage');
    // }
    
 
    public function updateProfileInfo(Request $request)
    {
        $user = $request->user();
        $profileInfo = $request->all();

        if ($this->updateProfileInfoTrait($user, $profileInfo)) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['error' => 'Failed to update profile info'], 500);
        }
    }

    public function getProfileImage(Request $request)
    {
        $user = $request->user();
    
        // Check if the user has a profile image
        if ($user->profile_image) {
            // Build the image URL
            $imageUrl = asset('storage/media/user_' . $user->id . '/' . $user->profile_image);
    
            // Specify the folder path based on the new structure
            $folderPath = public_path('storage/media/user_' . $user->id);
    
            // Ensure the directory exists before counting the files
            if (File::exists($folderPath)) {
                $files = File::allFiles($folderPath);
                $imagesCount = count($files);
            } else {
                $imagesCount = 0; // If the directory does not exist, set the count to 0
            }
    
            return response()->json(['imageUrl' => $imageUrl, 'imagesCount' => $imagesCount]);
        }
    
        return response()->json(['imageUrl' => false]);
    }

    public function uploadProfileImage(Request $request)
    {
        $user = $request->user();
    
        Log::info('Attempting to upload profile image for user: ' . $user->id);
    
        $request->validate([
            'profileImage' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('profileImage')) {
            $folderPath = 'public/media/user_' . $user->id;
            $imagePath = $request->file('profileImage')->store($folderPath);
    
            Log::info('Image uploaded: ' . $imagePath);
    
            $user->profile_image = basename($imagePath);
            $user->save();
    
            Log::info('Profile image saved for user: ' . $user->id);
    
            // Make sure to return the full path or a URL to the image
            $imageUrl = Storage::url($imagePath);
    
            Log::info('Profile image URL: ' . $imageUrl);
    
            return response()->json(['message' => 'Profile image uploaded successfully', 'imageUrl' => $imageUrl]);
        } else {
            Log::warning('Failed to upload profile image for user: ' . $user->id);
        }
    
        return response()->json(['message' => 'Failed to upload profile image'], 400);
    }
    


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }


    public function fetchDarkMode($userId)
    {
        $user = User::findOrFail($userId);
        return response()->json(['dark_mode_setting' => $user->dark_mode_setting]);
    }


    public function updateDarkMode(Request $request, $userId)
    {
        $request->validate([
            'dark_mode_setting' => 'required|in:light,dark,midnight',
        ]);

        $user = User::findOrFail($userId);
        $user->dark_mode_setting = $request->dark_mode_setting;
        $user->save();

        return response()->json(['message' => 'Dark mode setting updated successfully']);
    }
}
