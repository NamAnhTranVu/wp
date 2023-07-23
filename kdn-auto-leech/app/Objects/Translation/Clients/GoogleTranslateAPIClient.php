<?php

namespace KDNAutoLeech\Objects\Translation\Clients;


use Google\Cloud\Translate\TranslateClient;
use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Utils;

class GoogleTranslateAPIClient extends AbstractTranslateAPIClient {

    /*
        GOOGLE TRANSLATE SETTINGS

        Some notes:
            * Limits can be found here: https://cloud.google.com/translate/quotas
            * Google does not charge per request. It charges per character. So, no limit for request count.
            * Google suggests maximum request length of 2000 characters.

        Additional notes:
            * Setting max text count per batch greater than 128 causes "too many text segments" error. This is coming
              from experiments. I did not see anything about this limit on the web. Keeping it below 128 is good practice.
    */

    /** @var string */
    private $projectId;

    /** @var string */
    private $apiKey;

    /** @var \Google\Cloud\Translate\TranslateClient */
    private $translator;

    /**
     * @param string $projectId ID of the project created in Google Cloud Console
     * @param string $apiKey    API key existing for the given project ID
     */
    public function __construct($projectId, $apiKey) {
        $this->projectId = $projectId;
        $this->apiKey    = $apiKey;

        // Create a translate client with the given credentials
        $this->translator = new TranslateClient([
            'projectId' => $projectId,
            'key'       => $apiKey,
        ]);
    }

    /**
     * @return int Maximum length of a string that will be sent to the API service
     * @since 1.8.0
     */
    public function getMaxTextLength() {
        return 1800;
    }

    /**
     * @return int Maximum number of texts per batch for the API
     * @since 1.8.0
     */
    public function getMaxTextCountPerBatch() {
        return 100;
    }

    /**
     * @return int Maximum total length of texts in a batch that will be sent to the API. Set 0 to disable.
     * @since 1.8.0
     */
    public function getMaxTextLengthPerBatch() {
        return 1800;
    }

    /**
     * Translate an array of strings.
     *
     * @param array $texts   A flat sequential array of texts
     * @param array $options Translation options
     * @return array Translated texts in the same order as $texts.
     * @since 1.8.0
     */
    public function translateBatch(array $texts, $options = []) {
        try {
            $translations = $this->translator->translateBatch($texts, $options);

            /*
             * The response array is structured as:
             *      'source':  ISO 639-1 code of the source language of the raw text
             *      'input':   Raw text
             *      'text':    Translated text
             *      'model':   The model to use for the translation request. May be `nmt` or `base`. Defaults to null.
             *                 Since there is no "model" parameter that can be passed to the function, this will always
             *                 be null.
             */

            // Here, we get all 'text' values.
            return array_column($translations, 'text');

        // Catch the errors and add them to the other errors.
        } catch(\Exception $e) {
            $message = $e->getMessage();
            $response = json_decode($message, true);

            Informer::add((new Information(
                get_class($e),
                Utils::array_get($response, "error.message", ''),
                InformationType::ERROR
            ))->setException($e)->addAsLog());

            return [];
        }
    }

    /**
     * Get languages
     *
     * @param array $options A key-value pair array that defines the options for to-be-retrieved languages
     * @return array An array structured as [ ["code" => "lang1code", "name" => "Lang 1 Name], ["code" => "lang2code", "name" => "Lang 2 Name"], ... ]
     *               In case of error, returns an empty array.
     * @since 1.8.0
     */
    public function localizedLanguages($options = []) {
        // If the target locale does not exist, add WP's current locale as the target.
        $options += [
            "target" => Utils::getLocaleCode()
        ];

        try {
            $languages = $this->translator->localizedLanguages($options);

        } catch(\Exception $e) {
            $languages  = [];
            $error      = json_decode($e->getMessage(), true);
            $message    = sprintf("%s (%s - %s)",
                Utils::array_get($error, "error.message"),
                Utils::array_get($error, "error.status"),
                Utils::array_get($error, "error.code")
            );

            // Add as information message
            Informer::addError($message)->setException($e)->addAsLog();
        }

        return $languages;
    }
}