export class InputGroupAdder {

    private static INSTANCE: InputGroupAdder = null;

    private static modifiers: Array<{($newInputGroup: JQuery<HTMLElement>): void}> = [];

    public static getInstance() {
        if (this.INSTANCE === null) this.INSTANCE = new InputGroupAdder();
        return this.INSTANCE;
    }

    private constructor() {}

    /**
     * Adds a new input group to an input group container
     * @param $inputGroupContainer
     * @return New input group
     */
    addNewInputGroup($inputGroupContainer: any) {

        // Create a clone of the input group
        let $inputGroup = $inputGroupContainer.find(".input-group").first().clone();

        /*
         HANDLE THE DATA KEY
         */

        // First, find max data key
        let maxDataKey = 0;
        $inputGroupContainer.find('.input-group').each(function() {
            let $self = $(this);
            if($self.data("key") != undefined && $self.data("key") > maxDataKey) {
                maxDataKey = $self.data("key");
            }
        });

        // Hold current data key
        let currentDataKey = $inputGroup.data("key");
        let newDataKey = maxDataKey + 1;

        // Set the new data key
        $inputGroup.attr("data-key", newDataKey);   // This will update the HTML.
        $inputGroup.data("key", newDataKey);        // This makes the actual change.

        let html = $inputGroup.html();
        $inputGroup.html(html.replace(new RegExp("\\[" + currentDataKey + "\\]", "g"), "[" + newDataKey + "]"));

        /* END DATA KEY */

        // Remove the values of the inputs
        $inputGroup.find("input").each(function() {
            $(this).val("");
        });

        $inputGroup.find("textarea").each(function () {
            $(this).html("");
        });

        $inputGroup.find("input[type=checkbox]").each(function() {
            $(this).prop('checked', false);
        });

        // Call the modifiers
        for(let modifier of InputGroupAdder.modifiers) {
            modifier($inputGroup);
        }

        // Append it to the container
        $inputGroupContainer.append($inputGroup);

        // Check for tooltip and initialize it
        if(typeof $.fn.tooltip === 'function')
            $inputGroup.find('[data-toggle="tooltip"]').tooltip();

        // Check if there is an options box button and revert it to its default
        $inputGroup.find('.kdn-options-box').each(function() {
            let $self = $(this);
            $self.removeClass('has-config');

            if(typeof $.fn.tooltip === 'function')
                $self.tooltip('destroy');
        });

        return $inputGroup;
    }

    /**
     * Register an input group modifier that will be called just before a new input group is added.
     * @param callback
     */
    public registerModifier(callback: {($newInputGroup: JQuery<HTMLElement>): void}) {
        InputGroupAdder.modifiers.push(callback);
    }
}