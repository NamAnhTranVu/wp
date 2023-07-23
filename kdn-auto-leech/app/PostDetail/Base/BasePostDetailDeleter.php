<?php

namespace KDNAutoLeech\PostDetail\Base;


use KDNAutoLeech\Objects\Settings\SettingsImpl;
use KDNAutoLeech\PostDetail\PostSaverData;

abstract class BasePostDetailDeleter {

    /**
     * Delete the information this post detail is interested in.
     *
     * @param SettingsImpl       $postSettings
     * @param BasePostDetailData $detailData
     * @param PostSaverData|null $saverData
     * @return mixed
     * @since 1.8.0
     */
    abstract public function delete(SettingsImpl $postSettings, BasePostDetailData $detailData, $saverData);

}