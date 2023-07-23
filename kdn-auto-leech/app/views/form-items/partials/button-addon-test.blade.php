<button
        class="button kdn-addon {{ isset($test) ? 'kdn-test' : '' }} {{ isset($addonClasses) ? $addonClasses : '' }}"
        title="{{ isset($addonTitle) ? $addonTitle : _kdn('Test') }}"
        @if(isset($data)) data-kdn="{{ json_encode($data) }}" @endif
>
    <span class="{{$addon}}"></span>
</button>