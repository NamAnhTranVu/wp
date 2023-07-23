export class Utils {

    /**
     * Checks if a string (haystack) starts with something (needle)
     * @param haystack
     * @param needle
     * @return {boolean}
     */
    static startsWith(haystack: any, needle: any) {
        return haystack.lastIndexOf(needle, 0) === 0;
    }

    /**
     * Escapes HTML.
     * @param {string} unsafe
     * @see https://stackoverflow.com/a/6234804/2883487
     */
    static escapeHtml(unsafe: string) {
        if (unsafe === undefined || unsafe === 'undefined' || unsafe === null) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * Shows the specified title as the element's tooltip, and then changes the tooltip to its original value.
     * Hence, the user will see the original title when the tooltip is shown next time.
     * @param $element
     * @param flashTitle
     */
    static flashTooltip($element: any, flashTitle: any) {
        let originalTitle = $element.attr("data-original-title");
        $element
            .attr('data-original-title', flashTitle)
            .tooltip('fixTitle')
            .tooltip('show')
            // Set the original title but do not show it. The user will see the original title at next hover
            .attr('data-original-title', originalTitle)
            .tooltip('fixTitle');
    }

    /**
     * Initialize tooltip elements for a selector.
     * @param {string} selector Selector of the element that has 'data-toggle="tooltip"' attribute
     */
    static initTooltipForSelector(selector: string) {
        if(typeof $.fn.tooltip == 'function')
            $(selector + '[data-toggle="tooltip"]').tooltip()
    }

    /**
     * Get the value of a checkbox.
     * @param {JQuery|null|undefined} $checkboxElement
     */
    static getCheckboxValue($checkboxElement: any): boolean {
        $checkboxElement = $checkboxElement || null;
        if ($checkboxElement === null || !$checkboxElement.length) return false;

        return !!(<any>$checkboxElement[0]).checked;
    }

}