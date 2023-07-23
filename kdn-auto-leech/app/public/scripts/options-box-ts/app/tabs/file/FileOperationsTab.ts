import {TabBase} from "../base/TabBase";

export class FileOperationsTab extends TabBase {

    private keyMove: string = 'move';
    private keyCopy: string = 'copy';

    constructor() {
        super('fileOperations', 'tab-options-box-file-operations', '#fffd00');
    }

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state: any, settings: any): void {
        let $settingsContainer = this.getSettingsContainer();

        let callback = ($currentInputGroup: JQuery<HTMLElement>, value: any) => {
            $currentInputGroup.find('input').first().val(value['path'] || '');
        };

        this.restoreMultipleInputValues($settingsContainer, state, this.keyCopy, callback);
        this.restoreMultipleInputValues($settingsContainer, state, this.keyMove, callback);
    }

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState(): any {
        let state = this.getInputValuesAsObject();

        let callback = (val: any) => {
            return (val['path'] || []).length;
        };

        state = this.filterMultipleInputState(state, this.keyCopy, callback);
        state = this.filterMultipleInputState(state, this.keyMove, callback);

        return state;
    }

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state: any): number {
        let total = 0;
        total += (state[this.keyCopy] || []).length;
        total += (state[this.keyMove] || []).length;

        return total;
    }

}