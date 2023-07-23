<?php

namespace KDNAutoLeech\PostDetail\WooCommerce;


use KDNAutoLeech\Objects\Crawling\Bot\PostBot;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\Settings\SettingsImpl;
use KDNAutoLeech\PostDetail\Base\BasePostDetailData;
use KDNAutoLeech\PostDetail\Base\BasePostDetailFactory;
use KDNAutoLeech\PostDetail\PostSaverData;
use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Factory\BaseWooAdapterFactory;
use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Factory\Woo33AdapterFactory;
use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Factory\Woo34AdapterFactory;
use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Factory\Woo35AdapterFactory;

class WooCommerceFactory extends BasePostDetailFactory {

    /**
     * @return bool True if the detail is available to be shown and interacted with. Otherwise, false.
     */
    protected function getAvailability() {
        $isWooCommerceActive = in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')));
        if (!$isWooCommerceActive) return false;

        // Make sure 'wc' function exists, since we need it to get the version of WooCommerce installed.
        if (!function_exists('wc')) {
            Informer::addError(sprintf(_kdn('%1$s function does not exist. You can try to install one of the previous versions of WooCommerce.'), 'wc'))
                ->addAsLog();
            return false;
        }

        // Get version of WooCommerce
        $version = wc()->version;

        // This is available starting from 3.3
        if (version_compare($version, '3.3', '<')) return false;

        return true;
    }

    /**
     * @param SettingsImpl $postSettings
     * @return bool
     * @since 1.8.0
     */
    protected function getAvailabilityForPost(SettingsImpl $postSettings) {

        // Get child post type and childPost data
        $childPost      = $this->getPostBot() ? $this->getPostBot()->getPostData()->getChildPost() : false;
        $childPostType  = $postSettings->getSetting('_child_post_type');

        // This is only available if the post type is WooCommerce product.
        $postTypeKey = '_kdn_post_type';
        $postType = $postSettings->getSetting('_do_not_use_general_settings') ? $postSettings->getSetting($postTypeKey) : get_option($postTypeKey);

        // If child_post_type is product and we are crawling a child post
        if ($childPost && $childPostType == 'product') $postType = 'product';

        return strtolower($postType) === 'product';
    }

    /**
     * @param SettingsImpl $postSettings
     * @return null|WooCommerceSettings
     * @since 1.8.0
     */
    protected function createSettings($postSettings) {
        return new WooCommerceSettings($postSettings);
    }

    /**
     * @return WooCommerceData
     */
    protected function createData() {
        return new WooCommerceData();
    }

    /**
     * @param PostBot            $postBot
     * @param BasePostDetailData $data
     * @return WooCommercePreparer
     */
    protected function createPreparer(PostBot $postBot, BasePostDetailData $data) {
        return new WooCommercePreparer($postBot, $data);
    }

    /**
     * @param PostSaverData      $postSaverData
     * @param BasePostDetailData $data
     * @return WooCommerceSaver
     */
    protected function createSaver(PostSaverData $postSaverData, BasePostDetailData $data) {
        /** @var BaseWooAdapterFactory[] $adapterFactories */
        $adapterFactories = [
            Woo35AdapterFactory::getInstance(),
            Woo34AdapterFactory::getInstance(),
            Woo33AdapterFactory::getInstance()
        ];

        // Get the current WooCommerce version
        $version = wc()->version;

        // Find a suitable adapter factory
        $suitableFactory = null;
        foreach($adapterFactories as $adapterFactory) {
            $min = $adapterFactory->getMinVersion();
            $max = $adapterFactory->getMaxVersion();

            if (version_compare($version, $min, '<')) continue;
            if ($max && version_compare($version, $max, '>=')) continue;

            $suitableFactory = $adapterFactory;
            break;
        }

        if (!$suitableFactory) {
            Informer::addError(_kdn('A suitable adapter factory could not be found for current WooCommerce version.'))
                ->addAsLog();
            return null;
        }

        return new WooCommerceSaver($postSaverData, $data, $suitableFactory);
    }

    /**
     * @param PostBot            $postBot
     * @param BasePostDetailData $detailData
     * @return null|WooCommerceTester
     * @since 1.8.0
     */
    protected function createTester(PostBot $postBot, BasePostDetailData $detailData) {
        return new WooCommerceTester($postBot, $detailData);
    }

    /**
     * Create a service for this post detail.
     *
     * @return WooCommerceService
     */
    protected function createService() {
        return new WooCommerceService();
    }

    /**
     * Create a duplicate checker for this post detail.
     *
     * @param PostBot|null            $postBot
     * @param BasePostDetailData|null $detailData
     * @return WooCommerceDuplicateChecker
     * @since 1.8.0
     */
    protected function createDuplicateChecker($postBot, $detailData) {
        return new WooCommerceDuplicateChecker($postBot, $detailData);
    }

    /**
     * Create a deleter for this post detail.
     *
     * @return WooCommerceDeleter
     * @since 1.8.0
     */
    protected function createDeleter() {
        return new WooCommerceDeleter();
    }


}