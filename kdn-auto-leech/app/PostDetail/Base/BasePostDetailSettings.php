<?php

namespace KDNAutoLeech\PostDetail\Base;


use KDNAutoLeech\Objects\Settings\SettingsImpl;

abstract class BasePostDetailSettings {

    /** @var null|array Stores all settings meta keys. */
    private $allMetaKeys = null;

    /** @var null|array Stores default values of the meta keys. The format is the same as {@link PostService::$metaKeyDefaults} */
    private $metaKeyDefaults = null;

    /** @var null|array Stores single meta keys. */
    private $singleMetaKeys = null;

    /** @var null|\Illuminate\Contracts\View\View A view that will be rendered in Site Settings page. */
    private $settingsView = null;

    /** @var null|SettingsImpl */
    private $postSettings = null;

    /**
     * @param SettingsImpl $postSettings
     */
    public function __construct($postSettings = null) {
        $this->postSettings = $postSettings;
    }

    /**
     * @return array An array of strings, where each string is a meta key.
     */
    abstract protected function createAllMetaKeys();

    /**
     * @return array A key-value pair, where each key is a meta key existing in the value of {@link createAllMetaKeys()}
     *               and the values are their default values.
     */
    abstract protected function createMetaKeyDefaults();

    /**
     * @return array An array of strings, where each string is a key, being one of the keys supplied in
     *               {@link getAllMetaKeys()}, of a single key. A single key means that the value stored for that key
     *               is a string, not an array.
     */
    abstract protected function createSingleMetaKeys();

    /**
     * Create settings view. This view will be shown in the site settings page. The view can be created by using
     * {@link Utils::view()} method. If the view is outside of the plugin, it can be created using a custom implementation
     * of {@link Utils::view()}. In that case, check the source code of the method.
     *
     * @return null|\Illuminate\Contracts\View\View Not-rendered blade view
     */
    abstract protected function createSettingsView();

    /**
     * @return array|null
     */
    public function getAllMetaKeys() {
        if ($this->allMetaKeys === null) $this->allMetaKeys = $this->createAllMetaKeys();

        return $this->allMetaKeys;
    }

    /**
     * @return array|null
     */
    public function getMetaKeyDefaults() {
        if ($this->metaKeyDefaults === null) $this->metaKeyDefaults = $this->createMetaKeyDefaults();

        return $this->metaKeyDefaults;
    }

    /**
     * @return array|null
     */
    public function getSingleMetaKeys() {
        if ($this->singleMetaKeys === null) $this->singleMetaKeys = $this->createSingleMetaKeys();

        return $this->singleMetaKeys;
    }

    /**
     * @return null|\Illuminate\Contracts\View\View
     */
    public function getSettingsView() {
        if ($this->settingsView === null) {
            $this->settingsView = $this->createSettingsView();
        }

        return $this->settingsView;
    }

    /**
     * @return null|SettingsImpl
     * @since 1.8.0
     */
    protected function getSettings() {
        return $this->postSettings;
    }

}