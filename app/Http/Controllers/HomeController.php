<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Page;
use App\Models\Category;
use App\Models\Tag;

class HomeController extends Controller
{
    public function index()
    {
        $posts = Post::published()
            ->with(['user', 'category'])
            ->latest()
            ->paginate(10);

        $categories = Category::withCount('posts')->get();

        return view('public.index', compact('posts', 'categories'));
    }

    public function showPost($slug)
    {
        $post = Post::where('slug', $slug)
            ->published()
            ->with(['user', 'category', 'tags'])
            ->firstOrFail();

        return view('public.post', compact('post'));
    }

    public function showPage($slug)
    {
        $page = Page::where('slug', $slug)
            ->published()
            ->with('user')
            ->firstOrFail();

        return view('public.page', compact('page'));
    }

    public function showCategory($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $posts = Post::published()
            ->where('category_id', $category->id)
            ->with(['user', 'category'])
            ->latest()
            ->paginate(10);

        return view('public.category', compact('category', 'posts'));
    }

    public function showTag($slug)
    {
        $tag = Tag::where('slug', $slug)->firstOrFail();

        $posts = $tag->posts()
            ->published()
            ->with(['user', 'category'])
            ->latest()
            ->paginate(10);

        return view('public.tag', compact('tag', 'posts'));
    }
}
