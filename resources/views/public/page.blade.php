@extends('layouts.public')
@section('title', $page->title)
@section('content')
<div class="row">
    <div class="col-md-10 offset-md-1">
        <article>
            <h1 class="mb-4">{{ $page->title }}</h1>
            <div class="content">{!! $page->content !!}</div>
            <hr class="my-4">
            <a href="{{ route('home') }}" class="btn btn-outline-primary">&larr; Back to Home</a>
        </article>
    </div>
</div>
@endsection
