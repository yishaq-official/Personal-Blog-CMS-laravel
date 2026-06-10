<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PublicPostController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $cacheKey = 'posts.page.' . $page;

        // Cache the paginated posts for 1 hour (3600 seconds)
        $posts = Cache::remember($cacheKey, 3600, function () {
            // Placeholder: When Post model is created, it will be:
            // return \App\Models\Post::with(['author', 'category'])->where('status', 'published')->latest()->paginate(12);
            return [];
        });

        return response()->json($posts);
    }

    public function show($slug)
    {
        $cacheKey = 'post.' . $slug;

        // Cache the single post for 1 hour
        $post = Cache::remember($cacheKey, 3600, function () use ($slug) {
            // Placeholder: When Post model is created, it will be:
            // return \App\Models\Post::with(['author', 'category', 'tags'])->where('slug', $slug)->firstOrFail();
            return null;
        });

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json($post);
    }
}
