<div class="input-group custom-post-meta {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    <div class="input-container">
        <input type="checkbox" name="{{ $name . '[multiple]' }}" id="{{ $name . '[multiple]' }}" data-toggle="tooltip" title="{{ _kdn('Multiple?') }}"
               @if(isset($value['multiple'])) checked="checked" @endif tabindex="0">

        <input type="checkbox" name="{{ $name . '[json]' }}" id="{{ $name . '[json]' }}" data-toggle="tooltip" title="{{ _kdn('JSON Parse?') }}"
               @if(isset($value['json'])) checked="checked" @endif tabindex="0">

        <input type="text" name="{{ $name . '[key]' }}" id="{{ $name . '[key]' }}" placeholder="{{ _kdn('Post meta key') }}"
               value="{{ isset($value['key']) ? $value['key'] : '' }}" class="meta-key" tabindex="0">

        <textarea name="{{ $name . '[value]' }}" id="{{ $name . '[value]' }}" placeholder="{{ _kdn('Meta value') }}" tabindex="0">{{ isset($value['value']) ? $value['value'] : '' }}</textarea>
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>