import $ from 'jquery';
import {TabBase} from "../base/TabBase";
import {OptionsBox} from "../../OptionsBox";
import {EventType} from "../../../../common-ts/EventType";

export class ImportExportTab extends TabBase {

    constructor() {
        super('importExport', 'tab-options-box-import-export', '#2196f3');

        // Update the export textarea when the import/export tab is activated.
        $(document).on(EventType.optionsBoxTabActivated, (e, tabId) => {
            if (tabId === this.tabId) {
                this.updateExportTextArea();
            }
        });

        // Import the settings when the import button is clicked
        $(this.getVariables().optionsBoxSelector).on('click', this.getVariables().selectorImportSettingsButton, (e) => {
            // Import the given settings and update the export text area
            this.importSettings();
            this.updateExportTextArea();

            // Flash the background of the import text area
            flashBackground($(this.getVariables().selectorImportTextarea));
        });
    }

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state: any, settings: any) {

    }

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        return {};
    }

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state: any): number {
        return 0;
    }

    /*
     *
     */

    /**
     * Imports the settings input to the import textarea
     */
    importSettings() {
        let $importTextarea = $(this.getVariables().selectorImportTextarea);
        let val: string = $importTextarea.val().toString();

        // Stop if the value is not valid.
        if (val === undefined || val === null || val === 'undefined' || !val.length) return;

        // Update the state value in the input
        OptionsBox.getInstance().getOptionsBoxInput().val(val);

        // Restore the state with the new version.
        OptionsBox.getInstance().restoreState();

        // Clear the text area's value
        $importTextarea.val("");
    }

    /**
     * Updates export text area with the current options box settings
     */
    updateExportTextArea() {
        // Update the state
        OptionsBox.getInstance().saveState();

        // Get the state's string representation
        let stateStr = OptionsBox.getInstance().getOptionsBoxInput().val();

        // Put the string representation into the export text area
        $(this.getVariables().selectorExportTextarea).val(stateStr);
    }
}