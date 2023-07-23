<table class="kdn-settings">

    {{-- WEIGHT SELECTOR --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_child_post_wc_weight_selectors',
        'title'         => _kdn('Weight Selectors'),
        'info'          => _kdn('CSS selectors for weight.') . ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
    ])

    {{-- LENGTH SELECTOR --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_child_post_wc_length_selectors',
        'title'         => _kdn('Length Selectors'),
        'info'          => _kdn('CSS selectors for length.') . ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
    ])

    {{-- WIDTH SELECTOR --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_child_post_wc_width_selectors',
        'title'         => _kdn('Width Selectors'),
        'info'          => _kdn('CSS selectors for width.') . ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
    ])

    {{-- HEIGHT SELECTOR --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_child_post_wc_height_selectors',
        'title'         => _kdn('Height Selectors'),
        'info'          => _kdn('CSS selectors for height.') . ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
    ])

    {{-- SHIPPING CLASS --}}
    @include('form-items.combined.select-wp-dropdown-categories-with-label', [
        'name' => '_child_post_wc_product_shipping_class',
        'title' => _kdn('Shipping Class'),
        'info' => _kdn('Select the shipping class.'),
        'args' => [
            'taxonomy'          => 'product_shipping_class',
            'hide_empty'        => 0,
            'show_option_none'  => _kdn('No shipping class'),
            'class'             => '',
        ]
    ])

</table>