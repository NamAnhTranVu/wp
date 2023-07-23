import {TabBase} from "./TabBase";

export abstract class FindReplaceTabBase extends TabBase {

    protected abstract getKeyFindReplaces(): string;

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state: any, settings: any) {
        let $settingsContainer = this.getSettingsContainer();

        this.restoreMultipleInputValues($settingsContainer, state, this.getKeyFindReplaces(),
            ($currentInputGroup1, value) => this.setInputGroupValues($currentInputGroup1, value.find, value.replace, value.hasOwnProperty("regex"))
        );
    }

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();

        // The values are under the name of the input. So, first, get the values.
        // Then, remove empty find-replace items from the values array.
        state = this.filterMultipleInputState(state, this.getKeyFindReplaces(), (val: any) => {
            return val.find.length || val.replace.length;
        });

        return state;
    }

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state: any): number {
        return (state[this.getKeyFindReplaces()] || []).length;
    }

    /*
     *
     */

    /**
     * Sets the values to the find-replace input group
     * @param {*|jQuery|HTMLElement} $inputGroup
     * @param {string} find
     * @param {string} replace
     * @param {boolean} regex
     */
    setInputGroupValues($inputGroup: any, find: string, replace: string, regex: boolean) {
        $inputGroup.find('input[name$="[regex]"]').prop('checked', regex);
        $inputGroup.find('input[name$="[find]"]').val(find);
        $inputGroup.find('input[name$="[replace]"]').val(replace);
    }

}