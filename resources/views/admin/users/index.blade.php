@extends('layouts.admin')
@section('content')
<div class="row mt-4"><div class="col-md-12">
    <div class="d-flex justify-content-between mb-3">
        <h2>Users</h2>
        <a href="{{ route('admin.users.create') }}" class="btn btn-primary"><i class="bi bi-plus-circle"></i> New User</a>
    </div>
    <div class="card"><div class="card-body">
        <table class="table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
                @foreach($users as $u)
                <tr>
                    <td><strong>{{ $u->name }}</strong></td>
                    <td>{{ $u->email }}</td>
                    <td><span class="badge bg-{{ $u->role === 'admin' ? 'danger' : 'info' }}">{{ ucfirst($u->role) }}</span></td>
                    <td>{{ $u->created_at->format('M d, Y') }}</td>
                    <td>
                        <a href="{{ route('admin.users.edit', $u) }}" class="btn btn-sm btn-primary">Edit</a>
                        @if($u->id !== auth()->id())
                        <form action="{{ route('admin.users.destroy', $u) }}" method="POST" style="display: inline;">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Delete?')">Delete</button>
                        </form>
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div></div>
</div></div>
@endsection
