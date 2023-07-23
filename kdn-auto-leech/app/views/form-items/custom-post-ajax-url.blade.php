<div class="input-group custom-post-ajax-url {{ isset($remove) ? 'remove' : '' }}"
    @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    <div class="input-container @if(isset($regex)) has-regex @endif">

        @if(isset($regex))
          <input type="checkbox" name="{{ $name . '[regex]' }}" id="{{ $name . '[regex]' }}" data-toggle="tooltip" title="{{ _kdn('Regex?') }}"
                 @if(isset($value['regex'])) checked="checked" @endif tabindex="0">
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
               name="{{ $name . '[url]' }}"
               id="{{ $name . '[url]' }}"
               placeholder="{{ isset($placeholder2) ? _kdn($placeholder2) : '' }}"
               value="{{ isset($value['url']) ? $value['url'] : '' }}" tabindex="0">
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>