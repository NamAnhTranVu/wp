<?php

namespace KDNAutoLeech\PostDetail\WooCommerce;


use KDNAutoLeech\Objects\File\FileService;
use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\PostDetail\Base\BasePostDetailPreparer;
use KDNAutoLeech\Utils;

class WooCommercePreparer extends BasePostDetailPreparer {

    /** @var WooCommerceData */
    private $wcData;

    private $childPost;

    /**
     * Prepare the post bot
     *
     * @return void
     */
    public function prepare() {
        /**
         * If we are crawling a childPost
         *
         * @since 2.2.3
         */
        $this->childPost = $this->getBot()->getPostData()->getChildPost();

        // Store the detail data in an instance variable for easy of use
        $this->wcData = $this->getDetailData();

        // Prepare the data
        $this->prepareProductType();
        $this->prepareIsVirtual();
        $this->prepareIsDownloadable();

        // General
        $this->prepareExternalProductDetails();
        $this->prepareRegularPrice();
        $this->prepareSalePrice();
        $this->prepareDownloadableFileUrls();
        $this->prepareDownloadLimit();
        $this->prepareDownloadExpiry();

        // Inventory
        $this->prepareSku();
        $this->prepareManageStock();
        $this->prepareStockQuantity();
        $this->prepareBackorders();
        $this->prepareLowStockAmount();
        if (!$this->wcData->isManageStock()) $this->prepareStockStatus();
        $this->prepareIsSoldIndividually();

        // Shipping
        $this->prepareWeight();
        $this->prepareLength();
        $this->prepareWidth();
        $this->prepareHeight();
        $this->prepareShippingClassId();

        // Attributes
        $this->prepareAttributes();

        // Advanced
        $this->preparePurchaseNote();
        $this->prepareEnableReviews();
        $this->prepareMenuOrder();

        // Others
        $this->prepareGalleryImageUrls();
    }

    /*
     * HELPERS
     */

    /** Prepares the product type */
    private function prepareProductType() {
        if (!$this->childPost) {
            $productType = $this->bot->getSetting('_wc_product_type');
        } else {
            $productType = $this->bot->getSetting('_child_post_wc_product_type');
        }
        $this->wcData->setProductType($productType);
    }

    /** Prepares whether a product is virtual or not */
    private function prepareIsVirtual() {
        if (!$this->childPost) {
            $isVirtual = $this->bot->getSettingForCheckbox('_wc_virtual');
        } else {
            $isVirtual = $this->bot->getSettingForCheckbox('_child_post_wc_virtual');
        }
        $this->wcData->setIsVirtual($isVirtual);
    }

    /** Prepares whether a product is downloadable or not */
    private function prepareIsDownloadable() {
        if (!$this->childPost) {
            $isDownloadable = $this->bot->getSettingForCheckbox('_wc_downloadable');
        } else {
            $isDownloadable = $this->bot->getSettingForCheckbox('_child_post_wc_downloadable');
        }
        $this->wcData->setIsDownloadable($isDownloadable);
    }

    /** Prepares product URL and button text */
    private function prepareExternalProductDetails() {
        if (!$this->childPost) {
            $productUrl = $this->getValuesForSelectorSetting('_wc_product_url_selectors', 'text', false, true, true);
            $this->wcData->setProductUrl($productUrl ?: $this->bot->getSetting('_wc_product_url', ''));
            $this->wcData->setButtonText($this->bot->getSetting('_wc_button_text', ''));
        } else {
            $productUrl = $this->getValuesForSelectorSetting('_child_post_wc_product_url_selectors', 'text', false, true, true);
            $this->wcData->setProductUrl($productUrl ?: $this->bot->getSetting('_child_post_wc_product_url', ''));
            $this->wcData->setButtonText($this->bot->getSetting('_child_post_wc_button_text', ''));
        }
    }

    /** Prepares regular price of the product */
    private function prepareRegularPrice() {
        if (!$this->childPost) {
            $result = $this->getValuesForSelectorSetting('_wc_regular_price_selectors', 'text', false, true, true);
        } else {
            $result = $this->getValuesForSelectorSetting('_child_post_wc_regular_price_selectors', 'text', false, true, true);
        }
        if (!$result) return;

        $this->wcData->setRegularPrice($result);
    }

