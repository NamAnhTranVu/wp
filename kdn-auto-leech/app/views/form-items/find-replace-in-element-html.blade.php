<div class="input-group find-replace-in-element-html {{ isset($addon) ? 'addon dev-tools' : '' }} {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    @if(isset($addon))
        @include('form-items.partials.button-addon-test')
        @include('form-items.dev-tools.button-dev-tools')
    @endif
    <div class="input-container">
        <input type="checkbox" name="{{ $name . '[regex]' }}" id="{{ $name . '[regex]' }}" data-toggle="tooltip" title="{{ _kdn('Regex?') }}"
            @if(isset($value['regex'])) checked="checked" @endif>

        <input type="checkbox" name="{{ $name . '[callback]' }}" id="{{ $name . '[callback]' }}" data-toggle="tooltip" title="{{ _kdn('Callback?') }}"
            @if(isset($value['callback'])) checked="checked" @endif>

        <input type="checkbox" name="{{ $name . '[spin]' }}" id="{{ $name . '[spin]' }}" data-toggle="tooltip" title="{{ _kdn('Spinner?') }}"
            @if(isset($value['spin'])) checked="checked" @endif>

        <input type="text" name="{{ $name . '[selector]' }}" id="{{ $name . '[selector]' }}" placeholder="{{ _kdn('Selector') }}"
               value="{{ isset($value['selector']) ? $value['selector'] : '' }}"
               class="css-selector">

        <input type="text" name="{{ $name . '[find]' }}" id="{{ $name . '[find]' }}" placeholder="{{ _kdn('Find') }}"
            value="{{ isset($value['find']) ? $value['find'] : '' }}">

        <textarea name="{{ $name . '[replace]' }}" id="{{ $name . '[replace]' }}" placeholder="{{ _kdn('Replace') }}">{{ isset($value['replace']) ? $value['replace'] : '' }}</textarea>
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>