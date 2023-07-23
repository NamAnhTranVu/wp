<div class="input-group domains {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>

    <div class="input-container">
        <input type="text" name="{{ $name . '[domain]' }}" id="{{ $name . '[domain]' }}" placeholder="{{ _kdn('Domain...') }}"
               value="{{ isset($value['domain']) ? $value['domain'] : '' }}"
               class="post-url"
               tabindex="0">
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>