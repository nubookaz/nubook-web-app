<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CodeVerifiedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        if (!$request->session()->has('registration.email_verified') || !$request->session()->get('registration.email_verified')) {
            return redirect('/register')->with('error', 'Email verification not completed.');
        }
        

        return $next($request);
    }

}
