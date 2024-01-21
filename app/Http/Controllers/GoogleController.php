<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class GoogleController extends Controller
{
   
    public function getNearbyHospitals(Request $request)
    {
        $latitude = $request->latitude;
        $longitude = $request->longitude;
        $radius = 8000; // Radius in meters
        $type = 'hospital';
        $apiKey = env('GOOGLE_MAP_API_KEY'); // Store your API key in your .env file
        $keywords = ['urgent care', 'emergency', 'health center']; // Add your keywords here

        $response = Http::get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", [
            'location' => $latitude . ',' . $longitude,
            'radius' => $radius,
            'type' => $type,
            'keyword' => $keywords,
            'key' => $apiKey
        ]);

        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }
    
}
