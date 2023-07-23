<div class="input-group category-taxonomy {{ isset($remove) ? 'remove' : '' }} {{ isset($class) ? $class : '' }}"
     @if(isset($dataKey)) data-key="{{ $dataKey }}" @endif>
    <div class="input-container">
        <input type="text" name="{{ $name . '[taxonomy]' }}" id="{{ $name . '[taxonomy]' }}" placeholder="{{ _kdn("Taxonomy...") }}"
               value="{{ isset($value['taxonomy']) ? $value['taxonomy'] : '' }}">

        <input type="text" name="{{ $name . '[description]' }}" id="{{ $name . '[description]' }}" placeholder="{{ _kdn("Name/description...") }}"
               value="{{ isset($value['description']) ? $value['description'] : '' }}">
    </div>
    @if(isset($remove) && $remove)
        @include('form-items/remove-button')
    @endif
</div>