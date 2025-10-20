@extends('layouts.public')
@section('title', 'Category: ' . $category->name)
@section('content')
<div class="row">
    <div class="col-md-8 offset-md-2">
        <h1 class="mb-4">Category: {{ $category->name }}</h1>
        @if($category->description) <p class="lead">{{ $category->description }}</p> @endif
        <hr>
        @if($posts->count() > 0)
            @foreach($posts as $post)
            <article class="mb-4 pb-4 border-bottom">
                <h2><a href="{{ route('post.show', $post->slug) }}">{{ $post->title }}</a></h2>
                <p class="text-muted"><small>By {{ $post->user->name }} on {{ $post->published_at->format('M d, Y') }}</small></p>
                @if($post->excerpt) <p>{{ $post->excerpt }}</p> @endif
                <a href="{{ route('post.show', $post->slug) }}" class="btn btn-primary btn-sm">Read More</a>
            </article>
            @endforeach
            {{ $posts->links('pagination::bootstrap-5') }}
        @else
            <p>No posts in this category.</p>
        @endif
        <a href="{{ route('home') }}" class="btn btn-outline-primary mt-3">&larr; Back</a>
    </div>
</div>
@endsection
