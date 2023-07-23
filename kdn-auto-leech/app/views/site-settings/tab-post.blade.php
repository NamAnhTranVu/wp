<div class="kdn-settings-title">
    <h3>{{ _kdn('Post Page Settings') }}</h3>
    <span>{{ _kdn('Selectors and options to be used when crawling post pages') }}</span>
</div>

{{-- SECTION NAVIGATION --}}
@include('partials.tab-section-navigation')

<?php

// URL selector for all inputs that require a $urlSelector parameter.
$urlSelector        = '#_test_url_post';
$urlAjaxSelector    = '#_test_url_post_ajax';

?>

<table class="kdn-settings">
    {{-- TEST POST URL --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_test_url_post',
                'title' =>  _kdn('Test Post URL'),
                'info'  =>  _kdn('A full post URL to be used to perform the tests for post page CSS selectors.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_test_url_post', 'type' => 'url'])</td>
    </tr>

    {{-- CUSTOM HEADERs --}}
    <tr id="post-custom-headers">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_custom_headers',
                'title' =>  _kdn('Custom HEADERs'),
                'info'  =>  _kdn('Customize the HEADERs which are transmitted in each URL query request by writing plain text for HEADER and Value.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_post_parse_headers',
                'placeholder'   =>  _kdn("Parse headers from string as:\nHeader1: Value1\nHeader2: Value2\n..."),
                'rows'          =>  4,
                'addonTitle'    => _kdn('Parse headers'),
                'icon'          =>  true,
                'buttonClass'   => 'kdn-icon post-parse-headers',
                'iconClass'     => 'dashicons dashicons-networking',
                'data'          => [
                    'parse_type'    => 'post'
                ]
            ])
            @include('form-items/multiple', [
                'include'           => 'form-items/key-value',
                'name'              => '_post_custom_headers',
                'addKeys'           => true,
                'keyPlaceholder'    => _kdn('HEADER'),
                'valuePlaceholder'  => _kdn('Value'),
                'class'             => 'headers-container'
            ])
        </td>
    </tr>

    {{-- CUSTOM METHOD --}}
    <tr id="post-custom-method">
        <td>
            @include('form-items/label', [
                'for'   => '_post_custom_method',
                'title' => _kdn('Request method'),
                'info'  => _kdn('You can customize the method to request the target URL by writing rules to the <b>Matches</b> field and the method into the <b>Method</b> field. If the target URL that match (or negate match) these rules, the correspond request method will be applied. If you want to parse parameters of target URL as array, write the started parameter into to <b>Started parameter</b> field. If you give more than one rule, the first match will be used.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/custom-post-method',
                'name'          => '_post_custom_method',
                'addKeys'       => true,
                'regex'         => true,
                'negate'        => true,
                'placeholder1'  => 'Method',
                'placeholder2'  => 'Matches'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: AJAX --}}
    @include('partials.table-section-title', ['title' => _kdn("Ajax")])

    {{-- ACTIVE POST AJAX --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_ajax',
                'class' =>  'label-ajax',
                'title' =>  _kdn('Active for post ajax?'),
                'info'  =>  _kdn('Check this if you want to crawl data from ajax URLs in post page.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_ajax',
                    'dependants'    => '[
                        "#post-ajax"
                    ]'
                ])
            </div>
        </td>
    </tr>

    <tbody id="post-ajax">
        {{-- POST AJAX URL SELECTORS --}}
        <tr id="post-ajax-selectors">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_post_ajax_url_selectors',
                    'title' =>  _kdn('Ajax URL Selectors'),
                    'info'  =>  _kdn('CSS selectors for ajax URLs. By default, this gets "href" of the specified elements. You can also use any attribute of the elements. If you give more than one selector, the first match of each selector will be used.')
                ])
            </td>
            <td>
                @include('form-items/multiple', [
                    'include'       => 'form-items/selector-with-attribute',
                    'name'          => '_post_ajax_url_selectors',
                    'addon'         =>  'dashicons dashicons-search',
                    'data'          =>  [
                        'urlSelector'   =>  $urlSelector,
                        'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                        'attr'          =>  'href'
                    ],
                    'test'          => true,
                    'addKeys'       => true,
                    'addonClasses'  => 'kdn-test-selector-attribute',
                    'defaultAttr'   => 'href',
                    'optionsBox'    => true,
                    'method'        => true
                ])
                @include('partials/test-result-container')
            </td>
        </tr>

        {{-- CUSTOM POST AJAX URL --}}
        <tr>
            <td>
                @include('form-items/label', [
                    'for'   =>  '_post_custom_ajax_url',
                    'title' =>  _kdn('Custom Ajax URL'),
                    'info'  =>  _kdn('Write the full custom Ajax URLs. These are will be crawled after the Ajax URLs found by selectors are crawled.')
                ])
            </td>
            <td>
                @include('form-items/multiple', [
                    'include'       => 'form-items/custom-post-ajax-url',
                    'name'          => '_post_custom_ajax_url',
                    'addKeys'       => true,
                    'placeholder1'  => 'Method',
                    'placeholder2'  => 'URL'
                ])
            </td>
        </tr>

        {{-- TEST POST AJAX URL --}}
        <tr class="test-url-ajax">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_test_url_post_ajax',
                    'title' =>  _kdn('Test Ajax URL'),
                    'info'  =>  _kdn('A full ajax URL to be used to perform the tests for ajax page CSS selectors.')
                ])
            </td>
            <td>
                @include('form-items/text', [
                    'name'          => '_test_url_post_ajax_parse',
                    'type'          => 'text',
                    'placeholder'   => 'Started parameter'
                ])
                @include('form-items/text', [
                    'name'          => '_test_url_post_ajax_method',
                    'type'          => 'text',
                    'placeholder'   => 'Method'
                ])
                @include('form-items/text', [
                    'name'          => '_test_url_post_ajax',
                    'type'          => 'url',
                    'placeholder'   => 'URL'
                ])
            </td>
        </tr>

        {{-- CUSTOM HEADERs SELECTORS --}}
        <tr id="post-ajax-headers-selectors">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_post_ajax_headers_selectors',
                    'title' =>  _kdn('Custom HEADERs Selectors'),
                    'info'  =>  _kdn('CSS selectors for custom HEADERs. By default, this gets "text" of the specified elements. You can also use any attribute of the elements. If you give more than one selector, the first match of each selector will be used.')
                ])
            </td>
            <td>
                @include('form-items/multiple', [
                    'include'       =>  'form-items/selector-with-attribute-assign',
                    'name'          =>  '_post_ajax_headers_selectors',
                    'addon'         =>  'dashicons dashicons-search',
                    'data'          =>  [
                        'urlSelector'       =>  $urlSelector,
                        'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                        'attr'              =>  'text',
                        'requiredSelectors' =>  $urlSelector
                    ],
                    'test'              => true,
                    'addKeys'           => true,
                    'addonClasses'      => 'kdn-test-selector-attribute-assign',
                    'defaultAttr'       => 'text',
                    'optionsBox'        => true,
                    'assign'            => 'header',
                    'valuePlaceholder'  => 'HEADER'
                ])
                @include('partials/test-result-container')
            </td>
        </tr>

        {{-- CUSTOM HEADERs --}}
        <tr id="post-ajax-custom-headers">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_post_ajax_custom_headers',
                    'title' =>  _kdn('Custom HEADERs'),
                    'info'  =>  _kdn('Customize the HEADERs which are transmitted in each URL query request by writing plain text for HEADER and Value.')
                ])
            </td>
            <td>
                @include('form-items/textarea', [
                    'name'          =>  '_post_ajax_parse_headers',
                    'placeholder'   =>  _kdn("Parse headers from string as:\nHeader1: Value1\nHeader2: Value2\n..."),
                    'rows'          =>  4,
                    'addonTitle'    => _kdn('Parse headers'),
                    'icon'          =>  true,
                    'buttonClass'   => 'kdn-icon post-ajax-parse-headers',
                    'iconClass'     => 'dashicons dashicons-networking',
                    'data'          => [
                        'parse_type'    => 'post_ajax'
                    ]
                ])
                @include('form-items/multiple', [
                    'include'           => 'form-items/key-value',
                    'name'              => '_post_ajax_custom_headers',
                    'addKeys'           => true,
                    'keyPlaceholder'    => _kdn('HEADER'),
                    'valuePlaceholder'  => _kdn('Value'),
                    'class'             => 'headers-container'
                ])
            </td>
        </tr>

        {{-- MANIPULATE HTML --}}
        @include('site-settings.partial.html-manipulation-inputs', [
            "hideSectionTitle"                  => true,
            "keyTestUrl"                        => "_test_url_post_ajax",
            "keyTestFindReplace"                => "_post_ajax_test_find_replace_first_load",
            "keyFindReplaceRawHtml"             => "_post_ajax_find_replace_raw__html",
            "keyFindReplaceFirstLoad"           => "_post_ajax_find_replace_first__load",
            "keyFindReplaceElementAttributes"   => "_post_ajax_find_replace_element__attributes",
            "keyExchangeElementAttributes"      => "_post_ajax_exchange_element__attributes",
            "keyRemoveElementAttributes"        => "_post_ajax_remove_element__attributes",
            "keyFindReplaceElementHtml"         => "_post_ajax_find_replace_element__html"
        ])

        {{-- UNNECESSARY POST ELEMENT SELECTORS --}}
        <tr>
            <td>
                @include('form-items/label', [
                    'for'   => '_post_ajax_unnecessary_element__selectors',
                    'title' =>  _kdn('Unnecessary Element Selectors'),
                    'info'  =>  _kdn('CSS selectors for unwanted elements in the ajax page. Specified elements will be removed from the HTML of the page. Content extraction will be done after the page is cleared from unnecessary elements.')
                ])
            </td>
            <td>
                @include('form-items/multiple', [
                    'include'       => 'form-items/selector',
                    'name'          => '_post_ajax_unnecessary_element__selectors',
                    'addon'         =>  'dashicons dashicons-search',
                    'addonTitle'    =>  'test',
                    'data'          =>  [
                        'urlSelector'   =>  $urlAjaxSelector,
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

        {{-- EMPTY VALUE NOTIFICATION --}}
        <tr>
            <td>
                @include('form-items/label', [
                    'for'   => '_post_ajax_notify_empty_value_selectors',
                    'title' => _kdn('CSS selectors for empty value notification'),
                    'info'  => _kdn('Write CSS selectors and their attributes you want to retrieve. If the retrieved value
                        is empty, you will be notified via email. These CSS selectors will be tried to be retrieved
                        after all replacements are applied.')
                ])
            </td>
            <td>
                @include('form-items/multiple', [
                    'include'       => 'form-items/selector-with-attribute',
                    'name'          => '_post_ajax_notify_empty_value_selectors',
                    'addon'         =>  'dashicons dashicons-search',
                    'data'          =>  [
                        'urlSelector'   =>  $urlAjaxSelector,
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
    </tbody>

    {{-- SECTION: CONTENT --}}
    @include('partials.table-section-title', ['title' => _kdn("Content")])

    {{-- POST FORMAT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_format',
                'title' =>  _kdn('Post Format'),
                'info'  =>  _kdn('Set post format for the posts.')
            ])
        </td>
        <td>
            @include('form-items/select', [
                'name'      =>  '_post_format',
                'options'   =>  $postFormats,
            ])
        </td>
    </tr>

    {{-- POST TITLE SELECTOR --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_title_selectors',
                'title' =>  _kdn('Post Title Selectors'),
                'info'  =>  _kdn('CSS selectors for post title. E.g. <span class="highlight selector">h1</span>. This
                    gets text of the specified element. If you give more than one selector, the first match will
                    be used.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_title_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'           =>  $urlSelector,
                    'testType'              =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'targetCssSelectors'    => ['h1'],
                    'attr'                  => 'text'
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'text',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- POST EXCERPT SELECTOR --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_excerpt_selectors',
                'title' =>  _kdn('Post Excerpt Selectors'),
                'info'  =>  _kdn('CSS selectors for the post excerpt, if exists. E.g. <span class="highlight selector">p.excerpt</span>.
                    This gets html of the specified element. If you give more than one selector, the first match will
                    be used.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_excerpt_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'          => 'html',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'html',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- POST CONTENT SELECTORS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_content_selectors',
                'title' =>  _kdn('Post Content Selectors'),
                'info'  =>  _kdn('CSS selectors for the post content. This gets HTML of specified element. E.g.
                    <span class="highlight selector">.post-content > p</span>. If you give more than one selector,
                    each match will be crawled and the results will be merged.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/selector-with-attribute',
                'name'          =>  '_post_content_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'          => 'html',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'html',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- POST TAG SELECTORS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_tag_selectors',
                'title' =>  _kdn('Post Tag Selectors'),
                'info'  =>  _kdn('CSS selectors for post tags. By default, this gets "text" of the specified
                    elements. You can also use any attribute of the elements. If you give more than one selector,
                    the results will be combined to create post tags.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_tag_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'          =>  'text'
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'text',
                'optionsBox'    => true,
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- POST SLUG SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_post_slug_selectors',
        'title'         => _kdn('Post Slug (Permalink) Selectors'),
        'info'          => _kdn('CSS selectors for post slug. The slug is the post name in the URL of the saved post.
                            If the slug is not unique, a unique slug will be generated from the found slug. If a slug
                            is not found, the slug will automatically be generated from the post title.')
                            . ' ' . _kdn_trans_multiple_selectors_first_match(),
        'optionsBox'    => true,
        'urlSelector'   => $urlSelector,
    ])

    {{-- SECTION: CATEGORY --}}
    @include('partials.table-section-title', ['title' => _kdn("Category")])

    {{-- CATEGORY NAME SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_post_category_name_selectors',
        'title'         => _kdn('Category Name Selectors'),
        'info'          => _kdn("CSS selectors for category names. Found names will be used to assign the post's
            categories. If a category with a found name does not exist, it will be created. This gets text of the found
            element by default."),
        'optionsBox'    => true,
    ])

    {{-- ADD ALL FOUND CATEGORY NAMES --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_post_category_add_all_found_category_names',
        'title' => _kdn('Add all found category names?'),
        'info'  => _kdn("Check this if you want to add all categories found by category name selectors. Otherwise,
            when there are multiple selectors, only the results of the first match will be used."),
    ])

    {{-- CATEGORY NAME SEPARATORS --}}
    @include('form-items.combined.multiple-text-with-label', [
        'name'          => '_post_category_name_separators',
        'title'         => _kdn('Category Name Separators'),
        'info'          => _kdn("Set separators for category names. For example, if a category name selector finds
            'shoes, women, casual', when you add ',' as separator, there will be three categories as
            'shoes', 'women', and 'casual'. Otherwise, the category name will be 'shoes, women, casual'. If you add
            more than one separator, all will be applied."),
        'placeholder'   => _kdn('Separator...')
    ])

    {{-- HIERARCHICAL CATEGORIES --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_post_category_add_hierarchical',
        'title' => _kdn('Add as subcategories?'),
        'info'  => _kdn("When you check this, if there are more than one category name found by a single selector input,
            each category name that comes after a category name in the found category names will be considered as the
            previous category name's child category. This option applies to a single selector input. When there are
            multiple selector inputs, their results will <b>not</b> be combined to create a subcategory hierarchy. As an
            example, let's say a selector found three category names as 'shoes', 'women', and 'casual'. When you check
            this option, the post will be in 'shoes > women > casual' category. However, if these three categories
            are found by three different selectors, the post will have 'shoes', 'women', and 'casual' categories
            separately, not hierarchically. If you do not want to create a subcategory hierarchy, do not check this.
            When you check this, all categories will be added under the category defined in the category map."),
    ])

    {{-- DO NOT ADD THE CATEGORY DEFINED IN CATEGORY MAP --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_post_category_do_not_add_category_in_map',
        'title' => _kdn('Do not add the category defined in the category map?'),
        'info'  => _kdn("Check this if you do not want the post to have the category defined in the category map.
            This option will be applied only if at least one category is found by category name selectors."),
    ])

    {{-- VIEWS FOR THE POST DETAIL OPTIONS. The views are registered in BasePostDetailFactory. --}}
    {!! $postDetailSettingsViews !!}

    {{-- SECTION: DATE --}}
    @include('partials.table-section-title', ['title' => _kdn("Date")])

    {{-- POST DATE SELECTORS. --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_date_selectors',
                'title' =>  _kdn('Post Date Selectors'),
                'info'  =>  sprintf(_kdn('CSS selectors for post date.
                    E.g. <span class="highlight selector">[itemprop="datePublished"]</span>. If you give more than one
                    selector, then the first match will be used. Found date will be parsed by %1$s function. So, if
                    the date found by the selectors cannot be parsed properly, you need to use find-and-replace options
                    to change the date into a suitable format. Generally, sites show the date via meta tags in a format
                    like %2$s. This format will be parsed without any issues.'),
                    '<a target="_blank" href="http://php.net/manual/en/function.strtotime.php">strtotime</a>',
                    '<b>2017-02-27T05:00:17-05:00</b>'
                )
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_date_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'           =>  $urlSelector,
                    'urlAjaxSelector'       =>  $urlAjaxSelector,
                    'testType'              =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'                  =>  'content',
                    'targetCssSelectors'    =>  [
                        'meta[itemprop="datePublished"]',
                        'meta[itemprop="dateCreated"]',
                        'time.published',
                        'time.entry-date'
                    ],
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'content',
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- TEST DATE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_test_find_replace_date',
                'title' =>  _kdn('Test Date'),
                'info'  =>  _kdn('A date to be used to perform tests for the find-replace settings for dates.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_test_find_replace_date'])</td>
    </tr>

    {{-- FIND AND REPLACE FOR DATES --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_find_replace_date',
                'title' => _kdn("Find and replace in dates"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>found post dates</b>,
                    this is the place. The replacement will be done before parsing the date.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/find-replace',
                'name'          =>  '_post_find_replace_date',
                'addKeys'       =>  true,
                'remove'        =>  true,
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'subjectSelector'   =>  "#_test_find_replace_date",
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIND_REPLACE,
                ],
                'test'          => true,
                'addonClasses'  => 'kdn-test-find-replace'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- MINUTES TO ADD TO THE DATE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_date_add_minutes',
                'title' =>  _kdn('Minutes that should be added to the final date'),
                'info'  =>  sprintf(_kdn('How many minutes should be added to the final date of the post. If the final date
                    becomes greater than now, the post will be scheduled. If you write a negative number, it will be
                    subtracted from the date. Write comma-separated numbers to randomize. You can write the same number
                    multiple times to increase its chance to be selected. <b>This setting will be applied even if you do
                    not supply any date selectors.</b> Example values: <b>%1$s</b> or <b>%2$s</b>'),
                        "10",
                        "10, -10, 25, 25, 25"
                )
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_post_date_add_minutes'])</td>
    </tr>

    {{-- SECTION: META --}}
    @include('partials.table-section-title', ['title' => _kdn("Meta")])

    {{-- SAVE META KEYWORDS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_meta_keywords',
                'class' =>  'label-meta',
                'title' =>  _kdn('Save meta keywords?'),
                'info'  =>  _kdn('Check this if you want to save meta keywords of the target post.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_meta_keywords',
                    'dependants'    => '["#meta-keywords-as-tags"]'
                ])
            </div>
        </td>
    </tr>

    {{-- ADD META KEYWORDS AS TAGS --}}
    <tr id="meta-keywords-as-tags">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_meta_keywords_as_tags',
                'class' =>  'label-meta',
                'title' =>  _kdn('Add meta keywords as tags?'),
                'info'  =>  _kdn('Check this if you want each meta keyword should be added as tag to the crawled post.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_meta_keywords_as_tags',
                ])
            </div>
        </td>
    </tr>

    {{-- SAVE META DESCRIPTION --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_meta_description',
                'class' =>  'label-meta',
                'title' =>  _kdn('Save meta description?'),
                'info'  =>  _kdn('Check this if you want to save meta description of the target post.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_meta_description',
                ])
            </div>
        </td>
    </tr>

    {{-- SECTION: FEATURED IMAGE --}}
    @include('partials.table-section-title', ['title' => _kdn("Featured Image")])

    {{-- SAVE THUMBNAIL IMAGE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_save_thumbnails_if_not_exist',
                'class' =>  'label-thumbnail',
                'title' =>  _kdn('Save featured image, if it is not found in category page?'),
                'info'  =>  _kdn('If you want to save an image from post page as featured image, when there is no
                    featured image found in category page, check this.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_save_thumbnails_if_not_exist',
                    'dependants'    => '[
                        "#post-thumbnail-by-first-image",
                        "#post-thumbnail-selectors",
                        "#post-default-thumbnail-id",
                        "#post-default-thumbnail-id-by-keywords",
                        "#post-thumbnail-test-url",
                        "#post-thumbnail-find-replace"
                    ]'
                ])
            </div>
        </td>
    </tr>

    {{-- SET THUMBNAIL BY FIRST IMAGE IN POST CONTENT --}}
    <tr id="post-thumbnail-by-first-image">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_thumbnail_by_first_image',
                'title' =>  _kdn('Set the first image in post content as featured image?'),
                'info'  =>  _kdn('If you want to set the first image in post content as featured image, check this.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name' => '_post_thumbnail_by_first_image'
                ])
            </div>
        </td>
    </tr>

    {{-- THUMBNAIL IMAGE SELECTORS --}}
    <tr id="post-thumbnail-selectors">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_thumbnail_selectors',
                'class' =>  'label-thumbnail',
                'title' =>  _kdn('Featured Image Selectors'),
                'info'  =>  _kdn('CSS selectors for featured image <b>in HTML of the post page</b>. This gets the "src"
                    attribute of <b>the first found element</b>. If you give more than one selector, the first match will
                    be used. E.g. <span class="highlight selector">img.featured</span>')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_thumbnail_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'targetTag'         =>  'img',
                    'attr'              =>  'src',
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'src',
                'optionsBox'    => true,
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- DEFAULT THUMBNAIL IMAGE ID BY KEYWORDS IN TITLE --}}
    <tr id="post-default-thumbnail-id-by-keywords">
        <td>
            @include('form-items/label', [
                'for'   => '_post_default_thumbnail_id_by_keywords',
                'title' => _kdn('Default Featured Image ID by keywords in post title'),
                'info'  => _kdn('Set the featured image by Media ID if matched a keyword in post title. Separate the keywords by vertical lines. If you want to randomize images, separate the Media IDs by commas. Note that you must upload images to <b>Media</b> without any uppercase characters in the file name. If you give more than one case, the first match will be used.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'           => 'form-items/key-value',
                'name'              => '_post_default_thumbnail_id_by_keywords',
                'addKeys'           => true,
                'keyPlaceholder'    => _kdn('Keywords (Separate by vertical lines)'),
                'valuePlaceholder'  => _kdn('Media IDs (Separate by commas)'),
            ])
        </td>
    </tr>

    {{-- DEFAULT THUMBNAIL IMAGE ID --}}
    <tr id="post-default-thumbnail-id">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_default_thumbnail_id',
                'class' =>  'label-thumbnail',
                'title' =>  _kdn('Default Featured Image ID'),
                'info'  =>  _kdn('Set the featured image by Media ID. If you want to randomize images, separate the Media IDs by commas. Note that you must upload images to <b>Media</b> without any uppercase characters in the file name.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_post_default_thumbnail_id', 'placeholder' => _kdn('Comma-separated IDs')])</td>
    </tr>

    {{-- TEST THUMBNAIL IMAGE URL --}}
    <tr id="post-thumbnail-test-url">
        <td>
            @include('form-items/label', [
                'for'   =>  '_test_find_replace_thumbnail_url',
                'class' =>  'label-thumbnail',
                'title' =>  _kdn('Test Featured Image URL'),
                'info'  =>  _kdn('A full image URL to be used to perform tests for the find-replace settings
                    for featured image URL.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_test_find_replace_thumbnail_url'])</td>
    </tr>

    {{-- FIND AND REPLACE FOR THUMBNAIL URL --}}
    <tr id="post-thumbnail-find-replace">
        <td>
            @include('form-items/label', [
                'for'   => '_post_find_replace_thumbnail_url',
                'class' =>  'label-thumbnail',
                'title' => _kdn("Find and replace in featured image URL"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>URL of the
                    featured image</b>, this is the place. The replacement will be done before saving the image.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/find-replace',
                'name'          =>  '_post_find_replace_thumbnail_url',
                'addKeys'       =>  true,
                'remove'        =>  true,
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'subjectSelector'   =>  "#_test_find_replace_thumbnail_url",
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIND_REPLACE,
                ],
                'test'          => true,
                'addonClasses'  => 'kdn-test-find-replace'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: IMAGES --}}
    @include('partials.table-section-title', ['title' => _kdn("Images")])

    {{-- SAVE ALL IMAGES IN CONTENT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_save_all_images_in_content',
                'class' =>  'label-save-images',
                'title' =>  _kdn('Save all images in the post content?'),
                'info'  =>  sprintf(_kdn('If you want all the images in the post content to be saved as media and included in
                    the post from your server, check this. <b>This is the same as checking "save images as media" and
                    writing %1$s to the image selectors. </b>'),
                        '<b><span class="highlight selector">img</span></b>'
                    ) . " " . _kdn_trans_save_image_note()
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name' => '_post_save_all_images_in_content',
                ])
            </div>
        </td>
    </tr>

    {{-- SAVE IMAGES AS MEDIA --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_save_images_as_media',
                'class' =>  'label-save-images',
                'title' =>  _kdn('Save images as media?'),
                'info'  =>  _kdn('If you want the images in the post content to be saved as media and included in
                    the post from your server, check this.') . " " .  _kdn_trans_save_image_note()
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_save_images_as_media',
                    'dependants'    => '[
                        "#post-save-images-as-gallery",
                        "#post-image-selectors",
                        "#post-image-add-link"
                    ]'
                ])
            </div>
        </td>
    </tr>

    {{-- SAVE IMAGES AS GALLERY --}}
    <tr id="post-save-images-as-gallery">
        <td colspan="2">

            {{-- INNER TABLE FOR GALLERY SETTINGS --}}
            <table class="kdn-settings">
                {{-- SAVE IMAGES AS GALLERY --}}
                <tr>
                    <td>
                        @include('form-items/label', [
                            'for'   =>  '_post_save_images_as_gallery',
                            'class' =>  'label-gallery',
                            'title' =>  _kdn('Save images as gallery?'),
                            'info'  =>  _kdn('If you want to save specific images as a gallery, check this.')
                        ])
                    </td>
                    <td>
                        <div class="inputs">
                            @include('form-items/checkbox', [
                                'name'          => '_post_save_images_as_gallery',
                                'dependants'    => '[
                                    "#post-gallery-image-selectors",
                                    "#post-gallery-save-as-woocommerce-gallery",
                                    "#post-template-save-images-as-gallery"
                                ]'
                            ])
                        </div>
                    </td>
                </tr>

                {{-- GALLERY IMAGE SELECTORS --}}
                <tr id="post-gallery-image-selectors">
                    <td>
                        @include('form-items/label', [
                            'for'   =>  '_post_gallery_image_selectors',
                            'class' =>  'label-gallery',
                            'title' =>  _kdn('Gallery Image URL Selectors'),
                            'info'  =>  _kdn('CSS selectors for <b>image URLs in the HTML of the page</b>. This gets the
                                "src" attribute of specified element by default. If you give more than one selector, each
                                match will be used when saving images and creating the gallery.')
                        ])
                    </td>
                    <td>
                        @include('form-items/multiple', [
                            'include'       => 'form-items/selector',
                            'name'          => '_post_gallery_image_selectors',
                            'addon'         =>  'dashicons dashicons-search',
                            'data'          =>  [
                                'urlSelector'   =>  $urlSelector,
                                'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                                'attr'          =>  'src',
                                'targetTag'     =>  'img',
                            ],
                            'test'          => true,
                            'addKeys'       => true,
                            'addonClasses'  => 'kdn-test-selector',
                            'optionsBox'    => true,
                        ])
                        @include('partials/test-result-container')
                    </td>
                </tr>

                {{-- SAVE IMAGES AS WOOCOMMERCE PRODUCT GALLERY --}}
                @if(class_exists("WooCommerce"))
                    <tr id="post-gallery-save-as-woocommerce-gallery">
                        <td>
                            @include('form-items/label', [
                                'for'   =>  '_post_save_images_as_woocommerce_gallery',
                                'class' =>  'label-gallery',
                                'title' =>  _kdn('Save images as WooCommerce product gallery?'),
                                'info'  =>  _kdn("If you set post type as WooCommerce product and you want to save
                                    the gallery as the product's gallery, check this.")
                            ])
                        </td>
                        <td>
                            <div class="inputs">
                                @include('form-items/checkbox', [
                                    'name'          => '_post_save_images_as_woocommerce_gallery'
                                ])
                            </div>
                        </td>
                    </tr>
                @endif
            </table>
        </td>

    </tr>

    {{-- IMAGE SELECTORS --}}
    <tr id="post-image-selectors">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_image_selectors',
                'class' =>  'label-save-images',
                'title' =>  _kdn('Image URL Selectors'),
                'info'  =>  _kdn('CSS selectors for images <b>in the post content</b>. This gets the "src" attribute of
                    specified element. If you give more than one selector, each match will be used when saving
                    images. E.g. <b><span class="highlight selector">img</span> will save all images in the post content.</b>')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector',
                'name'          => '_post_image_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'targetTag'     =>  'img',
                    'attr'          =>  'src',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector',
                'optionsBox'    => true,
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- TEST IMAGE URL --}}
    <tr id="post-image-test-url">
        <td>
            @include('form-items/label', [
                'for'   =>  '_test_find_replace_image_urls',
                'class' =>  'label-save-images',
                'title' =>  _kdn('Test Image URL'),
                'info'  =>  _kdn('A full image URL to be used to perform tests for the find-replace settings for image URLs.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_test_find_replace_image_urls'])</td>
    </tr>

    {{-- FIND AND REPLACE FOR IMAGE URLS --}}
    <tr id="post-image-find-replace">
        <td>
            @include('form-items/label', [
                'for'   => '_post_find_replace_image_urls',
                'class' =>  'label-save-images',
                'title' => _kdn("Find and replace in image URLs"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>URLs of the
                    found images</b>, this is the place. The replacement will be done before saving the image.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/find-replace',
                'name'          =>  '_post_find_replace_image_urls',
                'addKeys'       =>  true,
                'remove'        =>  true,
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'subjectSelector'   =>  "#_test_find_replace_image_urls",
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIND_REPLACE,
                ],
                'test'          => true,
                'addonClasses'  => 'kdn-test-find-replace'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: DIRECT FILES --}}
    @include('partials.table-section-title', ['title' => _kdn("Direct files")])

    {{-- SAVE DIRECT FILES --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_save_direct_files',
                'class' =>  'label-thumbnail',
                'title' =>  _kdn('Save direct files?'),
                'info'  =>  _kdn('If you want to save the direct files from post page, check this.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_save_direct_files',
                    'dependants'    => '[
                        "#post-direct-file-selectors",
                        "#post-template-save-direct-files"
                    ]'
                ])
            </div>
        </td>
    </tr>

    {{-- DIRECT FILE SELECTORS --}}
    <tr id="post-direct-file-selectors">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_direct_file_selectors',
                'class' =>  'label-direct-file',
                'title' =>  _kdn('Direct File URL Selectors'),
                'info'  =>  _kdn('CSS selectors for direct file URLs in the post page. By default will use the "src" attribute of specified element. You can write "href", "text" or an attribute of the target element for attribute input. If you give more than one selector, each match will be used when saving direct files.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_direct_file_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'targetTag'         =>  'img',
                    'attr'              =>  'src',
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'src',
                'optionsBox'    => true,
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: CUSTOM SHORT CODES --}}
    @include('partials.table-section-title', ['title' => _kdn("Custom Short Codes")])

    {{-- CUSTOM CONTENT SELECTORS WITH SHORTCODES --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_custom_content_shortcode_selectors',
                'title' =>  _kdn('Custom Content Selectors for Shortcodes'),
                'info'  =>  _kdn('CSS selectors for HTML elements whose contents can be used in post template
                    by defined shortcode. If more than one element is found, their content will be merged. If
                    you do not want them merged, check the "single" checkbox to get the first found result.
                    By default, this gets HTML of the found element. If you want the text of the target element,
                    write "text" for attribute. You can also use any other attribute of the found element, such
                    as "src", "href"... Write your shortcodes without brackets, e.g. <b>"item-price"</b>. Next, you
                    can use it <b>in the main post template by writing [item-price]</b>')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/selector-custom-shortcode',
                'name'          =>  '_post_custom_content_shortcode_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'              =>  'html',
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'html',
                'optionsBox'    => [
                    'translation'       => true
                ],
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- FIND AND REPLACE IN CUSTOM SHORT CODES --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_find_replace_custom_short_code',
                'title' => _kdn("Find and replace in custom short codes"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>custom short code
                    contents</b>, this is the place. <b>The replacements will be applied after custom short code
                    contents are retrieved</b>.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/find-replace-in-custom-short-code',
                'name'          =>  '_post_find_replace_custom_short_code',
                'addKeys'       =>  true,
                'remove'        =>  true,
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'subjectSelector'   =>  "#_test_find_replace_first_load",
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIND_REPLACE_IN_CUSTOM_SHORT_CODE,
                    'attr'              =>  'html',
                    'requiredSelectors' =>  $urlSelector . " | #_test_find_replace_first_load", // One of them is enough

                ],
                'test'          => true,
                'addonClasses'  => 'kdn-test-find-replace-in-custom-short-code'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: LIST TYPE POSTS --}}
    @include('partials.table-section-title', ['title' => _kdn("List Type Posts")])

    {{-- POSTS ARE LIST TYPE --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_is_list_type',
                'class' =>  'label-list',
                'title' =>  _kdn('Posts are list type?'),
                'info'  =>  _kdn('If the target post is list type, and you want to import it as a list, check this.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_is_list_type',
                    'dependants'    => '[
                            "#list-title-selector",
                            "#list-content-selector",
                            "#list-item-number-selectors",
                            "#list-items-start-after-selectors",
                            "#list-insert-reversed",
                            "#list-item-auto-number",
                            "#post-template-is-list-type"
                        ]'
                ])
            </div>
        </td>
    </tr>

    {{-- LIST ITEMS START AFTER SELECTOR --}}
    <tr id="list-items-start-after-selectors">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_list_item_starts_after_selectors',
                'class' =>  'label-list',
                'title' =>  _kdn('List Items Start After Selectors'),
                'info'  =>  _kdn("CSS selectors for the elements come just before the first list item. This will be used
                    to detect list item contents accurately. The position of the first match of any given selector
                    will be compared to others and the greatest position will be used. You can give a selector
                    for the first item. It'll do the job. E.g. <span class='highlight selector'>.entry > .list-item</span>")
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector',
                'name'          => '_post_list_item_starts_after_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIRST_POSITION,
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- LIST ITEM NUMBER SELECTOR --}}
    <tr id="list-item-number-selectors">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_list_item_number_selectors',
                'class' =>  'label-list',
                'title' =>  _kdn('List Item Number Selectors'),
                'info'  =>  _kdn("CSS selectors for each list item's number, if the target post is list type. This gets
                    the text of specified element. If you give more than one selector, the first match will
                    be used.")
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_list_item_number_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'          => 'text',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'text',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- LIST ITEM AUTO NUMBER --}}
    <tr id="list-item-auto-number">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_list_item_auto_number',
                'class' =>  'label-list',
                'title' =>  _kdn('Insert list item numbers automatically?'),
                'info'  =>  _kdn('If you want to insert list item numbers automatically when there is no item number,
                    then check this. The items will be numbered starting from 1.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_list_item_auto_number',
                ])
            </div>
        </td>
    </tr>

    {{-- LIST ITEM TITLE SELECTOR --}}
    <tr id="list-title-selector">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_list_title_selectors',
                'class' =>  'label-list',
                'title' =>  _kdn('List Item Title Selectors'),
                'info'  =>  _kdn("CSS selectors for each list item's title, if the target post is list type. This gets
                    the text of specified element. If you give more than one selector, the first match will
                    be used.")
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_list_title_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'          => 'text',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'text',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- LIST ITEM CONTENT SELECTOR --}}
    <tr id="list-content-selector">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_list_content_selectors',
                'class' =>  'label-list',
                'title' =>  _kdn('List Item Content Selectors'),
                'info'  =>  _kdn("CSS selector for each list item's content, if the target post is list type. This gets
                    the HTML of specified element. If you give more than one selector, the results will be
                    combined when creating each list item's content.")
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/selector-with-attribute',
                'name'          =>  '_post_list_content_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'          => 'html',
                ],
                'test'          => true,
                'inputClass'    => 'css-selector',
                'showDevTools'  => true,
                'addKeys'       => true,
                'defaultAttr'   => 'html',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- LIST INSERT REVERSED --}}
    <tr id="list-insert-reversed">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_list_insert_reversed',
                'class' =>  'label-list',
                'title' =>  _kdn('Insert list in reverse order?'),
                'info'  =>  _kdn('If you want to insert the list into the post in reverse order, then check this.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_list_insert_reversed',
                ])
            </div>
        </td>
    </tr>

    {{-- SECTION: PAGINATION --}}
    @include('partials.table-section-title', ['title' => _kdn("Pagination")])

    {{-- PAGINATE POSTS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'class' =>  'label-paginate',
                'for'   =>  '_post_paginate',
                'title' =>  _kdn('Paginate posts?'),
                'info'  =>  _kdn('If the target post is paginated, and you want it imported as paginated, check this.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_post_paginate',
                    'dependants'    => '[
                        "#post-next-page-url-selector",
                        "#post-all-page-urls-selectors"
                    ]'
                ])
            </div>
        </td>
    </tr>

    {{-- POST NEXT PAGE URL SELECTOR --}}
    <tr id="post-next-page-url-selector">
        <td>
            @include('form-items/label', [
                'class' =>  'label-paginate',
                'for'   =>  '_post_next_page_url_selectors',
                'title' =>  _kdn('Post Next Page URL Selectors'),
                'info'  =>  _kdn('CSS selector for next page URL, used to get "href" attribute of "a" tag. E.g.
                    <span class="highlight selector">.pagination > a.next</span>. If you give more than one selector,
                    the first match will be used.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_next_page_url_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'           =>  $urlSelector,
                    'urlAjaxSelector'       =>  $urlAjaxSelector,
                    'testType'              =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'                  =>  'href',
                    'targetTag'             =>  'a',
                    'targetCssSelectors'    => ['link[rel="next"]'],
                    'requiredSelectors'     =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'href',
                'optionsBox'    => true,
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- POST ALL PAGE URLS SELECTORS --}}
    <tr id="post-all-page-urls-selectors">
        <td>
            @include('form-items/label', [
                'class' =>  'label-paginate',
                'for'   =>  '_post_next_page_all_pages_url_selectors',
                'title' =>  _kdn('Post All Page URLs Selectors'),
                'info'  =>  _kdn('CSS selectors for all page URLs. Sometimes there is no next page URL. Instead, the
                    post page has all of the post pages (or parts) in one place. If this is the case, you should
                    use this. This is used to get "href" attribute of "a" tag. E.g. <span class="highlight selector">.post > .parts > a</span>.
                    If you give more than one selector, then the first match will be used.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_next_page_all_pages_url_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'              =>  'href',
                    'targetTag'         =>  'a',
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'href',
                'optionsBox'    => true,
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: POST META --}}
    @include('partials.table-section-title', ['title' => _kdn("Post Meta")])

    {{-- CUSTOM META SELECTORS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_custom_meta_selectors',
                'title' => _kdn('Custom Meta Selectors'),
                'info'  => _kdn('CSS selectors for custom meta values. You can use this to save anything from
                    target post as post meta of to-be-saved post. You can write "html", "text", or an attribute
                    of the target element for attribute input.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-custom-post-meta',
                'name'          => '_post_custom_meta_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'              =>  'text',
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'text',
                'optionsBox'    => [
                    'translation'       => true
                ],
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CUSTOM META --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_custom_meta',
                'title' => _kdn('Custom Meta'),
                'info'  => _kdn('You can save any value as a post meta. Just write a post meta key and its value.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/custom-post-meta',
                'name'          => '_post_custom_meta',
                'addKeys'       => true,
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- FIND AND REPLACE IN CUSTOM META --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_find_replace_custom_meta',
                'title' => _kdn("Find and replace in custom meta"),
                'info'  => _kdn('If you want some things to be replaced with some other things in <b>custom meta
                    values</b>, this is the place. <b>The replacements will be applied after
                    find-and-replaces for element HTMLs are applied</b>.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/find-replace-in-custom-meta',
                'name'          =>  '_post_find_replace_custom_meta',
                'addKeys'       =>  true,
                'remove'        =>  true,
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'subjectSelector'   =>  "#_test_find_replace_first_load",
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIND_REPLACE_IN_CUSTOM_META,
                    'attr'              =>  'text',
                    'requiredSelectors' =>  $urlSelector . " | #_test_find_replace_first_load"
                ],
                'test'          => true,
                'addonClasses'  => 'kdn-test-find-replace-in-custom-meta'
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: TAXONOMIES --}}
    @include('partials.table-section-title', ['title' => _kdn("Taxonomies")])

    {{-- CUSTOM TAXONOMY SELECTORS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_custom_taxonomy_selectors',
                'title' => _kdn('Custom Taxonomy Value Selectors'),
                'info'  => _kdn('CSS selectors for custom taxonomy values. You can use this to save anything from
                    target post as taxonomy value of to-be-saved post. You can write "html", "text", or an attribute
                    of the target element for attribute input. By default, the first found values will be used. If you
                    want to use all values found by a CSS selector, check the multiple checkbox. If you want to append
                    to any previously-existing values, check the append checkbox. Otherwise, the given value will
                    remove all of the previously-existing values of its taxonomy.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-custom-post-taxonomy',
                'name'          => '_post_custom_taxonomy_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'              =>  'text',
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'text',
                'optionsBox'    => [
                    'translation'       => true
                ],
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- CUSTOM TAXONOMY --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_custom_taxonomy',
                'title' => _kdn('Custom Taxonomy Value'),
                'info'  => _kdn('You can save any value as a value for a taxonomy. Just write a taxonomy and its value.
                    If you want to append to any previously-existing values, check the append checkbox. Otherwise,
                    the given value will remove all of the previously-existing values of its taxonomy.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/custom-post-taxonomy',
                'name'          => '_post_custom_taxonomy',
                'addKeys'       => true,
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- MANIPULATE HTML --}}
    @include('site-settings.partial.html-manipulation-inputs', [
        "keyTestUrl"                        => "_test_url_post",
        "keyTestFindReplace"                => "_test_find_replace_first_load",
        "keyFindReplaceRawHtml"             => "_post_find_replace_raw_html",
        "keyFindReplaceFirstLoad"           => "_post_find_replace_first_load",
        "keyFindReplaceElementAttributes"   => "_post_find_replace_element_attributes",
        "keyExchangeElementAttributes"      => "_post_exchange_element_attributes",
        "keyRemoveElementAttributes"        => "_post_remove_element_attributes",
        "keyFindReplaceElementHtml"         => "_post_find_replace_element_html"
    ])

    {{-- SECTION: UNNECESSARY ELEMENTS --}}
    @include('partials.table-section-title', ['title' => _kdn("Unnecessary Elements")])

    {{-- UNNECESSARY POST ELEMENT SELECTORS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_unnecessary_element_selectors',
                'title' =>  _kdn('Unnecessary Element Selectors'),
                'info'  =>  _kdn('CSS selectors for unwanted elements in the post page. Specified elements will be
                    removed from the HTML of the page. Content extraction will be done after the page is cleared
                    from unnecessary elements.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector',
                'name'          => '_post_unnecessary_element_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'addonTitle'    =>  'test',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
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
                'for'   => '_post_notify_empty_value_selectors',
                'title' => _kdn('CSS selectors for empty value notification'),
                'info'  => _kdn('Write CSS selectors and their attributes you want to retrieve. If the retrieved value
                        is empty, you will be notified via email. These CSS selectors will be tried to be retrieved
                        after all replacements are applied.')
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       => 'form-items/selector-with-attribute',
                'name'          => '_post_notify_empty_value_selectors',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'   =>  $urlSelector,
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

    {{-- SECTION: STOP CRAWLING --}}
    @include('partials.table-section-title', ['title' => _kdn("Stop crawling")])

    {{-- STOP CRAWLING DO NOT SAVE POST --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_stop_crawling_do_not_save_post',
                'title' =>  _kdn('Stop crawling do not save post?'),
                'info'  =>  _kdn("Check this if you don't want to save the post when stop crawling.")
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name' => '_post_stop_crawling_do_not_save_post'
                ])
            </div>
        </td>
    </tr>

    {{-- STOP CRAWLING FOR FIRST PAGE OF POST --}}
    <tr id="post-stop-crawling-first-page">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_stop_crawling_first_page',
                'title' =>  _kdn('Stop crawling for first page (only first run)'),
                'info'  =>  _kdn('If you activated <b>Recrawling from the last page</b>, this feature will be applied but only in first run. The <b>Matches</b> data will be merged with <b>Stop crawling in all run</b>. Note that, if the Last URL and First URL of the post are same, this feature will be not applied.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/selector-stop-crawling',
                'name'          =>  '_post_stop_crawling_first_page',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'              =>  'html',
                    'requiredSelectors' =>  $urlSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'html',
                'optionsBox'    => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- STOP CRAWLING IN ALL RUN --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_stop_crawling_all_run',
                'title' =>  _kdn('Stop crawling in all run'),
                'info'  =>  _kdn('CSS selectors for stop crawling in all run. If the post is paginated, the <b>Matches</b> data will be combined together through each page and save to database.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/selector-stop-crawling',
                'name'          =>  '_post_stop_crawling_all_run',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'              =>  'html',
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'html',
                'optionsBox'    => true,
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- MERGE STOP CRAWLING --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_stop_crawling_merge',
                'title' =>  _kdn('Merge the stop crawling?'),
                'info'  =>  _kdn('Merge the rules of stop crawling in all run and in each run. That means only when two features all have <b>Matches</b> data then the post URL will be removed.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name' => '_post_stop_crawling_merge'
                ])
            </div>
        </td>
    </tr>

    {{-- STOP CRAWLING IN EACH RUN --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_stop_crawling_each_run',
                'title' =>  _kdn('Stop crawling in each run'),
                'info'  =>  _kdn('CSS selectors for stop crawling in each run. If the post is paginated, the <b>Matches</b> data will be changed through each page.') . " " . _kdn_trans_regex()
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/selector-stop-crawling',
                'name'          =>  '_post_stop_crawling_each_run',
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'urlSelector'       =>  $urlSelector,
                    'urlAjaxSelector'   =>  $urlAjaxSelector,
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                    'attr'              =>  'html',
                    'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
                ],
                'test'          => true,
                'addKeys'       => true,
                'addonClasses'  => 'kdn-test-selector-attribute',
                'defaultAttr'   => 'html',
                'optionsBox'    => true,
                'ajax'          => true
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- STOP CRAWLING WHEN GO TO LAST PAGE --}}
    <tr id="post-stop-crawling-last-page">
        <td>
            @include('form-items/label', [
                'for'   =>  '_post_stop_crawling_last_page',
                'title' =>  _kdn('Stop crawling when go to the last page?'),
                'info'  =>  _kdn('Check this if you want to stop crawling when go to the last page. If stop crawling in all run or in each run has <b>Matches</b> data and the crawler go to the last page then the post URL will be removed. This feature will be applied after all <b>Stop crawling rules</b> are applied.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name' => '_post_stop_crawling_last_page'
                ])
            </div>
        </td>
    </tr>

    {{-- SECTION: CHILD POST --}}
    @include('partials.table-section-title', ['title' => _kdn("Child post")])

    {{-- CHILD POST --}}
    <tr>
        <td>
            @include('form-items/label', [
                'class' =>  'label-child-post',
                'for'   =>  '_child_post',
                'title' =>  _kdn('Active for child post?'),
                'info'  =>  _kdn('If you want to save all pages from second page of the target post as child posts, check this. The all child posts will have <b>post_parent</b> is the ID of parent post. The parent post is the first page of target post.')
            ])
        </td>
        <td>
            <div class="inputs">
                @include('form-items/checkbox', [
                    'name'          => '_child_post',
                    'dependants'    => '[
                        "[data-tab=\'#tab-child-post\']",
                        "[data-tab=\'#tab-child-post-templates\']",
                        "#child-post-duplicate-check-types"
                    ]'
                ])
            </div>
        </td>
    </tr>

    <?php

    /**
     * Fires before closing table tag in post tab of site settings page.
     *
     * @param array $settings   Existing settings and their values saved by user before
     * @param int $postId       ID of the site
     * @since 1.6.3
     */
    do_action('kdn/view/site-settings/tab/post', $settings, $postId);

    ?>

</table>