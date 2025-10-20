@extends('layouts.admin')

@section('title', 'All Posts')

@section('content')
<div class="row mt-4">
    <div class="col-md-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>All Posts</h2>
            <a href="{{ route('admin.posts.create') }}" class="btn btn-primary"><i class="bi bi-plus-circle"></i> New Post</a>
        </div>

        <div class="card">
            <div class="card-body">
                @if($posts->count() > 0)
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($posts as $post)
                        <tr>
                            <td><strong>{{ $post->title }}</strong></td>
                            <td>{{ $post->user->name }}</td>
                            <td>{{ $post->category->name ?? 'Uncategorized' }}</td>
                            <td>
                                @if($post->status === 'published')
                                <span class="badge bg-success">Published</span>
                                @else
                                <span class="badge bg-secondary">Draft</span>
                                @endif
                            </td>
                            <td>{{ $post->created_at->format('M d, Y') }}</td>
                            <td>
                                <a href="{{ route('admin.posts.edit', $post) }}" class="btn btn-sm btn-primary">
                                    <i class="bi bi-pencil"></i> Edit
                                </a>
                                <form action="{{ route('admin.posts.destroy', $post) }}" method="POST" style="display: inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">
                                        <i class="bi bi-trash"></i> Delete
                                    </button>
                                </form>
                                @if($post->status === 'published')
                                <a href="{{ route('post.show', $post->slug) }}" target="_blank" class="btn btn-sm btn-info">
                                    <i class="bi bi-eye"></i> View
                                </a>
                                @endif
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                @else
                <p class="text-muted">No posts found. <a href="{{ route('admin.posts.create') }}">Create your first post</a></p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
