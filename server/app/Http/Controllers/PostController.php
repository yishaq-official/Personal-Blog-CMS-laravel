<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;
use Illuminate\Support\Str;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['category', 'tags'])->latest();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->paginate(15));
    }

    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
        $validated['user_id'] = $request->user() ? $request->user()->id : 1;
        $validated['read_time'] = ceil(str_word_count(strip_tags($validated['content'])) / 200);

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $post = Post::create($validated);

        if ($request->has('tags')) {
            $post->tags()->sync($request->tags);
        }

        return response()->json(['post' => $post->load(['category', 'tags']), 'message' => 'Post created successfully'], 201);
    }

    public function show(string $id)
    {
        $post = Post::with(['category', 'tags'])->findOrFail($id);
        return response()->json($post);
    }

    public function update(UpdatePostRequest $request, string $id)
    {
        $post = Post::findOrFail($id);
        $validated = $request->validated();

        if (isset($validated['title']) && $validated['title'] !== $post->title) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
        }

        if (isset($validated['content'])) {
            $validated['read_time'] = ceil(str_word_count(strip_tags($validated['content'])) / 200);
        }

        if (isset($validated['status']) && $validated['status'] === 'published' && $post->status !== 'published') {
            $validated['published_at'] = now();
        } elseif (isset($validated['status']) && $validated['status'] === 'draft') {
            $validated['published_at'] = null;
        }

        $post->update($validated);

        if ($request->has('tags')) {
            $post->tags()->sync($request->tags);
        }

        return response()->json(['post' => $post->load(['category', 'tags']), 'message' => 'Post updated successfully']);
    }

    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function publish(string $id)
    {
        $post = Post::findOrFail($id);
        $post->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        return response()->json(['message' => 'Post published successfully', 'post' => $post]);
    }

    public function unpublish(string $id)
    {
        $post = Post::findOrFail($id);
        $post->update([
            'status' => 'draft',
            'published_at' => null,
        ]);

        return response()->json(['message' => 'Post unpublished successfully', 'post' => $post]);
    }
}
