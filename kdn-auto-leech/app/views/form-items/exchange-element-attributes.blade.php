<div class="input-group exchange-element-attributes {{ isset($addon) ? 'addon dev-tools' : '' }} {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    @if(isset($addon))
        @include('form-items.partials.button-addon-test')
        @include('form-items.dev-tools.button-dev-tools')
    @endif
    <div class="input-container">
        <input type="text" name="{{ $name . '[selector]' }}" id="{{ $name . '[selector]' }}" placeholder="{{ _kdn('Selector') }}"
               value="{{ isset($value['selector']) ? $value['selector'] : '' }}"
               class="css-selector">

        <input type="text" name="{{ $name . '[attr1]' }}" id="{{ $name . '[attr1]' }}" placeholder="{{ _kdn('Attribute 1') }}"
               value="{{ isset($value['attr1']) ? $value['attr1'] : '' }}">

        <input type="text" name="{{ $name . '[attr2]' }}" id="{{ $name . '[attr2]' }}" placeholder="{{ _kdn('Attribute 2') }}"
               value="{{ isset($value['attr2']) ? $value['attr2'] : '' }}">
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>