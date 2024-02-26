<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        // Optionally, include relationships in the query
        $tasks = Task::with(['project', 'callSheet'])->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'nullable|exists:projects,id',
            'call_sheet_id' => 'nullable|exists:call_sheets,id',
        ]);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'string',
            'user_id' => 'exists:users,id',
            'project_id' => 'nullable|exists:projects,id',
            'call_sheet_id' => 'nullable|exists:call_sheets,id',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
