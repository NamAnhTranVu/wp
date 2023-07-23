import {PostSettings} from "../post-settings-ts/app/PostSettings";
import {EventType} from "./EventType";

export class SectionNavigation {

    private static instance: SectionNavigation = null;

    private _selectorNavContainer = '.tab-section-nav';
    private selectorTabContainer = '.tab';
    public static classInitialized = 'initialized';

    private selectorNavigationRow = 'tr[data-id^=section-]';

    /**
     * Get the instance
     */
    public static getInstance(): SectionNavigation {
        if (this.instance === null) this.instance = new SectionNavigation();
        return this.instance;
    }

    /** This is a singleton. */
    private constructor() {
        // Listen to the clicks made on a navigation item
        $(document).on('click', this._selectorNavContainer + ' [data-id]', (e) => this.onClickNavItem(e));
    }

    /**
     * Handles what happens when a navigation item is clicked
     * @param e
     */
    private onClickNavItem(e: JQuery.Event) {
        let $self = $(e.target);

        // Get the target item's selector
        let id = $self.data('id');
        let $targetEl: any = null;

        // In each navigation, there is a 'top' item that stores the ID of the tab container, which starts with 'tab'.
        // Let's find out if this is a tab selector.
        let isTabContainer = id.indexOf('tab') === 0;

        // If the clicked element should go to a section
        if (!isTabContainer) {
            let selector = 'tr[data-id="' + id + '"]';
            $targetEl = $self.closest(this.selectorTabContainer).find(selector) || null;

        // Otherwise, target element is the tab container itself.
        } else {
            $targetEl = $('#' + id);
        }

        // If the element does not exist, stop.
        if ($targetEl === null || !$targetEl.length) return;

        // Scroll to it
        let $scrollable = $(document).find('html, body');
        let fixedElTotalHeight = PostSettings.getInstance().getFixedElementsTotalHeight();
        $scrollable.stop().animate({
            scrollTop: $targetEl.offset().top - fixedElTotalHeight - $(window).height() * 0.02
        }, 500, 'swing', () => {
            if (isTabContainer) return;

            // If there are no fixed elements when the scroll starts, but there are fixed elements when the scroll
            // finishes (i.e. when the elements get fixed at the top in the middle of scrolling), the position of the
            // scroll is not correct such that the target element stays under the fixed elements. If there is such a
            // case, scroll to the element again considering the elements that were fixed in the middle of the scrolling.
            // We can decide if there are such elements by comparing the total height of the currently fixed elements
            // with the total height of fixed elements there were when the scrolling started.
            let newFixedElTotalHeight = PostSettings.getInstance().getFixedElementsTotalHeight();
            if (newFixedElTotalHeight !== fixedElTotalHeight) {
                // If there are elements got fixed at the top in the middle of the scrolling, rescroll to the element
                // considering the heights of these elements.
                $scrollable.stop().animate({
                    scrollTop: $targetEl.offset().top - newFixedElTotalHeight - $(window).height() * 0.02
                }, 250, 'swing');
            }

        });
    }

    /**
     * Initializes the navigations
     */
    public initNavigations() {
        let $self;

        // For each navigation container in the page
        $(this._selectorNavContainer).each((i, el) => {
            $self = $(el);

            // First, make its content empty.
            $self.html('');

            // Create a navigation element for the navigation items in the tab that this navigation container is in and
            // add it to the container.
            $self.append(this.createNavigationElement(this.getNavigationItems($self.closest(this.selectorTabContainer))));

            // Set it as initialized
            $self.parent().addClass(SectionNavigation.classInitialized);
        });

        // Trigger an event so that others can do things when the navigations are initialized
        $(document).trigger(EventType.navigationsInitialized);
    }

    /**
     * Finds navigation items
     */
    private getNavigationItems($container: JQuery<HTMLElement>): any {
        let $self, result: any = [];

        // Add the default 'top' item. It should be the tab container's ID so that when it is clicked, the top of the
        // tab container is scrolled to.
        result[$container.attr('id')] = window.kdn.top;

        // Find all rows that are actually a section title
        $container.find(this.selectorNavigationRow).each((i, el) => {
            $self = $(el);

            // Add the row with its data-id value and text
            result[$self.attr('data-id')] = $self.text();
        });

        return result;
    }

    /**
     * Creates navigation element with the given navigation items
     * @param {array} navItems
     */
    private createNavigationElement(navItems: any): any {
        // Create an unordered list element
        let $ul = $('<ul/>');

        // Then, for each given navigation item
        for(let id in navItems) {
            if (!navItems.hasOwnProperty(id)) continue;

            // Create a li element containing an anchor. Add the target section's ID as data-id to the anchor so that
            // we know what section to scroll to when the anchor is clicked.
            $ul.append(
                $('<li/>')
                    .append(
                        $('<a/>')
                            .attr('data-id', id)
                            .attr('role', 'button')
                            .html(navItems[id])
                    )
            );
        }

        return $ul;
    }
}