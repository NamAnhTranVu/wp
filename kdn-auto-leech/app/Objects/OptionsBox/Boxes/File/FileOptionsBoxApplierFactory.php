<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\File;


use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxApplierFactory;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxData;

class FileOptionsBoxApplierFactory extends BaseOptionsBoxApplierFactory {

    /**
     * @param array|string $rawData
     * @param bool         $unslash
     * @return FileOptionsBoxData
     * @since 1.8.0
     */
    public function createData($rawData, $unslash = true) {
        return new FileOptionsBoxData($rawData, $unslash);
    }

    /**
     * @param BaseOptionsBoxData $data
     * @return FileOptionsBoxApplier
     * @since 1.8.0
     */
    public function createApplier($data) {
        return new FileOptionsBoxApplier($data);
    }
}