import {NotificationType} from "./enum/NotificationType";
import {NotificationPosition} from "./enum/NotificationPosition";

export class Notifier {

    private static INSTANCE: Notifier = null;

    public static getInstance() {
        if (this.INSTANCE === null) this.INSTANCE = new Notifier();
        return this.INSTANCE;
    }

    private constructor() { }

    /**
     * Shows "required for test" notification by default. If you supply another message, shows it instead.
     *
     * @param $targetEl
     * @param notificationMessage If defined, this message will be shown. Otherwise, a default message will be shown.
     */
    notify($targetEl: any, notificationMessage: any) {
        if(!this.isNotifyAvailable()) return;

        if(notificationMessage == undefined || !notificationMessage.length) notificationMessage = window.kdn.required_for_test;

        // Find the closest label
        let $label = $targetEl.closest("tr").find("label").first(),
            $notificationEl = $label.length ? $label : $targetEl;

        this.scrollToElement($notificationEl);

        $notificationEl.notify(notificationMessage, {
            position: 'top'
        });
    }

    /**
     * Show a notification message for an element
     *
     * @param {Object} $targetElement
     * @param {string} message
     * @param {string} type Class name for the notification element. Default: 'info'
     * @param {string} position 'top', 'left', 'bottom left', 'right top', ... Default: 'top'
     */
    notifyRegular($targetElement: any, message: string, type: NotificationType = NotificationType.INFO, position: NotificationPosition = NotificationPosition.TOP) {
        if(!this.isNotifyAvailable()) return;

        $targetElement.notify(message, {
            position: position || 'top',
            className: type || 'info',
        });
    }

    /**
     * Scrolls to an element
     * @param $el
     */
    private scrollToElement($el: any) {
        $(document).find('html, body').stop().animate({
            scrollTop: $el.first().offset().top - $(window).height()/4
        }, 500, 'swing');
    }

    /**
     * Checks if notification library is available
     * @param {boolean} showError True if an error message should be written in JS console when it is not available.
     */
    private isNotifyAvailable(showError = true): boolean {
        let isAvailable = !(typeof $.fn.notify != 'function');
        if (!isAvailable && showError) {
            console.error("NotifyJS is not defined.");
        }

        return isAvailable;
    }
}