import {TabBase} from "../base/TabBase";

export class CalculationsTab extends TabBase {

    public keyDecimalSeparatorAfter: string = 'decimal_separator_after';
    public keyUseThousandsSeparator: string = 'use_thousands_separator';
    public keyRemoveIfNotNumeric: string = 'remove_if_not_numeric';
    public keyPrecision: string = 'precision';
    public keyFormulas: string = 'formulas';

    constructor() {
        super('calculations', 'tab-options-box-calculations', '#FFFF00');
    }

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state: any, settings: any) {
        let $settingsContainer = this.getSettingsContainer();

        // Set the values for inputs
        this.setSelectValue($settingsContainer, this.keyDecimalSeparatorAfter, state);
        this.setInputValue($settingsContainer, this.keyPrecision, state);
        this.setCheckboxValue($settingsContainer, this.keyUseThousandsSeparator, state);
        this.setCheckboxValue($settingsContainer, this.keyRemoveIfNotNumeric, state);

        this.restoreMultipleInputValues($settingsContainer, state, this.keyFormulas, ($currentInputGroup, value) => {
            $currentInputGroup.find('input[name$="[formula]"]').first().val(value['formula'] || '');
        });
    }

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();

        // Clear empty values from the calculations array
        state[this.keyFormulas] = state[this.keyFormulas].filter((v: any) => {
            return (v['formula'] || []).length;
        });

        return state;
    }

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state: any): number {
        let total = 0;

        total += (state[this.keyFormulas] || []).length;
        if (state.hasOwnProperty(this.keyRemoveIfNotNumeric)) total += 1;

        return total;
    }
    
}
