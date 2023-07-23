import {Notifier} from "../../common-ts/Notifier";
import {TestDataPreparer} from "./TestDataPreparer";
import {InputGroupAdder} from "../../common-ts/InputGroupAdder";
import {PostSettingsVariables} from "./PostSettingsVariables";
import {WooCommerceSettings} from "./WooCommerceSettings";
import {NotificationType} from "../../common-ts/enum/NotificationType";
import {SectionNavigation} from "../../common-ts/SectionNavigation";
import {Utils} from "../../common-ts/Utils";
import {CopyToClipboardHandler} from "../../common-ts/CopyToClipboardHandler";
import {CustomShortCodeHandler} from "./CustomShortCodeHandler";
import {DependantHandler} from "../../common-ts/DependantHandler";
import {NotificationPosition} from "../../common-ts/enum/NotificationPosition";
import {EventType} from "../../common-ts/EventType";

export class PostSettings {

    private static INSTANCE: PostSettings = null;

    /**
     * This class is a singleton. Get the instance with this method.
     */
    public static getInstance() {
        if (!this.INSTANCE) this.INSTANCE = new PostSettings();
        return this.INSTANCE;
    }

    private notifier: Notifier;
    private testDataPreparer: TestDataPreparer;
    private inputGroupAdder: InputGroupAdder;
    private psv: PostSettingsVariables;

    private fixedElements: JQuery<HTMLElement>[] = [];
    private isFixTabs: boolean;
    private isFixContentNavigation: boolean;
    private $activeTabContainer: JQuery<HTMLElement> = undefined;
    private $activeTabFixables: any = undefined;
    private docWidth: number|null = null;
    private adminBarHeight: number|null = null;

    private constructor() {
        this.notifier = Notifier.getInstance();
        this.testDataPreparer = TestDataPreparer.getInstance();
        this.inputGroupAdder = InputGroupAdder.getInstance();
        this.psv = PostSettingsVariables.getInstance();

        /*
            INITIALIZE EVERYTHING
         */

        this.getAdminBarHeightIfFixed();

        this.initSettingsPageOptions();
        this.maybeInitTinyMceEditors();
        this.initTooltip();
        SectionNavigation.getInstance().initNavigations();
        CustomShortCodeHandler.getInstance();

        // If there is a hash for a tab, activate that tab.
        this.restoreURLHash();
        this.handleURLHash();

        // Listen to hash changes and react to them.
        $(window).on('hashchange', e => this.handleURLHash());

        // Add an input group to its container.
        this.psv.$containerMetaBox.on('click', '.kdn-add-new', (e) => this.onClickAddNew(e));

        // Remove an input group.
        this.psv.$containerMetaBox.on('click', '.kdn-remove', (e) => this.onClickRemove(e));

        // React to tests
        this.psv.$containerMetaBox.on('click', this.psv.selectorTestButton, (e) => this.onClickTest(e));

        // Hide test result content container
        $(document).on('click', '.hide-test-results', e => this.onClickHideTestResults(e));

        // Load/refresh translation languages
        this.psv.$containerMetaBox.on('click', this.psv.selectorLoadTranslationLanguages, (e) => this.onLoadRefreshTranslationLanguages(e));

        // Handle tabs
        this.psv.$containerTabs.on('click', 'a', (e) => this.onClickTab(e));

        // Show/hide labels
        this.psv.$containerMetaBox.on('click', '.info-button', (e) => this.onClickInfoButton(e));

        // Show/hide dependants of "list type" checkbox
        this.psv.$containerMetaBox.on("change", "input[type=checkbox]", (e) => {
            DependantHandler.getInstance().handleCheckboxDependants($(e.target));
        });

        // Trigger change on checkboxes when the page is ready
        this.psv.$containerMetaBox.find("input[type=checkbox], select").each((i, el) => {
            DependantHandler.getInstance().handleCheckboxDependants($(el));
        });

        // Trigger change on selects when the page is ready
        this.psv.$containerMetaBox.find("select").each((i, el) => {
            DependantHandler.getInstance().handleSelectDependants($(el));
        });

        // Toggle info texts
        this.psv.$containerMetaBox.on("click", ".toggle-info-texts", (e) => this.onClickToggleInfoTexts(e));

        /*
            COPY TO CLIPBOARD
        */

        // Initialize the clipboard
        if(typeof window.Clipboard == 'function') {
            $(document).ready(() => this.initCopyToClipboard());
        }

        // Prevent default action for the buttons used for copying texts.
        this.psv.$containerMetaBox.on('click', '.input-button-container > button', (e) => e.preventDefault());

        /*
            END COPY TO CLIPBOARD
         */

        // Load/clear general settings when its button is clicked
        $(document).on('click', this.psv.selectorLoadGeneralSettingsButton, (e) => this.handleLoadClearGeneralSettings(e));
        $(document).on('click', this.psv.selectorClearGeneralSettingsButton, (e) => this.handleLoadClearGeneralSettings(e));

        // Prepare sortable elements
        if(typeof window.jQuery.ui != 'undefined' && typeof $.fn.sortable == 'function') {
            $(document).ready(() => this.prepareSortables());
        }

        // Select the code for exporting settings
        $('textarea[readonly="readonly"]').focus((e) => this.onFocusReadonlyTextArea(e));

        // Validate the form before submitting
        this.psv.$form.on('submit', (e) => this.onSubmitForm(e));

        // Activate the tab that was active before saving the settings
        $(document).ready(() => this.activatePreviouslyActiveTab());

        // Show unmodified results
        $(document).on('click', this.psv.selectorButtonSeeUnmodifiedTestResults, (e) => this.onClickSeeUnmodifiedResults(e));

        // Invalidate caches for test URL
        $(document).on('click', this.psv.selectorInvalidateCacheButton, (e) => this.onClickInvalidateTestUrlCache(e));

        // Invalidate all test URL caches
        $(document).on('click', this.psv.selectorInvalidateAllCachesButton, (e) => this.onClickInvalidateAllTestUrlCaches(e));

        // Handle category selection changes in category map
        $(document).on('change', this.psv.selectorCategoryMap + ' select', (e) => this.onChangeCategory(e));

        // Quick save when a quick save button is clicked or enter key is pressed for a text input of the settings.
        $(document).on('click', this.psv.selectorQuickSaveButton, (e) => this.quickSave(e));
        this.psv.$containerMetaBox.on('keydown', 'input, select', (e) => {
            let key = e.which || e.keyCode;
            if (key !== 13) {
                return;
            }

            this.quickSave(e)
        });

        // Fix the things to be fixed when the page is scrolled down
        $(document).on('scroll', (e) => this.handleElementFixing());

        // React to resize events
        $(window).on('resize', (e) => this.onResize(e));

        // When a postbox's column is changed or it is collapsed/expanded, trigger the resize function since positions
        // of some elements might have been changed.
        $(document).on('postbox-toggled postboxes-columnchange', (e) => this.onResize(e));

        // Register input group modifiers.
        this.inputGroupAdder.registerModifier($inputGroup => {
            // If this is a new category map input
            if ($inputGroup.hasClass('category-map')) {
                // Initialize the select element
                this.setCategoryTaxonomyNameForSelect($inputGroup.find('select'));
            }
        });

        // Invalidate active tab fixables when the navigations are initialized. Active tab fixables contain the
        // navigations.
        $(document).on(EventType.navigationsInitialized, () => this.invalidateActiveTabFixablesCache());

        // Init WooCommerce options
        WooCommerceSettings.getInstance();
    }

