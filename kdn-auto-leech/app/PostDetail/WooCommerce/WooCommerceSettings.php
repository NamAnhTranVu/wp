<?php

namespace KDNAutoLeech\PostDetail\WooCommerce;


use KDNAutoLeech\PostDetail\Base\BasePostDetailSettings;
use KDNAutoLeech\Utils;

class WooCommerceSettings extends BasePostDetailSettings {

    /**
     * @return array An array of strings, where each string is a meta key.
     */
    protected function createAllMetaKeys() {
        return [
            '_wc_product_type',                             // string   Type of the product
            '_wc_virtual',                                  // bool     True if the product is a virtual product
            '_wc_downloadable',                             // bool     True if the product is a downloadable product

            // General
            '_wc_product_url',                              // string   Stores URL for the external product
            '_wc_button_text',                              // string   Stores button text for the external product
            '_wc_regular_price_selectors',                  // array    CSS selectors with attributes that find regular price
            '_wc_sale_price_selectors',                     // array    CSS selectors with attributes that find sale price
            '_wc_file_url_selectors',                       // array    CSS selectors with attributes that find file URL
            '_wc_download_limit',                           // int      Download limit for file downloads
            '_wc_download_expiry',                          // int      Number of days before a download link expires

            // Inventory
            '_wc_sku_selectors',                            // array    CSS selectors with attributes that find SKU of the product
            '_wc_manage_stock',                             // bool     True if the stock should be managed.
            '_wc_stock_quantity_selectors',                 // array    CSS selectors with attributes that find stock quantity of the product
            '_wc_backorders',                               // string   Backorder type of the product
            '_wc_low_stock_amount',                         // int      Low stock threshold
            '_wc_stock_status',                             // string   Stock status, e.g. 'instock', 'outofstock', ...
            '_wc_sold_individually',                        // bool     True if the product is sold individually

            // Shipping
            '_wc_weight_selectors',                         // array    CSS selectors with attributes that find weight of the product
            '_wc_length_selectors',                         // array    CSS selectors with attributes that find length of the product
            '_wc_width_selectors',                          // array    CSS selectors with attributes that find width of the product
            '_wc_height_selectors',                         // array    CSS selectors with attributes that find height of the product
            '_wc_product_shipping_class',                   // int      ID of shipping class of the product

            // Attributes
            '_wc_attribute_name_selectors',                 // array    CSS selectors with attributes that find attribute names
            '_wc_attribute_value_selectors',                // array    CSS selectors with attributes that find attribute values
            '_wc_attribute_value_separators',               // array    Separators that will be used to separate attribute values in a single string
            '_wc_custom_attributes',                        // array    Custom attributes with attribute name and attribute values

            // Advanced
            '_wc_purchase_note_selectors',                  // array    CSS selectors with attributes that find purchase notes
            '_wc_purchase_note_add_all_found',              // bool     When checked, purchase notes found by all CSS selectors will be added
            '_wc_custom_purchase_notes',                    // array    An array of custom purchase notes.
            '_wc_always_add_custom_purchase_note',          // bool     When checked, custom purchase note will be prepended to purchase notes found by CSS selectors.
            '_wc_enable_reviews',                           // bool     True if the reviews for the product should be enabled
            '_wc_menu_order',                               // int      Menu order of the product
        ];
    }

    /**
     * @return array A key-value pair, where each key is a meta key existing in the value of {@link createAllMetaKeys()}
     *               and the values are their default values.
     */
    protected function createMetaKeyDefaults() {
        return [];
    }

