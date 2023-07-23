import {Utils} from "../../common-ts/Utils";
import {CopyToClipboardHandler} from "../../common-ts/CopyToClipboardHandler";

export class CustomShortCodeHandler {

    private static instance: CustomShortCodeHandler = null;

    private inputNameCustomShortCodes = '_post_custom_content_shortcode_selectors';
    private customShortCodeButtonContainerSelector = '.custom-short-code-container';

    /**
     * Get the instance
     * @return {CustomShortCodeHandler}
     */
    public static getInstance(): CustomShortCodeHandler {
        if (this.instance === null) this.instance = new CustomShortCodeHandler();
        return this.instance;
    }

    /** This is a singleton. */
    private constructor() {
        // Update the containers once.
        this.updateCustomShortCodeButtonContainers();

        // Listen to changes made to the custom short codes inputs if they exist
        let $customShortCodeInputContainer = this.getCustomShortCodeInputContainer();
        if ($customShortCodeInputContainer === null) return;

        $customShortCodeInputContainer.on('change', 'input[name$="[short_code]"]', () => this.updateCustomShortCodeButtonContainers());
    }

    /**
     * Updates the custom short code button containers with the custom short code buttons
     */
    private updateCustomShortCodeButtonContainers() {
        let $buttonContainers = $(this.customShortCodeButtonContainerSelector) || null;
        if ($buttonContainers === null || !$buttonContainers.length) return;

        const $buttonContainer = this.getCustomShortCodeButtons() || null;
        const buttonsExist = $buttonContainer !== null && $buttonContainer.length;

        let $el;
        $buttonContainers.each((i, el) => {
            $el = $(el);

            $el.html('');

            if (buttonsExist) $el.append($buttonContainer.clone());
        });

        let selector = this.customShortCodeButtonContainerSelector + ' button';

        // Init the tooltip for the clipboard elements
        Utils.initTooltipForSelector(selector);

        // Init "copy to clipboard" for the buttons
        CopyToClipboardHandler.getInstance().initForSelector(selector);
    }

    /**
     * Get custom short code buttons as a list of jQuery elements
     */
    private getCustomShortCodeButtons(): JQuery<HTMLElement> {
        let $container = this.getCustomShortCodeInputContainer();
        if ($container === null) return null;

        // Find short code names
        let names: any = [], name: any;
        $container.find('input[name*="[short_code]"]').each((i, el) => {
            name = $(el).val() || null;
            if (name === null || !name.length) return;

            names.push(name);
        });

        // Create the buttons
        /*
            <button class="button"
                    data-shortcode-name="{{ $button->getCode() }}"
                    data-clipboard-text="{{ $button->getCodeWithBrackets() }}"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="{{ $button->getDescription() }}">
                {{ $button->getCodeWithBrackets() }}
            </button>
         */

        let $buttonContainer: JQuery<HTMLElement> = $('<div/>'), withBrackets, $button;
        for(let name of names) {
            withBrackets = '[' + name + ']';
            $button = $('<button/>')
                .addClass('button')
                .attr('type', 'button')
                .attr('data-shortcode-name', name)
                .attr('data-clipboard-text', withBrackets)
                .attr('data-toggle', 'tooltip')
                .attr('data-placement', 'top')
                .attr('title', window.kdn.custom_short_code + ': ' + name)
                .html(withBrackets);

            $buttonContainer.append($button);
        }

        return $buttonContainer;
    }

    /**
     * Get the input container that contains all custom short code inputs
     */
    private getCustomShortCodeInputContainer() {
        let $anInput = $('input[name^="' + this.inputNameCustomShortCodes + '"]').first() || null;
        if ($anInput === null || !$anInput.length) return null;

        // Find the container
        let $container = $anInput.closest('.inputs') || null;

        return $container !== null && $container.length ? $container : null;
    }

}