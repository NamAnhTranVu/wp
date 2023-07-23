<?php

namespace KDNAutoLeech\Objects\Translation;
use KDNAutoLeech\Interfaces\Translatable;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\Settings\SettingsImpl;

/**
 * Translates a {@link Translatable} instance from a language to another one
 *
 * @package KDNAutoLeech\Objects\Translation
 */
class TranslatableTranslator {

    /** @var SettingsImpl */
    private $settings;

    /** @var Translatable A Translatable instance to be translated */
    private $translatable;

    /**
     * @var bool If true, the texts will not be translated. Instead, they will be appended dummy values to mock the
     *      translation.
     */
    private $dryRun = false;

    /**
     * @param SettingsImpl $settings     Post meta of a Site type post. (get_post_meta($siteId))
     * @param Translatable $translatable See {@link $translatable}
     * @param bool         $dryRun       See {@link $dryRun}
     */
    public function __construct(SettingsImpl $settings, Translatable $translatable, $dryRun = false) {
        $this->settings = $settings;
        $this->translatable = $translatable;
        $this->dryRun = $dryRun;
    }

    /**
     * Translates the translatable according to the settings
     *
     * @return null|Translatable Translated data or null.
     * @throws \Exception If the translation has failed
     */
    public function translate() {
        // Prepare the texts to be translated, and create a TextTranslator.
        // Any separator would be OK except "." because we do not want TextTranslator to remap the texts into their
        // positions using the dot notation. We will handle remapping using TranslationSetter.
        $separator = '|';
        $filler = new TranslatableMapFiller();
        $texts = $filler->fillAndFlatten($this->translatable, $this->translatable->getTranslatableFields(), $separator);

        // If there are no texts to translate, no need to proceed.
        if(!$texts) return $this->translatable;

        // Translate the prepared texts
        $translatedTexts = $this->translatePreparedTexts($texts);
        if (!$translatedTexts) return null;

        // Assign translated texts to the Translatable instance.
        $setter = new TranslationSetter();
        $setter->set($this->translatable, $translatedTexts, $separator);

        return $this->translatable;
    }

    /*
     * SETTERS
     */

    /**
     * @param Translatable $translatable
     */
    public function setTranslatable(Translatable $translatable) {
        $this->translatable = $translatable;
    }

    /*
     * PRIVATE HELPERS
     */

    /**
     * @param array $texts A flat array of texts, probably retrieved from {@link prepareTextsToTranslate()}.
     * @return null|array If the selected translation service does not exist, returns null. Otherwise, translated $texts.
     * @throws \Exception If required parameters for the translation service selected in the settings are not valid,
     *                     or there is a translation error.
     * @since 1.8.0
     */
    public function translatePreparedTexts($texts) {
        $textTranslator = new TextTranslator($texts, $this->dryRun);

        // Translate the texts using the specified service.
        $selectedTranslationService = $this->settings->getSetting('_kdn_selected_translation_service');
        switch($selectedTranslationService) {
            case TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION:
                $googleTranslateProjectId = $this->settings->getSetting('_kdn_translation_google_translate_project_id');
                $googleTranslateApiKey    = $this->settings->getSetting('_kdn_translation_google_translate_api_key');
                $googleTranslateFrom      = $this->settings->getSetting('_kdn_translation_google_translate_from');
                $googleTranslateTo        = $this->settings->getSetting('_kdn_translation_google_translate_to');
                $googleTranslateEnd       = $this->settings->getSetting('_kdn_translation_google_translate_end');

                if(!$googleTranslateProjectId || !$googleTranslateApiKey) {
                    throw new \Exception("You must provide a valid project ID and a valid API key for Google Cloud Translation API to work properly.");
                }

                $translatedTexts = $textTranslator->translateWithGoogle($googleTranslateProjectId, $googleTranslateApiKey,
                    $googleTranslateTo, $googleTranslateFrom, $googleTranslateEnd);

                break;

            case TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT:
                $microsoftTranslateClientSecret = $this->settings->getSetting('_kdn_translation_microsoft_translate_client_secret');
                $microsoftTranslateFrom         = $this->settings->getSetting('_kdn_translation_microsoft_translate_from');
                $microsoftTranslateTo           = $this->settings->getSetting('_kdn_translation_microsoft_translate_to');
                $microsoftTranslateEnd          = $this->settings->getSetting('_kdn_translation_microsoft_translate_end');

                if(!$microsoftTranslateClientSecret) {
                    throw new \Exception("You must provide a valid client secret for Microsoft Translator Text API to work properly.");
                }

                $translatedTexts = $textTranslator->translateWithMicrosoft($microsoftTranslateClientSecret,
                    $microsoftTranslateTo, $microsoftTranslateFrom, $microsoftTranslateEnd);
                break;

            case TextTranslator::KEY_YANDEX_TRANSLATOR:

                if ($this->settings->getSettingForCheckbox('_do_not_use_general_settings')) {
                    $yandexTranslateApi         = $this->settings->getSetting('_kdn_translation_yandex_translate_api');
                } else {
                    $yandexTranslateApi         = array_filter(array_unique(get_option('_kdn_translation_yandex_translate_api', [])));
                }

                $yandexTranslateApiRandomize    = $this->settings->getSetting('_kdn_translation_yandex_translate_api_randomize');
                $yandexTranslateFrom            = $this->settings->getSetting('_kdn_translation_yandex_translate_from');
                $yandexTranslateTo              = $this->settings->getSetting('_kdn_translation_yandex_translate_to');
                $yandexTranslateEnd             = $this->settings->getSetting('_kdn_translation_yandex_translate_end');

                if(!$yandexTranslateApi) {
                    throw new \Exception("You must provide a valid client secret for Yandex Translator API to work properly.");
                }

                $yandexTranslateApi = maybe_unserialize($yandexTranslateApi);

                // If randomize is activated.
                if ($yandexTranslateApiRandomize) shuffle($yandexTranslateApi);

                $translatedTexts = $textTranslator->translateWithYandex($yandexTranslateApi, $yandexTranslateTo, $yandexTranslateFrom, $yandexTranslateEnd);
                break;

            default:
                Informer::addError(sprintf(_kdn('Selected translation service %1$s is not valid'), $selectedTranslationService))
                    ->addAsLog();
                return null;
        }

        // If the translation is not successful, throw an error.
        if(sizeof($texts) != sizeof($translatedTexts)) {
            // Throw an exception
            throw new \Exception("KDN - Texts could not be translated.");
        }

        return $translatedTexts;
    }

}