    /**
     * Initializes settings page options
     */
    private initSettingsPageOptions() {
        this.isFixTabs = Utils.getCheckboxValue($(this.psv.selectorCheckboxFixTabs));
        this.isFixContentNavigation = Utils.getCheckboxValue($(this.psv.selectorCheckboxFixContentNavigation));

        $(document).on('change', this.psv.selectorCheckboxFixTabs, (e) => {
            this.isFixTabs = Utils.getCheckboxValue($(e.target));
            this.resetFixableElements();
        });

        $(document).on('change', this.psv.selectorCheckboxFixContentNavigation, (e) => {
            this.isFixContentNavigation = Utils.getCheckboxValue($(e.target));
            this.resetFixableElements();
        });
    }

    /**
     * Reacts to resize events
     * @param e
     */
    private onResize(e: JQuery.Event) {
        // Reset the fixable elements.
        this.resetFixableElements();

        // Reset the previous scroll top positions of the tabs
        this.resetPrevScrollPositionCacheOfTabs();

        // Invalidate the width since it might have been changed
        this.invalidateDocWidthCache();

        // Invalidate the admin bar height cache since the height of it might have been changed.
        this.invalidateAdminBarHeightCache();
    }

    /**
     * Resets fixable elements and tries to fix the elements that need to be fixed.
     */
    private resetFixableElements() {
        let $el: JQuery<HTMLElement>;
        $(this.psv.selectorFixable).each((i: number, el: HTMLElement) => {
            $el = $(el);
            this.resetOffsetOfFixable($el);
            this.setElementUnfixed($el);
        });

        this.psv.$containerMetaBox.css('padding-top', '0');
        this.handleElementFixing();
    }

    /**
     * Fixes the elements that need to be fixed
     */
    private handleElementFixing() {
        // If there is nothing to fix, stop.
        if (!this.isFixTabs && !this.isFixContentNavigation) return;

        // If the width of the page is less than a certain threshold, do not fix anything to keep the usable window area
        // big enough to see everything easily.
        if (this.getDocWidth() <= 600) return;

        let top = this.getScrollTop();
        let baseFixCondition = top + this.getAdminBarHeightIfFixed();
        let tabContainerFixCondition = 0;

        // Fix tabs
        if (this.isFixTabs) {
            let tabContainerTop = this.getTopOffsetOfTargetFixable(this.psv.$containerTabs);
            let marginTop = 8;

            tabContainerFixCondition = baseFixCondition + marginTop;
            if (tabContainerFixCondition >= tabContainerTop) {
                this.setElementFixed(this.psv.$containerTabs);

            // Unfix tabs if they are fixed
            } else {
                this.setElementUnfixed(this.psv.$containerTabs);
            }
        }

        // Fix the fixables inside the current tab container
        if (this.isFixContentNavigation) {
            let $currentTabFixables = this.getActiveTabFixables();
            if ($currentTabFixables === null || !$currentTabFixables.length) return;

            let $fixableEl, elTop;
            let tabContainerHeight = this.isFixTabs ? this.psv.$containerTabs.height() : 0;
            let contentNavFixCondition = (this.isFixTabs ? tabContainerFixCondition + tabContainerHeight : baseFixCondition) - 11;

            $currentTabFixables.each((i: number, el: HTMLElement) => {
                $fixableEl = $(el);
                elTop = this.getTopOffsetOfTargetFixable($fixableEl);

                if (contentNavFixCondition >= elTop) {
                    this.setElementFixed($fixableEl, true);

                // Unfix the element if it is fixed
                } else {
                    this.setElementUnfixed($fixableEl, true);
                }
            });
        }
    }

    /**
     * Get the top offset of the original fixable element. This returns the top offset of the element's original location,
     * which is the location that is not fixed. This caches the original element's top offset.
     * @param $element The fixable element
     */
    private getTopOffsetOfTargetFixable($element: JQuery<HTMLElement>): number {
        let elOffsetTop = $element.data('offsetTop') || null;
        if (elOffsetTop === null) {
            $element.data('offsetTop', $element.offset().top);
            elOffsetTop = $element.data('offsetTop');
        }

        return elOffsetTop;
    }

    /**
     * Resets the top offset of the fixable element. The offset of the original element is cached in
     * {@link getTopOffsetOfTargetFixable}. This method invalidates that cache.
     * @param $element
     */
    private resetOffsetOfFixable($element: JQuery<HTMLElement>) {
        $element.removeData('offsetTop');
    }

