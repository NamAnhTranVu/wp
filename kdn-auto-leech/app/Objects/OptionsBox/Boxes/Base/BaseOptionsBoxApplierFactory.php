<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\Base;


abstract class BaseOptionsBoxApplierFactory {

    /** @var BaseOptionsBoxApplierFactory[] */
    private static $factoryInstances = [];

    /** This is a singleton */
    private function __construct() { }

    /**
     * @param array|string $rawData
     * @param bool         $unslash
     * @return BaseOptionsBoxData
     * @since 1.8.0
     */
    public abstract function createData($rawData, $unslash = true);

    /**
     * @param BaseOptionsBoxData $data
     * @return BaseOptionsBoxApplier
     * @since 1.8.0
     */
    public abstract function createApplier($data);

    /*
     * STATIC METHODS
     */

    /**
     * Creates a BaseOptionsBoxApplierFactory with the given class name. If an instance was created before, returns
     * that instance.
     *
     * @param string $factoryClass Name of a class that extends {@link BaseOptionsBoxApplierFactory}
     * @return BaseOptionsBoxApplierFactory
     * @throws \Exception If the factory instance is not a child of BaseOptionsBoxApplierFactory class.
     */
    public static function getFactoryInstance($factoryClass) {
        // If an instance does not exist
        if (!isset(static::$factoryInstances[$factoryClass])) {
            // Create an instance
            $instance = new $factoryClass();

            // Make sure the instance is a child of the factory class
            if (!is_a($instance, BaseOptionsBoxApplierFactory::class)) {
                throw new \Exception("The factory {$factoryClass} must extend " . BaseOptionsBoxApplierFactory::class);
            }

            // Store the instance
            static::$factoryInstances[$factoryClass] = $instance;
        }

        /** @var BaseOptionsBoxApplierFactory $instance */
        $instance = static::$factoryInstances[$factoryClass];

        return $instance;
    }
}