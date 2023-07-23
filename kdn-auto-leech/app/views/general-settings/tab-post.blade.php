<?php

/**
 * @param string $shortCodeName Name of the short code
 * @param string $transElement Singular element name
 * @param string $transElements Plural element name
 * @return string Information as a translated string
 * @since 1.8.0
 */
function _kdn_trans_domain_for_short_code($shortCodeName, $transElement, $transElements) {
    return sprintf(
            _kdn('Define domains from which %2$s source can be retrieved. %1$s short code will only show %3$s whose
                source URL is from one of these domains.'),
            '<b>' . $shortCodeName . '</b>',
            $transElement,
            $transElements
        ) . ' ' . _kdn_domain_wildcard_info();
}

?>

<div class="kdn-settings-title">
    <h3>{{ _kdn('Post Settings') }}</h3>
    <span>{{ _kdn('Set post settings') }}</span>
</div>

<table class="kdn-settings">
    {{-- ALLOW COMMENTS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_allow_comments',
                'title' =>  _kdn('Allow Comments'),
                'info'  =>  _kdn('If you want to allow comments for automatically inserted posts,
                    check this.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name'      =>  '_kdn_allow_comments',
            ])
        </td>
    </tr>

    {{-- POST STATUS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_post_status',
                'title' =>  _kdn('Post Status'),
                'info'  =>  _kdn('Set the status of automatically inserted posts.')
            ])
        </td>
        <td>
            @include('form-items/select', [
                'name'      =>  '_kdn_post_status',
                'options'   =>  $postStatuses,
                'isOption'  =>  $isOption,
            ])
        </td>
    </tr>

    {{-- POST TYPE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_post_type',
                'title' =>  _kdn('Post Type'),
                'info'  =>  _kdn('Set the type of automatically inserted posts.')
            ])
        </td>
        <td>
            @include('form-items/select', [
                'name'      =>  '_kdn_post_type',
                'options'   =>  $postTypes,
                'isOption'  =>  $isOption,
            ])
        </td>
    </tr>

    @if($isGeneralPage)

        {{-- CUSTOM CATEGORY TAXONOMIES --}}
        @include('form-items.combined.multiple-custom-category-taxonomy-with-label', [
            'name' => '_kdn_post_category_taxonomies',
            'title' => _kdn('Post Category Taxonomies'),
            'info' => _kdn("Set custom post category taxonomies registered into your WordPress installation so that
                you can set a custom post category in the site settings. For taxonomy field, write the name of the
                taxonomy. The description you write in the description field will be shown when selecting a category."),
        ])

    @endif

    {{-- POST AUTHOR --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_post_author',
                'title' =>  _kdn('Post Author'),
                'info'  =>  _kdn('Set the author of automatically inserted posts.')
            ])
        </td>
        <td>
            @include('form-items/select', [
                'name'      =>  '_kdn_post_author',
                'options'   =>  $authors,
                'isOption'  =>  $isOption,
            ])
        </td>
    </tr>

    {{-- POST TAG LIMIT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_post_tag_limit',
                'title' =>  _kdn('Maximum number of tags'),
                'info'  =>  _kdn('How many tags at maximum can be added to a post? Set this <b>0</b> if you do not
                    want to set a limit and get all available tags. The default value is 0.')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_post_tag_limit',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  0,
            ])
        </td>
    </tr>

    {{-- CHANGE POST PASSWORD --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_change_password',
                'title' =>  _kdn('Change Password'),
                'info'  =>  _kdn('If you want to change post password, check this.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name'          =>  '_kdn_change_password',
                'dependants'    =>  '["#post-password"]'
            ])
        </td>
    </tr>

    {{-- POST PASSWORD --}}
    <tr id="post-password">
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_post_password',
                'title' =>  _kdn('Post Password'),
                'info'  =>  _kdn('Set the password for automatically inserted posts. The value you
                    enter here will be stored as raw text in the database, without encryption.
                    If anyone accesses your database, he/she will be able to see your password.
                    <br /><br />
                    If you want to delete the password, just leave the new password fields empty.
                    When you change the password, new password will be effective for new posts,
                    and passwords for old posts will not be changed.
                    <br /><br />
                    <b>Leave old password field empty if you did not set any password before.</b>')
            ])
        </td>
        <td>
            @include('form-items/password-with-validation', [
                'name'      =>  '_kdn_post_password',
            ])
        </td>
    </tr>

    @if ($isGeneralPage)

        {{-- SECTION: SHORT CODES --}}
        @include('partials.table-section-title', ['title' => _kdn("Short Codes")])

        {{-- ALLOWED IFRAME SHORT CODE DOMAINS --}}
        @include('form-items.combined.multiple-domain-with-label', [
            'name'  => '_kdn_allowed_iframe_short_code_domains',
            'title' => _kdn('Allowed domains for iframe short code'),
            'info' => _kdn_trans_domain_for_short_code(
                \KDNAutoLeech\Objects\GlobalShortCodes\GlobalShortCodeService::getShortCodeTagName(\KDNAutoLeech\Objects\GlobalShortCodes\ShortCodes\IFrameGlobalShortCode::class),
                _kdn('iframe'),
                _kdn('iframes')
            )
        ])

        {{-- ALLOWED SCRIPT SHORT CODE DOMAINS --}}
        @include('form-items.combined.multiple-domain-with-label', [
            'name'  => '_kdn_allowed_script_short_code_domains',
            'title' => _kdn('Allowed domains for script short code'),
            'info' => _kdn_trans_domain_for_short_code(
                \KDNAutoLeech\Objects\GlobalShortCodes\GlobalShortCodeService::getShortCodeTagName(\KDNAutoLeech\Objects\GlobalShortCodes\ShortCodes\ScriptGlobalShortCode::class),
                _kdn('script'),
                _kdn('scripts')
            )
        ])

    @endif

    <?php

    /**
     * Fires before closing table tag in post tab of general settings page.
     *
     * @param array $settings       Existing settings and their values saved by user before
     * @param bool  $isGeneralPage  True if this is called from a general settings page.
     * @param bool  $isOption       True if this is an option, instead of a setting. A setting is a post meta, while
     *                              an option is a WordPress option. This is true when this is fired from general
     *                              settings page.
     * @since 1.6.3
     */
    do_action('kdn/view/general-settings/tab/post', $settings, $isGeneralPage, $isOption);

    ?>

</table>