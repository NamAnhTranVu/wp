<div class="input-group custom-post-method {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    <div class="input-container @if(isset($regex)) has-regex @endif">

        @if(isset($regex))
          <input type="checkbox" name="{{ $name . '[regex]' }}" id="{{ $name . '[regex]' }}" data-toggle="tooltip" title="{{ _kdn('Regex?') }}"
                 @if(isset($value['regex'])) checked="checked" @endif tabindex="0">
        @endif

        @if(isset($negate))
          <input type="checkbox" name="{{ $name . '[negate]' }}" id="{{ $name . '[negate]' }}" data-toggle="tooltip" title="{{ _kdn('Negate?') }}"
                 @if(isset($value['negate'])) checked="checked" @endif tabindex="0">
        @endif

        <input type="text"
               name="{{ $name . '[parse]' }}"
               id="{{ $name . '[parse]' }}"
               placeholder="{{ _kdn('Started parameter') }}"
               value="{{ isset($value['parse']) ? $value['parse'] : '' }}" class="parse" tabindex="0">

        <input type="text"
               name="{{ $name . '[method]' }}"
               id="{{ $name . '[method]' }}"
               placeholder="{{ isset($placeholder1) ? _kdn($placeholder1) : '' }}"
               value="{{ isset($value['method']) ? $value['method'] : '' }}" class="method" tabindex="0">

        <input type="text"
               name="{{ $name . '[matches]' }}"
               id="{{ $name . '[matches]' }}"
               placeholder="{{ isset($placeholder2) ? _kdn($placeholder2) : '' }}"
               value="{{ isset($value['matches']) ? $value['matches'] : '' }}" tabindex="0">
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>