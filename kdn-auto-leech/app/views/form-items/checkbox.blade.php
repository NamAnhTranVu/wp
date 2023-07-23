<div class="input-group">
    <div class="input-container">
        <input type="checkbox"
               id="{{ isset($name) ? $name : '' }}"
               name="{{ isset($name) ? $name : '' }}"
               @if(isset($tooltip)) data-toggle="tooltip" @endif
               @if(isset($title)) title="{{ _kdn($title) }}" @endif
               @if(isset($dependants) && $dependants) data-dependants='{{ $dependants }}' @endif
               @if(isset($settings[$name]) && !empty($settings[$name]) && $settings[$name][0]) checked="checked" @endif />
    </div>
</div>