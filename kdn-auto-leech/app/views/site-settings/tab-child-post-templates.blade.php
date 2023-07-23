<?php

/**
 * @param   string  $name   Post meta key
 *
 * @return  array
 */
function _kdn_prepare_find_replace_form_item_data_child_post($name) {
    return [
        'include'       =>  'form-items/find-replace',
        'name'          =>  $name,
        'addKeys'       =>  true,
        'remove'        =>  true,
        'addon'         =>  'dashicons dashicons-search',
        'data'          =>  [
            'subjectSelector'   =>  "#_child_post_test_find_replace",
            'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIND_REPLACE,
        ],
        'test'          => true,
        'addonClasses'  => 'kdn-test-find-replace'
    ];
}

/**
 * @param   string  $shortCodeName  Name of the short code
 * @param   string  $transElement   Singular element name
 * @param   string  $transElements  Plural element name
 *
 * @return  string                  Information as a translated string
 *
 * @since   1.8.0
 */
function _kdn_trans_html_element_short_code_child_post($shortCodeName, $transElement, $transElements) {
    return sprintf(
        _kdn('WordPress does not allow %2$s elements for security reasons. If you want to show %3$s in
                the post template, you can check this. When you check this, the %2$s elements in the short code data
                will be converted to %1$s short code that shows the %3$s in the front end. <b>Use this with
                caution since unknown %3$s can cause security vulnerabilities.</b> The short code will output the
                HTML element <b>only for the domains defined in the general settings</b>.'),
        '<b>[' . $shortCodeName . ']</b>',
        $transElement,
        $transElements
    );
}

?>

<div class="kdn-settings-title">
    <h3>{{ _kdn('Template Settings') }}</h3>
    <span>{{ _kdn('Set templates for the post, find and replace things...') }}</span>
</div>

{{-- SECTION NAVIGATION --}}
@include('partials.tab-section-navigation')

<table class="kdn-settings">
    {{-- CHILD POST MAIN TEMPLATE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_template_main',
                'title' => _kdn('Main Post Template'),
                'info'  => _kdn('Main template used for the posts. The buttons above the editor holds short codes which
                            are used to place certain elements into the post page. You can hover over the buttons
                            to see what they are used to show in post page, and <b>click them to copy the code</b>. After
                            copying, just place the short codes into anywhere you want in the editor. <b>You must
                            fill the template.<b>')
            ])
        </td>
        <td>@include('form-items/template-editor', ['name' => '_child_post_template_main', 'buttons' => $buttonsMain])</td>
    </tr>

    {{-- CHILD POST TITLE TEMPLATE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_template_title',
                'title' => _kdn('Post Title Template'),
                'info'  => _kdn('Template for post title. You can also use custom short codes. If you leave this empty,
                        original post title found by CSS selectors will be used.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'      => '_child_post_template_title',
                'buttons'   => $buttonsTitle,
                'rows'      => 3,
            ])
        </td>
    </tr>

    {{-- CHILD POST EXCERPT TEMPLATE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_template_excerpt',
                'title' => _kdn('Post Excerpt Template'),
                'info'  => _kdn('Template for post excerpt. You can also use custom short codes. If you leave this empty,
                        original post excerpt found by CSS selectors will be used.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'      => '_child_post_template_excerpt',
                'buttons'   => $buttonsExcerpt,
                'rows'      => 3,
            ])
        </td>
    </tr>

    {{-- CHILD POST LIST TEMPLATE --}}
    <tr id="child-post-template-is-list-type">
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_template_list_item',
                'title' => _kdn('List Item Template'),
                'info'  => _kdn('This template is used for the list. If you set the post list type and wrote some selectors
                            for the list items, then the list items will be crawled. Here, you can set a template
                            to be used for <b>each</b> list item. You can include the entire list in main post
                            template. <b>You must fill the template if you expect a list from the target page.</b>')
            ])
        </td>
        <td>@include('form-items/template-editor', ['name' => '_child_post_template_list_item', 'buttons' => $buttonsList])</td>
    </tr>

    {{-- CHILD POST GALLERY ITEM TEMPLATE --}}
    <tr id="child-post-template-save-images-as-gallery">
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_template_gallery_item',
                'title' => _kdn('Gallery Item Template'),
                'info'  => _kdn('This template is used for the gallery. If you activated saving images as gallery
                            and wrote some selectors for the image URLs, then the gallery items will be crawled.
                            Here, you can set a template to be used for <b>each</b> gallery image. You can
                            include the entire gallery in main post template. <b>You must fill the template if
                            you expect a gallery from the target page.</b>')
            ])
        </td>
        <td>@include('form-items/template-editor', ['name' => '_child_post_template_gallery_item', 'buttons' => $buttonsGallery])</td>
    </tr>

    {{-- CHILD POST DIRECT FILE ITEM TEMPLATE --}}
    <tr id="child-post-template-save-direct-files">
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_template_direct_file_item',
                'title' => _kdn('Direct File Item Template'),
                'info'  => _kdn('This template is used for the direct files. If you activated saving direct files
                            and wrote some selectors for the direct file URLs, then the direct file items will be crawled.
                            Here, you can set a template to be used for <b>each</b> direct file. You can
                            include the entire direct files in main post template. <b>You must fill the template if
                            you expect a direct file from the target page.</b>')
            ])
        </td>
        <td>@include('form-items/template-editor', ['name' => '_child_post_template_direct_file_item', 'buttons' => $buttonsDirectFile])</td>
    </tr>

    {{-- SECTION: QUICK FIXES --}}
    @include('partials.table-section-title', ['title' => _kdn("Quick Fixes")])

    {{-- REMOVE LINKS FROM SHORT CODES --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_child_post_remove_links_from_short_codes',
        'title' =>  _kdn('Remove links from short codes?'),
        'info'  =>  sprintf(_kdn('If you want to remove links from all of the short code data, check this.
                Checking this box is almost the same as adding <b>%1$s</b> regex for find and <b>%2$s</b> for
                replace option for each find and replace option in this tab. This option will not touch custom
                links inside the templates.'),
                esc_html(trim(\KDNAutoLeech\Objects\Crawling\Preparers\BotConvenienceFindReplacePreparer::REMOVE_LINKS_FIND, '/')),
                esc_html(\KDNAutoLeech\Objects\Crawling\Preparers\BotConvenienceFindReplacePreparer::REMOVE_LINKS_REPLACE)
        )
    ])

    {{-- CONVERT IFRAMES TO SHORT CODE --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'      => '_child_post_convert_iframes_to_short_code',
        'title'     => _kdn('Convert iframe elements to short code'),
        'info' => _kdn_trans_html_element_short_code_child_post(
            \KDNAutoLeech\Objects\GlobalShortCodes\GlobalShortCodeService::getShortCodeTagName(\KDNAutoLeech\Objects\GlobalShortCodes\ShortCodes\IFrameGlobalShortCode::class),
            _kdn('iframe'),
            _kdn('iframes')
        )
    ])

    {{-- CONVERT SCRIPTS TO SHORT CODE --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'      => '_child_post_convert_scripts_to_short_code',
        'title'     => _kdn('Convert script elements to short code'),
        'info' => _kdn_trans_html_element_short_code_child_post(
            \KDNAutoLeech\Objects\GlobalShortCodes\GlobalShortCodeService::getShortCodeTagName(\KDNAutoLeech\Objects\GlobalShortCodes\ShortCodes\ScriptGlobalShortCode::class),
            _kdn('script'),
            _kdn('scripts')
        )
    ])

    {{-- SECTION: UNNECESSARY ELEMENTS --}}
    @include('partials.table-section-title', ['title' => _kdn("Unnecessary Elements")])

    {{-- UNNECESSARY TEMPLATE ELEMENT SELECTORS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_template_unnecessary_element_selectors',
                'title' =>  _kdn('Template Unnecessary Element Selectors'),
                'info'  =>  _kdn('CSS selectors for unwanted elements in the template. Specified elements will be
                    removed from the HTML of the template. The removal will be done after the shortcodes are replaced.
                    Find-and-replaces will be done after the template is cleared from unnecessary elements. <b>This
                    will use test post URL on Post tab to conduct the tests.</b>')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector',
                'name'          => '_child_post_template_unnecessary_element_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'addonTitle'    =>  'test',
                'data'          =>  [
                    'urlSelector'   =>  "#_test_url_child_post",
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_HTML,
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: MANIPULATE HTML --}}
    @include('partials.table-section-title', ['title' => _kdn("Manipulate HTML")])

    {{-- FIND AND REPLACE TEST CODE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_child_post_test_find_replace',
                'title' =>  _kdn('Find and Replace Test Code'),
                'info'  =>  _kdn('A piece of code to be used when testing find-and-replace settings below.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_child_post_test_find_replace',
                'placeholder'   =>  _kdn('The code which will be used to test find-and-replace settings'),
            ])
        </td>
    </tr>

    {{-- CHILD POST FIND REPLACE FOR TEMPLATE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_find_replace_template',
                'title' => _kdn("Find and replace in post's content"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>HTML of post\'s content</b>,
                    this is the place. The replacement will be done after the final post template is ready. ') . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items.multiple', _kdn_prepare_find_replace_form_item_data_child_post('_child_post_find_replace_template'))
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CHILD POST FIND REPLACE FOR CUSTOM SHORT CODES --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_find_replace_custom_shortcodes',
                'title' => _kdn("Find and replace in custom short code contents"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>each custom short
                    code\'s content</b>, this is the place. The replacement will be done after the final post template
                    is ready. ') . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items.multiple', _kdn_prepare_find_replace_form_item_data_child_post('_child_post_find_replace_custom_shortcodes'))
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CHILD POST FIND REPLACE FOR TITLE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_find_replace_title',
                'title' => _kdn("Find and replace in post's title"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>post\'s title</b>,
                    this is the place. ') . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items.multiple', _kdn_prepare_find_replace_form_item_data_child_post('_child_post_find_replace_title'))
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CHILD POST FIND REPLACE FOR EXCERPT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_find_replace_excerpt',
                'title' => _kdn("Find and replace in post's excerpt"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>post\'s excerpt</b>,
                    this is the place. ') . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items.multiple', _kdn_prepare_find_replace_form_item_data_child_post('_child_post_find_replace_excerpt'))
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CHILD POST FIND REPLACE FOR TAGS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_find_replace_tags',
                'title' => _kdn("Find and replace in post's each tag"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>post\'s each tag</b>,
                    this is the place. ') . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items.multiple', _kdn_prepare_find_replace_form_item_data_child_post('_child_post_find_replace_tags'))
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CHILD POST FIND REPLACE FOR META KEYWORDS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_find_replace_meta_keywords',
                'title' => _kdn("Find and replace in meta keywords"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>post\'s meta keywords</b>,
                    this is the place. ') . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items.multiple', _kdn_prepare_find_replace_form_item_data_child_post('_child_post_find_replace_meta_keywords'))
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CHILD POST FIND REPLACE FOR META DESCRIPTION --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_child_post_find_replace_meta_description',
                'title' => _kdn("Find and replace in meta description"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>post\'s meta description</b>,
                    this is the place. ') . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items.multiple', _kdn_prepare_find_replace_form_item_data_child_post('_child_post_find_replace_meta_description'))
            @include('partials/test-result-container')
        </td>
    </tr>

    <?php

    /**
     * Fires before closing table tag in templates tab of site settings page.
     *
     * @param array $settings   Existing settings and their values saved by user before
     * @param int $postId       ID of the site
     * @since 1.6.3
     */
    do_action('kdn/view/site-settings/tab/child-post-templates', $settings, $postId);

    ?>

</table>