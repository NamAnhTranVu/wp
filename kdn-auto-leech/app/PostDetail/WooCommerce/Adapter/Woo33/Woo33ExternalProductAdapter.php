<?php

namespace KDNAutoLeech\PostDetail\WooCommerce\Adapter\Woo33;


use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Interfaces\ExternalProductAdapter;

class Woo33ExternalProductAdapter extends Woo33ProductAdapter implements ExternalProductAdapter {

    /**
     * Set product URL.
     *
     * @param string $product_url Product URL.
     * @since 1.8.0
     */
    public function set_product_url($product_url) {
        $this->getProduct()->set_product_url($product_url);
    }

    /**
     * Set button text.
     *
     * @param string $button_text Button text.
     * @since 1.8.0
     */
    public function set_button_text($button_text) {
        $this->getProduct()->set_button_text($button_text);
    }

    /**
     * @return \WC_Product_External
     * @since 1.8.0
     */
    public function getProduct() {
        return parent::getProduct();
    }

}