@extends('layouts.admin')
@section('content')
<div class="row mt-4"><div class="col-md-8 offset-md-2"><h2>Edit Tag</h2>
    <div class="card"><div class="card-body">
        <form method="POST" action="{{ route('admin.tags.update', $tag) }}">
            @csrf @method('PUT')
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" name="name" value="{{ $tag->name }}" required>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="{{ route('admin.tags.index') }}" class="btn btn-secondary">Cancel</a>
        </form>
    </div></div>
</div></div>
@endsection
