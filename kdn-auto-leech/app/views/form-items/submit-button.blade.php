<button class="button button-primary button-large {{ isset($class) && $class ? $class : '' }}"
        data-toggle="tooltip" data-placement="right"
    @if(isset($title) && $title) title="{{ $title }}" @endif>
    {{ isset($text) ? $text : _kdn('Submit') }}
</button>