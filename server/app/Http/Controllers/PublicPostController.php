<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;

class PublicPostController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $category = $request->get('category');
        $tag = $request->get('tag');
        $search = $request->get('search');
        
        $cacheKey = "public.posts.page.{$page}.cat.{$category}.tag.{$tag}.search.{$search}";

        $posts = Cache::remember($cacheKey, 3600, function () use ($category, $tag, $search) {
            $query = Post::with(['user', 'category'])->where('status', 'published')->latest();
            
            if ($category) {
                $query->whereHas('category', function($q) use ($category) {
                    $q->where('slug', $category);
                });
            }
            if ($tag) {
                $query->whereHas('tags', function($q) use ($tag) {
                    $q->where('slug', $tag);
                });
            }
            if ($search) {
                $query->where('title', 'like', '%' . $search . '%');
            }
            
            return $query->paginate(12);
        });

        return response()->json($posts);
    }

    public function show($slug)
    {
        $post = Post::with(['user', 'category', 'tags'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $post->increment('views');

        return response()->json($post);
    }

    public function categories()
    {
        $categories = Cache::remember('public.categories', 3600, function () {
            return Category::withCount(['posts' => function($q) {
                $q->where('status', 'published');
            }])->get();
        });

        return response()->json($categories);
    }

    public function tags()
    {
        $tags = Cache::remember('public.tags', 3600, function () {
            return Tag::all();
        });

        return response()->json($tags);
    }
}
