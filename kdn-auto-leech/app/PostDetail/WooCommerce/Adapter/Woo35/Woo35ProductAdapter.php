<?php

namespace KDNAutoLeech\PostDetail\WooCommerce\Adapter\Woo35;


use KDNAutoLeech\PostDetail\WooCommerce\Adapter\BaseProductAdapter;

abstract class Woo35ProductAdapter extends BaseProductAdapter {

    /**
     * Set low stock amount.
     *
     * @param int|string $amount Empty string if value not set.
     * @since 1.8.0
     */
    public function set_low_stock_amount($amount) {
        $this->getProduct()->set_low_stock_amount($amount);
    }

}