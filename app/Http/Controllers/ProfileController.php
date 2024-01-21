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




class ProfileController extends Controller
{
    use ProfileTrait;

    public function fetchUserData()
    {
        // Replace this logic with your actual user data retrieval logic
        $user = auth()->user()->load(
            'projects.callSheets', 
            'phone', 
            'location.filmLocation', 
            'location.parkingLocation', 
            'location.hospitalLocation', 
            'primaryProductionCompany',
            'productionCompanies'
        );
        return response()->json($user);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = Auth::user()->load(['phone', 'location', 'primaryProductionCompany']);

        return Inertia::render('Profile/SettingsPage', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'auth' => $user,
        ]);
    }
 
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
            $imageUrl = asset('storage/user'.$user->id.'/avatars/' . $user->profile_image);
    
            // Specify the folder path
            $folderPath = File::allFiles(public_path('images/profile_images'));
 
            // Count the number of files in the folder
            $imagesCount = count( $folderPath );
    
            return response()->json(['imageUrl' => $imageUrl, 'imagesCount' => $imagesCount]);
        }
    
        // Return false if there is no profile image
        return response()->json(['imageUrl' => false]);
    }
    
    
    public function uploadProfileImage(Request $request)
    {
        $user = $request->user();
    
        // Validate the uploaded file
        $request->validate([
            'profileImage' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust the allowed file types and size as needed
        ]);
    
        // Store the uploaded image and get its path
        if ($request->hasFile('profileImage')) {
            $imagePath = $request->file('profileImage')->store('user'.$user->id.'/avatars', 'public');
            
            // Update the user's profile image path in the database
            $user->profile_image = basename($imagePath); // Only store the file name in the database
            $user->save();
    
            return response()->json(['message' => 'Profile image uploaded successfully']);
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
}
