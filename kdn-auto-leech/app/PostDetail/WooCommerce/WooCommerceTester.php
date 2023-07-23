<?php

namespace KDNAutoLeech\PostDetail\WooCommerce;


use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\PostDetail\Base\BasePostDetailTester;
use KDNAutoLeech\Utils;

class WooCommerceTester extends BasePostDetailTester {

    /** @var WooCommerceData */
    private $wooData;

    /**
     * Create tester view. This view will be shown in the test results in the Tester page. The view can be created
     * by using {@link Utils::view()} method. If the view is outside of the plugin, it can be created using a custom
     * implementation of {@link Utils::view()}. In that case, check the source code of the method. Variables available
     * for the general post test result view are available for this view as well. See {@link GeneralPostTest::createView()}
     * for available variables. '$detailData' variable that is the data for this factory will be injected to the view.
     * '$postData' variable that is an instance of {@link PostData} and can be used to reach main post data will also
     * be injected to the view.
     *
     * @return null|\Illuminate\Contracts\View\View Not-rendered blade view
     * @since 1.8.0
     */
    protected function createTesterView() {
        return Utils::view('post-detail.woocommerce.tester.main')->with([
            'tableData' => $this->createTableData()
        ]);
    }

    /*
     *
     */

    /**
     * Creates the variables that will be shown in a table.
     *
     * @return array A key-value pair array. Main keys are the section names. Under each main key is a key-value pair
     *               array. In this array, keys are names of the data, and the values are their content. See the method
     *               to understand the structure.
     * @since 1.8.0
     */
    private function createTableData() {
        $variables = [];

        /** @var WooCommerceData $wooData */
        $wooData = $this->getDetailData();
        $this->wooData = $wooData;

        // Main
        $variables[_kdn('Main')] = [
            _kdn('Product URL')       => $wooData->getProductUrl(),
            _kdn('Button Text')       => $wooData->getButtonText(),
            _kdn('Sale Price')        => $wooData->getSalePrice(),
            _kdn('Regular Price')     => $wooData->getRegularPrice(),
            _kdn('Product Type')      => $this->getProductTypeName(),
            _kdn('Virtual?')          => (bool)$wooData->isVirtual(),
            _kdn('Downloadable?')     => (bool)$wooData->isDownloadable(),
        ];

        // Downloads
        if ($wooData->isDownloadable()) {
            $variables[_kdn('Downloads')] = [
                _kdn('Downloadable File URLs') => $this->getDownloadableFileUrls(),
                _kdn('Download Limit')         => $wooData->getDownloadLimit(),
                _kdn('Download Expiry')        => $wooData->getDownloadExpiry(),
            ];
        }

        // Inventory.
        $variables[_kdn('Inventory')] = [
            _kdn('SKU')                => $wooData->getSku(),
            _kdn('Manage stock?')      => (bool)$wooData->isManageStock(),
            _kdn('Stock Quantity')     => $wooData->getStockQuantity(),
            _kdn('Backorders')         => $this->getBackorders(),
            _kdn('Low Stock Amount')   => $wooData->getLowStockAmount(),
            _kdn('Stock Status')       => $this->getStockStatus(),
            _kdn('Sold individually?') => (bool)$wooData->isSoldIndividually(),
        ];

        // Shipping. It is only available for non-virtual products.
        if (!$wooData->isVirtual()) {
            $variables[_kdn('Shipping')] = [
                _kdn('Weight')         => $wooData->getWeight(),
                _kdn('Length')         => $wooData->getLength(),
                _kdn('Width')          => $wooData->getWidth(),
                _kdn('Height')         => $wooData->getHeight(),
                _kdn('Shipping Class') => $this->getShippingClass(),
            ];
        }

        // Attributes
        $variables[_kdn('Attributes')] = $this->getAttributes();

        // Advanced
        $variables[_kdn('Advanced')] = [
            _kdn('Purchase Note')   => $wooData->getPurchaseNote(),
            _kdn('Enable reviews?') => (bool)$wooData->isEnableReviews(),
            _kdn('Menu Order')      => $wooData->getMenuOrder(),
        ];

        return $variables;
    }

    /**
     * Prepares the selected product type's name
     *
     * @return string
     * @since 1.8.0
     */
    private function getProductTypeName() {
        $result = WooCommerceSettings::getProductTypeOptionsForSelect()[$this->wooData->getProductType() ?: 'simple'];
        return is_array($result) ? $result['name'] : $result;
    }

    /**
     * Prepares downloadable file URLs for presentation.
     *
     * @return array|null
     * @since 1.8.0
     */
    private function getDownloadableFileUrls() {
        if (!$this->wooData->getDownloadableMediaFiles()) return null;

        return array_map(function($mediaFile) {
            /** @var MediaFile $mediaFile */

            return Utils::view('site-tester.partial.attachment-item')
                ->with(['item' => $mediaFile])
                ->render();
        }, $this->wooData->getDownloadableMediaFiles());
    }

    /**
     * Prepares backorders for presentation.
     *
     * @return null|string
     * @since 1.8.0
     */
    private function getBackorders() {
        $bo = $this->wooData->getBackorders();
        $options = WooCommerceSettings::getBackorderOptionsForSelect();

        return Utils::array_get($options, $bo, null);
    }

    /**
     * Prepares stock status for presentation.
     *
     * @return null|string
     * @since 1.8.0
     */
    private function getStockStatus() {
        $ss = $this->wooData->getStockStatus();
        if (!$ss) return null;

        $options = WooCommerceSettings::getStockStatusOptionsForSelect();

        return Utils::array_get($options, $ss, null);
    }

    /**
     * Prepares shipping class name for presentation
     *
     * @return string
     * @since 1.8.0
     */
    private function getShippingClass() {
        $classId = $this->wooData->getShippingClassId();
        $classTerm = get_terms([
            'taxonomy' => 'product_shipping_class',
            'include' => $classId,
            'number' => 1,
            'hide_empty' => false,
        ]);

        if (is_wp_error($classTerm) || !$classTerm) return _kdn('No shipping class');
        if (is_array($classTerm)) $classTerm = $classTerm[0];

        /** @var \WP_Term $classTerm */
        return $classTerm->name;
    }

    /**
     * Prepares attributes for presentation.
     *
     * @return array
     * @since 1.8.0
     */
    private function getAttributes() {
        // If there is no attribute no need to show anything.
        if (!$this->wooData->getAttributes()) return ['-' => '-'];

        $result = [];
        foreach($this->wooData->getAttributes() as $attrData) {
            $name    = Utils::array_get($attrData, 'name');
            $options = Utils::array_get($attrData, 'value');

            $result[$name] = $options;
        }

        return $result;
    }
}