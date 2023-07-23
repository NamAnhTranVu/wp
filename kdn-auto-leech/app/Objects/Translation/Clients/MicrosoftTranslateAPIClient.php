<?php

namespace KDNAutoLeech\Objects\Translation\Clients;


use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Utils;

class MicrosoftTranslateAPIClient extends AbstractTranslateAPIClient {

    /*
        MICROSOFT TRANSLATOR TEXT SETTINGS

        Some notes:
            * Limits can be found here: https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate?tabs=curl#request-body
            * Microsoft does not charge per request. It charges per character. So, no limit for request count.
            * Total size of texts in a single request is 5000 chars including spaces.
            * A request can have at most 25 texts.
            * Sentence length is 275 chars. However, sentences longer than this length can also be sent.
            * Number of characters per hour depends on the pricing tier. So, we cannot do anything about it.
    */

    /** @var string Stores the API key using which the requests will be authenticated. */
    private $apiKey;

    /** @var string Host URL to which API requests will be sent. */
    private $host = 'https://api.cognitive.microsofttranslator.com';

    /** @var string API path to which text translation requests are sent. */
    private $pathTranslate = '/translate?api-version=3.0';

    /** @var string API path to which available language retrieval requests are sent. */
    private $pathLanguages = '/languages?api-version=3.0';