    /** Prepares regular price of the product */
    private function prepareSalePrice() {
        if (!$this->childPost) {
            $result = $this->getValuesForSelectorSetting('_wc_sale_price_selectors', 'text', false, true, true);
        } else {
            $result = $this->getValuesForSelectorSetting('_child_post_wc_sale_price_selectors', 'text', false, true, true);
        }
        if (!$result) return;

        $this->wcData->setSalePrice($result);
    }

    /** Prepares downloadable file URLs of the product */
    private function prepareDownloadableFileUrls() {
        // If the product is not downloadable, stop.
        if (!$this->wcData->isDownloadable()) return;

        // Get the file selectors
        if (!$this->childPost) {
            $selectors = $this->bot->getSetting('_wc_file_url_selectors');
        } else {
            $selectors = $this->bot->getSetting('_child_post_wc_file_url_selectors');
        }
        if (!$selectors) return;

        // Save the media files
        $mediaFiles = FileService::getInstance()->saveFilesWithSelectors($this->getBot(), $this->getBot()->getCrawler(), $selectors);
        if (!$mediaFiles) return;

        $this->wcData->setDownloadableMediaFiles($mediaFiles);
    }

    /** Prepares download limit */
    private function prepareDownloadLimit() {
        if (!$this->childPost) {
            $downloadLimit = $this->bot->getSetting('_wc_download_limit');
        } else {
            $downloadLimit = $this->bot->getSetting('_child_post_wc_download_limit');
        }
        $this->wcData->setDownloadLimit($downloadLimit ? (int) $downloadLimit : 0);
    }

    /** Prepares download expiry */
    private function prepareDownloadExpiry() {
        if (!$this->childPost) {
            $downloadExpiry = $this->bot->getSetting('_wc_download_expiry');
        } else {
            $downloadExpiry = $this->bot->getSetting('_child_post_wc_download_expiry');
        }
        $this->wcData->setDownloadExpiry($downloadExpiry ? (int) $downloadExpiry : 0);
    }

    /** Prepares SKU */
    private function prepareSku() {
        if (!$this->childPost) {
            $result = $this->getValuesForSelectorSetting('_wc_sku_selectors', 'text', false, true, true);
        } else {
            $result = $this->getValuesForSelectorSetting('_child_post_wc_sku_selectors', 'text', false, true, true);
        }
        if (!$result) return;

        $this->wcData->setSku($result);
    }

    /** Prepares whether stock management is enabled or not */
    private function prepareManageStock() {
        if (!$this->childPost) {
            $isManageStock = $this->bot->getSettingForCheckbox('_wc_manage_stock');
        } else {
            $isManageStock = $this->bot->getSettingForCheckbox('_child_post_wc_manage_stock');
        }
        $this->wcData->setIsManageStock($isManageStock);
    }

    /** Prepares stock quantity */
    private function prepareStockQuantity() {
        if (!$this->childPost) {
            $result = $this->getValuesForSelectorSetting('_wc_stock_quantity_selectors', 'text', false, true, true);
        } else {
            $result = $this->getValuesForSelectorSetting('_child_post_wc_stock_quantity_selectors', 'text', false, true, true);
        }
        if (!$result) return;

        $this->wcData->setStockQuantity($result);
    }

    /** Prepares backorder availability information */
    private function prepareBackorders() {
        if (!$this->childPost) {
            $backorders = $this->bot->getSetting('_wc_backorders');
        } else {
            $backorders = $this->bot->getSetting('_child_post_wc_backorders');
        }
        if ($backorders) $this->wcData->setBackorders($backorders);
    }

    /** Prepares low stock amount */
    private function prepareLowStockAmount() {
        if (!$this->childPost) {
            $lowStockAmount = $this->bot->getSetting('_wc_low_stock_amount');
        } else {
            $lowStockAmount = $this->bot->getSetting('_child_post_wc_low_stock_amount');
        }
        if ($lowStockAmount) $this->wcData->setLowStockAmount((int) $lowStockAmount);
    }

    /** Prepares stock status information */
    private function prepareStockStatus() {
        if (!$this->childPost) {
            $status = $this->bot->getSetting('_wc_stock_status');
        } else {
            $status = $this->bot->getSetting('_child_post_wc_stock_status');
        }
        $this->wcData->setStockStatus($status);
    }

