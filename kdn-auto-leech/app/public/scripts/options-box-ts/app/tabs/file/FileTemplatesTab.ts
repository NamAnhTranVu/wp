import {TabBase} from "../base/TabBase";

export class FileTemplatesTab extends TabBase {

    private keyName         = 'templates_file_name';
    private keyTitle        = 'templates_media_title';
    private keyDescription  = 'templates_media_description';
    private keyCaption      = 'templates_media_caption';
    private keyAlt          = 'templates_media_alt_text';

    private selectorAllTemplates = 'tr.file-template';

    private static allKeys: string[] = null;

    constructor() {
        super('fileTemplates', 'tab-options-box-file-templates', '#00ff1c');
    }

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state: any, settings: any): void {
        let $settingsContainer = this.getSettingsContainer();

        for(let key of this.getAllKeys()) {
            this.restoreMultipleInputValues($settingsContainer, state, key, ($currentInputGroup, value) => {
                $currentInputGroup.find('textarea[name$="[template]"]').val(value['template']);
            });
        }

        // Apply the settings
        this.applySettings(settings);
    }

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState(): any {
        let state = this.getInputValuesAsObject();

        for(let key of this.getAllKeys()) {
            // The values are under the name of the input. So, first, get the values.
            // Then, remove empty items from the values array.
            state = this.filterMultipleInputState(state, key, (val: any) => {
                return (val['template'] || []).length;
            });
        }

        return state;
    }

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state: any): number {
        let allKeys: any = this.getAllKeys();
        // Return the total number of input count
        return allKeys.reduce((accumulator: number, currentValue: string): number => {
            return accumulator + (state[currentValue] || []).length;
        }, 0);
    }

    /*
     *
     */

    /**
     * Applies the settings
     * @param settings
     */
    applySettings(settings: any) {
        const config = settings || [];
        const allowedTemplateTypes = config['allowedTemplateTypes'] || null;

        let $tabContainer = this.getTabContainer();

        // If the media templates should be hidden, hide them.
        if (allowedTemplateTypes !== null && allowedTemplateTypes.length) {
            // Hide all templates first
            $tabContainer.find(this.selectorAllTemplates).addClass('hidden');

            // Show the ones that are allowed
            for(let id of allowedTemplateTypes) {
                $tabContainer.find('tr#' + id).removeClass('hidden');
            }

        } else {
            // Otherwise, make sure all of them are shown.
            $tabContainer.find(this.selectorAllTemplates).removeClass('hidden');
        }
    }

    /**
     * Get all keys for the template options of this tab
     */
    private getAllKeys(): string[] {
        if (FileTemplatesTab.allKeys === null) {
            FileTemplatesTab.allKeys = [this.keyName, this.keyTitle, this.keyDescription, this.keyCaption, this.keyAlt];
        }

        return FileTemplatesTab.allKeys;
    }

}