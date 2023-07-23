<?php

namespace KDNAutoLeech\Test\Data;


use KDNAutoLeech\Factory;

class GeneralTestData {

    /** @var int The ID of the site to be tested */
    private $siteId;

    /** @var string One of the values of the array TestService::$GENERAL_TESTS */
    private $testType;

    /** @var string The URL to be tested */
    private $testUrl;

    /**
    *   @var bool If testing a child post
    *   @since 2.1.8
    */
    private $childPost;

    /** @var array Post meta of the site whose ID is {@link $postId} */
    private $settings;

    /**
     * @param int $siteId       See {@link $siteId}
     * @param string $testType  See {@link $testType}
     * @param string $testUrl   See {@link $testUrl}
     */
    public function __construct($siteId, $testType, $testUrl, $childPost) {
        // Make sure the test type is valid.
        if(!in_array($testType, array_values(Factory::testController()->getGeneralTestTypes()))) wp_die("Test type is not valid.");

        $this->siteId       = $siteId;
        $this->testType     = $testType;
        $this->testUrl      = $testUrl;
        $this->childPost    = $childPost;
        $this->settings     = get_post_meta($siteId);
    }

    /*
     * GETTERS
     */

    /**
     * @return int See {@link siteId}
     */
    public function getSiteId() {
        return $this->siteId;
    }

    /**
     * @return string See {@link testType}
     */
    public function getTestType() {
        return $this->testType;
    }

    /**
     * @return string See {@link testUrl}
     */
    public function getTestUrl() {
        return $this->testUrl;
    }

    /**
     * @return array See {@link settings}
     */
    public function getSettings() {
        return $this->settings;
    }

    /**
     * @return bool See {@link childPost}
     * @since 2.1.8
     */
    public function getChildPost() {
        return $this->childPost;
    }

}