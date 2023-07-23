<button class="button {{ isset($buttonClass) && $buttonClass ? $buttonClass : '' }}"
        type="button"
        title="{{ isset($title) ? $title : '' }}"
        @if(isset($data)) data-kdn="{{ json_encode($data) }}" @endif
>
    <span class="{{ isset($iconClass) && $iconClass ? $iconClass : '' }}"></span>
</button>