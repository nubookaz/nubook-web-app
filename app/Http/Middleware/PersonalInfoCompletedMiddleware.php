<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PersonalInfoCompletedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        if (!$request->session()->has('registration.personal_info_completed') || !$request->session()->get('registration.personal_info_completed')) {
            return redirect('/register')->with('error', 'Email verification not completed.');
        }

        return $next($request);
    }
}
