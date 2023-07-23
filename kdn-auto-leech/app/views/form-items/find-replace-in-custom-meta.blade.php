<div class="input-group find-replace-in-custom-meta {{ isset($addon) ? 'addon' : '' }} {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    @if(isset($addon))
        @include('form-items.partials.button-addon-test')
    @endif
    <div class="input-container">
        <input type="checkbox" name="{{ $name . '[regex]' }}" id="{{ $name . '[regex]' }}" data-toggle="tooltip" title="{{ _kdn('Regex?') }}"
            @if(isset($value['regex'])) checked="checked" @endif tabindex="0">

        <input type="checkbox" name="{{ $name . '[callback]' }}" id="{{ $name . '[callback]' }}" data-toggle="tooltip" title="{{ _kdn('Callback?') }}"
            @if(isset($value['callback'])) checked="checked" @endif>

        <input type="checkbox" name="{{ $name . '[spin]' }}" id="{{ $name . '[spin]' }}" data-toggle="tooltip" title="{{ _kdn('Spinner?') }}"
            @if(isset($value['spin'])) checked="checked" @endif>

        <input type="text" name="{{ $name . '[meta_key]' }}" id="{{ $name . '[meta_key]' }}" placeholder="{{ _kdn('Meta key') }}"
               value="{{ isset($value['meta_key']) ? $value['meta_key'] : '' }}" class="meta-key" tabindex="0">

        <input type="text" name="{{ $name . '[find]' }}" id="{{ $name . '[find]' }}" placeholder="{{ _kdn('Find') }}"
            value="{{ isset($value['find']) ? $value['find'] : '' }}" tabindex="0">

        <textarea name="{{ $name . '[replace]' }}" id="{{ $name . '[replace]' }}" placeholder="{{ _kdn('Replace') }}" tabindex="0">{{ isset($value['replace']) ? $value['replace'] : '' }}</textarea>
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>