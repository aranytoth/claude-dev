@extends('layouts.public')
@section('content')
<div class="row">
    <div class="col-md-8">
        <h1 class="mb-4">Latest Posts</h1>
        @if($posts->count() > 0)
            @foreach($posts as $post)
            <article class="mb-4 pb-4 border-bottom">
                <h2><a href="{{ route('post.show', $post->slug) }}" class="text-decoration-none">{{ $post->title }}</a></h2>
                <p class="text-muted"><small>By {{ $post->user->name }} on {{ $post->published_at->format('M d, Y') }}
                @if($post->category) in <a href="{{ route('category.show', $post->category->slug) }}">{{ $post->category->name }}</a> @endif
                </small></p>
                @if($post->excerpt) <p>{{ $post->excerpt }}</p> @endif
                <a href="{{ route('post.show', $post->slug) }}" class="btn btn-primary btn-sm">Read More</a>
            </article>
            @endforeach
            {{ $posts->links('pagination::bootstrap-5') }}
        @else
            <div class="alert alert-info">No posts published yet.</div>
        @endif
    </div>
    <div class="col-md-4">
        <div class="card mb-4">
            <div class="card-header"><h5>Categories</h5></div>
            <div class="card-body">
                @if($categories->count() > 0)
                <ul class="list-unstyled">
                    @foreach($categories as $cat)
                    <li><a href="{{ route('category.show', $cat->slug) }}">{{ $cat->name }}</a> ({{ $cat->posts_count }})</li>
                    @endforeach
                </ul>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
