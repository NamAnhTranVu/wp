<button class="button kdn-remove" title="{{ _kdn("Remove") }}"><span class="dashicons dashicons-trash"></span></button>

@if(!isset($disableSort) || !$disableSort)
    <div class="kdn-sort"><span class="dashicons dashicons-move"></span></div>
@endif