    /** Prepares whether the product is sold individually or not */
    private function prepareIsSoldIndividually() {
        if (!$this->childPost) {
            $isSoldIndividually = $this->bot->getSettingForCheckbox('_wc_sold_individually');
        } else {
            $isSoldIndividually = $this->bot->getSettingForCheckbox('_child_post_wc_sold_individually');
        }
        $this->wcData->setIsSoldIndividually($isSoldIndividually);
    }

    /** Prepares weight of the product */
    private function prepareWeight() {
        if (!$this->childPost) {
            $result = $this->getValuesForSelectorSetting('_wc_weight_selectors', 'text', false, true, true);
        } else {
            $result = $this->getValuesForSelectorSetting('_child_post_wc_weight_selectors', 'text', false, true, true);
        }
        if (!$result) return;

        $this->wcData->setWeight($result);
    }

    /** Prepares length of the product */
    private function prepareLength() {
        if (!$this->childPost) {
            $result = $this->getValuesForSelectorSetting('_wc_length_selectors', 'text', false, true, true);
        } else {
            $result = $this->getValuesForSelectorSetting('_child_post_wc_length_selectors', 'text', false, true, true);
        }
        if (!$result) return;

        $this->wcData->setLength($result);
    }

    /** Prepares width of the product */
    private function prepareWidth() {
        if (!$this->childPost) {
            $result = $this->getValuesForSelectorSetting('_wc_width_selectors', 'text', false, true, true);
        } else {
            $result = $this->getValuesForSelectorSetting('_child_post_wc_width_selectors', 'text', false, true, true);
        }
        if (!$result) return;

        $this->wcData->setWidth($result);
    }

    /** Prepares height of the product */
    private function prepareHeight() {
        if (!$this->childPost) {
            $result = $this->getValuesForSelectorSetting('_wc_height_selectors', 'text', false, true, true);
        } else {
            $result = $this->getValuesForSelectorSetting('_child_post_wc_height_selectors', 'text', false, true, true);
        }
        if (!$result) return;

        $this->wcData->setHeight($result);
    }

    /** Prepares shipping class ID  */
    private function prepareShippingClassId() {
        if (!$this->childPost) {
            $shippingClassId = $this->bot->getSetting('_wc_product_shipping_class');
        } else {
            $shippingClassId = $this->bot->getSetting('_child_post_wc_product_shipping_class');
        }
        $this->wcData->setShippingClassId($shippingClassId);
    }

    /** Prepares attributes */
    private function prepareAttributes() {
        $foundAttributes = $this->getAttributesDefinedBySelectors();
        $customAttributes = $this->getCustomAttributes();

        // If the custom attributes have an attribute name that exists in the attributes retrieved using selectors,
        // combine them.
        if ($foundAttributes && $customAttributes) {
            foreach($customAttributes as $customAttrName => $customAttrValues) {
                foreach($foundAttributes as $foundAttrName => &$foundAttrValues) {
                    if (strtolower($customAttrName) == strtolower($foundAttrName)) {
                        $foundAttrValues = array_unique(array_merge($foundAttrValues, $customAttrValues));

                        unset($customAttributes[$customAttrName]);
                        continue 2;
                    }
                }
            }
        }

        // Create the product attributes by combining found and custom attributes
        $productAttributes = array_merge($foundAttributes, $customAttributes);

        // Change the structure of the array such that [ ['name' => 'attr name', 'value' => ['val1', 'val2'], ... ] ]
        // We store the attributes in this structure so that they can be easily translated.
        $finalAttributes = [];
        foreach($productAttributes as $k => $v) {
            $finalAttributes[] = [
                'name'  => $k,
                'value' => $v
            ];
        }

        // Set the attributes of the product
        $this->wcData->setAttributes($finalAttributes);
    }

