<div class="woocommerce-wrapper">

    {{-- HEADER --}}
    <div class="woocommerce-header">
        <span class="title">{{ _kdn("Product data") }} —</span>
        <div class="product-data-options">

            {{-- PRODUCT TYPE --}}
            <label for="_wc_product_type">
                @include('form-items.select', [
                    'name'      =>  '_wc_product_type',
                    'options'   =>  \KDNAutoLeech\PostDetail\WooCommerce\WooCommerceSettings::getProductTypeOptionsForSelect(),
                ])
            </label>

            {{-- VIRTUAL --}}
            <label for="_wc_virtual">
                <span>{{ _kdn("Virtual") }}: </span>
                @include('form-items.checkbox', [
                    'name' => '_wc_virtual',
                    'dependants' => '["!.wc-tab-shipping"]'
                ])
            </label>

            {{-- DOWNLOADABLE --}}
            <label for="_wc_downloadable">
                <span>{{ _kdn("Downloadable") }}: </span>
                @include('form-items.checkbox', [
                    'name' => '_wc_downloadable',
                    'dependants' => '[".wc-download"]'
                ])
            </label>

        </div>
    </div>

    {{-- SETTINGS --}}
    <div class="woocommerce-settings-wrapper">

        {{-- TAB LIST --}}
        <div class="tab-wrapper">

            {{-- TABS --}}
            <ul>
                <?php $titleViewName = 'post-detail.woocommerce.site-settings.partial.tab-list-item'; ?>

                @include($titleViewName, ['title' => _kdn("General"),          'href' => '#wc-tab-general',         'icon' => 'admin-tools',   'active' => true])
                @include($titleViewName, ['title' => _kdn("Inventory"),        'href' => '#wc-tab-inventory',       'icon' => 'clipboard'])
                @include($titleViewName, ['title' => _kdn("Shipping"),         'href' => '#wc-tab-shipping',        'icon' => 'cart',          'class' => 'wc-tab-shipping'])
{{--                @include($titleViewName, ['title' => _kdn("Linked Products"),  'href' => '#wc-tab-linked-products', 'icon' => 'format-links'])--}}
                @include($titleViewName, ['title' => _kdn("Attributes"),       'href' => '#wc-tab-attributes',      'icon' => 'feedback'])
                @include($titleViewName, ['title' => _kdn("Advanced"),         'href' => '#wc-tab-advanced',        'icon' => 'admin-generic'])
            </ul>

        </div>

        <?php
            // URL selector for all inputs that require a $urlSelector parameter.
            $urlSelector        = '#_test_url_post';
            $urlAjaxSelector    = '#_test_url_post_ajax';
        ?>

        {{-- TAB CONTENTS --}}
        <div class="tab-content-wrapper">

            {{-- TAB: GENERAL--}}
            <div id="wc-tab-general" class="tab-content">
                @include('post-detail.woocommerce.site-settings.tab-general')
            </div>

            {{-- TAB: INVENTORY --}}
            <div id="wc-tab-inventory" class="tab-content hidden">
                @include('post-detail.woocommerce.site-settings.tab-inventory')
            </div>

            {{-- TAB: SHIPPING --}}
            <div id="wc-tab-shipping" class="tab-content hidden">
                @include('post-detail.woocommerce.site-settings.tab-shipping')
            </div>

            {{-- TAB: LINKED PRODUCTS TODO: Implement this--}}
            {{--<div id="wc-tab-linked-products" class="tab-content hidden">--}}
                {{--@include('post-detail.woocommerce.site-settings.tab-linked-products')--}}
            {{--</div>--}}

            {{-- TAB: ATTRIBUTES --}}
            <div id="wc-tab-attributes" class="tab-content hidden">
                @include('post-detail.woocommerce.site-settings.tab-attributes')
            </div>

            {{-- TAB: ADVANCED--}}
            <div id="wc-tab-advanced" class="tab-content hidden">
                @include('post-detail.woocommerce.site-settings.tab-advanced')
            </div>

        </div>

    </div>
</div>