    /**
     * Fixes an element at the top of the page.
     * @param $element The element to be fixed.
     * @param isInTabContent True if the element is in a tab's content container.
     */
    private setElementFixed($element: JQuery<HTMLElement>, isInTabContent: boolean = false) {
        if ($element.hasClass(this.psv.classFixed)) return;

        let index = this.fixedElements.indexOf($element);
        if (index !== -1) return;

        let fixedElTop = null;

        // If there is at least one another fixed element
        if (this.fixedElements.length > 0) {
            // To fix the nav at the bottom of that element, we need that element's top position and height.
            let $lastFixedEl = this.fixedElements[this.fixedElements.length - 1];
            let lastFixedElTop = parseFloat($lastFixedEl.css('top')) || 0;
            fixedElTop = lastFixedElTop + $lastFixedEl.outerHeight();

        } else {
            // Otherwise, since there is always the admin bar fixed at the top, fixed navigation should be added after
            // the admin bar.
            fixedElTop = this.getAdminBarHeightIfFixed();
        }

        this.fixedElements.push($element);
        let $containerMetaBox = this.psv.$containerMetaBox;

        // Get the width of the settings container
        let metaBoxWidth = $containerMetaBox.width();
        let paddingTopValue = (parseFloat($containerMetaBox.css('padding-top')) || 0) + $element.outerHeight();
        if (isInTabContent) paddingTopValue += 12;
        $containerMetaBox.css('padding-top', paddingTopValue + 'px');

        $element
            .data('height', $element.outerHeight())
            .css('width', metaBoxWidth + 'px')
            .addClass(this.psv.classFixed)
            .css('top', fixedElTop);
    }

    /**
     * @return Admin bar height if the admin bar is fixed. Otherwise, returns 0.
     */
    private getAdminBarHeightIfFixed(): number {
        if (this.adminBarHeight === null) {
            this.adminBarHeight = this.psv.$adminBar.css('position').toLocaleLowerCase() === 'fixed' ? this.psv.$adminBar.outerHeight() : 0;
        }

        return this.adminBarHeight;
    }

    /**
     * Invalidates admin bar height cache
     */
    private invalidateAdminBarHeightCache() {
        this.adminBarHeight = null;
    }

    /**
     * Get the width of the document
     */
    private getDocWidth() {
        if (this.docWidth === null) {
            this.docWidth = $(document).width();
        }

        return this.docWidth;
    }

    /**
     * Invalidates the cached document width
     */
    private invalidateDocWidthCache() {
        this.docWidth = null;
    }

    /**
     * Unfixes an element that is fixed at the top of the page using {@link setElementFixed}.
     * @param $element The element to be fixed.
     * @param isInTabContent True if the element is in a tab's content container.
     */
    private setElementUnfixed($element: JQuery<HTMLElement>, isInTabContent = false) {
        if (!$element.hasClass(this.psv.classFixed)) return;

        // Find the index of the element in the fixed elements array
        let index = -1;
        for (let i = 0; i < this.fixedElements.length; i++) {
            if (this.fixedElements[i].get(0) == $element.get(0)) {
                index = i;
                break;
            }
        }

        // No need to continue if the element does not exist in fixed elements array
        if (index === -1) return;

        // Remove the element from fixed elements array
        this.fixedElements.splice(index, 1);

        let $containerMetaBox = this.psv.$containerMetaBox;
        let paddingTopValue = Math.max(0, (parseFloat($containerMetaBox.css('padding-top')) || 0) - $element.data('height'));
        if (isInTabContent) paddingTopValue -= 12;

        $containerMetaBox.css('padding-top', paddingTopValue + 'px');
        $element
            .removeClass(this.psv.classFixed)
            .css('width', '')
            .css('top', '')
            .removeData('height');
    }

    /**
     * Get total height of the elements that are fixed at the top of the page
     * @return number
     */
    public getFixedElementsTotalHeight() {
        return this.fixedElements.reduce((acc: number, $curr: JQuery<HTMLElement>): number => {
            return acc + $curr.outerHeight();
        }, 0);
    }

    /**
     * Handles category selection changes in the category map option
     * @param e
     */
    private onChangeCategory(e: any) {
        let $self = $(e.target);
        this.setCategoryTaxonomyNameForSelect($self);
    }

    /**
     * Sets hidden 'taxonomy' input's value for a category select element.
     * @param $selectEl
     */
    public setCategoryTaxonomyNameForSelect($selectEl: any) {
        // Get the selected option
        let $selectedOption = $selectEl.find(':selected') || null;
        if ($selectedOption === null || !$selectedOption.length) return;

        // Get the taxonomy
        let taxonomy = $selectedOption.data('taxonomy') || null;

        // Find the hidden taxonomy input and set its value as the selected category's taxonomy
        $selectEl.closest('.input-container').find('input.category-taxonomy').val(taxonomy);
    }

    /**
     * Toggles visibility of unmodified results
     * @param e
     */
    private onClickSeeUnmodifiedResults(e: JQuery.Event) {
        let $self = $(e.target);
        let $unmodifiedResults = $self.parent().find('ul').first();

        if ($unmodifiedResults.hasClass('hidden')) {
            $unmodifiedResults.removeClass('hidden');
        } else {
            $unmodifiedResults.addClass('hidden');
        }
    }

    /**
     * Activates the tab that was active before saving the settings
     */
    activatePreviouslyActiveTab() {
        let $input = $(this.psv.selectorInputURLHash);
        if(!$input.length || !$input.first().val()) return;

        let values = (<any>$input.first().val()).split("|");
        if(values.length < 2) return;

        // Last index stores the scroll position
        let scrollPos = values[values.length - 1];

        // Remove the scroll position from URL hash
        values.splice(values.length - 1, 1);
        history.replaceState(undefined, undefined, values.join("|"));

        // Activate the tab and move the page to the previous scroll position
        this.handleURLHash();
        document.documentElement.scrollTop = scrollPos;
    }

