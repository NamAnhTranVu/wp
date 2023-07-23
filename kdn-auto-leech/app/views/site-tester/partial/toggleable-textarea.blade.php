<button role="button" class="button toggle">{{ $toggleText }}</button>

<div class="toggleable @if(isset($hidden) && $hidden) hidden @endif" id="{{ $id }}">
    <div class="section-title">
        {{ $title }}
    </div>

    <textarea class="data" rows="16">{{ $content }}</textarea>
</div>