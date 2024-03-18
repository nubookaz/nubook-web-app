<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media; 
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use Intervention\Image\Facades\Image;

class MediaController extends Controller
{
    public function index()
    {
        $mediaItems = Media::all();
        return response()->json($mediaItems);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'project_id' => 'nullable|integer',
                'media' => 'required|file|mimes:jpg,jpeg,png,pdf,mp4,mp3',
            ]);

            $userId = auth()->id();
            $folderPath = 'public/media/user_' . $userId; 

            $mediaPath = $request->file('media')->store($folderPath);
            Log::info("Media stored: {$mediaPath}");

            $media = new Media();
            $media->user_id = $userId;
            $media->project_id = $request->project_id;
            $media->media_path = str_replace('public/', '', $mediaPath);
            $media->media_type = $request->file('media')->getMimeType();
            $media->size = $request->file('media')->getSize();
            $media->ai_generated = isset($request->ai_generated) ? (int)$request->ai_generated : 0;
            $media->save();

            return response()->json($media);
        } catch (\Exception $e) {
            Log::error("Error storing media: " . $e->getMessage());
            return response()->json(['message' => 'Error storing media'], 500);
        }
    }

    
    public function update(Request $request, $id)
    {
        try {
            $media = Media::findOrFail($id);
    
            if ($media->user_id !== auth()->id()) {
                Log::warning("Unauthorized media update attempt for media ID: {$id} by user ID: " . auth()->id());
                return response()->json(['message' => 'Unauthorized'], 403);
            }
    
            if ($request->hasFile('media')) {
                Storage::delete('public/' . $media->media_path);
    
                // Store files in the 'public' disk to make them accessible via HTTP
                $folderPath = 'public/media/user_' . $media->user_id; 
                
                $media->media_path = $request->file('media')->store($folderPath);
                Log::info("Updated media stored: {$media->media_path}");
    
                // Remove 'public/' from the path to make it accessible via the /storage URL
                $media->media_path = str_replace('public/', '', $media->media_path);
                Log::info("Updated media stored: {$media->media_path}");
                $media->media_type = $request->file('media')->getMimeType();
                $media->size = $request->file('media')->getSize();
            }            
    
            if (isset($request->ai_generated)) {
                $media->ai_generated = (int)$request->ai_generated;
            }
            $media->save();
    
            return response()->json($media);
        } catch (\Exception $e) {
            Log::error("Error updating media: " . $e->getMessage());
            return response()->json(['message' => 'Error updating media'], 500);
        }
    }

    public function generateAiImage(Request $request) 
    {
        $client = new Client();
        $userId = auth()->user()->id;
        $content = $request->getContent();

        $decodedContent = json_decode($content, true);
        $prompt = json_last_error() === JSON_ERROR_NONE && isset($decodedContent['body']) ? $decodedContent['body'] : $content;
        
        if (is_string($prompt) && strlen($prompt) > 1000) {
            $prompt = substr($prompt, 0, 1000);
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

        $maxRetries = 3;
        $attempt = 0;

        do {
            try {
                $response = $client->post($url, [
                    'headers' => $headers, 
                    'json' => $body,
                ]);

                $responseBody = $response->getBody()->getContents();
                return $this->saveMediaDetails($responseBody, $userId);

            } catch (\GuzzleHttp\Exception\ClientException $e) {
                $attempt++;
                $responseBody = $e->getResponse()->getBody()->getContents();
                $error = json_decode($responseBody, true);

                if ($error['error']['code'] !== 'content_policy_violation' || $attempt >= $maxRetries) {
                    \Log::error("OpenAI API request failed after {$attempt} attempts: " . $e->getMessage() . ' Response Body: ' . $responseBody);
                    $errorMessage = $error['error']['message'] ?? 'An error occurred while communicating with OpenAI.';
                    return response()->json(['error' => $errorMessage], $e->getResponse()->getStatusCode());
                }

            } catch (\Exception $e) {
                \Log::error("Unexpected error: " . $e->getMessage());
                return response()->json(['error' => 'An unexpected error occurred.'], 500);
            }

            sleep(5);

        } while ($attempt < $maxRetries);

        return response()->json(['error' => 'Failed to generate image after multiple attempts.'], 500);
    }

    private function saveMediaDetails($responseBody, $userId) 
    {
        $client = new Client();
        $data = json_decode($responseBody, true);
        $mediaUrl = $data['data'][0]['url'] ?? null;
    
        // Download the image
        $response = $client->get($mediaUrl);
        $imageContent = $response->getBody()->getContents();
        
        $folderPath = 'public/media/user_' . $userId;
        $fileName = uniqid() . '.jpeg';  
        $filePath = $folderPath . '/' . $fileName;
    
        Storage::disk('local')->makeDirectory($folderPath);
    
        Storage::disk('local')->put($filePath, $imageContent);
    
        $media = new Media();
        $media->user_id = $userId;
        $media->project_id = null; 

        $media->media_path = str_replace('public/', '', $filePath);
        $media->media_type = 'image/jpeg'; 
        $media->size = Storage::disk('local')->size($filePath);
        
        $dimensions = $this->getImageDimensions($filePath);
        $media->dimensions = json_encode($dimensions);  
    
        $media->ai_generated = true;
        $media->save();
    
        return $media;
    }
    
    private function getImageDimensions($filePath) {
        $size = getimagesize(storage_path('app/' . $filePath));
        return ['width' => $size[0], 'height' => $size[1]];
    }
    
    public function destroy($id)
    {
        try {
            $media = Media::findOrFail($id);
            Storage::delete($media->media_path);
            Log::info("Deleted media: {$media->media_path}");
    
            $media->delete();
            return response()->json(['message' => 'Media deleted successfully']);
        } catch (\Exception $e) {
            Log::error("Error deleting media: " . $e->getMessage());
            return response()->json(['message' => 'Error deleting media'], 500);
        }
    }
}
