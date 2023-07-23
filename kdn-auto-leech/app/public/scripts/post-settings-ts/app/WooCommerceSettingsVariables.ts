export class WooCommerceSettingsVariables {

    private static INSTANCE: WooCommerceSettingsVariables = null;

    /**
     * This class is a singleton. Get the instance with this method.
     */
    public static getInstance() {
        if (this.INSTANCE === null) this.INSTANCE = new WooCommerceSettingsVariables();
        return this.INSTANCE;
    }

    public selectorSettingsWrapper = '.woocommerce-settings-wrapper';
    public selectorTabContentWrapper = this.selectorSettingsWrapper + ' > .tab-content-wrapper';
    public $settingsContainer = $(this.selectorSettingsWrapper);
    public $tabContainer = $(this.selectorSettingsWrapper + ' > .tab-wrapper');
    public $contentContainer = $(this.selectorTabContentWrapper);
    public selectorSelectProductType = '#_wc_product_type';
    public selectorCheckboxVirtual = '#_wc_virtual';
    public selectorCheckboxDownloadable = '#_wc_downloadable';

    private constructor() { }

}