    /**
     * Saves the settings via AJAX
     * @param e
     */
    quickSave(e: any) {
        e.preventDefault();

        // Check if import option has values. If so, saving via AJAX is not logical since the page needs to be refreshed
        // to see updated inputs. In that case, click submit button.
        let $importTextArea = $('#_post_import_settings') || null;
        if ($importTextArea !== null && $importTextArea.length) {
            let val: any = $importTextArea.val() || null;
            if (val !== null && val.length) {
                this.psv.$form.find('input[type="submit"]').trigger("click");
                return;
            }
        }

        let $button = $(this.psv.selectorQuickSaveButton);
        if ($button.length > 0) $button = $button.first();

        // Stop if there is a saving process going on.
        if ($button.hasClass('loading')) return;

        // Get the post ID
        let postId = $button.data('post-id') || null;

        // If the post ID does not exist, notify the user and stop.
        if (postId === null || !postId) {
            this.notifier.notifyRegular($button, window.kdn.post_id_not_found, NotificationType.ERROR, NotificationPosition.LEFT);
            return;
        }

        // First, do the things that should be done before the form is submitted.
        if (!this.beforeFormSubmit(e)) {
            // Scroll to top so that the user can see the errors
            $(document).find('html, body').stop().animate({
                scrollTop: 20
            }, 500, 'swing');

            return;
        }

        let serializedFormValues = this.getFormValuesSerialized();

        // If serialized values do not exist, notify the user and stop.
        if (serializedFormValues === null || !serializedFormValues.length) {
            this.notifier.notifyRegular($button, window.kdn.settings_not_retrieved, NotificationType.ERROR, NotificationPosition.LEFT);
            return;
        }

        // Set the button loading
        let successClasses = 'flip';
        let errorClasses = 'shake';
        let loadingClasses = 'bounce infinite loading';
        $button
            .removeClass(successClasses)
            .removeClass(errorClasses)
            .addClass(loadingClasses);

        // Save the form
        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: {
                cmd: "saveSiteSettings",
                postId: postId,
                settings: serializedFormValues,
            }
        })
            .done((response) => {
                let success = response.success;
                let message = response.message;

                if (success) {
                    $button
                        .removeClass(loadingClasses)
                        .addClass(successClasses);
                    this.notifier.notifyRegular($button, window.kdn.settings_saved, NotificationType.SUCCESS, NotificationPosition.LEFT);

                    // Set the export option's value
                    let settingsForExport = response.settingsForExport || null;
                    if (settingsForExport !== null && settingsForExport.length) {
                        let $exportTextArea = $(this.psv.selectorExportSettingsTextArea) || null;
                        if ($exportTextArea !== null) $exportTextArea.val(settingsForExport);
                    }

                } else {
                    // Notify the user
                    this.notifier.notifyRegular($button, message, NotificationType.ERROR, NotificationPosition.LEFT);
                }
            })
            .fail((response) => {
                $button.removeClass(loadingClasses).addClass(errorClasses);

                // Notify the user
                this.notifier.notifyRegular($button, window.kdn.an_error_occurred, NotificationType.ERROR, NotificationPosition.LEFT);
            })
            .always(() => {
                $button.removeClass(loadingClasses)
                ;
            });
    }

    /**
     * Handles form submission
     * @param e
     * @return {boolean} True if the form is valid, otherwise false.
     */
    onSubmitForm(e: any) {
        this.beforeFormSubmit(e);
    }

    /**
     * Handles some things before the form is submitted
     * @param e
     */
    beforeFormSubmit(e: any) {
        let isValid = this.validateForm(e);

        // If there is an optionBox, make sure it is closed to save its state.
        if (typeof window.optionsBox !== 'undefined') {
            window.optionsBox.close();
        }

        // Add current scroll position to hidden active tab input's value
        let $hiddenActiveTabInput = $(this.psv.selectorInputURLHash);
        if($hiddenActiveTabInput.length) {
            // Store current window hash in a hidden input. We will use the hidden input value to restore page's state
            // when the user comes back to the page after saving the settings.
            $hiddenActiveTabInput.val(window.location.hash + "|" + document.documentElement.scrollTop);
        }

        return isValid;
    }

    /**
     * Validate the form
     * @param e The event
     * @return {boolean} True if the form is valid. Otherwise, false.
     */
    validateForm(e: any) {
        // If the import textarea has a value, do not validate.
        let $importInput = $(this.psv.selectorInputImport);
        if($importInput.length && (<any>$importInput.val()).length > 0) {
            this.removeErrorsFromAllTabs();
            return;
        }

        let $categoryMapContainer = $(this.psv.selectorCategoryMap),
            $inputMainUrl         = $("#_main_page_url"),
            $passwordsContainer   = $(this.psv.selectorInputContainerPasswords),
            errorElements: any    = [];

        this.psv.$errorAlert.addClass("hidden");
        let hasError = false;
        this.removeErrorsFromAllTabs();

        // Validate category map
        if($categoryMapContainer.length) {
            // Check if any URL is added more than once
            let urls: any = [];
            let errorCategoryMap = false;

            $categoryMapContainer.find('.input-group').each((i, el) => {
                $(el).removeClass(this.psv.clsHasError);
            });

            $categoryMapContainer.find("input[type=text]").each((i, el) => {
                let $self = $(el);
                if(urls.indexOf($self.val()) == -1) {
                    urls.push($self.val());
                } else {
                    $self.closest(".input-group").addClass(this.psv.clsHasError);
                    if(!errorCategoryMap) errorCategoryMap = true;
                }

                // Check if any category map URL is empty
                if(!(<any>$self.val()).length) {
                    $self.closest(".input-group").addClass(this.psv.clsHasError);
                    if(!errorCategoryMap) errorCategoryMap = true;
                }
            });

            if(errorCategoryMap) {
                hasError = true;

                // Add this among error elements.
                errorElements.push($categoryMapContainer);
            }
        }

        // Validate main url
        if($inputMainUrl.length) {
            $inputMainUrl.closest(".input-group").removeClass(this.psv.clsHasError);
            if(!(<any>$inputMainUrl.val()).length) {
                hasError = true;
                $inputMainUrl.closest(".input-group").addClass(this.psv.clsHasError);

                // Add this among error elements.
                errorElements.push($inputMainUrl);
            }
        }

        // Validate passwords
        if($passwordsContainer.length) {
            let cbChangePassword = $("#_kdn_change_password");

            // If the checkbox required for changing the password is checked, validate the pw fields.
            if(cbChangePassword != undefined && (<any>cbChangePassword[0]).checked) {
                $passwordsContainer.each((i, el) => {
                    $(el).closest(".input-group").removeClass(this.psv.clsHasError);
                });

                let passwordOld: any = null,
                    password1: any = null,
                    password2: any = null;

                $passwordsContainer.find("input[type=password]").each((i, el) => {
                    let $self = $(el);

                    if (passwordOld == null) {
                        passwordOld = true;

                    } else if (password1 == null) {
                        password1 = $self.val();

                    } else if (password2 == null) {
                        password2 = $self.val();

                        if (password1 != password2) {
                            $self.closest(".input-group").addClass(this.psv.clsHasError);
                            password1 = password2 = null;
                            hasError = true;

                            // Add this among error elements.
                            errorElements.push($self);
                        }
                    }
                });
            }
        }

        if(hasError) {
            // Tab errors are not shown for some reason. However, setting them with 1 ms delay works OK.
            setTimeout(() => {
                // Show tab errors
                for(let i in errorElements) {
                    if(!errorElements.hasOwnProperty(i)) continue;
                    this.setTabError(errorElements[i], true);
                }
            }, 1);

            this.psv.$errorAlert.removeClass("hidden");
            e.preventDefault();

            return false;
        }

        return true;
    }

    /**
     * Get form values as a serialized string.
     *
     * @return {string}
     */
    getFormValuesSerialized() {
        // TinyMCE editors' values are not serialized. Get their values and put them into their respective textarea form
        // items.
        let tinymceImpl = ((typeof window.tinymce === "function") ? window.tinymce : window.tinyMCE) || null;
        if (tinymceImpl !== null) {
            let $el, $editorWrapper, name, content, editor;
            $('textarea.wp-editor-area').each((i, el) => {
                $el = $(el);

                // Find the closest TinyMCE wrapper to get if the TinyMCE editor is active. When the HTML editor is active,
                // which is activated by clicking "Text" button, the user directly enters the code to the textarea. In
                // that case, we do not need to get the content from the editor. In fact, when we do that, the editor's
                // previous content is retrieved. In other words, the last changes made by the user to the textarea element
                // are not there. So, when the HTML editor is active, we must do nothing.
                $editorWrapper = $el.closest('.wp-editor-wrap');

                // The editor wrapper is added "html-active" class when the HTML editor is active.
                if ($editorWrapper.hasClass('html-active')) {
                    // We do not need to get the content from the editor. The content is already in the textarea.
                    return;
                }

                name = $el.attr('name');

                editor = tinymceImpl.get(name) || null;
                if (editor === null) return;

                content = editor.getContent();
                $el.val(content);
            });
        }

        // Serialize the form
        return this.psv.$form.serialize() || null;
    }

    /**
     * Set error indicator for a tab
     * @param $element The element which caused an error
     * @param hasError true if the tab should have an error mark, false otherwise
     */
    setTabError($element: any, hasError: any) {
        let tabId = $element.closest('.tab').attr("id");
        let $tab = this.psv.$containerTabs.find("[data-tab='#" + tabId + "']");
        if(!hasError) {
            $tab.removeClass(this.psv.clsHasError);
        } else {
            $tab.addClass(this.psv.clsHasError);
        }
    }

    /**
     * Removes error classes from all tabs
     */
    removeErrorsFromAllTabs() {
        this.psv.$containerTabs.find('.nav-tab').each((i, el) => {
            $(el).removeClass(this.psv.clsHasError);
        });
    }

    /**
     * Handles focus events of read-only textareas
     * @param e
     */
    onFocusReadonlyTextArea(e: any) {
        let $self = $(e.target);
        $self.select();

        // Work around Chrome's little problem
        $self.mouseup(function() {
            // Prevent further mouseup intervention
            $self.unbind("mouseup");
            return false;
        });
    }

    /**
     * Prepares sortable elements. Disables sorting (being moved around) of the meta boxes having not-sortable class.
     * Makes "multiple" inputs sortable
     * @see http://wordpress.stackexchange.com/a/73806/87173
     */
    prepareSortables() {
        $(".meta-box-sortables")
        // define the cancel option of sortable to ignore sortable element
        // for boxes with '.not-sortable' css class
            .sortable('option', 'cancel', '.not-sortable .hndle, :input, button')
            // and then refresh the instance
            .sortable('refresh');

        // Make "multiple" inputs sortable
        $(".inputs").sortable({
            placeholder: "sortable-placeholder",
            handle: '.kdn-sort',
            items: ' > .input-group',
            axis: "y",
            cursor: "move",
            start: function(e: any, ui: any) {
                // Make placeholder's height the same as the current item's height
                ui.placeholder.height(ui.helper.outerHeight());
            },
            update: function(e: any, ui: any) {
                // Update data keys of the inputs when an input group's position is changed. This is required to keep
                // the order of the input groups after saving the settings.
                let $self, $selfInput, id, name;
                let regex = new RegExp("\\[[0-9]+\\]", "g");

                // For each input group that is in the same container as the item that has just been moved
                ui.item.closest('.inputs').find('> .input-group').each(function(index: any) {
                    $self = $(this);

                    // Update the input group's data key
                    $self.data("key", index);
                    $self.attr("data-key", index);

                    // Update the name and ID of each input in this input group
                    $self.find(':input[name]').each(function() {
                        $selfInput = $(this);
                        id   = $selfInput.attr('id');
                        name = $selfInput.attr('name');

                        if (name !== null && name !== undefined && name !== 'undefined' && name.length) {
                            $selfInput.attr('name', name.replace(regex, "[" + index + "]"));
                        }

                        if (id !== null && id !== undefined && id !== 'undefined' && id.length) {
                            $selfInput.attr('id', id.replace(regex, "[" + index + "]"));
                        }
                    });
                });
            }

        });
    }

    /**
     * Handles "load/clear general settings" button clicks
     * @param e
     */
    handleLoadClearGeneralSettings(e: any) {
        e.preventDefault();

        let $self = $(e.target),
            id = $self.attr("id");

        // Do not proceed if this is currently loading.
        if($self.hasClass("loading")) return;
        $self.addClass("loading");

        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: {
                cmd: ("#" + id) == this.psv.selectorClearGeneralSettingsButton ? "clearGeneralSettings" : "loadGeneralSettings"
            }
        })
            .done((response) => {
                let view = response.view;

                // Replace the current settings with the ones in the response.
                // Trigger 'change' on checkboxes so that the dependants can be shown or hidden accordingly.
                $(this.psv.selectorTabGeneralSettings).html(view).find("[type=checkbox]").trigger('change');

            })
            .fail((response) => {
                console.log(response);
            })
            .always(() => {
                // Remove loading class
                $self.removeClass("loading");
            });
    }

    /**
     * Initializes "copy to clipboard" handlers
     */
    initCopyToClipboard() {
        let selector = '.input-button-container > button';
        CopyToClipboardHandler.getInstance().initForSelector(selector);
    }

    /**
     * Handles "toggle info texts" button clicks
     * @param e
     */
    onClickToggleInfoTexts(e: any) {
        e.preventDefault();

        // Find all info texts and show/hide
        this.psv.$containerMetaBox.find(".info-text").each((i, el) => {
            if(this.psv.infoTextsHidden) {
                $(el).removeClass("hidden");
            } else {
                $(el).addClass("hidden");
            }
        });

        this.psv.infoTextsHidden = !this.psv.infoTextsHidden;
    }

    /**
     * Handles info button clicks
     * @param e
     */
    onClickInfoButton(e: any) {
        e.preventDefault();

        // Get the closest info button, since an element inside the info button might trigger this event
        let $self = $(e.target).closest('.info-button');

        // Show closest info text
        let $infoText = $self.parent().find('.info-text').first();
        if($infoText.hasClass('hidden')) {
            $infoText.removeClass('hidden');
        } else {
            $infoText.addClass('hidden');
        }
    }

    /**
     * Handles tab click events
     * @param e
     */
    onClickTab(e: any) {
        e.preventDefault();
        this.activateTab($(e.target).data("tab"));
    }

    /**
     * Handles click events of "load" or "refresh" button for translation languages
     * @param e
     */
    onLoadRefreshTranslationLanguages(e: any) {
        e.preventDefault();

        let $self       = $(e.target),
            data        = $self.data("kdn"),
            serviceType = data["serviceType"],
            selectors   = data["selectors"],
            requestType = data["requestType"],
            ajaxData: any    = {}
        ;

        // If it is still loading, do not try to load it twice.
        if($self.hasClass("loading")) return;

        for(let key in selectors) {
            if(!selectors.hasOwnProperty(key)) continue;

            let selector = selectors[key],
                $targetEl = $(selector),
                val: any = $targetEl.val();

            // If value of the element does not exist, notify the user and stop.
            if(!val.length) {
                this.notifier.notify($targetEl, window.kdn.required);
                return;
            }

            ajaxData[key] = val;
        }

        // Prepare the data that will be sent via an AJAX request
        let preparedAjaxData: any = {};
        preparedAjaxData[serviceType] = ajaxData;
        preparedAjaxData["requestType"] = requestType;
        preparedAjaxData["isOption"] = $(".kdn-general-settings").length ? 1 : 0;

        // Add loading class to the button.
        $self.addClass("loading");

        // Make the request
        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: preparedAjaxData
        })
            .done((response) => {
                if(response == undefined || !response || response.view == undefined || (response.errors != undefined && response.errors.length)) {
                    this.notifier.notify($self, window.kdn.an_error_occurred);
                    console.log(response);

                    if(response.view != undefined) {
                        // Show the errors
                        let $resultContainer = $self.closest("td").find(".test-results");
                        let $contentContainer = $resultContainer.find(".content");
                        $contentContainer.html(response.view);
                        $resultContainer.removeClass("hidden");
                    }

                    return;
                }

                //l(response);

                // Show the select elements with the languages
                let $viewFrom = $(response.view.from),
                    $viewTo = $(response.view.to),
                    keyFrom = $viewFrom.find("select").first().attr("name"),
                    keyTo = $viewTo.find("select").first().attr("name")
                ;

                $("label[for='" + keyFrom + "']").closest("tr").find("td:nth-child(2)").html(response.view.from);
                $("label[for='" + keyTo + "']").closest("tr").find("td:nth-child(2)").html(response.view.to);

                // Flash the backgrounds of the select elements to inform the user that the request has been successful.
                this.flashBackground($("#" + keyFrom));
                this.flashBackground($("#" + keyTo));

            })
            .fail((response) => {
                // Notify that the request has failed.
                this.notifier.notify($self, window.kdn.an_error_occurred + ": " + response.responseText);
                console.log(response);
            })
            .always(() => {
                // Remove loading class
                $self.removeClass("loading");
            });
    }

    /**
     * Handles the event of clicking "hide" button of the test results
     * @param e
     */
    onClickHideTestResults(e: any) {
        e.preventDefault();

        // Find closest test results
        let $self = $(e.target);

        // Hide it
        let $resultContainer = $self.closest(".test-results");
        $resultContainer.addClass("hidden");

        // Remove the HTML
        $resultContainer.find('.content').html("");
    }

    /**
     * Handles the event of clicking a "test" button
     * @param e
     */
    onClickTest(e: any) {
        e.preventDefault();

        let $self = $(e.target);
        let data = this.testDataPreparer.prepareTestData($self);
        if(data == null) return;

        // Set the closest test results container loading and clear its content
        let $resultContainer = $self.closest("td").find(".test-results");
        let $contentContainer = $resultContainer.find(".content");
        $resultContainer
            .removeClass("hidden")
            .addClass("loading");
        $contentContainer.html("");

        // Set the button loading
        $self.addClass("loading");

        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: data
        })
            .done((response) => {
                if(response == undefined || !response || response.view == undefined) {
                    $contentContainer.html(window.kdn.an_error_occurred);
                    return;
                }

                // Get the test results from the response view and store them in the test button itself. We might
                // use the results again, for example, in the options box.
                // Surround the view with a "div" (does not matter the element tag here) so that we can query it with
                // CSS selectors.
                let results = $("<div>" + response.view + "</div>").find('ul').data("results");
                if (results !== null && results !== undefined && results !== 'undefined') {
                    $self.data("results", results);
                }

                // Show the results
                $contentContainer.html(response.view);

                // Check if this is category-mapping stuff
                if($self.hasClass('kdn-category-map')) {
                    // Get the container
                    let $inputGroupContainer = $(this.psv.selectorCategoryMap).find('.inputs');

                    // Add resultant URLs as new input
                    for(let i = 0; i < response.data.length; i++) {
                        let url = response.data[i];
                        if(url.match("^javascript")) continue;

                        let $newInputGroup = this.inputGroupAdder.addNewInputGroup($inputGroupContainer);
                        $newInputGroup.find('input').val(url);
                    }
                }

            })
            .fail((response) => {
                $contentContainer.html(window.kdn.an_error_occurred + " <br />" + response.responseText);
                console.log(response);
            })
            .always(() => {
                // Remove loading class
                $resultContainer.removeClass("loading");
                $self.removeClass("loading");
            });
    }

    /**
     * Handles the event of clicking a "remove" button
     * @param e
     */
    onClickRemove(e: any) {
        e.preventDefault();
        let $self = $(e.target);

        // Get count of input groups
        let count = $self.closest(".inputs").find(".input-group").length;

        let $closestInputGroup = $self.closest(".input-group");

        // If there is only 1 input group, then do not remove it. Just clear the values.
        if(count == 1) {
            $closestInputGroup.find("input").each(function() {
                $(this).val("").trigger('change');
            });

            $closestInputGroup.find("textarea").each(function () {
                $(this).html("").val("").trigger('change');
            });

            $closestInputGroup.find("input[type=checkbox]").each(function() {
                $(this).prop('checked', false).trigger('change');
            });

            // Check if there is an options box button and revert it to its default
            $closestInputGroup.find('.kdn-options-box').each(function() {
                let $self = $(this);
                $self.removeClass('has-config');

                if(typeof $.fn.tooltip === 'function')
                    $self.tooltip('destroy');
            });

            // Otherwise, remove the input group.
        } else {
            // Clear the values of the inputs and trigger a change event so that any change event listener can get
            // notified.
            $closestInputGroup
                .find('.input-container')
                .find('input, select, textarea')
                .val('')
                .trigger('change');

            $closestInputGroup.remove();
        }
    }

    /**
     * Handles the event of clicking an "add new" button
     * @param e
     */
    onClickAddNew(e: any) {
        e.preventDefault();

        let $self = $(e.target);

        // Find the input container
        let $inputGroupContainer = $self.closest("td").find(".inputs");

        // Get max limit
        let max = $self.data("max");
        if(max != 0 && $inputGroupContainer.length >= max) return;

        this.inputGroupAdder.addNewInputGroup($inputGroupContainer);
    }

    /**
     * Handle what happens when "invalidate test URL cache" is clicked.
     * @param e
     */
    onClickInvalidateTestUrlCache(e: any) {
        e.preventDefault();

        let $self = $(e.target);
        let testUrl = $self.data("url") || null;

        // If the test URL is not valid, notify the user and return.
        if (testUrl === null || !testUrl.length) {
            this.notifier.notify($self, window.kdn.url_cannot_be_retrieved);
            return;
        }

        // Get the test result container.
        let $testResultsContainer = $self.closest('.test-results');

        // If it is already loading, stop.
        if ($testResultsContainer.hasClass('loading')) return;

        // Make the test result container loading to indicate an AJAX request is sent.
        $testResultsContainer.addClass('loading');

        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: {
                cmd: "invalidate_url_response_cache",
                url: testUrl
            }
        })
            .done((response) => {
                let success = response == "1";
                // Create the message
                let msg = success ? window.kdn.cache_invalidated : window.kdn.cache_could_not_be_invalidated;

                this.notifier.notifyRegular($self, msg, success ? NotificationType.SUCCESS : NotificationType.ERROR);
            })
            .fail((response) => {
                console.log(response);

                // Notify the user that the cache could not be invalidated
                this.notifier.notify($self, window.kdn.cache_could_not_be_invalidated);
            })
            .always(() => {
                // Remove loading class
                $testResultsContainer.removeClass('loading');
            });
    }

    /**
     * Handle what happens when "invalidate test URL cache" is clicked.
     * @param e
     */
    onClickInvalidateAllTestUrlCaches(e: any) {
        e.preventDefault();

        let $self = $(e.target);

        // Get the test result container.
        let $testResultsContainer = $self.closest('.test-results');

        // If it is already loading, stop.
        if ($testResultsContainer.hasClass('loading')) return;

        // Make the test result container loading to indicate an AJAX request is sent.
        $testResultsContainer.addClass('loading');

        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: {
                cmd: "invalidate_all_url_response_caches",
            }
        })
            .done((response) => {
                let success = response == "1";
                // Create the message
                let msg = success ? window.kdn.all_cache_invalidated : window.kdn.all_cache_could_not_be_invalidated;

                this.notifier.notifyRegular($self, msg, success ? NotificationType.SUCCESS : NotificationType.ERROR);
            })
            .fail((response) => {
                console.log(response);

                // Notify the user that all cache could not be invalidated
                this.notifier.notify($self, window.kdn.all_cache_could_not_be_invalidated);
            })
            .always(() => {
                // Remove loading class
                $testResultsContainer.removeClass('loading');
            });
    }

    /**
     * Initializes tooltip instances
     */
    initTooltip() {
        Utils.initTooltipForSelector('');
    }

    /**
     * Handles URL hash changes. E.g. activates tabs.
     */
    handleURLHash() {
        let hash = window.location.hash;
        if(hash && hash.indexOf("#_") === 0) {
            let tabHash = hash.split("|")[0];
            this.activateTab(tabHash.replace("#_", "#"));
        }
    }

    /**
     * Restores the URL hash to the state before saving the settings
     */
    restoreURLHash() {
        let $input = $(this.psv.selectorInputURLHash);
        if(!$input.length || !$input.first().val()) return;

        let values = (<string>$input.first().val()).split("|");
        // There are values of main tab and scroll position. So, there should be at least two values.
        // When there is no location hash but the scroll position, the value of the input becomes like "|20". In this
        // case, there is no location hash and the values[0] is empty. Hence, in that case, no location hash to restore.
        // So, stop.
        if(values.length < 2 || (values[0] === '')) return;

        history.replaceState(undefined, undefined, values.join("|"));
    }

    /**
     * Activate a tab
     * @param tabSelector Should be a tab ID and start with "#"
     */
    activateTab(tabSelector: any) {
        // Make fixables in the previous tab not-fixed
        this.resetFixableElements();

        let $tab = this.psv.$containerTabs.find('[data-tab="' + tabSelector + '"]');
        if(!$tab.length || $tab.hasClass("hidden") || $tab.hasClass('nav-tab-active')) return;

        // Store the top position of the page so that we can restore it when this tab is activated again.
        // Math.floor is crucial here. Because, top offset of the element is a float while scroll top of the page is
        // retrieved as integer. Hence, the scroll top of the page is actually a rounded number. In this case, to be
        // able to compare scroll top and the original tab container top correctly, we get rid of the decimal part of
        // the offset of the tab container. E.g. let's say original top offset of the tab container is 156.725. When we
        // make the page scroll to 156.725 and retrieve scroll top value of the page, we get 157. Here, we simply
        // eliminate this interesting case. Moreover, we act a little bit precautious by rounding the number down so that
        // when we compare the values, current scroll top of the element is always greater.
        let originalTabContainerTop = Math.floor(this.getTopOffsetOfTargetFixable(this.psv.$containerTabs) || 0);
        this.getActiveTab().data('scrolltop', this.getScrollTop() > originalTabContainerTop ? this.getScrollTop() : null);

        // First deactivate all tabs
        this.psv.$containerMetaBox.find("> .tab").addClass("hidden");
        this.psv.$containerTabs.find("a").removeClass("nav-tab-active");

        // Now activate the selected tab
        let elementId = $tab.data("tab");

        $(elementId).removeClass("hidden");
        $tab.addClass("nav-tab-active");

        // Do the things that should be done when the active tab changes
        this.onActiveTabChanged();

        // Change window hash without affecting browser history. By this way, going back won't result in a tab change.
        let hash = window.location.hash.split("|");
        hash[0] = elementId.replace("#", "#_");
        history.replaceState(undefined, undefined, hash.join("|"));

        // Make sure the editors in this tab are initialized. The height of the editors are not correct when they are
        // made visible by moving to a tab that contains editors, although the heights are correct when the editors
        // are visible right after the page loads. However, the editors are not visible right after the page loads.
        this.maybeInitTinyMceEditors();

        // Handle fixed navigation elements in the currently activated tab
        this.resetFixableElements();
        this.handleElementFixing();

        // If there is a scroll top for the activated tab, restore it.
        let tabScrollTopState = $tab.data('scrolltop') || null;
        let currentScrollTop = this.getScrollTop() + this.getAdminBarHeightIfFixed();
        let adminBarHeight = this.getAdminBarHeightIfFixed();
        if (tabScrollTopState === null) {
            // Otherwise
            tabScrollTopState = originalTabContainerTop < currentScrollTop ? originalTabContainerTop - adminBarHeight : null;
        }

        // Scroll to the previous location only if the page is scrolled beyond the top location of the original tab
        // container.
        if (tabScrollTopState !== null && currentScrollTop >= originalTabContainerTop) {
            $(document).scrollTop(tabScrollTopState);
        }
    }

    /**
     * Does the things to be done when the active tab changes
     */
    onActiveTabChanged() {
        // Invalidate the active tab container since the active tab has changed.
        this.invalidateActiveTabContainer();

        // Invalidate the cache storing fixable elements of the active tab since the active tab has changed.
        this.invalidateActiveTabFixablesCache();
    }

    /**
     * Resets the data that stores the previous scroll top position of the tab. The cache is there in order to restore
     * the scroll top position when the tab is activated later. The cache is set in {@link activateTab}.
     */
    resetPrevScrollPositionCacheOfTabs() {
        this.getAllTabs().removeData('scrolltop');
    }

    /**
     * Initializes editors if they were not initialized. This method fixes the problem that the editors do not have
     * the right height.
     */
    maybeInitTinyMceEditors() {
        // Find the editors in the current tab
        let $currentContainer = this.getActiveTabContainer();

        // If there are no editors in this tab or the editors for this tab have already been initialized, stop.
        if ($currentContainer === null || ($currentContainer !== null && $currentContainer.hasClass('editors-initialized'))) {
            return;
        }

        $currentContainer.find('.wp-editor-container').each((i: number, el: any) => {
            let $self = $(el);

            // Find the height of the textarea of the editor
            let $textarea = $self.find('textarea').first() || null;
            if ($textarea === null || !$textarea.length || $textarea.hasClass('initialized')) return;

            let height = $textarea.height();

            // Change the height of the editor iframe so that it matches with the height of the textarea. By this way,
            // the editor will have the correct height.
            $self.find('.mce-container > iframe').css('height', height + 'px');

            // Mark it as initialized
            $textarea.addClass('initialized');
        });

        // Mark the container as that their editors are initialized so that we will not try to do it again.
        $currentContainer.addClass('editors-initialized');
    }

    /**
     * Get the fixable elements of the active tab
     */
    getActiveTabFixables() {
        if (this.$activeTabFixables !== undefined) return this.$activeTabFixables;

        this.$activeTabFixables = this.getActiveTabContainer()
            .find(this.psv.selectorFixable + '.' + SectionNavigation.classInitialized) || null;
        return this.$activeTabFixables;
    }

    /**
     * Invalidate the variable that caches the fixable elements of the active tab
     */
    invalidateActiveTabFixablesCache() {
        this.$activeTabFixables = undefined;
    }

    /**
     * Get the container of the active tab
     */
    getActiveTabContainer(): any {
        // If the active tab container already exists, return it.
        if (this.$activeTabContainer !== undefined) return this.$activeTabContainer;

        let $tab = this.getActiveTab();
        if ($tab === null) {
            this.$activeTabContainer = null;
            return this.$activeTabContainer;
        }

        let containerSelector = $tab.data("tab");
        let $container = $(containerSelector).first() || null;
        this.$activeTabContainer = $container !== null && $container.length ? $container : null;

        return this.$activeTabContainer;
    }

    invalidateActiveTabContainer() {
        this.$activeTabContainer = undefined;
    }

    getActiveTab(): any {
        let $tab = this.psv.$containerTabs.find('.nav-tab-active').first() || null;
        if ($tab === null || !$tab.length) return null;

        return $tab;
    }

    getAllTabs(): any {
        return this.psv.$containerTabs.find('.nav-tab');
    }

    /**
     * @return Top position of the scroll
     */
    getScrollTop() {
        return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
    }

    /**
     * Flash the background color of an object
     * @param {object} $element Target element
     */
    flashBackground($element: any) {
        // console.log('flash background');
        $element.stop().css("background-color", "#b8ea84")
            .animate({ backgroundColor: "#FFFFFF"}, 1000);
    }

}