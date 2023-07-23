import {OptionsBoxVariables} from "../../OptionsBoxVariables";

export abstract class TabBase {

    private readonly _stateKey: string;
    private readonly _tabId: string;
    private readonly _color: string;

    protected constructor(stateKey: string, tabId: string, color: string) {
        this._stateKey = stateKey;
        this._tabId = tabId;
        this._color = color;
    }

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    public abstract restoreState(state: any, settings: any): void

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    public abstract saveState(): any

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    public abstract getConfiguredOptionCount(state: any): number;

    get stateKey(): string {
        return this._stateKey;
    }

    get tabId(): string {
        return this._tabId;
    }

    get color(): string {
        return this._color;
    }

    /*
     *
     */

    /**
     * @param {jQuery|HTMLElement} $settingsContainer
     * @param key
     * @param settings
     */
    setSelectValue($settingsContainer: any, key: string, settings: any) {
        this._setInputValue($settingsContainer, key, settings,
            // Reset the value
            ($input: any) => {
                $input.val($input.find('option').first().val());
            },

            // Set the value
            ($input: any, value: string) => {
                $input.val(value);
            }
        );
    }

    /**
     * Sets the value of an input given its key under which the value is stored in the settings
     *
     * @param {jQuery|HTMLElement} $settingsContainer
     * @param {string} key
     * @param {array} settings  Calculation tab's state. In this array, the value of the input is stored under given
     *                          key
     */
    setInputValue($settingsContainer: any, key: string, settings: any) {
        this._setInputValue($settingsContainer, key, settings,
            // Reset the value
            ($input: any) => {
                $input.val("");
            },

            // Set the value
            ($input: any, value: string) => {
                $input.val(value);
            }
        );
    }

    /**
     * Sets the value of a checkbox given its key under which the value is stored in the settings
     *
     * @param {jQuery|HTMLElement} $settingsContainer
     * @param {string} key
     * @param {array} settings  Calculation tab's state. In this array, the value of the input is stored under given
     *                          key
     */
    setCheckboxValue($settingsContainer: any, key: string, settings: any) {
        this._setInputValue($settingsContainer, key, settings,
            // Reset the value
            ($input: any) => {
                $input.prop("checked", false);
            },

            // Set the value
            ($input: any, value: string) => {
                $input.prop("checked", true);
            }
        );
    }

    /**
     * Sets the value of an input given its key under which the value is stored in the settings
     *
     * @param {jQuery|HTMLElement} $settingsContainer
     * @param {string} key
     * @param {array} settings  Calculation tab's state. In this array, the value of the input is stored under given
     *                          key
     * @param {function} resetValueCallback Used to reset the input value. E.g. function($foundInput) {}
     * @param {function} setValueCallback Used to set the input value. E.g. function($foundInput, value) {}
     */
    _setInputValue($settingsContainer: any, key: string, settings: any, resetValueCallback: any, setValueCallback: any) {
        // l("Set input value for " + key);
        let $input = this.getSettingInputWithPartialName($settingsContainer, key);
        if ($input === null) return;

        let value = settings[key] || null;
        if (value === null) {
            // l("Clear the value");
            resetValueCallback($input);
        } else {
            // l("Set input value as " + value);
            setValueCallback($input, value);
        }
    }

    /**
     * Finds an input given its partial name.
     *
     * @param {jQuery|HTMLElement} $settingsContainer The container that stores the target input
     * @param {string} partialName Partial name of the target input
     * @return {null|jQuery|HTMLElement}
     */
    getSettingInputWithPartialName($settingsContainer: any, partialName: string) {
        let $input = $settingsContainer.find('[name$="[' + partialName + ']"]');
        return !$input.length ? null : $input;
    }

    /**
     * Clears all input groups in an input container, leaves just one whose values will be cleared as well.
     */
    clearInputsInContainer($container: any) {
        $container.find('.kdn-remove').each((i: number, el: HTMLElement) => {
            $(el).click();
        });
    }

    /**
     * Adds a new input group to the container by clicking "add new" button. So, the given container must contain
     * an "add new" button.
     * @param $container
     * @return {*|jQuery|HTMLElement} Last added input group
     */
    addInputGroupToContainer($container: any) {
        $container.find('.kdn-add-new').click();
        return $container.find('.inputs > .input-group:last-child');
    }

    /**
     * Get the first input group in an input group container
     * @param $container
     * @return {*|jQuery|HTMLElement} First input group in the container
     */
    getFirstInputGroupInContainer($container: any) {
        return $container.find('.inputs > .input-group:first-child');
    }

    /**
     * Get options box variables.
     */
    protected getVariables(): OptionsBoxVariables {
        return OptionsBoxVariables.getInstance();
    }

    /**
     * Get the container that stores this tab's content
     */
    protected getTabContainer() {
        return $('#' + this.tabId);
    }

    /**
     * Get settings container for this tab.
     */
    protected getSettingsContainer() {
        return this.getTabContainer().find('.kdn-settings').first();
    }

    /**
     * Get the values of the inputs defined for this tab as an object.
     */
    protected getInputValuesAsObject() {
        // Get the input values in the tab container
        let obj = this.getTabContainer().find(':input').serializeObjectNoNull() || {};

        // Extract the items under the main input name. The inputs in the tab content must be defined under
        // '_options_box' ( the defined input name). E.g. if an option's name should be 'templates', its name must be
        // '_options_box[templates]' for this to work.
        return obj[this.getVariables().inputName] || {};
    }

    /**
     * Restore the state for a multiple form item.
     *
     * @param {jQuery} $settingsContainer   The container in which the input group for the given key will be searched for.
     * @param {object} state                The state from which the values for the key will be extracted.
     * @param {string} key                  The key to be used when extracting values from the state.
     * @param {function} callback           A function that will be called to assign values in the newly input group, i.e.
     *                                      restore the state.
     */
    protected restoreMultipleInputValues($settingsContainer: JQuery<HTMLElement>, state: any, key: string,
                                         callback: {($currentInputGroup: JQuery<HTMLElement>, value: any): void}) {
        // Find the input container
        let $inputGroupContainer = $settingsContainer
            .find('[name^="' + this.getVariables().inputName + '[' + key + ']"]')
            .closest('td') || null;
        if ($inputGroupContainer === null || !$inputGroupContainer.length) return;

        // Clear the inputs in the container
        this.clearInputsInContainer($inputGroupContainer);

        // Get the values
        let values = state[key] || null;
        if (values === null || !values.length) return;

        // Restore the state for each item.
        let current, $currentInputGroup, isFirst = true;
        let len = values.length;
        for(let i = 0; i < len; i++) {
            current = values[i] || null;
            if (current === null) continue;

            // If this is the first item, no need to create an input group, since it already exists.
            if (isFirst) {
                $currentInputGroup = this.getFirstInputGroupInContainer($inputGroupContainer);
                isFirst = false;

                // Otherwise, add a new input group.
            } else {
                $currentInputGroup = this.addInputGroupToContainer($inputGroupContainer);
            }

            // Set the values
            callback($currentInputGroup, current);
        }
    }

    /**
     * Filter a multiple input value
     *
     * @param {object} state        The state from which the values to be filtered will be retrieved
     * @param {string} key          The key using which the values will be retrieved from the state
     * @param {function} callback   A callback that returns true if the value is valid.
     * @return {object} state The state filtered for the value
     */
    protected filterMultipleInputState(state: any, key: string, callback: {(val: any): boolean}) {
        state[key] = (state[key] || []).filter((val: any) => {
            return callback(val);
        });

        return state;
    }
}
