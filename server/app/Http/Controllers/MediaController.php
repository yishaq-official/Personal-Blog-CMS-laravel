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
        $originalName = $file->getClientOriginalName();
        $filename = uniqid() . '.webp';
        $path = 'media/' . $filename;

        // Process image
        $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
        $image = $manager->read($file->getRealPath());
        
        // Scale down if width is greater than 1920px
        $image->scaleDown(width: 1920);
        
        // Convert to webp with 80% quality
        $encoded = $image->toWebp(80);
        
        // Store on disk
        \Illuminate\Support\Facades\Storage::disk('public')->put($path, $encoded->toString());

        // Create DB record
        $media = \App\Models\Media::create([
            'user_id' => $request->user() ? $request->user()->id : 1, // Fallback to 1 if no auth in testing
            'filename' => $filename,
            'original_name' => $originalName,
            'mime_type' => 'image/webp',
            'size' => strlen($encoded->toString()),
            'path' => $path,
            'url' => \Illuminate\Support\Facades\Storage::url($path),
        ]);

        return response()->json($media, 201);
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
