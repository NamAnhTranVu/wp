<?php

$isLanguagesAvailableGoogle = $languagesGoogleTranslateFrom && $languagesGoogleTranslateTo;
$optionsLoadLanguagesButtonGoogle = [
    'class'                 => 'google',
    'isLanguagesAvailable'  => $isLanguagesAvailableGoogle,
    'data' => [
        'selectors' => [
            'project_id' => '#_kdn_translation_google_translate_project_id',
            'api_key'    => '#_kdn_translation_google_translate_api_key',
        ],
        'serviceType' => \KDNAutoLeech\Objects\Translation\TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION,
        'requestType' => 'load_refresh_translation_languages',
    ],
];

$isLanguagesAvailableMicrosoft = $languagesMicrosoftTranslatorTextFrom && $languagesMicrosoftTranslatorTextTo;
$optionsLoadLanguagesButtonMicrosoft = [
    'class'                 => 'microsoft',
    'isLanguagesAvailable'  => $isLanguagesAvailableMicrosoft,
    'data' => [
        'selectors' => [
            'client_secret' => '#_kdn_translation_microsoft_translate_client_secret',
        ],
        'serviceType' => \KDNAutoLeech\Objects\Translation\TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT,
        'requestType' => 'load_refresh_translation_languages',
    ],
];

$isLanguagesAvailableYandex = $languagesYandexTranslatorFrom && $languagesYandexTranslatorTo;
$optionsLoadLanguagesButtonYandex = [
    'class'                 => 'yandex',
    'isLanguagesAvailable'  => $isLanguagesAvailableYandex,
    'data' => [
        'selectors' => [
            'api' => 'input[name*="_translation_yandex_translate_api"]',
        ],
        'serviceType' => \KDNAutoLeech\Objects\Translation\TextTranslator::KEY_YANDEX_TRANSLATOR,
        'requestType' => 'load_refresh_translation_languages',
    ],
];

$optionsRefreshLanguagesLabel = [
    'title' => _kdn('Refresh languages'),
    'info'  => _kdn('Refresh languages by retrieving them from the API. By this way, if there are new languages, you can get them.')
];

$videoUrlGoogleCloudTranslationAPI  = 'https://kdnautoleech.com/kien-thuc';
$videoUrlMicrosoftTranslatorTextAPI = 'https://kdnautoleech.com/kien-thuc';
$videoUrlYandexTranslatorAPI        = 'https://kdnautoleech.com/kien-thuc';

?>

<div class="kdn-settings-title">
    <h3>{{ _kdn('Translation') }}</h3>
    <span>{{ _kdn('Set content translation options') }}</span>
</div>

