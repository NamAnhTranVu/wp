<div class="kdn-settings-title">
    <h3>{{ _kdn('Notifications') }}</h3>
    <span>{{ _kdn('Set notification email addresses...') }}</span>
</div>

<table class="kdn-settings">
    {{-- NOTIFICATIONS ARE ACTIVE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_is_notification_active',
                'title' =>  _kdn('Notifications are active?'),
                'info'  =>  _kdn('If you want to activate notification emails, check this.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name'  =>  '_kdn_is_notification_active'
            ])
        </td>
    </tr>
    
    {{-- EMAIL INTERVAL --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_notification_email_interval_for_site',
                'title' =>  _kdn('Email interval'),
                'info'  =>  _kdn("Set how many minutes should pass before sending another similar notification about
                        the same site. Default: 30")
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_notification_email_interval_for_site',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  1,
            ])
        </td>
    </tr>

    {{-- NOTIFICATION EMAILS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_kdn_notification_emails',
                'title' => _kdn("Email addresses"),
                'info'  => _kdn('Write email addresses to which notifications can be sent.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/text',
                'name'          =>  '_kdn_notification_emails',
                'type'          =>  'email',
                'remove'        =>  true,
                'addKeys'       =>  true,
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    <?php

    /**
     * Fires before closing table tag in notifications tab of general settings page.
     *
     * @param array $settings       Existing settings and their values saved by user before
     * @param bool  $isGeneralPage  True if this is called from a general settings page.
     * @param bool  $isOption       True if this is an option, instead of a setting. A setting is a post meta, while
     *                              an option is a WordPress option. This is true when this is fired from general
     *                              settings page.
     * @since 1.6.3
     */
    do_action('kdn/view/general-settings/tab/notifications', $settings, $isGeneralPage, $isOption);

    ?>

</table>