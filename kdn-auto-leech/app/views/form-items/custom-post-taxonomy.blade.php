<div class="input-group custom-post-taxonomy {{ isset($remove) ? 'remove' : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    <div class="input-container">
        <input type="checkbox" name="{{ $name . '[append]' }}" id="{{ $name . '[append]' }}" data-toggle="tooltip" title="{{ _kdn('Append?') }}"
               @if(isset($value['append'])) checked="checked" @endif tabindex="0">

        <input type="text" name="{{ $name . '[taxonomy]' }}" id="{{ $name . '[taxonomy]' }}" placeholder="{{ _kdn('Taxonomy name...') }}"
               value="{{ isset($value['taxonomy']) ? $value['taxonomy'] : '' }}" class="meta-key" tabindex="0">

        <input type="text" name="{{ $name . '[value]' }}" id="{{ $name . '[value]' }}" placeholder="{{ _kdn('Taxonomy value...') }}"
               value="{{ isset($value['value']) ? $value['value'] : '' }}" tabindex="0">
    </div>
    @if(isset($remove))
        @include('form-items/remove-button')
    @endif
</div>