<div class="kdn-settings-title">
    <h3>{{ _kdn('Category Page Settings') }}</h3>
    <span>{{ _kdn('Category mapping and other settings to be used when crawling category pages') }}</span>
</div>

{{-- SECTION NAVIGATION --}}
@include('partials.tab-section-navigation')

<table class="kdn-settings">
    {{-- CATEGORY LIST PAGE URL --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_category_list_page_url',
                'title' => _kdn('Category List Page URL'),
                'info'  => _kdn('The URL to get category links from. The page should include a container having category URLs.
                    This will be used to automatically insert category URLs for category map.'),
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_category_list_page_url', 'type' => 'url'])</td>
    </tr>

    {{-- SECTION: CATEGORY --}}
    @include('partials.table-section-title', ['title' => _kdn("Category")])

    {{-- CATEGORY LIST URL SELECTOR --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_category_list_url_selectors',
                'title' =>  _kdn('Category List URL Selectors'),
                'info'  =>  _kdn('CSS selectors for category links. This is used to get category URLs automatically for category map.
                    Gets "href" attributes of "a" tags. E.g. <span class="highlight selector">.top-level-navigation ul > li > a</span>.
                    Before using the insert button, make sure you filled the category list page URL.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_category_list_url_selectors',
                'addon'         =>  'dashicons dashicons-plus',
                'addonTitle'    =>  _kdn('Find and add category links for mapping'),
                'addonClasses'  =>  'kdn-category-map',
                'data'          =>  [
                    'urlSelector'   =>  "#_category_list_page_url",
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'targetTag'     =>  'a',
                    'attr'          =>  'href',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'href'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CATEGORY MAP TODO: Add a different type of options box that has settings related to categories, such as assigning a different author, selecting more than one category, etc. --}}
    <tr>
        <td>
            @include('form-items/label', [
                'title' =>  _kdn('Category Map'),
                'info'  =>  _kdn('Map the categories to target site\'s URLs. You can write the URLs relative to the
                    main site URL. E.g. <span class="highlight url">/category/art</span>. Category URLs should
                    be added once, no duplicates allowed. <b>Note that</b> changing category map will clear the
                    post URLs waiting to be saved.')
            ])
        </td>
        <td id="category-map">
            @include('form-items/multiple', [
                'include'       =>  'form-items/category-map',
                'name'          =>  '_category_map',
                'placeholder'   =>  _kdn('Category URL'),
                'categories'    =>  $categories,
                'data'          =>  [
                    'urlSelector'       =>  "input",
                    'closest_inside'    =>  true,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_HREF,
                ],
                'addKeys'       =>  true,
            ])
        </td>
    </tr>

    {{-- TEST CATEGORY URL --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_test_url_category',
                'title' =>  _kdn('Test Category URL'),
                'info'  =>  _kdn('A full category URL to be used to perform the tests for category page CSS selectors.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_test_url_category', 'type' => 'url'])</td>
    </tr>

    {{-- CUSTOM HEADERs --}}
    <tr id="category-custom-headers">
        <td>
            @include('form-items/label', [
                'for'   =>  '_category_custom_headers',
                'title' =>  _kdn('Custom HEADERs'),
                'info'  =>  _kdn('Customize the HEADERs which are transmitted in each URL query request by writing plain text for HEADER and Value.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_category_parse_headers',
                'placeholder'   =>  _kdn("Parse headers from string as:\nHeader1: Value1\nHeader2: Value2\n..."),
                'rows'          =>  4,
                'addonTitle'    => _kdn('Parse headers'),
                'icon'          =>  true,
                'buttonClass'   => 'kdn-icon category-parse-headers',
                'iconClass'     => 'dashicons dashicons-networking',
                'data'          => [
                    'parse_type'    => 'category'
                ]
            ])
            @include('form-items/multiple', [
                'include'           => 'form-items/key-value',
                'name'              => '_category_custom_headers',
                'addKeys'           => true,
                'keyPlaceholder'    => _kdn('HEADER'),
                'valuePlaceholder'  => _kdn('Value'),
                'class'             => 'headers-container'
            ])
        </td>
    </tr>

    {{-- CUSTOM METHOD --}}
    <tr id="category-custom-method">
        <td>
            @include('form-items/label', [
                'for'   => '_category_custom_method',
                'title' => _kdn('Request method'),
                'info'  => _kdn('You can customize the method to request the target URL by writing rules to the <b>Matches</b> field and the method into the <b>Method</b> field. If the target URL that match (or negate match) these rules, the correspond request method will be applied. If you want to parse parameters of target URL as array, write the started parameter into to <b>Started parameter</b> field. If you give more than one rule, the first match will be used.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/custom-post-method',
                'name'          => '_category_custom_method',
                'addKeys'       => true,
                'regex'         => true,
                'negate'        => true,
                'placeholder1'  => 'Method',
                'placeholder2'  => 'Matches'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CATEGORY POST URL SELECTOR --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_category_post_link_selectors',
                'title' =>  _kdn('Category Post URL Selectors'),
                'info'  =>  _kdn('CSS selectors for the post URLs in category pages. Gets "href" attributes of "a" tags.
                    E.g. <span class="highlight selector">article.post > h2 > a</span>. When testing, make sure you
                    filled the category test URL. If you give more than one selector, each selector will be used
                    to get URLs and the results will be combined.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_category_post_link_selectors',
                'addon'         => 'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  "#_test_url_category",
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'targetTag'     =>  'a',
                    'attr'          =>  'href',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'href',
                'optionsBox'    => true,
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- COLLECT URLS IN REVERSE ORDER--}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_category_collect_in_reverse_order',
                'title' =>  _kdn('Collect URLs in reverse order?'),
                'info'  =>  _kdn('When you check this, the URLs found by URL selectors will be ordered in reverse before
                        they are saved into the database. Therefore, the posts will be saved in reverse order for
                        each category page.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name' => '_category_collect_in_reverse_order',
                ])
            </div>
        </td>
    </tr>

    {{-- SECTION: NEXT PAGE --}}
    @include('partials.table-section-title', ['title' => _kdn("Next Page")])

    {{-- CATEGORY NEXT PAGE URL SELECTORS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_category_next_page_selectors',
                'title' => _kdn('Category Next Page URL Selectors'),
                'info'  => _kdn('CSS selectors for next page URL in a category page. Gets "href" attributes of "a" tags.
                    E.g. <span class="highlight selector">.pagination > a.next</span>. When testing, make sure you
                    filled the category test URL. If you give more than one selector, the first
                    match will be used.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_category_next_page_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'           =>  "#_test_url_category",
                    'testType'              =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'                  =>  'href',
                    'targetTag'             =>  'a',
                    'targetCssSelectors'    => ['link[rel="next"]']
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'href',
                'optionsBox'    => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: FEATURED IMAGES --}}
    @include('partials.table-section-title', ['title' => _kdn("Featured Images")])

    {{-- SAVE THUMBNAILS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_category_post_save_thumbnails',
                'class' =>  'label-thumbnail',
                'title' =>  _kdn('Save featured images?'),
                'info'  =>  _kdn('If there are featured images for each post on category page and you want to
                    save the featured images for the posts, check this.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_category_post_save_thumbnails',
                    'dependants'    => '[
                            "#category-post-thumbnail-selectors",
                            "#category-thumbnail-test-url",
                            "#category-thumbnail-find-replace",
                            "#category-post-link-is-before-thumbnail"
                        ]'
                ])
            </div>
        </td>
    </tr>

    {{-- CATEGORY POST THUMBNAIL SELECTORS --}}
    <tr id="category-post-thumbnail-selectors">
        <td>
            @include('form-items/label', [
                'for'   => '_category_post_thumbnail_selectors',
                'class' =>  'label-thumbnail',
                'title' => _kdn('Featured Image Selectors'),
                'info'  => _kdn('CSS selectors for post featured images in a category page. Gets "src" attributes of "img" tags.
                    E.g. <span class="highlight selector">.post-item > img</span>. When testing, make sure you
                    filled the category test URL. If you give more than one selector, the first match will be used.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_category_post_thumbnail_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  "#_test_url_category",
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'targetTag'     =>  'img',
                    'attr'          =>  'src',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'src',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CATEGORY TEST THUMBNAIL IMAGE URL --}}
    <tr id="category-thumbnail-test-url">
        <td>
            @include('form-items/label', [
                'for'   =>  '_test_find_replace_thumbnail_url_cat',
                'class' =>  'label-thumbnail',
                'title' =>  _kdn('Test Featured Image URL'),
                'info'  =>  _kdn('A full image URL to be used to perform tests for the find-replace settings
                    for featured image URL.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_test_find_replace_thumbnail_url_cat'])</td>
    </tr>

    {{-- CATEGORY FIND AND REPLACE FOR THUMBNAIL URL --}}
    <tr id="category-thumbnail-find-replace">
        <td>
            @include('form-items/label', [
                'for'   => '_category_find_replace_thumbnail_url',
                'class' =>  'label-thumbnail',
                'title' => _kdn("Find and replace in featured image URL"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>URL of the
                    featured image</b>, this is the place. The replacement will be done before saving the image.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/find-replace',
                'name'          =>  '_category_find_replace_thumbnail_url',
                'addKeys'       =>  true,
                'remove'        =>  true,
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'subjectSelector'   =>  "#_test_find_replace_thumbnail_url_cat",
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIND_REPLACE,
                ],
                'test'          => true,
                'addonClasses'  => 'kdn-test-find-replace'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CATEGORY POST LINK IS BEFORE THUMBNAIL --}}
    <tr id="category-post-link-is-before-thumbnail">
        <td>
            @include('form-items/label', [
                'for'   =>  '_category_post_is_link_before_thumbnail',
                'class' =>  'label-thumbnail',
                'title' =>  _kdn('Post links come before featured images?'),
                'info'  =>  _kdn("If the links for the posts in the category page come before the featured images,
                    considering the position of the featured image and link in the HTML of the page, check this.")
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_category_post_is_link_before_thumbnail',
                ])
            </div>
        </td>
    </tr>

    {{-- MANIPULATE HTML --}}
    @include('site-settings.partial.html-manipulation-inputs', [
        "keyTestUrl"                        => "_test_url_category",
        "keyTestFindReplace"                => "_test_find_replace_first_load_cat",
        "keyFindReplaceRawHtml"             => "_category_find_replace_raw_html",
        "keyFindReplaceFirstLoad"           => "_category_find_replace_first_load",
        "keyFindReplaceElementAttributes"   => "_category_find_replace_element_attributes",
        "keyExchangeElementAttributes"      => "_category_exchange_element_attributes",
        "keyRemoveElementAttributes"        => "_category_remove_element_attributes",
        "keyFindReplaceElementHtml"         => "_category_find_replace_element_html"
    ])

    {{-- SECTION: UNNECESSARY ELEMENTS --}}
    @include('partials.table-section-title', ['title' => _kdn("Unnecessary Elements")])

    {{-- UNNECESSARY CATEGORY ELEMENT SELECTORS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'title' =>  _kdn('Unnecessary Element Selectors'),
                'info'  =>  _kdn('CSS selectors for unwanted elements in the category page. Specified elements will be
                    removed from the HTML of the page. Content extraction will be done after the page is cleared
                    from unnecessary elements.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector',
                'name'          => '_category_unnecessary_element_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'addonTitle'    =>  'test',
                'data'          =>  [
                    'urlSelector'   =>  "#_test_url_category",
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

    {{-- SECTION: NOTIFICATIONS --}}
    @include('partials.table-section-title', ['title' => _kdn("Notifications")])

    {{-- EMPTY VALUE NOTIFICATION --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_category_notify_empty_value_selectors',
                'title' => _kdn('CSS selectors for empty value notification'),
                'info'  => _kdn('Write CSS selectors and their attributes you want to retrieve. If the retrieved value
                        is empty, you will be notified via email. These CSS selectors will be tried to be retrieved
                        after all replacements are applied.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_category_notify_empty_value_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  "#_test_url_category",
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'          =>  'text'
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'text',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    <?php

    /**
     * Fires before closing table tag in category tab of site settings page.
     *
     * @param array $settings   Existing settings and their values saved by user before
     * @param int $postId       ID of the site
     * @since 1.6.3
     */
    do_action('kdn/view/site-settings/tab/category', $settings, $postId);

    ?>

</table>