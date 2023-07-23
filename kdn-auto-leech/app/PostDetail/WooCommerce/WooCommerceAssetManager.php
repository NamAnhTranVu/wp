<?php

namespace KDNAutoLeech\PostDetail\WooCommerce;


use KDNAutoLeech\Constants;
use KDNAutoLeech\Objects\AssetManager\BaseAssetManager;

/**
 * Class WooCommerceAssetManager
 *
 * @package KDNAutoLeech\objects\crawling\postDetail\customPost\wooCommerce
 * @since   1.8.0
 */
class WooCommerceAssetManager extends BaseAssetManager {

    private $styleSiteTester = 'kdn_wc_site_tester_css';

    /**
     * Add site tester assets.
     * @since 1.8.0
     */
    public function addTester() {
        $this->addStyle($this->styleSiteTester, Constants::appDir() . '/public/post-detail/woocommerce/styles/wc-site-tester.css', false);
    }
}