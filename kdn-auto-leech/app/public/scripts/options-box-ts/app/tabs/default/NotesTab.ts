import {TabBase} from "../base/TabBase";

export class NotesTab extends TabBase {

    private keyNote = 'note';

    constructor() {
        super('notes', 'tab-options-box-notes', '#0000FF');
    }

    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state: any, settings: any): void {
        this.setNoteValue(state[this.keyNote] || '');
    }

    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState(): any {
        let state = this.getInputValuesAsObject();

        state[this.keyNote] = state[this.keyNote] || '';

        return state;
    }

    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state: any): number {
        let value = 0;

        if ((state[this.keyNote] || []).length) value += 1;
        return value;
    }

    /*
     *
     */

    /**
     * Sets the note
     * @param {string} txt
     */
    setNoteValue(txt: string) {
        let $note = this.getTabContainer().find('textarea[name$="[note]"]').first() || null;
        if ($note === null || !$note.length) return;

        $note.val(txt);
    }

}