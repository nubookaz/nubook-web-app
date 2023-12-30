<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;


class ChatGPTController extends Controller
{
    public function chat(Request $request) 
    {
        $client = new Client();

 
        // Retrieve the user's message from the request
        $userMessage = $request->input('message');

        $apiKey = env('OPENAI_API_KEY');
        $url = 'https://api.openai.com/v1/chat/completions';

        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $apiKey,
        ];

        $body = [
            'model' => 'gpt-4-1106-preview',
            'messages' => [['role' => 'user', 'content' => $userMessage]],
        ];

        try {
            $response = $client->post($url, [
                'headers' => $headers, 
                'json' => $body,
            ]);

            return $response->getBody();
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            \Log::error("OpenAI API request failed: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while communicating with OpenAI.'], 500);
        }
    }

    public function createMoviePoster(Request $request) 
    {
        $client = new Client();
    
        // Retrieve movie details from the request
        $projectName = $request->input('project_name');
        $primaryGenre = $request->input('primary_genre');
        $secondaryGenre = $request->input('secondary_genre');
        $movieRating = $request->input('movie_rating');
        $projectDescription = $request->input('project_description');
    
        // Construct a prompt for generating a movie poster
        $prompt = "Create an image of a movie poster for '$projectName', a $primaryGenre and $secondaryGenre film. The poster should reflect themes like $projectDescription. Rating: $movieRating.";
    
        // Adjust the prompt length to meet the character limit
        $maxPromptLength = 1000;
        if (strlen($prompt) > $maxPromptLength) {
            $prompt = substr($prompt, 0, $maxPromptLength);
        }
    
        $apiKey = env('OPENAI_API_KEY');
        $url = 'https://api.openai.com/v1/images/generations';
    
        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $apiKey,
        ];
    
        $body = [
            'model' => "dall-e-3",
            'prompt' => $prompt,
            'n' => 1,
            'size' => "1024x1792" 
        ];
    
        try {
            $response = $client->post($url, [
                'headers' => $headers, 
                'json' => $body,
            ]);
    
            return $response->getBody();
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            \Log::error("OpenAI API request failed: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while communicating with OpenAI.'], 500);
        }
    }
    
    
    
}