    /**
     * @param string $apiKey API key retrieved from Microsoft Azure Console for Microsoft Translator Text API
     */
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }

    /**
     * @return int Maximum length of a string that will be sent to the API service
     * @since 1.8.0
     */
    public function getMaxTextLength() {
        return 4600;
    }

    /**
     * @return int Maximum number of texts per batch for the API
     * @since 1.8.0
     */
    public function getMaxTextCountPerBatch() {
        return 25;
    }

    /**
     * @return int Maximum total length of texts in a batch that will be sent to the API. Set 0 to disable.
     * @since 1.8.0
     */
    public function getMaxTextLengthPerBatch() {
        return 4600;
    }

    /**
     * Translate an array of strings.
     *
     * @param array $texts   A flat sequential array of texts
     * @param array $options Translation options. 'to' key must exist and contain the target language. 'from' is an
     *                       optional parameter that specifies the original text's language. If 'from' is not provided,
     *                       original language will be detected by the API. See the options at Microsoft's API docs.
     * @return array Translated texts in the same order as $texts. If an error occurs, returns an empty array.
     * @since 1.8.0
     * @see https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate?tabs=curl#request-body
     */
    public function translateBatch(array $texts, $options = []) {
        if (!$texts) return $texts;

        // If a text type is not provided, set it as 'html'. Otherwise, HTMLs get distorted horrifically.
        $options += [
            'textType' => 'html'
        ];

        // Create the request body in the format Microsoft wants
        $requestBody = array_map(function($text) {
            return ['Text' => $text];
        }, $texts);

        // Send a request and get the response
        try {
            $result = $this->requestPost($this->pathTranslate, $options, $requestBody);

        // Catch the errors and add them to the other errors.
        } catch(\Exception $e) {
            Informer::add((new Information(get_class($e), $e->getMessage(), InformationType::ERROR))
                ->setException($e)
                ->addAsLog());

            return [];
        }

        // If the result does not contain any translations, inform the user and return an empty array.
        if (!isset($result[0]) || !isset($result[0]['translations']) || !$result[0]['translations']) {
            Informer::addError(_kdn('Translation could not be retrieved.'))->addAsLog();
            return [];
        }

        // Extract the translated texts from the result and return a flat array containing all translated texts.
        $translations = array_map(function($resultItem) {
            return Utils::array_get($resultItem, 'translations.0.text', null);
        }, $result);

        return $translations;
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
        try {
            $result = $this->requestGet($this->pathLanguages, $options + ['scope' => 'translation']);

        } catch(\Exception $e) {
            // If there was an exception, add it as information message.
            Informer::addError($e->getMessage())->setException($e)->addAsLog();
            return [];
        }

        // If the result is not what we expect, inform the user and return an empty array.
        if (!is_array($result) || !isset($result['translation']) || !is_array($result['translation'])) {
            Informer::addError(_kdn('Translations could not be retrieved.'))->addAsLog();
            return [];
        }

        $retrievedLanguages = $result['translation'];
        $languages = [];
        foreach($retrievedLanguages as $code => $data) {
            $languages[] = [
                "code" => $code,
                "name" => Utils::array_get($data, 'name', '-')
            ];
        }

        return $languages;
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * Send a GET request to Microsoft Translator Text API and get the response.
     *
     * @param string $path Path to which the request will be sent. The path will be appended to {@link $host}.
     * @param array $params A key-value pair array that will be added as parameters to the request URL.
     * @return array See {@link request()}
     * @throws \Exception See {@link request()}
     * @see https://github.com/MicrosoftTranslator/Text-Translation-API-V3-PHP/blob/master/Languages.php
     * @since 1.8.0
     */
    private function requestGet($path, $params = []) {
        // NOTE: Use the key 'http' even if you are making an HTTPS request. See:
        // http://php.net/manual/en/function.stream-context-create.php
        $options = [
            'http' => [
                'header' => $this->getHeaderString([
                    "Content-type" => "text/xml"
                ]),
                'method' => 'GET'
            ]
        ];

        return $this->request($this->host . $path, $params, $options);
    }

    /**
     * Send a POST request to Microsoft Translator Text API and get the response.
     *
     * @param string $path        Path to which the request will be sent. The path will be appended to {@link $host}.
     * @param array  $params      A key-value pair array that will be added as parameters to the request URL.
     * @param array  $requestBody An array that will be parsed to JSON and sent as request body.
     * @return array See {@link request()}
     * @throws \Exception See {@link request()}
     * @see   https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-php-translate
     * @since 1.8.0
     */
    private function requestPost($path, $params = [], $requestBody = null) {
        $headers = ["Content-type" => "application/json",];

        // Parse the given body to JSON if there is a request body.
        if ($requestBody !== null) {
            if (is_array($requestBody)) {
                $requestBody = json_encode($requestBody);
            }

            // Add content-length header
            $headers["Content-length"] = strlen($requestBody);
        }

        // NOTE: Use the key 'http' even if you are making an HTTPS request. See:
        // http://php.net/manual/en/function.stream-context-create.php
        $options = [
            'http' => [
                'header'  => $this->getHeaderString($headers),
                'method'  => 'POST',
                'content' => $requestBody
            ]
        ];

        return $this->request($this->host . $path, $params, $options);
    }

    /**
     * Make a request and get the response. This method parses the result to JSON.
     *
     * @param string $requestUrl Full URL to which the request will be made
     * @param array  $params     A key-value pair array that will be added as parameters to the request URL.
     * @param array  $options    Request options
     * @return array An array that contains the response.
     * @throws \Exception If a response could not be retrieved or the response could not be parsed to JSON.
     * @since 1.8.0
     */
    private function request($requestUrl, $params, $options) {
        $context = stream_context_create($options);

        // If there are params, append them to the request URL.
        if ($params) {
            $requestUrl .= (str_contains($requestUrl, '?') ? '&' : '?') . http_build_query($params);
        }

        // Set an error handler to get the errors
        set_error_handler(function ($severity, $message, $file, $line) {
            throw new \ErrorException($message, $severity, $severity, $file, $line);
        });

        try {
            // Get the response
            $response = file_get_contents($requestUrl, false, $context);

        } catch (\Exception $e) {
            // If the response could not be retrieved, throw an exception.
            throw new \Exception(sprintf(
                _kdn('Response could not be retrieved from %1$s with %2$s'),
                _kdn('Microsoft Translator Text API'),
                $requestUrl
            ) . ' - ' . $e->getMessage() . '(' . $e->getCode() . ')', 0, $e);
        }

        // Restore the previous error handler
        restore_error_handler();

        // Return the results by decoding it
        $decoded = json_decode($response, true);
        if ($decoded === null) {
            throw new \Exception(json_last_error_msg(), json_last_error());
        }

        return $decoded;
    }

    /**
     * Parses headers array to string in a format that can be included as headers in the request. Adds API key to the
     * headers array.
     *
     * @param array $headers
     * @return string
     * @since 1.8.0
     */
    private function getHeaderString($headers) {
        $headers["Ocp-Apim-Subscription-Key"]   = $this->apiKey;
        $headers["X-ClientTraceId"]             = $this->comCreateGuid();
        $headers["Accept-Language"]             = Utils::getLocaleCode();

        $headerStr = '';
        foreach($headers as $k => $v) $headerStr .= "{$k}: $v\r\n";

        return $headerStr;
    }

    /**
     * @return string
     * @since 1.8.0
     * @see https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-php-translate
     */
    private function comCreateGuid() {
        return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
            mt_rand( 0, 0xffff ),
            mt_rand( 0, 0x0fff ) | 0x4000,
            mt_rand( 0, 0x3fff ) | 0x8000,
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
        );
    }
}