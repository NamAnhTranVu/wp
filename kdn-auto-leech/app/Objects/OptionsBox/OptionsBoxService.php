<?php

namespace KDNAutoLeech\Objects\OptionsBox;


use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxApplier;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxApplierFactory;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Def\DefaultOptionsBoxApplierFactory;
use KDNAutoLeech\Objects\OptionsBox\Boxes\File\FileOptionsBoxApplierFactory;
use KDNAutoLeech\Objects\OptionsBox\Enums\OptionsBoxType;
use KDNAutoLeech\Utils;

class OptionsBoxService {

    /** @var OptionsBoxService */
    private static $instance = null;

    /**
     * Get the instance
     *
     * @return OptionsBoxService
     * @since 1.8.0
     */
    public static function getInstance() {
        if (static::$instance === null) static::$instance = new OptionsBoxService();
        return static::$instance;
    }

    /** This is a singleton */
    private function __construct() { }

    /*
     *
     */

    /**
     * Creates an applier considering the given options box configuration.
     *
     * @param string|array $rawData Options box settings
     * @param bool         $unslash
     * @return null|BaseOptionsBoxApplier
     * @since 1.8.0
     */
    public function createApplierFromRawData($rawData, $unslash = false) {
        return $this->createApplierFromArrayConfig($this->getArrayConfig($rawData, $unslash));
    }

    /**
     * @param array $selectorData Selector data. This typically contains 'selector', 'attr' and 'options_box' keys. If
     *                            this data has options box options, it will be used to create an options box applier.
     * @param bool $unslash
     * @return null|BaseOptionsBoxApplier
     * @since 1.8.0
     * @uses OptionsBoxService::createApplierFromRawData()
     */
    public function createApplierFromSelectorData($selectorData, $unslash = false) {
        if (!$selectorData) return null;

        $options = Utils::array_get($selectorData, 'options_box');
        if (!$options) return null;

        return $this->createApplierFromRawData($options, $unslash);
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * Creates an options box applier from an array configuration.
     *
     * @param array $config
     * @return BaseOptionsBoxApplier|null
     * @since 1.8.0
     */
    private function createApplierFromArrayConfig($config) {
        // If there is no config, return null.
        if (!$config) return null;

        // Get the factory
        $factory = $this->getApplierFactoryFromArrayConfig($config);

        // Create the data
        $data = $factory->createData($config);

        // Create the applier
        $applier = $factory->createApplier($data);

        return $applier;
    }

    /**
     * Returns an applier factory considering the given options box configuration.
     *
     * @param array $config Options box configuration array
     * @return BaseOptionsBoxApplierFactory
     * @since 1.8.0
     */
    private function getApplierFactoryFromArrayConfig($config) {
        // Find the factory class for the box type
        switch ($this->getBoxTypeFromArrayConfig($config)) {
            case OptionsBoxType::FILE:
                $factoryCls = FileOptionsBoxApplierFactory::class;
                break;

            case OptionsBoxType::DEF:
            default:
                $factoryCls = DefaultOptionsBoxApplierFactory::class;
                break;
        }

        /** @var BaseOptionsBoxApplierFactory $factory */
        return BaseOptionsBoxApplierFactory::getFactoryInstance($factoryCls);
    }

    /**
     * Get box type from an options box configuration.
     *
     * @param array $config
     * @return string Options box type
     * @since 1.8.0
     */
    private function getBoxTypeFromArrayConfig($config) {
        return Utils::array_get($config, OptionsBoxConfiguration::KEY_BOX . '.' . OptionsBoxConfiguration::KEY_TYPE, OptionsBoxType::DEF);
    }

    /**
     * Get array configuration
     *
     * @param string|array $rawData Raw configuration. Either an array or a JSON.
     * @param bool $unslash
     * @return array|mixed|object
     * @since 1.8.0
     */
    private function getArrayConfig($rawData, $unslash = true) {
        // If the data is an array, return it since there is no need to parse it.
        if (is_array($rawData)) return $rawData;

        // If the raw data should be unslashed
        if ($unslash) {
            // Unslash and reslash backward slashes to create a valid JSON. Unescaped backslashes are not valid in JSON.
            $rawData = str_replace('\\', '\\\\', wp_unslash($rawData));
        }

        return json_decode($rawData, true);
    }
}