    /**
     * Prepares the purchase note
     * @since 1.8.0
     */
    private function preparePurchaseNote() {
        // Find the purchase notes using the given selectors
        if (!$this->childPost) {
            $addAll = $this->bot->getSettingForCheckbox('_wc_purchase_note_add_all_found');
            $purchaseNotes = $this->getValuesForSelectorSetting('_wc_purchase_note_selectors', 'text', false, !$addAll, true);
        } else {
            $addAll = $this->bot->getSettingForCheckbox('_child_post_wc_purchase_note_add_all_found');
            $purchaseNotes = $this->getValuesForSelectorSetting('_child_post_wc_purchase_note_selectors', 'text', false, !$addAll, true);
        }

        // Make sure the purchase notes variable is a flat array
        if (is_array($purchaseNotes)) $purchaseNotes = array_flatten($purchaseNotes);
        if (!$purchaseNotes) $purchaseNotes = [];
        if (!is_array($purchaseNotes)) $purchaseNotes = [$purchaseNotes];

        // Get purchase note settings
        if (!$this->childPost) {
            $customPurchaseNotes = $this->bot->getSetting('_wc_custom_purchase_notes', []);
            $alwaysAddCustomPurchaseNote = $this->bot->getSettingForCheckbox('_wc_always_add_custom_purchase_note');
        } else {
            $customPurchaseNotes = $this->bot->getSetting('_child_post_wc_custom_purchase_notes', []);
            $alwaysAddCustomPurchaseNote = $this->bot->getSettingForCheckbox('_child_post_wc_always_add_custom_purchase_note');
        }

        // Collect all purchase notes in an array
        $finalPurchaseNotes = [];

        // Custom purchase note should be added if there is no purchase note found by a CSS selector or the user is
        // specified that it should always be added.
        if ((!$purchaseNotes || $alwaysAddCustomPurchaseNote) && $customPurchaseNotes) {
            // Select one of the custom purchase notes
            $customNote = $customPurchaseNotes[array_rand($customPurchaseNotes, 1)];
            if ($customNote) $finalPurchaseNotes[] = $customNote;
        }

        // If there are purchase notes found by the CSS selectors, append them.
        $finalPurchaseNotes = array_merge($finalPurchaseNotes, $purchaseNotes);

        // Create the final purchase note by combining all purchase notes with a new line char
        $finalPurchaseNote = implode("\n", $finalPurchaseNotes);

        // Assign the note in the data
        $this->wcData->setPurchaseNote($finalPurchaseNote);
    }

    /**
     * Prepares 'enable reviews' value of the data
     * @since 1.8.0
     */
    private function prepareEnableReviews() {
        if (!$this->childPost) {
            $this->wcData->setEnableReviews($this->bot->getSettingForCheckbox('_wc_enable_reviews'));
        } else {
            $this->wcData->setEnableReviews($this->bot->getSettingForCheckbox('_child_post_wc_enable_reviews'));
        }
    }

    /**
     * Prepares menu order value
     * @since 1.8.0
     */
    private function prepareMenuOrder() {
        if (!$this->childPost) {
            $this->wcData->setMenuOrder($this->bot->getSetting('_wc_menu_order', ''));
        } else {
            $this->wcData->setMenuOrder($this->bot->getSetting('_child_post_wc_menu_order', ''));
        }
    }

    /**
     * Prepares gallery image URLs
     * @since 1.8.0
     */
    private function prepareGalleryImageUrls() {
        // Saving gallery images is main post preparers' responsibility. Here, we first check if the user wants to
        // save the gallery images as WooCommerce gallery. If so, we get the main post's gallery image URLs and set them
        // to WooCommerce data's gallery image URLs. This is just for reaching gallery image URLs from the WooCommerce
        // data, when they are needed.
        if (!$this->childPost) {
            $saveAsWooCommerceGallery = $this->bot->getSettingForCheckbox('_post_save_images_as_woocommerce_gallery');
        } else {
            $saveAsWooCommerceGallery = $this->bot->getSettingForCheckbox('_child_post_save_images_as_woocommerce_gallery');
        }
        if (!$saveAsWooCommerceGallery) return;

        // Get the attachments from the main post data. They contain the gallery image URLs.
        $attachmentData = $this->bot->getPostData()->getAttachmentData();
        if (!is_array($attachmentData)) return;

        // Now, extract the gallery image URLs from the attachment data and set them to the WooCommerce data's gallery
        // image URLs.
        $this->wcData->setGalleryImageUrls(array_filter(array_map(function($mediaFile) {
            /** @var MediaFile $mediaFile */
            return $mediaFile->isGalleryImage() ? $mediaFile->getLocalUrl() : null;
//            return isset($mediaFile['gallery_image']) && $mediaFile['gallery_image'] ? $mediaFile['url'] : null;
        }, $attachmentData)));
    }

    /*
     *
     */

