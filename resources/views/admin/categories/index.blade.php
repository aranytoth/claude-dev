@extends('layouts.admin')
@section('content')
<div class="row mt-4">
    <div class="col-md-12">
        <div class="d-flex justify-content-between mb-3">
            <h2>Categories</h2>
            <a href="{{ route('admin.categories.create') }}" class="btn btn-primary"><i class="bi bi-plus-circle"></i> New Category</a>
        </div>
        <div class="card"><div class="card-body">
            @if($categories->count() > 0)
            <table class="table">
                <thead><tr><th>Name</th><th>Slug</th><th>Posts</th><th>Actions</th></tr></thead>
                <tbody>
                    @foreach($categories as $cat)
                    <tr>
                        <td><strong>{{ $cat->name }}</strong></td>
                        <td><code>{{ $cat->slug }}</code></td>
                        <td>{{ $cat->posts_count }}</td>
                        <td>
                            <a href="{{ route('admin.categories.edit', $cat) }}" class="btn btn-sm btn-primary">Edit</a>
                            <form action="{{ route('admin.categories.destroy', $cat) }}" method="POST" style="display: inline;">
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
    </div>
</div>
@endsection
