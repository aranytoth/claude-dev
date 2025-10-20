<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Page;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'posts' => Post::count(),
            'published_posts' => Post::where('status', 'published')->count(),
            'pages' => Page::count(),
            'users' => User::count(),
            'categories' => Category::count(),
            'tags' => Tag::count(),
        ];

        $recentPosts = Post::with(['user', 'category'])
            ->latest('created_at')
            ->limit(5)
            ->get();

        return view('admin.dashboard', compact('stats', 'recentPosts'));
    }
}
