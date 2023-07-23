<?php

namespace KDNAutoLeech\PostDetail\WooCommerce;


use KDNAutoLeech\Objects\File\FileService;
use KDNAutoLeech\Objects\OptionsBox\Enums\OptionsBoxTab;
use KDNAutoLeech\Objects\OptionsBox\Enums\OptionsBoxType;
use KDNAutoLeech\Objects\OptionsBox\Enums\TabOptions\FileTemplatesTabOptions;
use KDNAutoLeech\Objects\OptionsBox\OptionsBoxConfiguration;
use KDNAutoLeech\PostDetail\Base\BasePostDetailData;
use KDNAutoLeech\PostDetail\Base\BasePostDetailService;
use KDNAutoLeech\Utils;

class WooCommerceService extends BasePostDetailService {

    /**
     * Get configurations for the options boxes of the settings.
     *
     * @return array A key-value pair. The keys are meta keys of the settings. The values are arrays storing the
     *               configuration for the options box for that setting. The values can be created by using
     *               {@link OptionsBoxConfiguration::init()}.
     * @since 1.8.0
     */
    public function getOptionsBoxConfigs() {
        return [
            // File URL selectors
            '_wc_file_url_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->addTabOption(OptionsBoxTab::FILE_TEMPLATES, FileTemplatesTabOptions::OPTION_ALLOWED_TEMPLATE_TYPES, [
                    FileTemplatesTabOptions::TEMPLATE_TYPE_FILE_NAME,
                    FileTemplatesTabOptions::TEMPLATE_TYPE_MEDIA_TITLE,
                ])
                ->get(),

            // Child post file URL selectors
            '_child_post_wc_file_url_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->addTabOption(OptionsBoxTab::FILE_TEMPLATES, FileTemplatesTabOptions::OPTION_ALLOWED_TEMPLATE_TYPES, [
                    FileTemplatesTabOptions::TEMPLATE_TYPE_FILE_NAME,
                    FileTemplatesTabOptions::TEMPLATE_TYPE_MEDIA_TITLE,
                ])
                ->get(),
        ];
    }

    /**
     * Add assets, such as styles and scripts, that should be added to site tester page.
     * @since 1.8.0
     */
    public function addSiteTesterAssets() {
        /** @var WooCommerceAssetManager $assetManager */
        $assetManager = WooCommerceAssetManager::getInstance();
        $assetManager->addTester();
    }

    /**
     * Apply the short codes in the values of the detail data. The short codes can be applied using
     * {@link ShortCodeReplacer::replaceShortCodes}, which is available as trait in this class.
     *
     * @param BasePostDetailData $data
     * @param array              $map        See {@link ShortCodeReplacer::replaceShortCodes}
     * @param array              $frForMedia Find-replace config that can be used replace media file URLs with local
     *                                       URLs.
     */
    public function applyShortCodes(BasePostDetailData $data, $map, $frForMedia) {
        /** @var WooCommerceData $data */

        // General
        $data->setProductUrl($this->replaceShortCodes($map, $data->getProductUrl()));
        $data->setButtonText($this->replaceShortCodes($map, $data->getButtonText()));
        $data->setRegularPrice($this->replaceShortCodes($map, $data->getRegularPrice()));
        $data->setSalePrice($this->replaceShortCodes($map, $data->getSalePrice()));

        // Apply short codes to media files
        $this->applyShortCodesToDownloadableMediaFiles($data, $map, $frForMedia);

        // Inventory
        $data->setSku($this->replaceShortCodes($map, $data->getSku()));
        $data->setStockQuantity($this->replaceShortCodes($map, $data->getStockQuantity()));

        // Shipping
        $data->setWeight($this->replaceShortCodes($map, $data->getWeight()));
        $data->setLength($this->replaceShortCodes($map, $data->getLength()));
        $data->setWidth($this->replaceShortCodes($map, $data->getWidth()));
        $data->setHeight($this->replaceShortCodes($map, $data->getHeight()));

        // Attributes
        $this->applyShortCodesToAttributes($data, $map);

        // Purchase note
        $data->setPurchaseNote($this->replaceShortCodes($map, $data->getPurchaseNote()));

        // Replace media file URLs using $frForMedia
        $data->setGalleryImageUrls($this->applyShortCodesConsideringFileName($map, $data->getGalleryImageUrls(), $frForMedia));

        // TODO: Make sure all of the settings that use options box are handled here.
    }

    /**
     * Get category taxonomies for this post detail.
     *
     * @return array An array whose keys are category taxonomy names, and the values are the descriptions. E.g. for
     *               WooCommerce, ["product_cat" => "WooCommerce"]. The array can contain more than one category.
     * @since 1.8.0
     */
    public function getCategoryTaxonomies() {
        return [
            'product_cat' => _kdn("WooCommerce")
        ];
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * Applies short codes to names of the downloadable media files
     *
     * @param WooCommerceData $data       The data from which the downloadable media files will be retrieved
     * @param array           $map        See {@link ShortCodeReplacer::replaceShortCodes}
     * @param array           $frForMedia See {@link BasePostDetailService::applyShortCodes}
     * @since 1.8.0
     */
    private function applyShortCodesToDownloadableMediaFiles($data, &$map, &$frForMedia) {
        // Apply the short codes and collect find-replace configurations that can be used to replace old media URLs
        // with the URLs changed after applying short codes to file names
        foreach($data->getDownloadableMediaFiles() as $mediaFile) {
            $currentFrForMedia = FileService::getInstance()->applyShortCodesToMediaFileName($mediaFile,$map);
            if (!$currentFrForMedia) continue;

            // Collect find-replace configurations
            $frForMedia = array_merge($frForMedia, $currentFrForMedia);
        }

        // Make the replacements
        foreach($data->getDownloadableMediaFiles() as $mediaFile) {
            $mediaFile->setMediaTitle($this->applyShortCodesConsideringFileName($map, $mediaFile->getMediaTitle(), $frForMedia));
        }
    }

    /**
     * Apply short codes to attribute names and values
     *
     * @param WooCommerceData $data
     * @param array $map See {@link BasePostDetailService::applyShortCodes()}
     * @since 1.8.0
     */
    private function applyShortCodesToAttributes($data, &$map) {
        $attributes = $data->getAttributes();
        if (!$attributes) return;

        $prepared = [];
        foreach($attributes as $attrData) {
            $attrName  = Utils::array_get($attrData, 'name');
            $attrValue = Utils::array_get($attrData, 'value');

            $attrName  = $this->replaceShortCodes($map, $attrName);
            $attrValue = $this->replaceShortCodes($map, $attrValue);

            if (!$attrName || !$attrValue) continue;

            // If this name exists, append the value to the existing key.
            foreach($prepared as &$preparedData) {
                $preparedKey = Utils::array_get($preparedData, 'name');
                if (strtolower($preparedKey) == strtolower($attrName)) {
                    $preparedData['value'] = array_merge($preparedData['value'], $attrValue);
                    continue 2;
                }
            }

            // Otherwise, add it as a new key.
            $prepared[] = [
                'name'  => $attrName,
                'value' => $attrValue,
            ];
        }

        $data->setAttributes($prepared);
    }
}