    /**
     * @return array
     * @since 1.8.0
     */
    private function getAttributesDefinedBySelectors() {
        $nameKey = 'name';
        $valueKey = 'value';

        // Get the attribute names and the values
        if (!$this->childPost) {
            $attributeNames = $this->getValuesForSelectorSetting('_wc_attribute_name_selectors', 'text', $nameKey, false, true);
            $attributeValues = $this->getValuesForSelectorSetting('_wc_attribute_value_selectors', 'text', $valueKey, false, true);
            $separators = $this->getBot()->getSetting('_wc_attribute_value_separators');
        } else {
            $attributeNames = $this->getValuesForSelectorSetting('_child_post_wc_attribute_name_selectors', 'text', $nameKey, false, true);
            $attributeValues = $this->getValuesForSelectorSetting('_child_post_wc_attribute_value_selectors', 'text', $valueKey, false, true);
            $separators = $this->getBot()->getSetting('_child_post_wc_attribute_value_separators');
        }

        // If there are no attribute names and values, stop.
        if (!$attributeNames && !$attributeValues) return [];

        // Make sure the arrays exist.
        if (!$attributeNames) $attributeNames = [];
        if (!$attributeValues) $attributeValues = [];

        // Combine the names array and the values array.
        // Values retrieved from getValuesForSelectorSetting() are array of arrays. We do not need the first level. We
        // need the 2nd-level arrays. Hence, flatten the arrays with a depth of 1.
        $attributes = array_merge(array_flatten($attributeNames, 1), array_flatten($attributeValues, 1));

        // If there is no attribute, stop.
        if (!$attributes) return [];

        // Sort the names and values by their position in the source code
        $attributes = array_values(Utils::array_msort($attributes, ["start" => SORT_ASC]));

        // We need the attribute data to be sorted as "name -> values -> name -> values". So, if the first item is
        // not a key, reverse the array, assuming that the values come before the keys in the source code.
        if ($attributes[0]['type'] === 'value') {
            $attributes = array_reverse($attributes, false);
        }

        // Now, match the names with their values.
        $preparedAttributes = [];
        $currentAttrName = null;
        for($i = 0; $i < sizeof($attributes); $i++) {
            // Get the attribute data
            $attr = $attributes[$i];
            $currentValue = trim($attr['data']);
            $currentType = $attr['type'];

            // If there is no value, continue with the next one.
            if (!$currentValue) continue;

            // If this is a name, create an array under the attribute name.
            if ($currentType === $nameKey) {
                $preparedAttributes[$currentValue] = [];
                $currentAttrName = $currentValue;
                continue;
            }

            // This is a value. Add it among the values of the current attribute name.
            $preparedAttributes[$currentAttrName][] = $currentValue;
        }

        // Separate the values and make sure there are no empty attribute value arrays.
        foreach($preparedAttributes as $attrName => &$attrValues) {
            if (!$attrValues) {
                unset($preparedAttributes[$attrName]);
                continue;
            }

            // Separate the values and make sure the result contains unique items
            $attrValues = array_unique(Utils::getSeparated($attrValues, $separators));
        }

        return $preparedAttributes;
    }

    /**
     * Get custom attributes defined in the settings
     *
     * @return array Custom attributes defined in the settings as key-value pair. Keys are the attribute names.
     *               Each value is an array, storing the values of the attribute name.
     *               E.g. ['attrName' => ['attrValue', 'attrValue2'], 'attrName' => ['attrValue']]
     * @since 1.8.0
     */
    private function getCustomAttributes() {
        if (!$this->childPost) {
            $customAttributes = $this->getBot()->getSetting('_wc_custom_attributes');
        } else {
            $customAttributes = $this->getBot()->getSetting('_child_post_wc_custom_attributes');
        }
        if (!$customAttributes) return [];

        $attributes = [];
        foreach($customAttributes as $data) {
            // Get the key and the value
            $key = trim(Utils::array_get($data, 'key', ''));
            $value = trim(Utils::array_get($data, 'value', ''));

            // Both the key and the value must exist
            if (!$key || !$value) continue;

            // Add the attribute with the given key. Separate the value from commas.
            $attributes[$key] = array_unique(array_filter(array_map(function($v) {
                $trimmed = trim($v);
                return $trimmed ? $trimmed : null;
            }, explode(',', $value))));
        }

        return $attributes;
    }
}