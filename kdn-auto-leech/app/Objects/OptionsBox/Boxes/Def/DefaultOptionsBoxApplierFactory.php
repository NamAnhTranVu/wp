<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\Def;


use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxApplierFactory;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxData;

class DefaultOptionsBoxApplierFactory extends BaseOptionsBoxApplierFactory {

    /**
     * @param array|string $rawData
     * @param bool         $unslash
     * @return DefaultOptionsBoxData
     * @since 1.8.0
     */
    public function createData($rawData, $unslash = true) {
        return new DefaultOptionsBoxData($rawData, $unslash);
    }

    /**
     * @param BaseOptionsBoxData $data
     * @return DefaultOptionsBoxApplier
     * @since 1.8.0
     */
    public function createApplier($data) {
        return new DefaultOptionsBoxApplier($data);
    }
}