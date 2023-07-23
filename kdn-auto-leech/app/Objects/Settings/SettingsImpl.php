<?php

namespace KDNAutoLeech\Objects\Settings;


use KDNAutoLeech\Objects\Traits\SettingsTrait;

/**
 * Implementation of {@link SettingsTrait}
 *
 * @package KDNAutoLeech\objects
 * @since   1.8.0
 */
class SettingsImpl {

    use SettingsTrait;

    /**
     * SettingsImpl constructor.
     *
     * @param array $settings Post settings array.
     * @param array $singleKeys Single meta keys. A flat array.
     * @param bool  $prepare  True if the settings should be prepared. Otherwise, false.
     */
    public function __construct($settings, $singleKeys = [], $prepare = true) {
        $this->setSettings($settings, $singleKeys, $prepare);
        $this->setSettingsImpl($this);
    }

}