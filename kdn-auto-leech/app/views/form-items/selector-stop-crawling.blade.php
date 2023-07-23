<div class="input-group selector-stop-crawling {{ isset($addon) ? 'addon dev-tools' : '' }} {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    @if(isset($addon))
        @include('form-items.partials.button-addon-test')
        @include('form-items.dev-tools.button-dev-tools')
        @if(isset($optionsBox) && $optionsBox)
            @include('form-items.options-box.button-options-box')
        @endif
    @endif
    <div class="input-container @if(isset($ajax) && $ajax) has-ajax @endif">
        <input type="checkbox" name="{{ $name . '[regex]' }}" id="{{ $name . '[regex]' }}" data-toggle="tooltip" title="{{ _kdn('Regex?') }}"
            @if(isset($value['regex'])) checked="checked" @endif tabindex="0">

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

        <input type="text" name="{{ $name . '[matches]' }}" id="{{ $name . '[matches]' }}" placeholder="{{ _kdn('Matches') }}"
               value="{{ isset($value['matches']) ? $value['matches'] : '' }}" class="matches" tabindex="0">
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>