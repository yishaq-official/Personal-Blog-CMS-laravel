<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $media = \App\Models\Media::latest()->paginate(20);
        return response()->json($media);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:10240', // max 10MB
        ]);

        $file = $request->file('file');
        
        // Save to a temporary location
        $tempPath = $file->store('tmp');

        // Create DB record with status 'processing'
        $media = \App\Models\Media::create([
            'user_id' => $request->user() ? $request->user()->id : 1, // Fallback to 1 if no auth in testing
            'filename' => 'processing',
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => 'processing',
            'size' => 0,
            'path' => 'processing',
            'url' => 'processing',
            'status' => 'processing',
        ]);

        // Dispatch background job
        \App\Jobs\ProcessImageUpload::dispatch($media, $tempPath);

        return response()->json([
            'message' => 'Image upload accepted and is processing in the background.',
            'data' => $media
        ], 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $media = \App\Models\Media::findOrFail($id);
        
        \Illuminate\Support\Facades\Storage::disk('public')->delete($media->path);
        $media->delete();

        return response()->json(['message' => 'Media deleted successfully']);
    }
}
