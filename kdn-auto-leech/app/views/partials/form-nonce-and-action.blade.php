{{--
    Required:
        pageActionKey
--}}

@if(!isset($noNonceAndAction) || !$noNonceAndAction)
    <?php wp_nonce_field($pageActionKey, \KDNAutoLeech\Constants::$NONCE_NAME); ?>

    <input type="hidden" name="action" value="{{ $pageActionKey }}" id="hiddenaction">
@endif