<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    // use AuthenticatesUsers;

    // /**
    //  * Where to redirect users after login.
    //  *
    //  * @var string
    //  */
    // protected $redirectTo = '/home';

    // /**
    //  * Create a new controller instance.
    //  *
    //  * @return void
    //  */
    // public function __construct()
    // {
    //     $this->middleware('guest')->except('logout');
    // }

 
    // public function login(Request $request)
    // {
    //     // Perform login
    //     $credentials = $request->only('email', 'password');
    
    //     if (Auth::attempt($credentials)) {
    //         // Authentication passed, check verification steps
    //         $user = auth()->user();
    
    //         if (
    //             !$user->email_verified ||
    //             !$user->code_verified ||
    //             !$user->personal_info_completed ||
    //             !$user->company_info_completed ||
    //             !$user->registration_complete
    //         ) {
    //             // User needs to complete additional steps
    //             return response()->json(['error' => 'You need to complete all verification steps.'], 403);
    //         }
    
    //         // All verification steps are completed, proceed with the standard login response
    //         return response()->json(['success' => true, 'redirect' => route('dashboard')]);
    //     }
    
    //     // Authentication failed, handle accordingly
    //     return response()->json(['error' => 'Invalid login credentials'], 401);
    // }
}
