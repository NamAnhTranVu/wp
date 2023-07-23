<?php

namespace KDNAutoLeech\Test\Tests;


use KDNAutoLeech\Objects\Translation\TextTranslator;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class TranslationTest extends AbstractTest {

    private $message;

    /**
     * Conduct the test and return an array of results.
     *
     * @param TestData $data Information required for the test
     * @return array|string|mixed
     */
    protected function createResults($data) {
        // Here, form item values must be a string and it must contain the test text to be translated.
        if(!$data->getFormItemValues() || is_array($data->getFormItemValues())) return [];

        $text           = $data->getFormItemValues();
        $serviceType    = $data->get("serviceType");
        $from           = $data->get("from");
        $to             = $data->get("to");
        $end            = $data->get("end");
        $textTranslator = new TextTranslator([$text]);

        $translated = [];
        $message = '';

        switch($serviceType) {
            case TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION:
                $projectId  = $data->get("projectId");
                $apiKey     = $data->get("apiKey");

                $translated = $textTranslator->translateWithGoogle($projectId, $apiKey, $to, $from, $end);

                $message = sprintf('<b>%1$s</b>: %2$s, <b>%3$s</b>: %4$s',
                    _kdn("API Key"), $apiKey, _kdn("Project ID"), $projectId);

                break;

            case TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT:
                $clientSecret = $data->get("clientSecret");

                $translated = $textTranslator->translateWithMicrosoft($clientSecret, $to, $from, $end);

                $message = sprintf('<b>%1$s</b>: %2$s', _kdn("Client Secret"), $clientSecret);

                break;

            case TextTranslator::KEY_YANDEX_TRANSLATOR:
                $api        = rawurldecode($data->get("api"));
                $api        = str_replace('+', '%%plus%%', $api);
                parse_str($api, $api);
                $api        = json_encode($api);
                $api        = str_replace('%%plus%%', '+', $api);
                $api        = json_decode($api, true);
                $allAPI     = '<ul style="list-style-type:disc">';

                foreach ($api as $key => $apiKeys) {

                    // If randomize is activated.
                    if ($data->get("randomize")) shuffle($apiKeys);

                    // Create a string of all API Key.
                    foreach ($apiKeys as $apiKey) {
                        $allAPI .= '<li>' . $apiKey . '</li>';
                    }

                    // Get all API Key inside an array.
                    $api = $apiKeys;
                    break;
                }

                $translated = $textTranslator->translateWithYandex($api, $to, $from, $end);

                $allAPI     .= '</ul>';

                $message = sprintf('<b>%1$s</b>: %2$s', _kdn("API Key"), $allAPI);

                break;

            default:
                return [];
        }

        $message = sprintf('<b>%1$s</b>: %2$s, <b>%3$s</b>: %4$s, <b>%5$s</b>: %6$s, %7$s',
            _kdn("From"), ($from == 'detect' ? _kdn("Detect") : $from), _kdn("To"), $to, _kdn("Last"), $end, $message);
        $message = _kdn("Translation test results with") . " " . $message;

        $this->message = $message;

        return $translated;
    }

    /**
     * Create the view of the response
     *
     * @return \Illuminate\Contracts\View\View
     * @throws \Exception
     */
    protected function createView() {
        return Utils::view('partials/test-result')
            ->with("results", $this->getResults())
            ->with("message", $this->message);
    }
}