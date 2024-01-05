<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetUserTimezone
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        if (auth()->check()) {
            $timezone = auth()->user()->timezone; 
            config(['app.timezone' => $timezone]);
            date_default_timezone_set($timezone);
        }
    
        return $next($request);
    }
    
}
