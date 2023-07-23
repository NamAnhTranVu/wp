{{--
    type: can be "success", "warning", "error", "info"
--}}
<div id="message" class="notice notice-{{ isset($type) ? $type : 'info' }} is-dismissible">
    <p>{{ isset($message) ? $message : 'Done.' }}</p>
    <button type="button" class="notice-dismiss">
        <span class="screen-reader-text">{{ _kdn('Dismiss this notice.') }}</span>
    </button>
</div>