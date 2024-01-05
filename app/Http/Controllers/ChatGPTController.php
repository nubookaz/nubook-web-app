<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\AIContentGeneration;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Http\Traits\ProjectTrait;


class ChatGPTController extends Controller
{

    use ProjectTrait;

    public function getAIGeneratedContentInfo(Request $request)
    {
        $userId = auth()->user()->id;
        $todayCount = AIContentGeneration::where('user_id', $userId)
                                         ->where('date', now()->toDateString())
                                         ->sum('generation_count');


    
        return response()->json([
            'currentCount' => $todayCount,
            'limit' => AIContentGeneration::DAILY_LIMIT
        ]);
    }
       

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

 
    public function fetchImage(Request $request)
    {
        $imageUrl = $request->query('url');
        Log::info("Fetching image: " . $imageUrl);
    
        try {
            // Make the HTTP request to fetch the image
            $response = Http::get($imageUrl);
    
            // Check if the response is successful
            if ($response->successful()) {
                $contentType = $response->header('Content-Type');
                $contentLength = $response->header('Content-Length');
    
                // Create a streamed response to send the image data
                return new StreamedResponse(function () use ($response) {
                    echo $response->body();
                }, 200, [
                    'Content-Type' => $contentType,
                    'Content-Length' => $contentLength,
                ]);
            }
    
            // Handle unsuccessful response
            return response()->json(['error' => 'Failed to fetch the image'], 500);
    
        } catch (\Exception $e) {
            Log::error("Error fetching image: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function createMoviePoster(Request $request) 
    {
        $client = new Client();
        $userId = auth()->user()->id; 

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

            $this->handleAIGeneratedContent($userId, $isImageAIGenerated = true);
    
            return $response->getBody();
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            \Log::error("OpenAI API request failed: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while communicating with OpenAI.'], 500);
        }
    }
    
    
    
}
