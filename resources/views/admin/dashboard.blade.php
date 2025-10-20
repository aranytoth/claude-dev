@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="row mt-4">
    <div class="col-md-12">
        <h2>Dashboard</h2>
        <p class="text-muted">Welcome to your WordPress-like CMS</p>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-3">
        <div class="card text-white bg-primary mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">Posts</h5>
                        <h2>{{ $stats['posts'] }}</h2>
                        <small>{{ $stats['published_posts'] }} Published</small>
                    </div>
                    <i class="bi bi-file-text" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card text-white bg-success mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">Pages</h5>
                        <h2>{{ $stats['pages'] }}</h2>
                    </div>
                    <i class="bi bi-file-earmark" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card text-white bg-info mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">Categories</h5>
                        <h2>{{ $stats['categories'] }}</h2>
                    </div>
                    <i class="bi bi-folder" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card text-white bg-warning mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">Tags</h5>
                        <h2>{{ $stats['tags'] }}</h2>
                    </div>
                    <i class="bi bi-tags" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h5>Recent Posts</h5>
            </div>
            <div class="card-body">
                @if($recentPosts->count() > 0)
                <table class="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($recentPosts as $post)
                        <tr>
                            <td><a href="{{ route('admin.posts.edit', $post) }}">{{ $post->title }}</a></td>
                            <td>{{ $post->user->name }}</td>
                            <td>
                                @if($post->status === 'published')
                                <span class="badge bg-success">Published</span>
                                @else
                                <span class="badge bg-secondary">Draft</span>
                                @endif
                            </td>
                            <td>{{ $post->category->name ?? 'Uncategorized' }}</td>
                            <td>{{ $post->created_at->format('M d, Y') }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                @else
                <p class="text-muted">No posts yet. <a href="{{ route('admin.posts.create') }}">Create your first post</a></p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
