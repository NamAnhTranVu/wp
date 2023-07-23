<?php

namespace KDNAutoLeech\PostDetail\WooCommerce;


use KDNAutoLeech\Exceptions\StopSavingException;
use KDNAutoLeech\Objects\Enums\InformationMessage;
use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\PostDetail\Base\BasePostDetailData;
use KDNAutoLeech\PostDetail\Base\BasePostDetailSaver;
use KDNAutoLeech\PostDetail\PostSaverData;
use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Factory\BaseWooAdapterFactory;
use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Interfaces\ExternalProductAdapter;
use KDNAutoLeech\PostDetail\WooCommerce\Adapter\Interfaces\ProductAdapter;
use KDNAutoLeech\Utils;

class WooCommerceSaver extends BasePostDetailSaver {

    // TODO: Make stock status information assignable by using CSS selectors

    /** @var WooCommerceData */
    private $wcData;
    
    /*
     * 
     */

    /** @var ProductAdapter */
    private $product;

    /** @var BaseWooAdapterFactory */
    private $adapterFactory;

    /**
     * @param PostSaverData         $saverData
     * @param BasePostDetailData    $detailData
     * @param BaseWooAdapterFactory $adapterFactory
     */
    public function __construct(PostSaverData $saverData, BasePostDetailData $detailData, BaseWooAdapterFactory $adapterFactory) {
        parent::__construct($saverData, $detailData);
        $this->adapterFactory = $adapterFactory;
    }

    /**
     * Saves the product details using the configured settings
     */
    protected function onSave() {
        // Assign the detail data to an instance variable for ease of use.
        $this->wcData = $this->getDetailData();

        if (!$this->wcData || !$this->getSaverData()->getPostId() ||
            $this->getSaverData()->getWpPostData()['post_type'] !== 'product') {
            return;
        }

        // Make sure everything is valid before saving them.
        $this->wcData->validateData();

        try {
            // Create the product
            $this->product = $this->createProduct();

        } catch (StopSavingException $e) {
            // Stop saving if there was an error creating the product.
            Informer::addError(_kdn('Product could not be saved.') . ' ' . $e->getMessage())
                ->setException($e)
                ->addAsLog();

            return;
        }

        // Prepare the product below.
        // NOTE: Save all the data existing in $this->wcData. Handle things considering if this is a recrawl and/or
        // first page.

        // Set the product gallery
        $this->setProductGallery();

        // Do the things that should be done just in the first page or in a child post
        if ($this->getSaverData()->isFirstPage() || $this->getSaverData()->getPostData()->getChildPost()) {
            $productClass = get_class($this->product->getProduct());
            switch ($productClass) {
                case \WC_Product_Simple::class:
                    $this->prepareSimpleProduct();
                    break;

                case \WC_Product_External::class:
                    $this->prepareExternalProduct();
                    break;

                default:
                    // Stop saving otherwise.
                    throw new StopSavingException(sprintf('%1$s cannot be saved', $productClass));
            }
        }

        // Save the product
        $this->product->save();
    }

    /**
     * Prepares details that are specific to simple products
     * @since 1.8.0
     */
    private function prepareSimpleProduct() {
        $this->setTags();
        $this->setPrice();
        $this->setDownloadOptions();
        $this->setSKU();
        $this->setStockOptions();
        $this->setSoldIndividually();
        $this->setShippingOptions();
        $this->setAttributes();
        $this->setPurchaseNote();
        $this->setEnableReviews();
        $this->setMenuOrder();
    }

    /**
     * Prepares details that are specific to external products
     * @since 1.8.0
     */
    private function prepareExternalProduct() {
        $this->setTags();
        $this->setPrice();
        $this->setSKU();
        $this->setAttributes();
        $this->setEnableReviews();
        $this->setMenuOrder();
        $this->setExternalProductDetails();
    }

    /**
     * @return ProductAdapter
     * @throws StopSavingException
     * @since 1.8.0
     */
    private function createProduct() {
        $typeClassMap = [
            'simple'   => \WC_Product_Simple::class,
            'external' => \WC_Product_External::class,
        ];

        // Get the selected product type
        $productType = $this->wcData->getProductType();

        // If a product type that the plugin cannot save is selected, stop saving.
        if (!isset($typeClassMap[$productType])) {
            Informer::addError(sprintf(_kdn('Product type %1$s cannot be saved.'), $productType))
                ->addAsLog();
            throw new StopSavingException("Product type {$productType} cannot be saved.");
        }

        $productClass = $typeClassMap[$productType];

        // Check if the class exists
        // Make sure WC_Product class exists. We need it so that we can save products in the way WooCommerce does.
        if (!class_exists($productClass)) {
            Informer::add(Information::fromInformationMessage(
                InformationMessage::WOOCOMMERCE_ERROR,
                sprintf(_kdn('%1$s class does not exist. You must activate WooCommerce to save products. If WooCommerce is active, please update it to the latest version.'), $productClass),
                InformationType::ERROR
            ));

            // Stop saving.
            throw new StopSavingException("Product type {$productType} cannot be saved.");
        }

        // Create the product
        try {
            return $this->adapterFactory->createAdapterForProduct(new $productClass($this->getSaverData()->getPostId()));

        } catch (\Exception $e) {
            throw new StopSavingException($e->getMessage());
        }
    }

