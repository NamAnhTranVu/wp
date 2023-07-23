<div class="kdn-settings-title">
    <h3>{{ _kdn('Main Settings') }}</h3>
    <span>{{ _kdn('Set main page URL, scheduling options, duplicate post checking, cookies...') }}</span>
</div>

{{-- SECTION NAVIGATION --}}
@include('partials.tab-section-navigation')

<table class="kdn-settings">
    {{-- SITE URL --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_main_page_url',
                'title' => _kdn('Site URL'),
                'info'  => _kdn('Main URL of the site. E.g. <span class="highlight url">https://kdnautoleech.com</span>.
                    You must fill this field.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_main_page_url', 'type' => 'url'])</td>
    </tr>

    {{-- ACTIVE SCHEDULING --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_active',
                'title' =>  _kdn('Active for scheduling?'),
                'info'  =>  _kdn('If you want to activate this site for crawling, check this. If you do not check this,
                    the site will not be crawled, no posts will be saved.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_active'
                ])
            </div>
        </td>
    </tr>

    {{-- ACTIVE RECRAWLING --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_active_recrawling',
                'class' =>  'label-recrawl',
                'title' =>  _kdn('Active for recrawling?'),
                'info'  =>  _kdn('If you want to activate this site for post recrawling, check this. If you do not check this,
                    the posts will not be recrawled.')
            ])
        </td>
        <td class="double-translate">
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_active_recrawling',
                    'tooltip'       => true,
                    'title'         => 'Recrawl'
                ])

                @include('form-items/checkbox', [
                    'name'          => '_active_recrawling_from_last_page',
                    'tooltip'       => true,
                    'title'         => 'Recrawling from the last page?',
                    'dependants'    => '[
                        "#post-stop-crawling-first-page",
                        "#child-post-stop-crawling-first-page"
                    ]'
                ])
            </div>
        </td>
    </tr>

    {{-- ACTIVE POST DELETING --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_active_post_deleting',
                'class' =>  'label-post-deleting',
                'title' =>  _kdn('Active for post deleting?'),
                'info'  =>  _kdn('If you want to activate this site for post deleting, check this. If you do not check
                    this, the posts will not be deleted.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_active_post_deleting'
                ])
            </div>
        </td>
    </tr>

    {{-- ACTIVE TRANSLATION --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_active_translation',
                'class' =>  'label-post-translation',
                'title' =>  _kdn('Active for post translation?'),
                'info'  =>  _kdn('If you want to activate this site for post translation, check this. If you do not check
                    this, the posts will not be translated.')
            ])
        </td>
        <td class="double-translate">
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_active_translation',
                    'tooltip'       => true,
                    'title'         => 'All'
                ])

                @include('form-items/checkbox', [
                    'name'          => '_active_translation_options',
                    'tooltip'       => true,
                    'title'         => 'Options'
                ])
            </div>
        </td>
    </tr>

    {{-- DUPLICATE CHECKING --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_duplicate_check_types',
                'title' =>  _kdn('Check duplicate posts via'),
                'info'  =>  _kdn('Set how to decide whether a post is duplicate or not. Duplicate checking will be
                    performed in this order: URL, title, content. If one of them is found, the post is considered as
                    duplicate.')
            ])
        </td>
        <td>
            <div class="inputs">
                <?php
                    $duplicatePostCheckTypes = \KDNAutoLeech\Objects\Crawling\Savers\PostSaver::getDuplicateCheckOptionsForSelect($settings);
                    $duplicatePostViewOptions = [
                        'name' => '_duplicate_check_types',
                        'options' => $duplicatePostCheckTypes["values"],
                    ];

                    // Set the default values if this is a new site that is being created right now. Otherwise, we'll
                    // use the settings saved previously.
                    if(!isset($_GET["post"]) || !$_GET["post"]) {
                        $duplicatePostViewOptions['value'] = $duplicatePostCheckTypes["defaults"];
                    }
                ?>
                @include('form-items/multi-checkbox', $duplicatePostViewOptions)
            </div>
        </td>
    </tr>

    {{-- CHILD POST DUPLICATE CHECKING --}}
    <tr id="child-post-duplicate-check-types">
        <td>
            @include('form-items/label', [
                'for'   =>  '_child_post_duplicate_check_types',
                'title' =>  _kdn('Check duplicate child posts via'),
                'info'  =>  _kdn('Set how to decide whether a post is duplicate or not. Duplicate checking will be
                    performed in this order: URL, title, content. If one of them is found, the post is considered as
                    duplicate.')
            ])
        </td>
        <td>
            <div class="inputs">
                <?php
                    $duplicateChildPostCheckTypes = \KDNAutoLeech\Objects\Crawling\Savers\PostSaver::getDuplicateCheckOptionsForSelect($settings, true);
                    $duplicateChildPostViewOptions = [
                        'name' => '_child_post_duplicate_check_types',
                        'options' => $duplicateChildPostCheckTypes["values"],
                    ];

                    // Set the default values if this is a new site that is being created right now. Otherwise, we'll
                    // use the settings saved previously.
                    if(!isset($_GET["post"]) || !$_GET["post"]) {
                        $duplicateChildPostViewOptions['value'] = $duplicateChildPostCheckTypes["defaults"];
                    }
                ?>
                @include('form-items/multi-checkbox', $duplicateChildPostViewOptions)
            </div>
        </td>
    </tr>

    {{-- USE CUSTOM GENERAL SETTINGS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_do_not_use_general_settings',
                'title' =>  _kdn('Use custom general settings?'),
                'info'  =>  _kdn('If you want to specify different settings for this site (not use general settings),
                    check this. When you check this, settings tabs will appear.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_do_not_use_general_settings',
                    'dependants'    => '["[data-tab=\'#tab-general-settings\']"]',
                ])
            </div>
        </td>
    </tr>

    {{-- USE CUSTOM HEADERS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_custom_headers',
                'title' =>  _kdn('Custom HEADERs?'),
                'info'  =>  _kdn('If you want to customize the HEADERs which are transmitted in each URL query request, check this.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_custom_headers',
                    'dependants'    => '[
                        "#category-custom-headers",
                        "#post-custom-headers",
                        "#post-ajax-headers-selectors",
                        "#post-ajax-custom-headers",
                        "#child-post-custom-headers",
                        "#child-post-ajax-headers-selectors",
                        "#child-post-ajax-custom-headers"
                    ]',
                ])
            </div>
        </td>
    </tr>

    {{-- COOKIES --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_cookies',
                'title' => _kdn('Cookies'),
                'info'  => _kdn('You can provide cookies that will be attached to every request. For example, you can
                    provide a session cookie to crawl a site by a logged-in user.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_parse_cookies',
                'placeholder'   =>  _kdn('Parse cookies from string as: name1=value1; name2=value2;...'),
                'rows'          =>  4,
                'addon'         =>  'dashicons dashicons-networking',
                'addonTitle'    => _kdn('Parse cookies'),
                'test'          =>  true,
                'addonClasses'  => 'parse-cookies',
            ])
            @include('form-items/multiple', [
                'include'           => 'form-items/key-value',
                'name'              => '_cookies',
                'addKeys'           => true,
                'keyPlaceholder'    => _kdn('Cookie name'),
                'valuePlaceholder'  => _kdn('Cookie content'),
                'class'             => 'cookies-container'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: SETTINGS PAGE --}}
    @include('partials.table-section-title', ['title' => _kdn("Settings Page")])

    {{-- USE CACHE FOR TEST URLS --}}
    @include('form-items.combined.checkbox-with-label', [
        'name' => '_cache_test_url_responses',
        'title' => _kdn('Use cache for test URLs'),
        'info' => _kdn('Check this if you want the plugin to cache the responses retrieved from the test URLs. By this
            way, you can test faster and send less number of requests to the target site. Caching will only be done for
            the tests done here in site settings.'),
    ])

    {{-- FIX TABS --}}
    @include('form-items.combined.checkbox-with-label', [
        'name' => '_fix_tabs',
        'title' => _kdn('Fix tabs when page is scrolled down'),
        'info' => _kdn('Check this if you want to fix the tabs at the top of the page when the page is scrolled down.'),
    ])

    {{-- FIX CONTENT NAVIGATION --}}
    @include('form-items.combined.checkbox-with-label', [
        'name' => '_fix_content_navigation',
        'title' => _kdn('Fix content navigation when page is scrolled down'),
        'info' => _kdn('Check this if you want to fix the content navigation at the top of the page when the page is
            scrolled down.'),
    ])

    <?php

    /**
     * Fires before closing table tag in main tab of site settings page.
     *
     * @param array $settings   Existing settings and their values saved by user before
     * @param int $postId       ID of the site
     * @since 1.6.3
     */
    do_action('kdn/view/site-settings/tab/main', $settings, $postId);

    ?>

</table>