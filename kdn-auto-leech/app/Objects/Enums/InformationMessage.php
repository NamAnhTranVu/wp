<?php

namespace KDNAutoLeech\Objects\Enums;


class InformationMessage extends EnumBase {

    const INFO                              = 'info';
    const ERROR                             = 'error';
    const FAIL                              = 'fail';
    const URL_TUPLE_NOT_EXIST               = 'url_tuple_does_not_exist';
    const URL_LOCKED                        = 'url_is_locked';
    const URL_COULD_NOT_BE_FETCHED          = 'url_could_not_be_fetched';
    const DUPLICATE_POST                    = 'duplicate_post';
    const TRANSLATION_ERROR                 = 'translation_error';
    const VALUE_NOT_NUMERIC_ERROR           = 'value_not_numeric_error';
    const URL_NOT_FOUND                     = 'url_not_found';
    const REMOTE_SERVER_ERROR               = 'remote_server_error';
    const FILE_COULD_NOT_BE_SAVED_ERROR     = 'file_cannot_be_saved';
    const REQUEST_ERROR                     = 'request_error';
    const HTML_COULD_NOT_BE_RETRIEVED_ERROR = 'html_could_not_be_retrieved';
    const CONNECTION_ERROR                  = 'connection_error';
    const CSS_SELECTOR_SYNTAX_ERROR         = 'css_selector_synax_error';
    const WOOCOMMERCE_ERROR                 = 'woocommerce_error';
    const TAXONOMY_DOES_NOT_EXIST           = 'taxonomy_does_not_exist';
    const FILE_NOT_EXIST                    = 'file_not_exist';

    /**
     * @param string $informationMessage One of the constants in {@link InformationMessage}
     * @return string
     */
    public static function getDescription($informationMessage) {
        if(!static::isValidValue($informationMessage)) return '';

        switch($informationMessage) {
            case static::INFO:
                return _kdn('Information');

            case static::ERROR:
                return _kdn('Error');

            case static::FAIL:
                return _kdn('Fail');

            case static::URL_TUPLE_NOT_EXIST:
                return _kdn("URL does not exist in the database.");

            case static::URL_LOCKED:
                return _kdn("Current URL is locked. It means it is being used by another process.");

            case static::URL_COULD_NOT_BE_FETCHED:
                return _kdn("Data could not be retrieved from the URL.");

            case static::DUPLICATE_POST:
                return _kdn("Duplicate post.");

            case static::TRANSLATION_ERROR:
                return _kdn("Translation error.");

            case static::VALUE_NOT_NUMERIC_ERROR:
                return _kdn("Value is not numeric.");

            case static::URL_NOT_FOUND:
                return _kdn("URL is not found");

            case static::FILE_COULD_NOT_BE_SAVED_ERROR:
                return _kdn("File could not be saved");

            case static::REQUEST_ERROR:
                return _kdn("Request error");

            case static::HTML_COULD_NOT_BE_RETRIEVED_ERROR:
                return _kdn("HTML could not be retrieved");

            case static::CONNECTION_ERROR:
                return _kdn("Connection error");

            case static::CSS_SELECTOR_SYNTAX_ERROR:
                return _kdn("CSS selector syntax error");

            case static::WOOCOMMERCE_ERROR:
                return _kdn("WooCommerce error");

            case static::TAXONOMY_DOES_NOT_EXIST:
                return _kdn("Taxonomy does not exist");

            case static::FILE_NOT_EXIST:
                return _kdn("File does not exist");

            default:
                return '';
        }
    }

}