/**
 * Dependants are HTML elements whose visibility is dependent on a certain element. For example, if an element needs to
 * be shown when a checkbox is checked, that element is dependant on the checkbox's value. The dependencies are given
 * in "data-dependants" attribute of the element whose value changes trigger the visibility of other elements. The
 * dependencies should be given as a string array that is JSON-encoded, in which each item is a selector. E.g.
 * [".target-element", "!#another-target"] is a JSON-encoded array. This means the elements having 'target-element'
 * class should be shown and the element whose ID is "another-target" must be hidden. This value is added as the value
 * of "data-dependants" attribute of the checkbox so that when the checkbox's value is changed, the dependants are
 * retrieved from the checkbox.
 *
 * @since 1.8.0
 */
export class DependantHandler {

    private static instance: DependantHandler = null;

    /**
     * Get the instance
     * @return {DependantHandler}
     */
    public static getInstance(): DependantHandler {
        if (this.instance === null) this.instance = new DependantHandler();
        return this.instance;
    }

    /** This is a singleton. */
    private constructor() {}

    /**
     * Handles showing/hiding checkbox dependents
     * @param $checkbox Checkbox element
     */
    public handleCheckboxDependants($checkbox: any) {
        let isChecked = $checkbox.is(":checked");
        this.handleDependants($checkbox, isChecked);
    }

    /**
     * Handles showing/hiding a select element's selected option's dependants
     * @param $select Select element
     */
    public handleSelectDependants($select: any) {
        // Get previously selected value
        let prevVal = $select.data('prev') || null;
        let currentVal = $select.val();

        // Find the option whose value is the current val
        let $currentOption = $select.find('option[value="' + currentVal + '"]').first();
        let $prevOption = prevVal !== null && prevVal.length ? $select.find('option[value="' + prevVal + '"]').first() : null;

        // If there is a previous value, reverse its dependants.
        if ($prevOption !== null) this.handleDependants($prevOption, false);

        // Handle the dependants of the current value.
        this.handleDependants($currentOption, true);

        // Store the current value as previous so that when there is a change in the selected value, we can reverse the
        // dependants.
        $select.data('prev', currentVal);
    }

    /**
     * Handles showing/hiding dependants of an element. The dependants should be given in "data-dependants", as an
     * array of selectors.
     *
     * @param $el
     * @param {boolean} reverse If false, reverse of the dependants will be applied.
     */
    public handleDependants($el: any, reverse: boolean) {
        // Get the dependants
        let dependants = $el.data("dependants") || null;

        // If there is no dependant, stop.
        if(dependants === null || !dependants) return;

        let $dependant,
            isNegative,
            selector,
            i;

        for(i = 0; i < dependants.length; i++) {
            // Get whether the selector is negated or not.
            isNegative = this.startsWith(dependants[i], "!");
            selector = dependants[i];

            // If the selector is negative, remove negation "!" from the beginning of the string to get the selector.
            if (isNegative) selector = selector.substring(1);

            // Get the dependant element
            $dependant = $(selector);

            // If the reverse of the dependants should be applied
            if (reverse) {
                // If the selector is negative, hide the dependant.
                if (isNegative) {
                    $dependant.addClass("hidden");

                // Otherwise, show it.
                } else {
                    $dependant.removeClass("hidden");
                }

            // Otherwise
            } else {
                // If the selector is negative, show the dependant.
                if (isNegative) {
                    $dependant.removeClass("hidden");

                // Otherwise, hide it.
                } else {
                    $dependant.addClass("hidden");
                }
            }

        }
    }

    /**
     * Checks if a string (haystack) starts with something (needle)
     * @param {string} haystack
     * @param {string} needle
     * @return {boolean}
     */
    private startsWith(haystack: string, needle: string): boolean {
        return haystack.lastIndexOf(needle, 0) === 0;
    }

}