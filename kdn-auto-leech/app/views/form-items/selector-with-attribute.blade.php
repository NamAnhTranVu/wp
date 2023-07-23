<div class="input-group selector-attribute {{ isset($addon) ? 'addon dev-tools' : '' }} {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    @if(isset($addon))
        @include('form-items.partials.button-addon-test')
        @include('form-items.dev-tools.button-dev-tools')

        @if(isset($optionsBox) && $optionsBox)
            @include('form-items.options-box.button-options-box')
        @endif
    @endif
    <div class="input-container @if(isset($ajax) && $ajax) has-ajax @endif @if(isset($method) && $method) has-method @endif">
        @if(isset($ajax))
          <input type="number" name="{{ $name . '[ajax]' }}" id="{{ $name . '[ajax]' }}" placeholder="{{ _kdn('Ajax') }}"
                 value="{{ isset($value['ajax']) ? $value['ajax'] : '' }}"
                 class="ajax-selector" tabindex="0">
        @endif

        @if(isset($method))
            <input type="text" name="{{ $name . '[parse]' }}" id="{{ $name . '[parse]' }}" placeholder="{{ _kdn('Started parameter') }}"
                 value="{{ isset($value['parse']) ? $value['parse'] : '' }}"
                 class="parse-selector" tabindex="0">

            <input type="text" name="{{ $name . '[method]' }}" id="{{ $name . '[method]' }}" placeholder="{{ _kdn('Method') }}"
                 value="{{ isset($value['method']) ? $value['method'] : '' }}"
                 class="method-selector" tabindex="0">
        @endif

        <input type="text" name="{{ $name . '[selector]' }}" id="{{ $name . '[selector]' }}" placeholder="{{ _kdn('Selector') }}"
               value="{{ isset($value['selector']) ? $value['selector'] : '' }}"
               class="css-selector"
                tabindex="0">

        <input type="text" name="{{ $name . '[attr]' }}" id="{{ $name . '[attr]' }}" placeholder="{{ sprintf(_kdn('Attribute (default: %s)'), $defaultAttr) }}"
               value="{{ isset($value['attr']) ? $value['attr'] : '' }}"
                tabindex="0">
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>