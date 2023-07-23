import {WooCommerceSettingsVariables} from "./WooCommerceSettingsVariables";
import {DependantHandler} from "../../common-ts/DependantHandler";

export class WooCommerceSettings {

    private static INSTANCE: WooCommerceSettings = null;

    /**
     * This class is a singleton. Get the instance with this method.
     */
    public static getInstance() {
        if (this.INSTANCE === null) this.INSTANCE = new WooCommerceSettings();
        return this.INSTANCE;
    }

    private wcsv: WooCommerceSettingsVariables;

    private constructor() {
        // Do nothing if the WooCommerce settings are not available.
        if (!WooCommerceSettings.isWooCommerceSettingsAvailable()) return;

        this.wcsv = WooCommerceSettingsVariables.getInstance();

        // Handle URL hash after the document is ready, because the hash should have been set and ready.
        $(document).ready((e) => this.handleURLHash());

        // Handle tabs
        this.wcsv.$settingsContainer.on('click', '.tab-wrapper li > a', (e) => this.onClickTab(e));

        // Handle product type selection
        $(document).on('change', this.wcsv.selectorSelectProductType, (e) => this.onChangeProductTypeSelect(e));
    }

    /**
     * Manages product type selection changes
     * @param e
     */
    private onChangeProductTypeSelect(e: JQuery.Event) {
        let $target = $(e.target);

        // If the selected type is 'external'
        if ($target.val() == 'external') {
            // Uncheck 'virtual' and 'downloadable' checkboxes
            let $cbVirtual = $(this.wcsv.selectorCheckboxVirtual) || null;
            let $cbDownloadable = $(this.wcsv.selectorCheckboxDownloadable) || null;

            let checkboxes = [$cbVirtual, $cbDownloadable];
            for(let $cb of checkboxes) {
                // If the checkbox does not exist, continue with another one.
                if ($cb === null || !$cb.length) continue;

                // Uncheck the checkbox.
                (<any>$cb[0]).checked = false;

                // Trigger change event for the checkboxes so that their dependants can be handled.
                $cb.trigger('change');
            }
        }

        // Handle the dependants
        DependantHandler.getInstance().handleSelectDependants($target);
    }

    /**
     * @return True if WooCommerce options are available in the page.
     */
    static isWooCommerceSettingsAvailable(): boolean {
        return $("#woocommerce-options-container").length > 0;
    }

    /**
     * Handles clicks to the tabs of WooCommerce settings
     * @param e
     */
    onClickTab(e: any) {
        e.preventDefault();

        // Get the closest anchor tag, because the click event may be triggered for an element inside the anchor tag
        let $self = $(e.target).closest('a');
        this.activateTab($self.data("tab"));
    }

    /**
     * Activate a tab of WooCommerce settings.
     * @param tabSelector Selector of the tab.
     */
    activateTab(tabSelector: string) {
        let $tab = this.wcsv.$tabContainer.find('[data-tab="' + tabSelector + '"]');
        if(!$tab.length) return;

        // First deactivate all tabs
        this.wcsv.$contentContainer.find(".tab-content").addClass("hidden");
        this.wcsv.$tabContainer.find("li").removeClass("active");

        // Now activate the selected tab
        let elementId = $tab.data("tab");

        $(elementId).removeClass("hidden");
        $tab.closest('li').addClass("active");

        // Change window hash. We separate the hashes with pipe "|".
        let hash = window.location.hash.split("|");

        // Active WooCommerce tab is stored in 1st index.
        hash[1] = elementId;
        history.replaceState(undefined, undefined, hash.join("|"));
    }

    /**
     * Handles URL hash changes. E.g. activates tabs.
     */
    handleURLHash() {
        let hash = window.location.hash;

        if(hash && hash.indexOf("#_") === 0) {
            let hashArr = hash.split("|");

            if (hashArr.length > 1) {
                let tabHash = hashArr[1];
                this. activateTab(tabHash);
            }
        }

    }

}