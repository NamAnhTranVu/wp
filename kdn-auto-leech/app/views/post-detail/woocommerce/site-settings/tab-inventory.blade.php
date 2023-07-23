<table class="kdn-settings">

    {{-- SKU SELECTOR --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_sku_selectors',
        'title'         => _kdn('SKU Selectors'),
        'info'          => _kdn('CSS selectors for SKU.') . ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
    ])

    {{-- MANAGE STOCK --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'          => '_wc_manage_stock',
        'title'         => _kdn('Manage stock?'),
        'info'          => _kdn('Select if you want to manage stock or not.'),
        'id'            => 'wc-manage-stock',
        'dependants'    => '["#wc-stock-quantity-selectors", "#wc-backorders", "#wc-low-stock-amount", "!#wc-stock-status"]',
    ])

    {{-- STOCK QUANTITY SELECTOR --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_stock_quantity_selectors',
        'title'         => _kdn('Stock Quantity Selectors'),
        'info'          => _kdn('CSS selectors for stock quantity.') . ' ' . _kdn_trans_multiple_selectors_first_match(),
        'id'            => 'wc-stock-quantity-selectors',
        'optionsBox'    => true,
    ])

    {{-- ALLOW BACKORDERS --}}
    @include('form-items.combined.select-with-label', [
        'name'      => '_wc_backorders',
        'title'     => _kdn('Allow backorders?'),
        'info'      => _kdn('Select if backorders are allowed or not.'),
        'options'   => \KDNAutoLeech\PostDetail\WooCommerce\WooCommerceSettings::getBackorderOptionsForSelect(),
        'id'        => 'wc-backorders',
    ])

    {{-- LOW STOCK THRESHOLD --}}
    @include('form-items.combined.input-with-label', [
        'name'  => '_wc_low_stock_amount',
        'title' => _kdn('Low Stock Threshold'),
        'info'  => _kdn('When product stock reaches this amount you will be notified by email by WooCommerce.'),
        'type'  => 'number',
        'id'    => 'wc-low-stock-amount',
    ])

    {{-- STOCK STATUS --}}
    @include('form-items.combined.select-with-label', [
        'name'      => '_wc_stock_status',
        'title'     => _kdn('Stock Status'),
        'info'      => _kdn('Select stock status.'),
        'options'   => \KDNAutoLeech\PostDetail\WooCommerce\WooCommerceSettings::getStockStatusOptionsForSelect(),
        'id'        => 'wc-stock-status',
    ])

    {{-- SOLD INDIVIDUALLY --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'          => '_wc_sold_individually',
        'title'         => _kdn('Sold individually?'),
        'info'          => _kdn('Enable this to only allow one of this item to be bought in a single order.'),
        'id'            => 'wc-sold-individually'
    ])

</table>