<div class="input-group selector-attribute-assign {{ isset($addon) ? 'addon dev-tools' : '' }} {{ isset($remove) ? 'remove' : '' }} {{ isset($assign) ? $assign : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    @if(isset($addon))
        @include('form-items.partials.button-addon-test')
        @include('form-items.dev-tools.button-dev-tools')
        @if(isset($optionsBox) && $optionsBox)
            @include('form-items.options-box.button-options-box')
        @endif
    @endif
    <div class="input-container @if(isset($ajax) && $ajax) has-ajax @endif @if(isset($regex) && $regex) has-regex @endif">
        @if(isset($regex) && $regex)
        <input type="checkbox" name="{{ $name . '[regex]' }}" id="{{ $name . '[regex]' }}" data-toggle="tooltip" title="{{ _kdn('Regex?') }}"
            @if(isset($value['regex'])) checked="checked" @endif tabindex="0">
        @endif

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

        @if(isset($assign) && $assign)
        <input type="text" name="{{ $name . '[' . $assign . ']' }}" id="{{ $name . '[' . $assign . ']' }}" @if(isset($valuePlaceholder) && $valuePlaceholder) placeholder="{{ _kdn($valuePlaceholder) }}" @endif
               value="{{ isset($value[$assign]) ? $value[$assign] : '' }}" class="{{ $assign }}" tabindex="0">
        @endif
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>