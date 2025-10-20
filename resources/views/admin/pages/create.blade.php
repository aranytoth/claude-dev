@extends('layouts.admin')
@section('title', 'New Page')
@section('content')
<div class="row mt-4">
    <div class="col-md-12"><h2>New Page</h2>
        <form method="POST" action="{{ route('admin.pages.store') }}">
            @csrf
            <div class="row">
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                <input type="text" class="form-control" id="title" name="title" value="{{ old('title') }}" required>
                            </div>
                            <div class="mb-3">
                                <label for="content" class="form-label">Content</label>
                                <textarea class="form-control" id="content" name="content" rows="15">{{ old('content') }}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-header"><strong>Publish</strong></div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="status" class="form-label">Status</label>
                                <select class="form-select" id="status" name="status">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="template" class="form-label">Template</label>
                                <select class="form-select" id="template" name="template">
                                    <option value="default">Default</option>
                                    <option value="full-width">Full Width</option>
                                </select>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">Publish</button>
                                <a href="{{ route('admin.pages.index') }}" class="btn btn-secondary">Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
@if(env('TINYMCE_API_KEY'))
<script src="https://cdn.tiny.cloud/1/{{ env('TINYMCE_API_KEY') }}/tinymce/6/tinymce.min.js"></script>
<script>
tinymce.init({selector: '#content', height: 500, menubar: true, plugins: ['advlist', 'autolink', 'lists', 'link', 'image'], toolbar: 'undo redo | blocks | bold italic | bullist numlist'});
</script>
@endif
@endsection
