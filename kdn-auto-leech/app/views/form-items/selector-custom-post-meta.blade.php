<div class="input-group selector-custom-post-meta {{ isset($addon) ? 'addon dev-tools' : '' }} {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    @if(isset($addon))
        @include('form-items.partials.button-addon-test')
        @include('form-items.dev-tools.button-dev-tools')
        @if(isset($optionsBox) && $optionsBox)
            @include('form-items.options-box.button-options-box')
        @endif
    @endif
    <div class="input-container @if(isset($ajax) && $ajax) has-ajax @endif">
        <input type="checkbox" name="{{ $name . '[multiple]' }}" id="{{ $name . '[multiple]' }}" data-toggle="tooltip" title="{{ _kdn('Multiple?') }}"
               @if(isset($value['multiple'])) checked="checked" @endif tabindex="0">

        <input type="checkbox" name="{{ $name . '[json]' }}" id="{{ $name . '[json]' }}" data-toggle="tooltip" title="{{ _kdn('JSON Parse?') }}"
               @if(isset($value['json'])) checked="checked" @endif tabindex="0">

        @if(isset($ajax) && $ajax)
          <input type="number" name="{{ $name . '[ajax]' }}" id="{{ $name . '[ajax]' }}" placeholder="{{ _kdn('Ajax') }}"
                 value="{{ isset($value['ajax']) ? $value['ajax'] : '' }}"
                 class="ajax-selector" tabindex="0">
        @endif

        <input type="text" name="{{ $name . '[selector]' }}" id="{{ $name . '[selector]' }}" placeholder="{{ _kdn('Selector') }}"
               value="{{ isset($value['selector']) ? $value['selector'] : '' }}"
               class="css-selector" tabindex="0">

        <input type="text" name="{{ $name . '[attr]' }}" id="{{ $name . '[attr]' }}" placeholder="{{ sprintf(_kdn('Attribute (default: %s)'), $defaultAttr) }}"
               value="{{ isset($value['attr']) ? $value['attr'] : '' }}" class="css-selector-attr" tabindex="0">

        <input type="text" name="{{ $name . '[meta_key]' }}" id="{{ $name . '[meta_key]' }}" placeholder="{{ _kdn('Meta key') }}"
               value="{{ isset($value['meta_key']) ? $value['meta_key'] : '' }}" class="meta-key" tabindex="0">
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>