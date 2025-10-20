@extends('layouts.public')
@section('title', $post->title)
@section('content')
<div class="row">
    <div class="col-md-8 offset-md-2">
        <article>
            <h1 class="mb-3">{{ $post->title }}</h1>
            <p class="text-muted mb-4"><small>By {{ $post->user->name }} on {{ $post->published_at->format('M d, Y') }}
            @if($post->category) in <a href="{{ route('category.show', $post->category->slug) }}">{{ $post->category->name }}</a> @endif
            </small></p>
            <div class="content">{!! $post->content !!}</div>
            @if($post->tags->count() > 0)
            <div class="mt-4"><strong>Tags:</strong>
                @foreach($post->tags as $tag)
                <a href="{{ route('tag.show', $tag->slug) }}" class="badge bg-secondary text-decoration-none">{{ $tag->name }}</a>
                @endforeach
            </div>
            @endif
            <hr class="my-4">
            <a href="{{ route('home') }}" class="btn btn-outline-primary">&larr; Back to Home</a>
        </article>
    </div>
</div>
@endsection
