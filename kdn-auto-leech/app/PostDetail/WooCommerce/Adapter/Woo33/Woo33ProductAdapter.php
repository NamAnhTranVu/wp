<?php

namespace KDNAutoLeech\PostDetail\WooCommerce\Adapter\Woo33;


use KDNAutoLeech\PostDetail\WooCommerce\Adapter\BaseProductAdapter;

abstract class Woo33ProductAdapter extends BaseProductAdapter {

    /**
     * Set low stock amount.
     *
     * @param int|string $amount Empty string if value not set.
     * @since 1.8.0
     */
    public function set_low_stock_amount($amount) {
        // This does not exist in WooCommerce 3.3
    }

}