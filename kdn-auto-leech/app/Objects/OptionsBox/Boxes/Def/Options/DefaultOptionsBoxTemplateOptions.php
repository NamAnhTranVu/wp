<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\Def\Options;


use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxOptions;
use KDNAutoLeech\Utils;

class DefaultOptionsBoxTemplateOptions extends BaseOptionsBoxOptions {

    /** @var bool True if the item should be removed when its value is empty. Otherwise, false. */
    private $isRemoveIfEmpty;

    /** @var array Array of strings. Each string is a template. */
    private $templates;

    /**
     * Prepares the instance variables using the raw data
     */
    protected function prepare() {
        // Prepare "remove if empty"
        $rawData = $this->getRawData();
        $this->isRemoveIfEmpty = isset($rawData['remove_if_empty']);

        // Prepare templates
        $this->templates = array_map(function($v) {
            return $v && isset($v['template']) ? $v['template'] : null;
        }, Utils::array_get($rawData, 'templates', []));
    }

    /**
     * @return bool
     */
    public function isRemoveIfEmpty() {
        return $this->isRemoveIfEmpty;
    }

    /**
     * @return array
     */
    public function getTemplates() {
        return $this->templates;
    }


}