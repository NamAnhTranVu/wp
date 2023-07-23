import {TabBase} from "../base/TabBase";

export class GeneralTab extends TabBase {

    private keyTreatAsJson: string = 'treat_as_json';

    constructor() {
        super('general', 'tab-options-box-general', '#FF7F00');
    }

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state: any, settings: any) {
        let $settingsContainer = this.getSettingsContainer();
        this.setCheckboxValue($settingsContainer, this.keyTreatAsJson, state);
    }

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        return this.getInputValuesAsObject();
    }

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state: any): number {
        let total = 0;

        if (state.hasOwnProperty(this.keyTreatAsJson)) total += 1;

        return total;
    }

}