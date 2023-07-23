<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\Base;


abstract class BaseOptionsBoxOptions {

    /** @var array Raw data retrieved from the options box directly */
    private $rawData;

    /**
     * @param array $rawData See {@link rawData}
     */
    public function __construct($rawData) {
        $this->rawData = $rawData ? $rawData : [];

        // Stop if there is no raw data.
        if (!$rawData) return;

        $this->prepare();
    }

    abstract protected function prepare();

    /**
     * @return array
     */
    public function getRawData() {
        return $this->rawData;
    }

}