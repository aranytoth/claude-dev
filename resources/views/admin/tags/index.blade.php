@extends('layouts.admin')
@section('content')
<div class="row mt-4"><div class="col-md-12">
    <div class="d-flex justify-content-between mb-3">
        <h2>Tags</h2>
        <a href="{{ route('admin.tags.create') }}" class="btn btn-primary"><i class="bi bi-plus-circle"></i> New Tag</a>
    </div>
    <div class="card"><div class="card-body">
        @if($tags->count() > 0)
        <table class="table">
            <thead><tr><th>Name</th><th>Slug</th><th>Posts</th><th>Actions</th></tr></thead>
            <tbody>
                @foreach($tags as $tag)
                <tr>
                    <td><strong>{{ $tag->name }}</strong></td>
                    <td><code>{{ $tag->slug }}</code></td>
                    <td>{{ $tag->posts_count }}</td>
                    <td>
                        <a href="{{ route('admin.tags.edit', $tag) }}" class="btn btn-sm btn-primary">Edit</a>
                        <form action="{{ route('admin.tags.destroy', $tag) }}" method="POST" style="display: inline;">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Delete?')">Delete</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @endif
    </div></div>
</div></div>
@endsection
