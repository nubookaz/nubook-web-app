<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EmailVerifiedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    
    public function handle($request, Closure $next)
    {
        $user = $request->user();

        if ($user && $user->email_verified_at !== null) {
            // Allow access if email is verified
            return $next($request);
        }

        // Redirect to registration page if email is not verified
        return redirect('/register')->with('error', 'Email verification not completed.');
    }
}

