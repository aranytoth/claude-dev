@extends('layouts.admin')
@section('title', 'All Pages')
@section('content')
<div class="row mt-4">
    <div class="col-md-12">
        <div class="d-flex justify-content-between mb-3">
            <h2>All Pages</h2>
            <a href="{{ route('admin.pages.create') }}" class="btn btn-primary"><i class="bi bi-plus-circle"></i> New Page</a>
        </div>
        <div class="card">
            <div class="card-body">
                @if($pages->count() > 0)
                <table class="table table-hover">
                    <thead><tr><th>Title</th><th>Author</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                    <tbody>
                        @foreach($pages as $page)
                        <tr>
                            <td><strong>{{ $page->title }}</strong></td>
                            <td>{{ $page->user->name }}</td>
                            <td><span class="badge bg-{{ $page->status === 'published' ? 'success' : 'secondary' }}">{{ ucfirst($page->status) }}</span></td>
                            <td>{{ $page->created_at->format('M d, Y') }}</td>
                            <td>
                                <a href="{{ route('admin.pages.edit', $page) }}" class="btn btn-sm btn-primary"><i class="bi bi-pencil"></i> Edit</a>
                                <form action="{{ route('admin.pages.destroy', $page) }}" method="POST" style="display: inline;">
                                    @csrf @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')"><i class="bi bi-trash"></i> Delete</button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                @else
                <p class="text-muted">No pages found.</p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
