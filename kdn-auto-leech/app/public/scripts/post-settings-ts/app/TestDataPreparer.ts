import {Notifier} from "../../common-ts/Notifier";
import {PostSettingsVariables} from "./PostSettingsVariables";
import {Utils} from "../../common-ts/Utils";

export class TestDataPreparer {

    private static INSTANCE: TestDataPreparer = null;

    /**
     * This class is a singleton. Get the instance with this method.
     */
    public static getInstance() {
        if (this.INSTANCE === null) this.INSTANCE = new TestDataPreparer();
        return this.INSTANCE;
    }

    private notifier: Notifier;
    private psv: PostSettingsVariables;

    private constructor() {
        this.notifier = Notifier.getInstance();
        this.psv = PostSettingsVariables.getInstance();

        /**
         * Stores the latest clicked options box button. If this is not null, then the options box for this button is currently
         * open.
         * @type {null|Object|jQuery}
         */
        window.$lastClickedOptionsBoxButton = null;
    }

    /**
     * Prepares the data that will be sent with the AJAX request when conducting tests
     *
     * @param {Object} $testButton The test button that is clicked
     * @returns {null|object}
     */
    prepareTestData($testButton: any) {
        // Get the required data from the test button.
        let mData = $testButton.data("kdn");

        // Do not proceed if the data does not exist.
        if(mData == undefined || !mData) return null;

        // Clone the object.
        let data = JSON.parse(JSON.stringify(mData));

        data = this.addSettingsToAjaxData(data);

        // Get the inputs (textarea, button, select, and input elements) with name
        let $inputs = $testButton.closest(".input-group").find(':input[name]');
        if(!$inputs.length) return null;

        /*
         * REQUIRED ELEMENTS
         */

        // Get the required element selectors, if there are any
        let allSelectorsRequired = true,
            requiredElExpr = mData["requiredSelectors"];

        if(requiredElExpr != undefined) {
            // If required element selectors are supplied, that means not all of the "Selector"s in the data are required.
            allSelectorsRequired = false;

            // If there are required selectors, get their values and notify the user
            if(requiredElExpr.length) {
                // First, we need to prepare the expression string. Here is an example expression string
                // (.sel1 | ( .sel2 & .sel7 ) ) & ( .sel2 | .sel3) & .sel5 &#sel4

                // Append and prepend a space as well.
                requiredElExpr = " " + requiredElExpr
                    .replace(/([()&|])/g, " $1 ") // First surround every special char, such as ( ) &, with space
                    .replace(/\s{2,}/g, " ") // And get rid of multiple spaces.
                    .replace(/\&/g, '&&') // Replace single & with &&
                    .replace(/\|/g, '||') // Replace single | with ||
                    .trim() + " "
                ;

                // Now, get the selectors
                let selectorMatches = requiredElExpr.match(/([#\[\]=\^~.a-z0-9_\-"']+)\s?/g);

                let evalStr = requiredElExpr,
                    currentSelector, $el, valueExists, requiredEls = [];

                for(let i in selectorMatches) {
                    if(!selectorMatches.hasOwnProperty(i)) continue;

                    currentSelector = selectorMatches[i].trim();
                    if(!currentSelector.length) continue;

                    //l("Current selector");
                    //l(currentSelector);

                    $el = $(currentSelector).first();

                    //l("Escaped selector:");
                    //l(escapeRegExp(currentSelector));

                    valueExists = $el.length && $el.val() != undefined && (<string>$el.val()).length;
                    if(!valueExists && $el.length) requiredEls.push($el);

                    evalStr = evalStr.replace(
                        new RegExp(this.escapeRegExp(currentSelector) + "\\s", "g"),
                        valueExists ? 'true ' : 'false '
                    );
                }

                // If the evaluation is false and there are required elements, notify the user for a required element.
                if(!eval(evalStr) && requiredEls.length) {
                    let max = requiredEls.length - 1,
                        min = 0;

                    this.notifier.notify(requiredEls[Math.floor(Math.random() * (max - min + 1)) + min], undefined);
                    return null;
                }
            }
        }

        /*
         *
         */

        // If there are selectors in the data, get the values from those elements whose selectors are defined in the data
        for(let key in data) {
            // Make sure the key ends with "Selector".
            if(!data.hasOwnProperty(key) || !/Selector$/.test(key)) continue;

            // Find the target element
            let $targetEl = $(data[key]);

            // If all selectors are required and this element's value is empty, notify the user and return null.
            if(allSelectorsRequired && ($targetEl.val() == undefined || !(<string>$targetEl.val()).length)) {
                this.notifier.notify($targetEl, undefined);
                return null;
            }

            // Remove the selector value from the data, since we do not need it.
            delete data[key];

            if(!$targetEl.length) continue;

            // Add the key with its value to the data to be sent by removing "Selector" from the key.
            if ($targetEl.length === 1) {
                data[key.replace("Selector", "")] = $targetEl.val() || null;
            }
        }

        // If there are extra selectors in the data, get the values for those and add them to the data
        if (data.hasOwnProperty('extra')) {
            let extra = data.extra;

            let extraPrepared: any = {};
            let item, val: any;
            for (let key in extra) {
                if (!extra.hasOwnProperty(key)) continue;
                item = extra[key];

                // The item must have 'selector' and 'data' keys, where the selector is the target element's selector and
                // the data is the data key under which the data is stored in the element whose selector is given.
                if (!item.hasOwnProperty('selector') || !item.hasOwnProperty('data')) continue;
                val = $(item.selector).data(item.data);

                if (val !== null && val !== undefined && val !== 'undefined') {
                    extraPrepared[key] = val;
                }
            }


            // If there are extra data, add them under 'extra' key to the data
            if (!$.isEmptyObject(extraPrepared)) {
                data.extra = extraPrepared;

                // Otherwise, remove the 'extra'
            } else {
                delete data['extra'];
            }
        }

        // If the options box is currently open, add the options to the request.
        if (window.$lastClickedOptionsBoxButton !== null) {
            data["optionsBox"] = window.$lastClickedOptionsBoxButton.find(':input').first().val();

            // Put an indicator that the test is conducted in the options box
            data["fromOptionsBox"] = 1;
        }

        // Get the values that should be tested from the inputs next to current test button
        data["serializedValues"] = $inputs.serialize();

        // Add name of the form item that is being tested. Get the chars until the first opening bracket.
        let rawName = $inputs.first().attr("name");
        data["formItemName"] = /^([^\[]+)/.exec(rawName)[1] || null;

        // Some form items, such as the form items in Options Box, have a name such as '_options_box[find_replace]'
        // and the names of the inputs under this name are like '_options_box[find_replace][0][find]' and
        // '_options_box[find_replace][0][replace]'. In this case, the sent data is structured as:
        //      {_options_box: {find_replace: {find: 'find value', replace: 'replace value'}}}
        // However, in the backend, it is considered that there are no inner arrays. So, the backend expects to find:
        //      [_options_box => ['find' => 'find value', 'replace' => 'replace value']]
        // But, it gets:
        //      [_options_box => ['find_replace' => ['find' => 'find value', 'replace' => 'replace value']]]
        // which results in an error, since it uses the sent 'formItemName' value to find the values. Here, the
        // 'formItemName' is '_options_box'. So, the backend gets:
        //      ['find_replace' => ['find' => 'find value', 'replace' => 'replace value']]
        // as the test data. However, it should get:
        //      ['find' => 'find value', 'replace' => 'replace value']
        // So, here, we send the path of the inner array under 'formItemDotKey'. It basically sends, for this case,
        // 'find_replace' as the path. So, the backend can get what it needs. If the name of the form item is, e.g.:
        //      _options_box[find_replace][test][mest][cool][0][replace]
        // the 'formItemDotKey' will be 'find_replace.test.mest.cool'. Here, we basically find '[find_replace][test][mest][cool]'
        // part, and turn it into dot notation. The used regular expression and test values and results are below:
        //
        // Regex: ^[^\[]+([^0-9]+)
        //
        // Test string: _options_box[find_replace][test][mest][cool][0][replace]
        // $1 is: [find_replace][test][mest][cool][
        //
        // Test string: _options_box[0][find]
        // $1 is: [
        let part = /^[^\[]+([^0-9]+)/.exec(rawName)[1] || '';
        if (part.length > 1) {
            // Turn it into dot notation and get rid of unnecessary brackets
            part = part.substr(1, part.length - 2).replace('][', '.').replace('[', '').replace(']', '');

            // Add it to the data
            data["formItemDotKey"] = part;
        }

        // Add the required data if this is a "find-replace in custom meta" test
        data = this.addDataForFindReplaceInCustomMetaOrShortCodeTest($testButton, data);

        //l("Prepared:");
        //l(data);

        return data;
    }

    /**
     * Adds required settings to the data that will be sent via AJAX.
     * @param data
     * @returns {*}
     */
    addSettingsToAjaxData(data: any) {
        // First, add raw HTML find-and-replaces.
        data = this.addManipulationOptionsToAjaxData(data);

        // Add cookie settings
        let $cookies = $(this.psv.selectorTabMain).find('label[for=' + this.psv.inputNameCookies + ']').closest('tr').find('.inputs') || null;
        if ($cookies !== null && $cookies.length) {
            data['cookies'] = $cookies.find(':input').serialize();
        }

        // Add caching setting
        let $checkboxCache = $(this.psv.selectorTabMain).find('input[name="_cache_test_url_responses"]') || null;
        if ($checkboxCache !== null && $checkboxCache.length) {
            data['cacheTestUrlResponses'] = (<any>$checkboxCache[0]).checked ? 1 : 0;
        }

        // If there is "use custom settings" checkbox
        let $useCustomSettingsCheckbox = $("#_do_not_use_general_settings") || null;
        let useCustomGeneralSettings = false;
        if ($useCustomSettingsCheckbox !== null) {

            // If the user wants to use custom general settings
            if($useCustomSettingsCheckbox.length && (<any>$useCustomSettingsCheckbox[0]).checked) {
                // Add all general settings
                data["customGeneralSettings"] = $(this.psv.selectorTabGeneralSettings).find(':input').serialize();
                useCustomGeneralSettings = true;

            } else {
                data["customGeneralSettings"] = undefined;
            }
        }

        // Add whether the user wants to use UTF-8 or not to the data
        let $useUtf8Checkbox = $("#_kdn_make_sure_encoding_utf8") || null;
        if ($useUtf8Checkbox !== null && $useUtf8Checkbox.length && useCustomGeneralSettings) {
            data["useUtf8"] = (<any>$useUtf8Checkbox.first()[0]).checked ? 1 : 0;

            let $convertEncodingCheckbox = $("#_kdn_convert_charset_to_utf8") || null;
            data["convertEncodingToUtf8"] = Utils.getCheckboxValue($convertEncodingCheckbox) ? 1 : 0;
        } else {
            data["useUtf8"] = -1;
            data["convertEncodingToUtf8"] = -1;
        }

        return data;
    }

    /**
     * Adds find-and-replace options for the raw HTML response to the AJAX data.
     * @param data The data in which find-and-replaces to be added
     */
    addManipulationOptionsToAjaxData(data: any) {
        // First, we need to find out whether the user tests the category or the post settings.
        // We can do this by checking the current tab. In the current tab, we need to find find-and-replace options for
        // raw HTML.

        let $activeTab = $('div.tab:not(.hidden)'),
            activeTabId = $activeTab.attr('id').replace('tab-', '');

        // If this is the templates tab, use manipulation options from the post tab.
        if (activeTabId.toLowerCase() === 'templates') {
            $activeTab = $(this.psv.selectorTabPost);
        }

        let nameMatchRegex = /[^\\[]+/;
        let results: any = {};
        let currentInputName, $input, $inputs, actualName;
        for (let i = 0; i < this.psv.baseHtmlManipulationInputNames.length; i++) {
            currentInputName = this.psv.baseHtmlManipulationInputNames[i];

            // Get a single input
            $input = $activeTab.find('input[name*="' + currentInputName + '"]').first();

            // Get all inputs for the input name
            $inputs = $input.closest(".inputs").find(':input');

            // If there is no input, continue.
            if ($inputs.length < 1) continue;

            // Get actual name of the input
            actualName = $input.attr("name").match(nameMatchRegex)[0];

            // Serialize inputs and add them to the data under their actual name
            results[actualName] = $inputs.serialize();
        }

        data["manipulation_options"] = results;

        return data;
    }

    /**
     * Add data to the original test data for find-replace in custom meta and custom short code test
     *
     * @param {object} $testButton The test button that is clicked to perform the test
     * @param {array} data Original data to which the new data will be added
     * @return {array} Data with the data for find replace in custom meta test
     */
    addDataForFindReplaceInCustomMetaOrShortCodeTest($testButton: any, data: any) {
        let clsCustomMeta = "kdn-test-find-replace-in-custom-meta",
            clsCustomShortCode = "kdn-test-find-replace-in-custom-short-code";

        // If the test button is not the test button we are looking for, do not proceed and just return the original data.
        if(!$testButton.hasClass(clsCustomMeta) && !$testButton.hasClass(clsCustomShortCode)) return data;

        let isCustomMeta = $testButton.hasClass(clsCustomMeta),
            targetInputSelector = '.' + (isCustomMeta ? 'meta-key' : 'short-code'),
            targetInputGroupSelector = '.' + (isCustomMeta ? 'selector-custom-post-meta' : 'selector-custom-shortcode');

        // Get the meta key for which the user wants to perform find and replace operation
        let $keyInput = $testButton.closest(".input-group").find('.input-container').find(targetInputSelector);

        // If meta key input does not exist, no need to go on. Return the original data.
        if(!$keyInput.length) return data;

        // Get the meta key
        let key = $keyInput.val();
        if(key == undefined || !key.length) return data;

        let found = false;

        // There are two possible places the user can define custom meta keys. One of them can be defined by CSS selectors
        // and the other one by manually. We'll handle both of the cases below. We just need one value. So, if a value
        // is found, that's it. We're done.

        // Find meta key inputs defined in selector custom post meta options
        $('.input-group' + targetInputGroupSelector + ' ' + targetInputSelector).each(function() {
            if(found) return;

            let $self = $(this);
            if($self.val() == key) {
                // Get the selector and its attribute
                let $cssSelectorInput = $self.closest('.input-group').find('.css-selector'),
                    $cssSelectorAttrInput = $self.closest('.input-group').find('.css-selector-attr'),
                    $optionsBoxInput = $self.closest('.input-group').find('[name*="[options_box]"]'),
                    cssSelector: any = $cssSelectorInput.val(),
                    attr: any = $cssSelectorAttrInput.val(),
                    optionsBoxData = $optionsBoxInput.length ? $optionsBoxInput.val() : undefined;

                // If there is a CSS selector, we've reached our goal.
                if(cssSelector != undefined && cssSelector.length) {
                    // Add the selector to the data
                    data["valueSelector"] = cssSelector;

                    if(attr != undefined && attr.length) {
                        data["valueSelectorAttr"] = attr;
                    }

                    // If there are options for the target input group, add them as well
                    if (optionsBoxData !== undefined) {
                        data["valueOptionsBoxData"] = optionsBoxData;
                    }

                    // Mark it as found
                    found = true;
                }
            }
        });

        // If the selector could not be found, try custom post meta options.
        if(!found) {
            if(isCustomMeta) {
                $('.input-group.custom-post-meta .meta-key').each(function () {
                    if (found) return;

                    let $self = $(this);
                    if ($self.val() == key) {
                        let $valueInput = $self.closest('.input-group').find('input[type=text]:not(.meta-key)'),
                            value: any = $valueInput.val();

                        if (value != undefined && value.length) {
                            data["subject"] = value;

                            // Mark it as found
                            found = true;
                        }
                    }
                });
            }
        }

        return data;
    }

    /**
     * Escapes special regex chars
     *
     * @param str
     * @returns {*}
     * @see http://stackoverflow.com/a/1144788/2883487
     */
    escapeRegExp(str: string) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

}