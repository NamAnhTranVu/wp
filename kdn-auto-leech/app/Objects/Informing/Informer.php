<?php

namespace KDNAutoLeech\Objects\Informing;


use KDNAutoLeech\Objects\Enums\InformationMessage;
use KDNAutoLeech\Objects\Enums\InformationType;

class Informer {

    private static $infos = [];

    /**
     * @param Information $info
     */
    public static function add($info) {
        static::$infos[] = $info;
    }

    /**
     * Adds an error information
     *
     * @param string $details
     * @return Information Created information
     */
    public static function addError($details) {
        $information = Information::fromInformationMessage(
            InformationMessage::ERROR,
            $details,
            InformationType::ERROR
        );

        static::add($information);
        return $information;
    }

    /**
     * Adds an info type information
     *
     * @param string $details
     * @return Information Created information
     */
    public static function addInfo($details) {
        $information = Information::fromInformationMessage(
            InformationMessage::INFO,
            $details,
            InformationType::INFO
        );

        static::add($information);
        return $information;
    }

    /**
     * @return array Array of Information instances
     */
    public static function getInfos() {
        return static::$infos;
    }

    /**
     * Clear the infos
     */
    public static function clearInfos() {
        static::$infos = [];
    }

    /**
     * @return array An array of strings. The strings are string representations of the information items.
     */
    public static function getStringArray() {
        return array_map(function($information) {
            /** @param Information $information */
            return (string) $information;
        }, static::$infos);
    }

    /**
     * @return string All information items in a single string.
     */
    public static function getString() {
        return implode('\n', Informer::getStringArray());
    }

    /**
     * @return bool True if there is at least one information. Otherwise, false.
     */
    public static function hasInfo() {
        return sizeof(static::$infos) > 0;
    }

}