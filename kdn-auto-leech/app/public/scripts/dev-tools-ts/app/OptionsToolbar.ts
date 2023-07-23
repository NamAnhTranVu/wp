import {dtv, iframeHandler, devTools} from "../dev-tools";

export class OptionsToolbar {

    public targetHTMLTagSelector: any = null;

    /**
     * Change handler for target HTML tag input
     * @param {object} e Event
     */
    onChangeTargetHTMLTagInput(e: any) {
        let val: any = $(dtv.optTargetHTMLTagSelector).val();

        // If there is no value, set the target HTML selector as null.
        if(val == undefined || !val.length) {
            this.targetHTMLTagSelector = null;
            return;
        }

        // Otherwise, get the part until space and trim it to clear any whitespace.
        this.targetHTMLTagSelector = $.trim(val.split(" ")[0]);
    }

    /**
     * Callback handling the click events on toggle hover select button
     * @param {object} e Event
     */
    onClickToggleHoverSelect(e: any) {
        let $optionButton = $(dtv.optHoverSelectSelector).first();
        $optionButton.toggleClass("active");

        // Activate/deactivate hover select in the iframe
        iframeHandler.activateHoverSelect($optionButton.hasClass("active"));

        // Save options
        devTools.saveState();
    }

    /**
     * Check if hover select is active
     * @returns {boolean|*}
     */
    isHoverSelectActive() {
        let $optionButton = $(dtv.optHoverSelectSelector).first();
        return $optionButton.hasClass("active");
    }

    /**
     * Check if "apply manipulation options" is active
     * @returns {*}
     */
    isApplyManipulationOptions() {
        return (<any>$(dtv.optApplyManipulationOptionsSelector)[0]).checked;
    }

    /**
     * Check if "use immediately" is active
     * @returns {*}
     */
    isUseImmediately() {
        return (<any>$(dtv.optUseImmediatelySelector)[0]).checked;
    }

    /**
     * Check if scripts should be removed
     * @returns {*}
     */
    isRemoveScripts() {
        return (<any>$(dtv.optRemoveScriptsSelector)[0]).checked;
    }

    /**
     * Check if styles should be removed
     * @returns {*}
     */
    isRemoveStyles() {
        return (<any>$(dtv.optRemoveStylesSelector)[0]).checked;
    }
}