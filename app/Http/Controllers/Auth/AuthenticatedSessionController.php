<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;  
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\HasApiTokens;  
use Illuminate\Support\Facades\Log;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        // Log that the login process has started
        Log::info('Login process started', ['email' => $request->email]);
    
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        // Logging before attempting to authenticate
        Log::info('Attempting to authenticate', ['email' => $request->email]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Auth::attempt($request->only('email', 'password'))) {
            // Log failed login attempt
            Log::warning('Failed login attempt', ['email' => $request->email]);
    
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 422); 
        }
    
        // Log successful authentication
        Log::info('User authenticated', ['email' => $request->email]);
    
        $token = $user->createToken('api-token')->plainTextToken;
    
        // Log token creation
        Log::info('Token created', ['email' => $request->email, 'token' => $token]);
    
        // Log successful login
        Log::info('Successful login', ['email' => $request->email]);
    
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
    

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
