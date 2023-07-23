import {Utils} from "./Utils";

export class CopyToClipboardHandler {

    private static instance: CopyToClipboardHandler = null;

    /**
     * Get the instance
     * @return {CopyToClipboardHandler}
     */
    public static getInstance(): CopyToClipboardHandler {
        if (this.instance === null) this.instance = new CopyToClipboardHandler();
        return this.instance;
    }

    /** This is a singleton. */
    private constructor() {}

    /**
     * Initialize "copy to clipboard" for the elements with selector
     *
     * @param {string} selector Selector for which the clipboard will be initialized
     */
    public initForSelector(selector: string) {
        // No need to initialize the clipboard if the elements we need do not exist in the page.
        if(!$(selector).length) return;

        let clipboard = new window.Clipboard(selector);

        /**
         * Inform the user that the button's code is copied or not copied
         * @param $checkbox
         */
        clipboard.on('success', (e: any) => {
            Utils.flashTooltip($(e.trigger), window.kdn.copied);
            e.clearSelection();
        });

        /**
         * When there is an error, the text becomes selected. Hence, the user can just use a shortcut to copy the text
         */
        clipboard.on('error', (e: any) => {
            let os = navigator.platform;
            let shortcut = os.indexOf("Mac") != -1 ? "⌘-C" : "Ctrl + C";
            Utils.flashTooltip($(e.trigger), window.kdn.press_to_copy.format(shortcut));
        });

    }
}