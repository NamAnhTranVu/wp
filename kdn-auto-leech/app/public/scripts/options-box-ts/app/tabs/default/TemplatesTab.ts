import {TabBase} from "../base/TabBase";

export class TemplatesTab extends TabBase {

    private keyRemoveIfEmpty: string = 'remove_if_empty';
    private keyTemplates: string = 'templates';

    constructor() {
        super('templates', 'tab-options-box-templates', '#00FF00');
    }

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state: any, settings: any) {
        let $settingsContainer = this.getSettingsContainer();
        this.setCheckboxValue($settingsContainer, this.keyRemoveIfEmpty, state);

        this.restoreMultipleInputValues($settingsContainer, state, this.keyTemplates,
            ($currentInputGroup1, value) => this.setInputGroupValues($currentInputGroup1, value));

        // Apply the settings
        this.applySettings(settings);
    }

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();

        // The values are under the name of the input. So, first, get the values.
        // Then, remove empty items from the values array.
        state = this.filterMultipleInputState(state, this.keyTemplates, (val: any) => {
            return (val['template'] || []).length;
        });

        return state;
    }

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state: any): number {
        let total = 0;

        total += (state[this.keyTemplates] || []).length;
        if (state.hasOwnProperty(this.keyRemoveIfEmpty)) total += 1;

        return total;
    }

    /*
     *
     */

    /**
     * Sets the values to the templates input group
     * @param {*|jQuery|HTMLElement} $inputGroup
     * @param {string} template
     */
    setInputGroupValues($inputGroup: any, template: any) {
        $inputGroup.find('textarea[name$="[template]"]').val(template['template']);
    }

    /**
     * Applies the settings
     * @param settings
     */
    applySettings(settings: any) {
        const $buttons = this.getShortCodeButtons();
        const config = settings || [];
        const allowedShortCodes: Array<string> = config['allowedShortCodes'] || null;

        // If allowed short codes are not defined, show all short codes.
        if (allowedShortCodes === null) {
            $buttons.removeClass('hidden');

        // Otherwise, show only the necessary ones.
        } else {
            $buttons.addClass('hidden');
            // Create a CSS selector that selects all to-be-shown short code buttons
            // [data-name="short-code-name-1"], [data-name="short-code-name-2"], [data-name="short-code-name-3"]
            const selector = allowedShortCodes.map(key => ('[data-shortcode-name="' + key + '"]')).join(', ');

            // Show them
            this.getTabContainer().find(selector).removeClass('hidden');
        }
    }

    /**
     * Get short code buttons
     */
    getShortCodeButtons() {
        return this.getTabContainer().find('.short-code-container button');
    }
}