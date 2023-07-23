<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\Base;


abstract class BaseOptionsBoxApplier {

    /** @var BaseOptionsBoxData */
    private $data;

    /** @var bool True if the applier must run for testing purposes. Otherwise, false. */
    private $isForTest = false;

    /** @var bool True if the applier will run for a test conducted from within the options box. Otherwise, false. */
    private $isFromOptionsBox = false;

    /**
     * @param BaseOptionsBoxData $optionsBoxData
     */
    public function __construct(BaseOptionsBoxData $optionsBoxData) {
        $this->data = $optionsBoxData;
    }

    /**
     * Applies the options configured in options box to the given value
     * @param mixed $value
     * @return mixed|null $modifiedValue Null, if the item should be removed. Otherwise, the modified value.
     */
    public abstract function apply($value, $url = null, $botSettings = null, $postData = null);

    /**
     * @param array $arr        An array of items.
     * @param null|string $key  If given, the options will be applied to $arr[$key]. If no key is given, the array is
     *                          assumed to be flat, containing only non-array values.
     * @return array            Modified array.
     */
    public function applyToArray($arr, $key = null, $url = null, $botSettings = null, $postData = null) {
        // If there is no data, return the original array since there is no setting to apply.
        if (!$this->dataExists()) return $arr;

        // If the parameter is not an array, make it an array.
        if (!is_array($arr)) $arr = [$arr];

        $arr = array_map(function($v) use (&$key, $url, $botSettings, $postData) {
            // Apply only if the item is not an array.
            if (!is_array($v)) {
                return $this->apply($v, $url, $botSettings, $postData);

                // Apply to the given key, if there is a key.
            } else if($key && isset($v[$key])) {
                $v[$key] = $this->apply($v[$key], $url, $botSettings, $postData);
                return $v;
            }

            return null;
        }, $arr);

        // Make sure null values are removed. apply method returns null only if the item should be removed.
        return array_filter($arr, function($v) {
            return $v !== null;
        });
    }

    /**
     * @return BaseOptionsBoxData
     */
    public function getData() {
        return $this->data;
    }

    /**
     * @return bool True if the data exists.
     * @since 1.8.0
     */
    public function dataExists() {
        return $this->data ? true : false;
    }

    /**
     * @return bool
     */
    public function isForTest() {
        return $this->isForTest;
    }

    /**
     * @param bool $isForTest See {@link $isForTest}
     * @return BaseOptionsBoxApplier
     */
    public function setForTest($isForTest) {
        $this->isForTest = $isForTest;
        return $this;
    }

    /**
     * @return bool
     */
    public function isFromOptionsBox() {
        return $this->isFromOptionsBox;
    }

    /**
     * @param bool $isFromOptionsBox See {@link $isFromOptionsBox}
     * @return BaseOptionsBoxApplier
     */
    public function setFromOptionsBox($isFromOptionsBox) {
        $this->isFromOptionsBox = $isFromOptionsBox;
        return $this;
    }

}