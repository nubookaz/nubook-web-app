<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Include the Log facade
use Illuminate\Support\Facades\Auth; // Include the Auth facade

class TaskController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');

    }

    public function indexTask()
    {
        Log::info('Fetching all tasks with relationships');
        // Assuming each task belongs to a user and you have a 'user' relationship defined in your Task model
        $tasks = Task::with(['project', 'callSheet', 'user:id,first_name,last_name'])->get();
    
        // If you want to concatenate the first name and last name for easier access on the frontend
        $tasks->each(function ($task) {
            if ($task->user) {
                $task->user->name = $task->user->first_name . ' ' . $task->user->last_name;
                unset($task->user->first_name, $task->user->last_name); // Optionally remove these if not needed
            }
        });
    
        return response()->json($tasks);
    }
    
    public function storeTask(Request $request)
    {
        Log::info('Storing a new task', $request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'user_id' => 'sometimes|required|exists:users,id',
            'project_id' => 'nullable|exists:projects,id',
            'call_sheet_id' => 'nullable|exists:call_sheets,id',
        ]);
    
        if (!array_key_exists('user_id', $validated)) {
            $validated['user_id'] = Auth::id();
        }
    
        $task = Task::create($validated);
        Log::info('Task created successfully', ['id' => $task->id]);
        return response()->json($task, 201);
    }
    

    public function updateTask(Request $request, Task $task)
    {
        Log::info('Updating task', ['id' => $task->id, 'request' => $request->all()]);
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'string',
            // 'user_id' validation is not needed here if you're not changing the user
            'project_id' => 'nullable|exists:projects,id',
            'call_sheet_id' => 'nullable|exists:call_sheets,id',
        ]);

        // Assuming you do not need to change the user_id upon update
        // If you do, ensure to handle it appropriately

        $task->update($validated);
        Log::info('Task updated successfully', ['id' => $task->id]);
        return response()->json($task);
    }

    public function destroyTask(Task $task)
    {
        Log::info('Soft deleting task', ['id' => $task->id]);
        $task->delete(); // This will now soft delete the task
        return response()->json(null, 204);
    }
    
}