    /**
     * @return array An array of strings, where each string is a key, being one of the keys supplied in
     *               {@link getAllMetaKeys()}, of a single key. A single key means that the value stored for that key
     *               is a string, not an array.
     */
    protected function createSingleMetaKeys() {
        return [
            '_wc_product_type',
            '_wc_virtual',
            '_wc_downloadable',

            // General
            '_wc_product_url',
            '_wc_button_text',
            '_wc_download_limit',
            '_wc_download_expiry',

            // Inventory
            '_wc_manage_stock',
            '_wc_backorders',
            '_wc_low_stock_amount',
            '_wc_stock_status',
            '_wc_sold_individually',

            // Shipping
            '_wc_product_shipping_class',

            // Advanced
            '_wc_purchase_note_add_all_found',
            '_wc_always_add_custom_purchase_note',
            '_wc_enable_reviews',
            '_wc_menu_order',
        ];
    }

    /**
     * Create settings view. This view will be shown in the site settings page. The view can be created by using
     * {@link Utils::view()} method. If the view is outside of the plugin, it can be created using a custom implementation
     * of {@link Utils::view()}. In that case, check the source code of the method.
     *
     * @return null|\Illuminate\Contracts\View\View Not-rendered blade view
     */
    protected function createSettingsView() {
        return Utils::view('post-detail.woocommerce.site-settings.main');
    }

    /*
     * STATIC METHODS
     */

    /**
     * Get backorder options.
     *
     * @return array A key-value pair where keys are option keys and values are option values that can be shown in a
     *               select HTML element.
     * @since 1.8.0
     */
    public static function getBackorderOptionsForSelect() {
        return [
            'no'        => _kdn('Do not allow'),
            'notify'    => _kdn('Allow, but notify customer'),
            'yes'       => _kdn('Allow'),
        ];
    }

    /**
     * Get stock status options.
     *
     * @return array A key-value pair where keys are option keys and values are option values that can be shown in a
     *               select HTML element.
     * @since 1.8.0
     */
    public static function getStockStatusOptionsForSelect() {
        return [
            'instock'       => _kdn('In stock'),
            'outofstock'    => _kdn('Out of stock'),
            'onbackorder'   => _kdn('On backorder'),
        ];
    }

    /**
     * Get product type options.
     *
     * @return array A key-value pair where keys are option keys and values are option values that can be shown in a
     *               select HTML element.
     * @since 1.8.0
     */
    public static function getProductTypeOptionsForSelect() {
        return [
            'simple'   => [
                'name'       => _kdn("Simple Product"),
                'dependants' => '["!.wc-external-product"]'
            ],
            'external' => [
                'name'       => _kdn("External/Affiliate Product"),
                'dependants' => '[
                    "!label[for=\"_wc_virtual\"]", 
                    "!label[for=\"_wc_downloadable\"]", 
                    "!.wc-purchase-note", 
                    "!.wc-tab-shipping", 
                    "!#wc-manage-stock", 
                    "!#wc-stock-quantity-selectors", 
                    "!#wc-backorders", 
                    "!#wc-low-stock-amount", 
                    "!#wc-stock-status", 
                    "!#wc-sold-individually"
                ]',
            ],
        ];
    }

    /**
     * Child post get product type options.
     *
     * @return array A key-value pair where keys are option keys and values are option values that can be shown in a
     *               select HTML element.
     * @since 2.2.3
     */
    public static function childPostGetProductTypeOptionsForSelect() {
        return [
            'simple'   => [
                'name'       => _kdn("Simple Product"),
                'dependants' => '["!.child-post-wc-external-product"]'
            ],
            'external' => [
                'name'       => _kdn("External/Affiliate Product"),
                'dependants' => '[
                    "!label[for=\"_child_post_wc_virtual\"]", 
                    "!label[for=\"_child_post_wc_downloadable\"]", 
                    "!.child-post-wc-purchase-note", 
                    "!.child-post-wc-tab-shipping", 
                    "!#child-post-wc-manage-stock", 
                    "!#child-post-wc-stock-quantity-selectors", 
                    "!#child-post-wc-backorders", 
                    "!#child-post-wc-low-stock-amount", 
                    "!#child-post-wc-stock-status", 
                    "!#child-post-wc-sold-individually"
                ]',
            ],
        ];
    }
}