    /*
     * HELPERS
     */

    /**
     * Sets the product gallery using {@link $wooCommerceGalleryPostMetaKey}
     */
    private function setProductGallery() {
        // First, if this is an update, delete the existing gallery post meta.
        if ($this->getSaverData()->isRecrawl() && $this->getSaverData()->isFirstPage() 
            || $this->getSaverData()->isRecrawl() && $this->getSaverData()->getPostData()->getChildPost()) {
            // Remove WooCommerce gallery attachment IDs
            $this->product->set_gallery_image_ids([]);
        }

        // If there are no gallery attachment IDs, no need to continue.
        if (empty($this->getSaverData()->getGalleryAttachmentIds())) return;

        // Save the gallery as WooCommerce product gallery if the user wants.
        if (!$this->getSaverData()->getPostData()->getChildPost()) {
            $saveAsWooCommerceGallery = $this->getSaverData()->getPostSaver()->getSettingForCheckbox('_post_save_images_as_woocommerce_gallery');
        } else {
            $saveAsWooCommerceGallery = $this->getSaverData()->getPostSaver()->getSettingForCheckbox('_child_post_save_images_as_woocommerce_gallery');
        }

        if (!$saveAsWooCommerceGallery) return;

        // First get the images that are already set as WC gallery images if exists
        $galleryImageIds = $this->product->get_gallery_image_ids();
        if (!$galleryImageIds) $galleryImageIds = [];

        $galleryImageIds = array_unique(array_merge($galleryImageIds, $this->getSaverData()->getGalleryAttachmentIds()));

        // Set gallery image IDs
        $this->product->set_gallery_image_ids($galleryImageIds);
    }

    /**
     * Sets the external product details such as product URL and button text
     * @since 1.8.0
     */
    private function setExternalProductDetails() {
        /** @var ExternalProductAdapter $product */
        $product = $this->product;

        $product->set_button_text($this->wcData->getButtonText());
        $product->set_product_url($this->wcData->getProductUrl());
    }

    /**
     * Sets the tags
     */
    private function setTags() {
        if ($this->getSaverData()->isRecrawl()) {
            // Remove existing tags, if there are any.
            $this->product->set_tag_ids([]);
        }

        // If there are no tags, stop.
        if(!$this->getSaverData()->getPostData()->getPreparedTags()) return;

        $tagIds = [];
        foreach($this->getSaverData()->getPostData()->getPreparedTags() as $tag) {
            $result = wp_insert_term($tag,'product_tag');

            // WordPress returns an error if the tag already exists
            if (is_a($result, \WP_Error::class)) {
                // Try to get the tag from the error
                $termId = Utils::array_get($result->error_data, 'term_exists');
                if ($termId && is_numeric($termId)) {
                    $tagIds[] = $termId;
                }

            // Otherwise, we have just inserted the tag. Get its ID.
            } else if(is_array($result) && isset($result['term_id'])) {
                $tagIds[] = $result['term_id'];
            }
        }

        // Set the tags
        $this->product->set_tag_ids($tagIds);
    }

    /**
     * Sets product prices
     */
    private function setPrice() {
        $regularPrice = $this->wcData->getRegularPrice();
        $salePrice = $this->wcData->getSalePrice();

        // WooCommerce requires 'price' to be saved.
        $price = $salePrice !== null ? $salePrice : $regularPrice;
        $this->product->set_price($price !== null ? $price : '');

        // Save regular and sale prices.
        $this->product->set_regular_price($this->wcData->getRegularPrice(''));
        $this->product->set_sale_price($this->wcData->getSalePrice(''));
    }

    /**
     * Sets download options such as download limit, downloadable files, and download expiry.
     */
    private function setDownloadOptions() {
        // If this is a recrawl, reset download settings.
        if ($this->getSaverData()->isRecrawl()) {
            $this->product->set_downloadable(false);
            $this->product->set_download_limit('');
            $this->product->set_download_expiry('');
            $this->product->set_downloads([]);
        }

        $isDownloadable = $this->wcData->isDownloadable();

        $this->product->set_downloadable($isDownloadable);
        $this->product->set_download_limit($this->wcData->getDownloadLimit());
        $this->product->set_download_expiry($this->wcData->getDownloadExpiry());

        // If the product is not downloadable, no need to save the files.
        if (!$isDownloadable) return;

        // Prepare downloadable file information in the format WooCommerce wants
        $downloadables = array_map(function($mediaFile) {
            /** @var MediaFile $mediaFile */
            return [
                'file' => $mediaFile->getLocalUrl(),
                'name' => $mediaFile->getMediaTitle() ?: $mediaFile->getBaseName(),
            ];
        }, $this->wcData->getDownloadableMediaFiles());

        // Set the downloads to the product
        $this->product->set_downloads($downloadables);
    }

