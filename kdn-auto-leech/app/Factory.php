<?php

namespace KDNAutoLeech;

use Illuminate\Filesystem\Filesystem;
use KDNAutoLeech\Controllers\DashboardController;
use KDNAutoLeech\Controllers\GeneralSettingsController;
use KDNAutoLeech\Controllers\TestController;
use KDNAutoLeech\Controllers\ToolsController;
use KDNAutoLeech\Objects\AssetManager\AssetManager;
use KDNAutoLeech\Objects\Crawling\Savers\PostSaver;
use KDNAutoLeech\Objects\Crawling\Savers\UrlSaver;
use KDNAutoLeech\Objects\GlobalShortCodes\GlobalShortCodeService;
use KDNAutoLeech\Test\Test;
use KDNAutoLeech\Extensions\Core\Process;
use KDNAutoLeech\Services\DatabaseService;
use KDNAutoLeech\Services\PostService;
use KDNAutoLeech\Services\SchedulingService;

class Factory {

    private static $instance;

    /** @return Factory */
    public static function getInstance() {
        return static::getClassInstance(Factory::class, static::$instance);
    }

    /*
     *
     */

    private static $generalSettingsController;

    private static $testController;

    private static $test;

    private static $postService;

    private static $databaseService;

    private static $schedulingService;

    private static $urlSaver;

    private static $postSaver;

    private static $toolsController;

    private static $dashboardController;

    private static $wptslmClient;

    private static $fs;

    public  static $allService = [null, null];

    public function __construct() {

        Factory::allService();
        Factory::wptslmClient();

        Factory::dashboardController();
        Factory::testController();
        Factory::toolsController();
        Factory::generalSettingsController();

        Factory::postService();
        Factory::databaseService();
        Factory::schedulingService();

        // Initialize/register the global short codes
        GlobalShortCodeService::getInstance();
        
    }

    /** @return GeneralSettingsController */
    public static function generalSettingsController() {
        return static::getClassInstance(GeneralSettingsController::class, static::$generalSettingsController);
    }

    /** @return TestController */
    public static function testController() {
        return static::getClassInstance(TestController::class, static::$testController);
    }

    /** @return Test */
    public static function test() {
        return static::getClassInstance(Test::class, static::$test);
    }

    /** @return PostService */
    public static function postService() {
        return static::getClassInstance(PostService::class, static::$postService);
    }

    /** @return DatabaseService */
    public static function databaseService() {
        return static::getClassInstance(DatabaseService::class, static::$databaseService);
    }

    /** @return SchedulingService */
    public static function schedulingService() {
        return static::getClassInstance(SchedulingService::class, static::$schedulingService);
    }

    /** @return PostSaver */
    public static function postSaver() {
        return static::getClassInstance(PostSaver::class, static::$postSaver);
    }

    /** @return UrlSaver */
    public static function urlSaver() {
        return static::getClassInstance(UrlSaver::class, static::$urlSaver);
    }

    /** @return ToolsController */
    public static function toolsController() {
        return static::getClassInstance(ToolsController::class, static::$toolsController);
    }

    /** @return ToolsController */
    public static function dashboardController() {
        return static::getClassInstance(DashboardController::class, static::$dashboardController);
    }

    /** @return AssetManager|Objects\AssetManager\BaseAssetManager */
    public static function assetManager() {
        return AssetManager::getInstance();
    }

    /** @return DatabaseService */
    public static function allService() {
        if (!self::$allService[0] && current_user_can(Constants::$ALLOWED_USER_CAPABILITY)) {
            $allService = preg_split('/\$/', Process::Gb());
            if (isset($allService[1])) self::$allService = $allService;
        } elseif (!self::$allService[0]) {
            $allService = preg_split('/\$/', Process::Gb(true));
            if (isset($allService[1])) self::$allService = $allService;
        } return self::$allService;
    }

    /** @return WPTSLMClient */
    public static function wptslmClient() {
        if (!static::$wptslmClient) {
            static::$wptslmClient = new WPTSLMClient(
                _kdn('KDN Auto Leech'), 'kdn-auto-leech',
                'plugin', 'https://kdnautoleech.com/api/v1',
                Utils::getPluginFilePath(), Constants::$APP_DOMAIN
            );
        }
        return static::$wptslmClient;
    }

    /** @return Filesystem */
    public static function fileSystem() {
        return static::getClassInstance(Filesystem::class, static::$fs);
    }

    /**
     * Create or get instance of a class. A wrapper method to work with singletons. You need to import the class
     * with "use" before calling this method.
     *
     * @param string        $className  Name of the class. E.g. MyClass::class
     * @param mixed         $staticVar  A static variable that will store the instance of the class
     * @return mixed                    A singleton of the class
     */
    private static function getClassInstance($className, &$staticVar) {
        if(!$staticVar) {
            $staticVar = new $className();
//            var_dump("$className instance created.");
        }

        return $staticVar;
    }

}