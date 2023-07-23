<?php

namespace KDNAutoLeech\Objects\Translation\Clients;


abstract class AbstractTranslateAPIClient {

    /**
     * @return int Maximum length of a string that will be sent to the API service
     * @since 1.8.0
     */
    public abstract function getMaxTextLength();

    /**
     * @return int Maximum number of texts per batch for the API
     * @since 1.8.0
     */
    public abstract function getMaxTextCountPerBatch();

    /**
     * @return int Maximum total length of texts in a batch that will be sent to the API. Set 0 to disable.
     * @since 1.8.0
     */
    public abstract function getMaxTextLengthPerBatch();

    /**
     * Translate an array of strings.
     *
     * @param array $texts   A flat sequential array of texts
     * @param array $options Translation options
     * @return array Translated texts in the same order as $texts. If an error occurs, returns an empty array.
     * @since 1.8.0
     */
    public abstract function translateBatch(array $texts, $options = []);

    /**
     * Get languages
     *
     * @param array $options A key-value pair array that defines the options for to-be-retrieved languages
     * @return array An array structured as [ ["code" => "lang1code", "name" => "Lang 1 Name], ["code" => "lang2code", "name" => "Lang 2 Name"], ... ]
     *               In case of error, returns an empty array.
     * @since 1.8.0
     */
    public abstract function localizedLanguages($options = []);

    /**
     * Prepares languages array as key-value pairs.
     *
     * @param array $options See {@link localizedLanguages()}
     * @return array A key-value pair where keys are language codes and the values are their names.
     * @since 1.8.0
     */
    public function getLocalizedLanguagesAsAssocArray($options = []) {
        $languages = $this->localizedLanguages($options);

        $prepared = [];
        foreach($languages as $lang) $prepared[$lang["code"]] = $lang["name"];

        return $prepared;
    }

}