    /**
     * Sets the SKU
     */
    private function setSKU() {
        $sku = $this->wcData->getSku();

        try {
            $this->product->set_sku($sku);

        } catch (\WC_Data_Exception $e) {
            // Inform the user.
            Informer::addError(sprintf(_kdn('SKU could not be saved. Message: %1$s'), $e->getMessage()))
                ->setException($e)
                ->addAsLog();

            // We could stop saving the post by throwing a duplicate post exception. However, duplicate check is done
            // in WooCommerceDuplicateChecker considering the preferences of the user. Hence, we just inform the user
            // here about the fact that SKU could not be saved.
        }
    }

    /**
     * Sets the stock options
     */
    private function setStockOptions() {
        // Reset the settings if this is a recrawl
        if ($this->getSaverData()->isRecrawl()) {
            // Set the stock quantity
            $this->product->set_stock_quantity(null);

            // Set backorders
            $this->product->set_backorders('no');

            // Set the low stock amount if it exists
            $this->product->set_low_stock_amount('');
        }

        // If the stock is not managed, set the stock status and stop.
        if (!$this->wcData->isManageStock()) {
            $this->product->set_manage_stock(false);
            $this->product->set_stock_status($this->wcData->getStockStatus());
            return;
        }

        // Stock is managed
        $this->product->set_manage_stock(true);

        // Set the stock quantity
        $this->product->set_stock_quantity($this->wcData->getStockQuantity());

        // Set backorders
        $this->product->set_backorders($this->wcData->getBackorders());

        // Set the low stock amount if it exists
        $this->product->set_low_stock_amount($this->wcData->getLowStockAmount());
    }

    /**
     * Sets if the product is sold individually
     */
    private function setSoldIndividually() {
        $this->product->set_sold_individually($this->wcData->isSoldIndividually());
    }

    /**
     * Sets the shipping options
     */
    private function setShippingOptions() {
        // Reset the settings if this is a recrawl
        if ($this->getSaverData()->isRecrawl()) {
            // Set dimensions and weight
            $this->product->set_weight('');
            $this->product->set_length('');
            $this->product->set_width('');
            $this->product->set_height('');

            // Set shipping class
            $this->product->set_shipping_class_id(0);
        }

        // No shipping for virtual products.
        if ($this->wcData->isVirtual()) {
            $this->product->set_virtual(true);
            return;
        }

        // Not a virtual product.
        $this->product->set_virtual(false);

        // Set dimensions and weight
        $this->product->set_weight($this->wcData->getWeight());
        $this->product->set_length($this->wcData->getLength());
        $this->product->set_width($this->wcData->getWidth());
        $this->product->set_height($this->wcData->getHeight());

        // Set shipping class
        $this->product->set_shipping_class_id($this->wcData->getShippingClassId());
    }

    /**
     * Sets the attributes
     * @since 1.8.0
     */
    private function setAttributes() {
        // Reset the attributes if this is a recrawl.
        if ($this->getSaverData()->isRecrawl()) {
            $this->product->set_attributes([]);
        }

        // Get the attributes.
        $attributes = $this->wcData->getAttributes();

        // If there is no attribute, no need to proceed.
        if (!$attributes) return;

        // If WC_Product_Attribute class does not exist, stop, since we cannot save the attributes without it.
        if (!class_exists(\WC_Product_Attribute::class)) return;

        // Prepare the product attributes
        $i = 0;
        $wcAttributes = [];
        foreach($attributes as $attrData) {
            $name    = Utils::array_get($attrData, 'name');
            $options = Utils::array_get($attrData, 'value');

            $wcAttribute = new \WC_Product_Attribute();
            $wcAttribute->set_id(0);
            $wcAttribute->set_name($name);
            $wcAttribute->set_options($options);
            $wcAttribute->set_position(++$i);
            $wcAttribute->set_visible(true);
            $wcAttribute->set_variation(false);

            $wcAttributes[] = $wcAttribute;
        }

        // Set the product attributes
        $this->product->set_attributes($wcAttributes);
    }

    /**
     * Sets the purchase note
     * @since 1.8.0
     */
    private function setPurchaseNote() {
        $this->product->set_purchase_note($this->wcData->getPurchaseNote());
    }

    /**
     * Sets whether reviews should be enabled or not
     * @since 1.8.0
     */
    private function setEnableReviews() {
        $this->product->set_reviews_allowed($this->wcData->isEnableReviews());
    }

    /**
     * Sets the menu order
     * @since 1.8.0
     */
    private function setMenuOrder() {
        $this->product->set_menu_order($this->wcData->getMenuOrder());
    }

}