<?php

namespace KDNAutoLeech\Objects\Enums;


abstract class ErrorType extends EnumBase {

    const URL_TUPLE_NOT_EXIST       = 'url_tuple_does_not_exist';
    const URL_LOCKED                = 'url_is_locked';
    const URL_COULD_NOT_BE_FETCHED  = 'url_could_not_be_fetched';
    const DUPLICATE_POST            = 'duplicate_post';
    const TRANSLATION_ERROR         = 'translation_error';

    /**
     * @param string $errorType One of the constants in {@link ErrorType}
     * @return string
     */
    public static function getDescription($errorType) {
        if(!static::isValidValue($errorType)) return '';

        switch($errorType) {
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

            default:
                return '';
        }
    }
}