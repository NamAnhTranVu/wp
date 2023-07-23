<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\Def\Options;


use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxOptions;

class DefaultOptionsBoxGeneralOptions extends BaseOptionsBoxOptions {

    /** @var bool True if the item should be treated as JSON. */
    private $isTreatAsJson;

    /** @var bool True if the item should be translate. */
    private $isTranslation;

    protected function prepare() {
        $rawData = $this->getRawData();
        $this->isTreatAsJson = isset($rawData['treat_as_json']);
        $this->isTranslation = isset($rawData['active_translation']);
    }

    /*
     * GETTERS
     */

    /**
     * @return bool
     */
    public function isTreatAsJson() {
        return $this->isTreatAsJson;
    }

    /**
     * @return bool
     */
    public function isTranslation() {
        return $this->isTranslation;
    }

}