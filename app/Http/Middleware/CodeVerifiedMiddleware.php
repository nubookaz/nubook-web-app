<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CodeVerifiedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->session()->has('registration.email_verified') || !$request->session()->get('registration.email_verified')) {
            // Returning a JSON response indicating the error
            return response()->json(['error' => 'Email verification not completed.'], 403);
        }

        return $next($request);
    }
}
