<?php
// If the options box is enabled and there is a configuration for this form item name
if (isset($optionsBox) && $optionsBox && isset($optionsBoxConfigs) && isset($optionsBoxConfigs[$name])) {
    // Change $optionsBox variable with the given configuration so that 'button-options-box' form item can use
    // the configuration.
    $optionsBox = $optionsBoxConfigs[$name];
}
?>

<div class="inputs">
    @if(!isset($settings[$name]) || !$settings[$name] || !$settings[$name][0])
        @include($include, [
            'name'      => $name . '[' . (isset($addKeys) ? 0 : '') . ']',
            'remove'    => true,
            'value'     => '',
            'dataKey'   => isset($addKeys) ? 0 : ''
        ])
    @else
        <?php
            $dataSetings = is_serialized($settings[$name][0]) ? unserialize($settings[$name][0]) : $settings[$name];
            if (!is_array($dataSetings)) $dataSetings = [''];
        ?>
        @foreach($dataSetings as $key => $value)
            @include($include, [
                'name'      => $name . '[' . (isset($addKeys) ? $key : '') . ']',
                'remove'    => true,
                'value'     => $value,
                'dataKey'   => $key,
            ])
        @endforeach
    @endif
</div>
@if(!isset($max) || $max != 1)
    <div style="clear: both;"></div>
    <div class="actions">
        <button class="button kdn-add-new" data-max="{{isset($max) ? $max : 0}}">{{ _kdn('Add New') }}</button>
    </div>
@endif