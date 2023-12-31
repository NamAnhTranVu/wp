<?php

namespace KDNAutoLeech\PostDetail\WooCommerce\Adapter\Factory;


use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Interfaces\ExternalProductAdapter;
use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Interfaces\SimpleProductAdapter;

abstract class BaseWooAdapterFactory {

    protected static $instances = [];

    /**
     * Get the instance.
     *
     * @return BaseWooAdapterFactory
     * @since 1.8.0
     */
    public static function getInstance() {
        $clz = get_called_class();
        if (!isset(static::$instances[$clz])) {
            static::$instances[$clz] = new $clz();
        }

        return static::$instances[$clz];
    }

    /** This is a singleton. */
    protected function __construct() {}

    /**
     * Get minimum WooCommerce version that the adapters created by this factory apply.
     *
     * @return string Version, inclusive. E.g. if you write 3.5, this will be applicable for versions greater than or
     *                equal to 3.5
     * @since 1.8.0
     */
    public abstract function getMinVersion();

    /**
     * Get maximum WooCommerce version that the adapters created by this factory apply.
     *
     * @return string|null Version, exclusive. E.g. if you write 3.5, this will be applicable for versions less than 3.5.
     *                     If this is null, it means this is applicable for all versions greater than min version defined
     *                     in {@link getMinVersion()}.
     * @since 1.8.0
     */
    public abstract function getMaxVersion();

    /**
     * Create simple product adapter.
     *
     * @param \WC_Product_Simple $simpleProduct
     * @return SimpleProductAdapter
     * @since 1.8.0
     */
    public abstract function createSimpleProductAdapter($simpleProduct);

    /**
     * Create external product adapter.
     *
     * @param \WC_Product_External $externalProduct
     * @return ExternalProductAdapter
     * @since 1.8.0
     */
    public abstract function createExternalProductAdapter($externalProduct);

    /**
     * Create a product adapter.
     *
     * @param \WC_Product $product The product for which an adapter will be created.
     * @return ExternalProductAdapter|SimpleProductAdapter
     * @throws \Exception If there is no adapter for the class of the supplied product.
     * @since 1.8.0
     */
    public function createAdapterForProduct($product) {
        switch (get_class($product)) {
            case \WC_Product_Simple::class:
                /** @var \WC_Product_Simple $product */
                return $this->createSimpleProductAdapter($product);

            case \WC_Product_External::class:
                /** @var \WC_Product_External $product */
                return $this->createExternalProductAdapter($product);

            default:
                throw new \Exception(sprintf(_kdn('An adapter for product class %1$s does not exist.'), get_class($product)));
        }
    }

}