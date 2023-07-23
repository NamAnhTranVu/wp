<?php
$transMakeSureDecimalsMatch = _kdn('Make sure decimal separators match with the ones you configured for WooCommerce.');
?>

<table class="kdn-settings">

    {{-- PRODUCT URL SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_product_url_selectors',
        'title'         => _kdn('Product URL Selectors'),
        'info'          => _kdn('CSS selectors for product URL.') .  ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
        'class'         => 'wc-external-product product-url-selectors',
    ])

    {{-- SHORT CODES FOR PRODUCT URL AND BUTTON TEXT --}}
    @include('form-items.combined.short-code-buttons-with-label', [
        'title'     => _kdn('Short codes'),
        'info'      => _kdn('Short codes that can be used in product URL and button text.'),
        'buttons'   => $buttonsMain,
        'class'     => 'wc-external-product',
    ])

    {{-- PRODUCT URL --}}
    @include('form-items.combined.input-with-label', [
        'name'          => '_wc_product_url',
        'title'         => _kdn('Product URL'),
        'info'          => _kdn("Set the product URL."),
        'placeholder'   => 'http://',
        'class'         => 'wc-external-product',
    ])

    {{-- BUTTON TEXT --}}
    @include('form-items.combined.input-with-label', [
        'name'          => '_wc_button_text',
        'title'         => _kdn('Button Text'),
        'info'          => _kdn("Set the button text."),
        'placeholder'   => _kdn('Buy product'),
        'class'         => 'wc-external-product button-text',
    ])

    {{-- REGULAR PRICE SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_regular_price_selectors',
        'title'         => _kdn('Regular Price Selectors'),
        'info'          => _kdn('CSS selectors for regular price.') . ' ' . $transMakeSureDecimalsMatch .  ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
    ])

    {{-- SALE PRICE SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_sale_price_selectors',
        'title'         => _kdn('Sale Price Selectors'),
        'info'          => _kdn('CSS selectors for sale price.') . ' ' . $transMakeSureDecimalsMatch . ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
    ])

    {{-- DOWNLOADABLE FILE URL SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_file_url_selectors',
        'title'         => _kdn('Downloadable File URL Selectors'),
        'info'          => _kdn('CSS selectors for downloadable files.') . ' ' . _kdn_trans_multiple_selectors_all_matches(),
        'defaultAttr'   => 'src',
        'class'         => 'wc-download',
        'optionsBox'    => true,
    ])

    {{-- DOWNLOAD LIMIT --}}
    @include('form-items.combined.input-with-label', [
        'name'  => '_wc_download_limit',
        'title' => _kdn('Download Limit'),
        'info'  => _kdn('Leave blank for unlimited re-downloads.'),
        'type'  => 'number',
        'class' => 'wc-download'
    ])

    {{-- DOWNLOAD EXPIRY --}}
    @include('form-items.combined.input-with-label', [
        'name'  => '_wc_download_expiry',
        'title' => _kdn('Download Expiry'),
        'info'  => _kdn('Enter the number of days before a download link expires, or leave blank.'),
        'type'  => 'number',
        'class' => 'wc-download'
    ])

</table>