<?php
    // Define a variable to understand if this is the general page. If not, this settings is in post settings page.
    // Take some actions according to this.
    $isGeneralPage = isset($isGeneralPage) && $isGeneralPage;
?>

<div class="kdn-settings-title">
    <h3>{{ _kdn('Advanced') }}</h3>
    <span>{{ _kdn('Advanced settings for crawler') }}</span>
</div>

<table class="kdn-settings">

    {{-- JS CRON --}}
    @if($isGeneralPage)
        <tr>
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_js_cron',
                    'title' =>  _kdn('JS Cron Interval'),
                    'info'  =>  _kdn('Set interval for JS Cron (in seconds). Set 0 if you do not want to use JS Cron.')
                ])
            </td>
            <td>
                @include('form-items/text', [
                    'name'      =>  '_kdn_js_cron',
                    'type'      =>  'number',
                    'min'       =>  0
                ])
            </td>
        </tr>
    @endif

    {{-- MAKE SURE ENCODING IS UTF8 --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_kdn_make_sure_encoding_utf8',
        'title' =>  _kdn('Always use UTF8 encoding?'),
        'info'  =>  _kdn('If you want to crawl all pages in UTF-8 encoding, check this.'),
        'dependants' => '["#convert-encoding"]',
    ])

    {{-- CONVERT ENCODING TO UTF8 --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_kdn_convert_charset_to_utf8',
        'title' => _kdn('Convert encoding to UTF8 when it is not UTF8'),
        'info'  => _kdn('If you want to convert the encoding of the HTML retrieved from target sites to UTF8 when
            it has a different encoding, check this.'),
        'id'    => 'convert-encoding',
    ])

    {{-- HTTP USER AGENT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_http_user_agent',
                'title' =>  _kdn('HTTP User Agent'),
                'info'  =>  _kdn('The user agent to be used when crawling, i.e.
                <span class="highlight variable">HTTP_USER_AGENT</span>. If you leave this empty, the default value
                will be used. You can find user agent strings
                <a target="_blank" href="http://www.useragentstring.com/pages/useragentstring.php">here</a>.')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_http_user_agent',
            ])
        </td>
    </tr>

    {{-- HTTP ACCEPT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_http_accept',
                'title' =>  _kdn('HTTP Accept'),
                'info'  =>  _kdn('HTTP accept value to be used when crawling, i.e.
                    <span class="highlight variable">HTTP_ACCEPT</span>. If you leave this empty, the default value
                    will be used.')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_http_accept',
            ])
        </td>
    </tr>

    {{-- HTTP ALLOW COOKIES --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_http_allow_cookies',
                'title' =>  _kdn('Allow cookies?'),
                'info'  =>  _kdn('If you want to allow cookies when crawling, check this.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name'      =>  '_kdn_http_allow_cookies',
            ])
        </td>
    </tr>

    {{-- CONNECTION TIMEOUT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_connection_timeout',
                'title' =>  _kdn('Connection timeout (in seconds)'),
                'info'  =>  _kdn('Maximum number of seconds in which target server should response. Write 0 to disable.
                        Default: 0')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_connection_timeout',
                'type'      =>  'number',
                'min'       =>  0
            ])
        </td>
    </tr>

    {{-- USE PROXY --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_use_proxy',
                'title' =>  _kdn('Use proxy?'),
                'info'  =>  _kdn('If you want to use a proxy when crawling the target site, check this.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name'          =>  '_kdn_use_proxy',
                'dependants'    =>  '["#proxy-test-url", "#proxies", "#proxy-try-limit", "#proxy-randomize"]',
            ])
        </td>
    </tr>

    {{-- TEST URL FOR PROXY --}}
    <tr id="proxy-test-url">
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_test_url_proxy',
                'title' =>  _kdn('URL for proxy testing'),
                'info'  =>  _kdn('A URL to be used to perform the proxy test.')
            ])
        </td>
        <td>@include('form-items/text', ['name' => '_kdn_test_url_proxy', 'type' => 'url'])</td>
    </tr>

    {{-- PROXIES --}}
    <tr id="proxies">
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_proxies',
                'title' =>  _kdn('Proxies'),
                'info'  =>  _kdn('You can write your proxies here. Write every proxy in a new line. If you want to
                        use a proxy specifically with a protocol, write the proxy with its protocol. E.g.
                        <span class="highlight proxy">https://192.168.16.1:10</span>, or
                        <span class="highlight proxy">http://192.168.16.1:10</span>. You can also provide proxies
                        that contain a scheme, username and password. E.g.
                        <span class="highlight proxy">http://username:password@192.168.16.1:10</span>. If you do not
                        specify the protocol, TCP will be used. SOCKS is not supported.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_kdn_proxies',
                'placeholder'   =>  _kdn('New line-separated proxies...'),
                'data'          =>  [
                    'urlSelector'   =>  "#_kdn_test_url_proxy",
                    'testType'      =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_PROXY,
                ],
                'addon'         =>  'dashicons dashicons-search',
                'test'          =>  true,
                'addonClasses'  => 'kdn-test-proxy',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- PROXY TRY LIMIT --}}
    <tr id="proxy-try-limit">
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_proxy_try_limit',
                'title' =>  _kdn('Proxy try limit'),
                'info'  =>  _kdn('Maximum number of proxies that can be tried for one request. Write 0 for no limitation.
                        Default: 0')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_proxy_try_limit',
                'type'      =>  'number',
                'min'       =>  0
            ])
        </td>
    </tr>

    {{-- RANDOMIZE --}}
    <tr id="proxy-randomize">
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_proxy_randomize',
                'title' =>  _kdn('Randomize proxies'),
                'info'  =>  _kdn('When you check this, the proxies you entered will be randomized. This means, the order
                    of the proxies will be changed every time before a new request is made. If you do not check this,
                    the proxies will be tried in the order you entered them.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name'          =>  '_kdn_proxy_randomize'
            ])
        </td>
    </tr>

    <?php

    /**
     * Fires before closing table tag in advanced tab of general settings page.
     *
     * @param array $settings       Existing settings and their values saved by user before
     * @param bool  $isGeneralPage  True if this is called from a general settings page.
     * @param bool  $isOption       True if this is an option, instead of a setting. A setting is a post meta, while
     *                              an option is a WordPress option. This is true when this is fired from general
     *                              settings page.
     * @since 1.6.3
     */
    do_action('kdn/view/general-settings/tab/advanced', $settings, $isGeneralPage, $isOption);

    ?>

</table>