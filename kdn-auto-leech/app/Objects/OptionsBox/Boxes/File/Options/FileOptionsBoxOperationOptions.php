<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\File\Options;


use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxOptions;
use KDNAutoLeech\Utils;

class FileOptionsBoxOperationOptions extends BaseOptionsBoxOptions {

    /** @var array */
    private $movePaths;

    /** @var array */
    private $copyPaths;

    protected function prepare() {
        $this->movePaths = $this->getPathOptions('move');
        $this->copyPaths = $this->getPathOptions('copy');
    }

    /*
     * GETTERS
     */

    /**
     * @return array
     */
    public function getMovePaths() {
        return $this->movePaths;
    }

    /**
     * @return array
     */
    public function getCopyPaths() {
        return $this->copyPaths;
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * Get options for an option key that stores 'path' in it.
     *
     * @param string $key Option key under which the paths are stored
     * @return array An array of strings. Each string is a path.
     * @since 1.8.0
     */
    private function getPathOptions($key) {
        return array_unique(array_map(function($v) {

            // Make sure the paths do not have a directory separator in the beginning and in the end
            return $v && isset($v['path']) ? trim(trim(trim($v['path']), '/'), DIRECTORY_SEPARATOR) : null;

        }, Utils::array_get($this->getRawData(), $key, [])));
    }
}