<table class="kdn-settings">

    @if($isGeneralPage)
        {{-- TRANSLATION IS ACTIVE --}}
        <tr>
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_is_translation_active',
                    'title' =>  _kdn('Translation is active?'),
                    'info'  =>  _kdn('If you want to activate automated content translation, check this. Note that
                            translating will increase the time required to crawl a post.')
                ])
            </td>
            <td>
                @include('form-items/checkbox', [
                    'name' => '_kdn_is_translation_active',
                ])
            </td>
        </tr>
    @endif

    {{-- TRANSLATE WITH --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_selected_translation_service',
                'title' =>  _kdn('Translate with'),
                'info'  =>  _kdn('Select the translation service you want to use to translate contents. You also need
                    to properly configure the settings of the selected API below.')
            ])
        </td>
        <td>
            @include('form-items/select', [
                'name'      =>  '_kdn_selected_translation_service',
                'options'   =>  $translationServices,
                'isOption'  =>  $isOption,
            ])
        </td>
    </tr>

    {{-- SECTION: GOOGLE TRANSLATE OPTIONS --}}
    @include('partials.table-section-title', ['title' => _kdn("Google Cloud Translation Options")])

    {{-- GOOGLE TRANSLATE - TRANSLATE FROM --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_google_translate_from',
                'title' =>  _kdn('Translate from'),
                'info'  =>  _kdn('Select the language of the content of crawled posts.')
            ])
        </td>
        <td>
            @if($isLanguagesAvailableGoogle)
                @include('form-items/select', [
                    'name'      =>  '_kdn_translation_google_translate_from',
                    'options'   =>  $languagesGoogleTranslateFrom,
                    'isOption'  =>  $isOption,
                ])
            @else
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonGoogle + ['id' => '_kdn_translation_google_translate_from'])
            @endif
        </td>
    </tr>

    {{-- GOOGLE TRANSLATE - TRANSLATE TO --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_google_translate_to',
                'title' =>  _kdn('Translate to'),
                'info'  =>  _kdn('Select the language to which the content should be translated.')
            ])
        </td>
        <td class="double-translate">
            @if($isLanguagesAvailableGoogle)
                @include('form-items/select', [
                    'name'      =>  '_kdn_translation_google_translate_to',
                    'options'   =>  $languagesGoogleTranslateTo,
                    'isOption'  =>  $isOption,
                ])

                <div class="input-group double-between dashicons dashicons-arrow-right-alt"></div>

                @include('form-items/select', [
                    'name'      =>  '_kdn_translation_google_translate_end',
                    'options'   =>  array_merge(['' => _kdn('None')], $languagesGoogleTranslateTo),
                    'isOption'  =>  $isOption,
                ])
            @else
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonGoogle + ['id' => '_kdn_translation_google_translate_to'])
            @endif
        </td>
    </tr>

    {{-- GOOGLE TRANSLATE - REFRESH LANGUAGES --}}
    @if($isLanguagesAvailableGoogle)
        <tr>
            <td>
                @include('form-items/label', $optionsRefreshLanguagesLabel)
            </td>
            <td>
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonGoogle)
            </td>
        </tr>
    @endif

    {{-- GOOGLE TRANSLATE - PROJECT ID --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_google_translate_project_id',
                'title' =>  _kdn('Project ID'),
                'info'  =>  _kdn('Project ID retrieved from Google Cloud Console.') . ' ' . _kdn_trans_how_to_get_it($videoUrlGoogleCloudTranslationAPI)
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name' => '_kdn_translation_google_translate_project_id',
            ])
        </td>
    </tr>

    {{-- GOOGLE TRANSLATE - API KEY --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_google_translate_api_key',
                'title' =>  _kdn('API Key'),
                'info'  =>  _kdn('API key retrieved from Google Cloud Console.') . ' ' . _kdn_trans_how_to_get_it($videoUrlGoogleCloudTranslationAPI)
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name' => '_kdn_translation_google_translate_api_key',
            ])
        </td>
    </tr>

    {{-- GOOGLE TRANSLATE - TEST --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_google_translate_test',
                'title' =>  _kdn('Test Google Translate Options'),
                'info'  =>  _kdn('You can write any text to test Google Translate options you configured.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_kdn_translation_google_translate_test',
                'placeholder'   =>  _kdn('Test text to translate...'),
                'rows'          =>  3,
                'data'          =>  [
                    'apiKeySelector'    => '#_kdn_translation_google_translate_api_key',
                    'projectIdSelector' => '#_kdn_translation_google_translate_project_id',
                    'fromSelector'      => '#_kdn_translation_google_translate_from',
                    'toSelector'        => '#_kdn_translation_google_translate_to',
                    'endSelector'       => '#_kdn_translation_google_translate_end',
                    'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_TRANSLATION,
                    'serviceType'       =>  \KDNAutoLeech\Objects\Translation\TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION,
                    'requiredSelectors' =>  "#_kdn_translation_google_translate_test & #_kdn_translation_google_translate_api_key & #_kdn_translation_google_translate_project_id & #_kdn_translation_google_translate_from & #_kdn_translation_google_translate_to"
                ],
                'addon'         =>  'dashicons dashicons-search',
                'test'          =>  true,
                'addonClasses'  => 'kdn-test-translation google-translate',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: MICROSOFT TRANSLATOR TEXT OPTIONS --}}
    @include('partials.table-section-title', ['title' => _kdn("Microsoft Translator Text Options")])

    {{-- MICROSOFT TRANSLATOR TEXT - TRANSLATE FROM --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_microsoft_translate_from',
                'title' =>  _kdn('Translate from'),
                'info'  =>  _kdn('Select the language of the content of crawled posts.')
            ])
        </td>
        <td>
            @if($isLanguagesAvailableMicrosoft)
                @include('form-items/select', [
                    'name'      => '_kdn_translation_microsoft_translate_from',
                    'options'   => $languagesMicrosoftTranslatorTextFrom,
                    'isOption'  => $isOption,
                ])
            @else
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonMicrosoft + ['id' => '_kdn_translation_microsoft_translate_from'])
            @endif
        </td>
    </tr>

    {{-- MICROSOFT TRANSLATOR TEXT - TRANSLATE TO --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_microsoft_translate_to',
                'title' =>  _kdn('Translate to'),
                'info'  =>  _kdn('Select the language to which the content should be translated.')
            ])
        </td>
        <td class="double-translate">
            @if($isLanguagesAvailableMicrosoft)
                @include('form-items/select', [
                    'name'      =>  '_kdn_translation_microsoft_translate_to',
                    'options'   =>  $languagesMicrosoftTranslatorTextTo,
                    'isOption'  =>  $isOption,
                ])

                <div class="input-group double-between dashicons dashicons-arrow-right-alt"></div>

                @include('form-items/select', [
                    'name'      =>  '_kdn_translation_microsoft_translate_end',
                    'options'   =>  array_merge(['' => _kdn('None')], $languagesMicrosoftTranslatorTextTo),
                    'isOption'  =>  $isOption,
                ])
            @else
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonMicrosoft + ['id' => '_kdn_translation_microsoft_translate_to'])
            @endif
        </td>
    </tr>

    {{-- MICROSOFT TRANSLATOR TEXT - REFRESH LANGUAGES --}}
    @if($isLanguagesAvailableMicrosoft)
        <tr>
            <td>
                @include('form-items/label', $optionsRefreshLanguagesLabel)
            </td>
            <td>
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonMicrosoft)
            </td>
        </tr>
    @endif

    {{-- MICROSOFT TRANSLATOR TEXT - CLIENT SECRET --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_microsoft_translate_client_secret',
                'title' =>  _kdn('Client Secret'),
                'info'  =>  _kdn('Client secret retrieved from Microsoft Azure Portal.') . ' ' . _kdn_trans_how_to_get_it($videoUrlMicrosoftTranslatorTextAPI)
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name' => '_kdn_translation_microsoft_translate_client_secret',
            ])
        </td>
    </tr>

    {{-- MICROSOFT TRANSLATOR TEXT - TEST --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_microsoft_translate_test',
                'title' =>  _kdn('Test Microsoft Translator Text Options'),
                'info'  =>  _kdn('You can write any text to test Microsoft Translator Text options you configured.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_kdn_translation_microsoft_translate_test',
                'placeholder'   =>  _kdn('Test text to translate...'),
                'rows'          =>  3,
                'data'          =>  [
                    'clientSecretSelector'  => '#_kdn_translation_microsoft_translate_client_secret',
                    'fromSelector'          => '#_kdn_translation_microsoft_translate_from',
                    'toSelector'            => '#_kdn_translation_microsoft_translate_to',
                    'endSelector'           => '#_kdn_translation_microsoft_translate_end',
                    'testType'              =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_TRANSLATION,
                    'serviceType'           =>  \KDNAutoLeech\Objects\Translation\TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT,
                    'requiredSelectors'     =>  "#_kdn_translation_microsoft_translate_test & #_kdn_translation_microsoft_translate_client_secret & #_kdn_translation_microsoft_translate_from & #_kdn_translation_microsoft_translate_to"
                ],
                'addon'         =>  'dashicons dashicons-search',
                'test'          =>  true,
                'addonClasses'  => 'kdn-test-translation microsoft-translator-text',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    {{-- SECTION: YANDEX TRANSLATOR OPTIONS --}}
    @include('partials.table-section-title', ['title' => _kdn("Yandex Translator Options")])

    {{-- YANDEX TRANSLATOR - TRANSLATE FROM --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_yandex_translate_from',
                'title' =>  _kdn('Translate from'),
                'info'  =>  _kdn('Select the language of the content of crawled posts.')
            ])
        </td>
        <td>
            @if($isLanguagesAvailableYandex)
                @include('form-items/select', [
                    'name'      => '_kdn_translation_yandex_translate_from',
                    'options'   => $languagesYandexTranslatorFrom,
                    'isOption'  => $isOption,
                ])
            @else
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonYandex + ['id' => '_kdn_translation_yandex_translate_from'])
            @endif
        </td>
    </tr>

    {{-- YANDEX TRANSLATOR - TRANSLATE TO --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_yandex_translate_to',
                'title' =>  _kdn('Translate to'),
                'info'  =>  _kdn('Select the language to which the content should be translated.')
            ])
        </td>
        <td class="double-translate">
            @if($isLanguagesAvailableYandex)
                @include('form-items/select', [
                    'name'      =>  '_kdn_translation_yandex_translate_to',
                    'options'   =>  $languagesYandexTranslatorTo,
                    'isOption'  =>  $isOption,
                ])

                <div class="input-group double-between dashicons dashicons-arrow-right-alt"></div>

                @include('form-items/select', [
                    'name'      =>  '_kdn_translation_yandex_translate_end',
                    'options'   =>  array_merge(['' => _kdn('None')], $languagesYandexTranslatorTo),
                    'isOption'  =>  $isOption,
                ])
            @else
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonYandex + [
                    'id' => '_kdn_translation_yandex_translate_to'
                ])
            @endif
        </td>
    </tr>

    {{-- YANDEX TRANSLATOR - REFRESH LANGUAGES --}}
    @if($isLanguagesAvailableYandex)
        <tr>
            <td>
                @include('form-items/label', $optionsRefreshLanguagesLabel)
            </td>
            <td>
                @include('form-items/partials/button-load-languages', $optionsLoadLanguagesButtonYandex)
            </td>
        </tr>
    @endif

    {{-- YANDEX TRANSLATOR - API --}}
    <tr id="_multiple_kdn_translation_yandex_translate_api">
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_yandex_translate_api',
                'title' =>  _kdn('API Key'),
                'info'  =>  _kdn('API Key retrieved from Yandex Translator.') . ' ' . _kdn_trans_how_to_get_it($videoUrlYandexTranslatorAPI)
            ])
        </td>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/text',
                'name'          =>  '_kdn_translation_yandex_translate_api',
                'addKeys'       =>  true,
            ])
        </td>
    </tr>

    {{-- YANDEX TRANSLATOR - RANDOM API --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_yandex_translate_api_randomize',
                'title' =>  _kdn('Randomize API Keys?'),
                'info'  =>  _kdn('When you check this, the API Keys you entered will be randomized. This means, the order of the API Keys will be changed every time before a new request is made. If you do not check this, the API Keys will be tried in the order you entered them.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name' => '_kdn_translation_yandex_translate_api_randomize',
            ])
        </td>
    </tr>

    {{-- YANDEX TRANSLATOR - TEST --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_translation_yandex_translate_test',
                'title' =>  _kdn('Test Yandex Translator Options'),
                'info'  =>  _kdn('You can write any text to test Yandex Translator options you configured.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_kdn_translation_yandex_translate_test',
                'placeholder'   =>  _kdn('Test text to translate...'),
                'rows'          =>  3,
                'data'          =>  [
                    'apiSelector'           => '#_multiple_kdn_translation_yandex_translate_api',
                    'randomizeSelector'     => '#_kdn_translation_yandex_translate_api_randomize:checked',
                    'fromSelector'          => '#_kdn_translation_yandex_translate_from',
                    'toSelector'            => '#_kdn_translation_yandex_translate_to',
                    'endSelector'           => '#_kdn_translation_yandex_translate_end',
                    'testType'              =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_TRANSLATION,
                    'serviceType'           =>  \KDNAutoLeech\Objects\Translation\TextTranslator::KEY_YANDEX_TRANSLATOR,
                    'requiredSelectors'     =>  "#_kdn_translation_yandex_translate_test & #_kdn_translation_yandex_translate_api & #_kdn_translation_yandex_translate_from & #_kdn_translation_yandex_translate_to"
                ],
                'addon'         =>  'dashicons dashicons-search',
                'test'          =>  true,
                'addonClasses'  => 'kdn-test-translation yandex-translator',
            ])
            @include('partials/test-result-container')
        </td>
    </tr>

    <?php

    /**
     * Fires before closing table tag in translation tab of general settings page.
     *
     * @param array $settings       Existing settings and their values saved by user before
     * @param bool  $isGeneralPage  True if this is called from a general settings page.
     * @param bool  $isOption       True if this is an option, instead of a setting. A setting is a post meta, while
     *                              an option is a WordPress option. This is true when this is fired from general
     *                              settings page.
     * @since 1.6.3
     */
    do_action('kdn/view/general-settings/tab/translation', $settings, $isGeneralPage, $isOption);

    ?>

</table>