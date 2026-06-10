<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Media;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $total_posts = Post::count();
        $published_posts = Post::where('status', 'published')->count();
        $draft_posts = Post::where('status', 'draft')->count();
        $total_views = Post::sum('views');
        $total_categories = Category::count();
        $total_tags = Tag::count();
        $total_media = Media::count();
        $recent_posts = Post::with('category')->latest()->take(5)->get();

        return response()->json([
            'total_posts' => $total_posts,
            'published_posts' => $published_posts,
            'draft_posts' => $draft_posts,
            'total_views' => (int) $total_views,
            'total_categories' => $total_categories,
            'total_tags' => $total_tags,
            'total_media' => $total_media,
            'recent_posts' => $recent_posts,
        ]);
    }
}
