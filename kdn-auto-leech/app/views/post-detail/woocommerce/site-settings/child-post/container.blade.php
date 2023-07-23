<div class="woocommerce-wrapper">

    {{-- HEADER --}}
    <div class="woocommerce-header">
        <span class="title">{{ _kdn("Product data") }} —</span>
        <div class="product-data-options">

            {{-- PRODUCT TYPE --}}
            <label for="_child_post_wc_product_type">
                @include('form-items.select', [
                    'name'      =>  '_child_post_wc_product_type',
                    'options'   =>  \KDNAutoLeech\PostDetail\WooCommerce\WooCommerceSettings::childPostGetProductTypeOptionsForSelect(),
                ])
            </label>

            {{-- VIRTUAL --}}
            <label for="_child_post_wc_virtual">
                <span>{{ _kdn("Virtual") }}: </span>
                @include('form-items.checkbox', [
                    'name' => '_child_post_wc_virtual',
                    'dependants' => '["!.child-post-wc-tab-shipping"]'
                ])
            </label>

            {{-- DOWNLOADABLE --}}
            <label for="_child_post_wc_downloadable">
                <span>{{ _kdn("Downloadable") }}: </span>
                @include('form-items.checkbox', [
                    'name' => '_child_post_wc_downloadable',
                    'dependants' => '[".child-post-wc-download"]'
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

                @include($titleViewName, ['title' => _kdn("General"),          'href' => '#child-post-wc-tab-general',         'icon' => 'admin-tools',   'active' => true])
                @include($titleViewName, ['title' => _kdn("Inventory"),        'href' => '#child-post-wc-tab-inventory',       'icon' => 'clipboard'])
                @include($titleViewName, ['title' => _kdn("Shipping"),         'href' => '#child-post-wc-tab-shipping',        'icon' => 'cart',          'class' => 'child-post-wc-tab-shipping'])
{{--                @include($titleViewName, ['title' => _kdn("Linked Products"),  'href' => '#wc-tab-linked-products', 'icon' => 'format-links'])--}}
                @include($titleViewName, ['title' => _kdn("Attributes"),       'href' => '#child-post-wc-tab-attributes',      'icon' => 'feedback'])
                @include($titleViewName, ['title' => _kdn("Advanced"),         'href' => '#child-post-wc-tab-advanced',        'icon' => 'admin-generic'])
            </ul>

        </div>

        <?php
            // URL selector for all inputs that require a $urlSelector parameter.
            $urlSelector        = '#_test_url_child_post';
            $urlAjaxSelector    = '#_test_url_child_post_ajax';
        ?>

        {{-- TAB CONTENTS --}}
        <div class="tab-content-wrapper">

            {{-- TAB: GENERAL--}}
            <div id="child-post-wc-tab-general" class="tab-content">
                @include('post-detail.woocommerce.site-settings.child-post.tab-general')
            </div>

            {{-- TAB: INVENTORY --}}
            <div id="child-post-wc-tab-inventory" class="tab-content hidden">
                @include('post-detail.woocommerce.site-settings.child-post.tab-inventory')
            </div>

            {{-- TAB: SHIPPING --}}
            <div id="child-post-wc-tab-shipping" class="tab-content hidden">
                @include('post-detail.woocommerce.site-settings.child-post.tab-shipping')
            </div>

            {{-- TAB: LINKED PRODUCTS TODO: Implement this--}}
            {{--<div id="wc-tab-linked-products" class="tab-content hidden">--}}
                {{--@include('post-detail.woocommerce.site-settings.child-post.tab-linked-products')--}}
            {{--</div>--}}

            {{-- TAB: ATTRIBUTES --}}
            <div id="child-post-wc-tab-attributes" class="tab-content hidden">
                @include('post-detail.woocommerce.site-settings.child-post.tab-attributes')
            </div>

            {{-- TAB: ADVANCED--}}
            <div id="child-post-wc-tab-advanced" class="tab-content hidden">
                @include('post-detail.woocommerce.site-settings.child-post.tab-advanced')
            </div>

        </div>

    </div>
</div>