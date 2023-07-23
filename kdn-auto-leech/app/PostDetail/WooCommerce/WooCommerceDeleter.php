<?php

namespace KDNAutoLeech\PostDetail\WooCommerce;


use KDNAutoLeech\Objects\Settings\SettingsImpl;
use KDNAutoLeech\PostDetail\Base\BasePostDetailData;
use KDNAutoLeech\PostDetail\Base\BasePostDetailDeleter;
use KDNAutoLeech\PostDetail\PostSaverData;

class WooCommerceDeleter extends BasePostDetailDeleter {

    /**
     * Delete the information this post detail is interested in.
     *
     * @param SettingsImpl       $postSettings
     * @param BasePostDetailData $detailData
     * @param PostSaverData|null $saverData
     * @return mixed
     * @since 1.8.0
     */
    public function delete(SettingsImpl $postSettings, BasePostDetailData $detailData, $saverData) {
        /** @var WooCommerceData $detailData */

    }
}