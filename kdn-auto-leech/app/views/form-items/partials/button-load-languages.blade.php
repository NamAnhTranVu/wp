@include('form-items/button', [
    'text'      => $isLanguagesAvailable ? _kdn('Refresh languages') : _kdn('Load languages'),
    // 'iconClass' => $isLanguagesAvailable ? '' : 'dashicons dashicons-warning attention',
    'buttonClass' => "load-languages {$class}",
])
@include('partials/test-result-container')