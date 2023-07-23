<?php

namespace KDNAutoLeech;


class Constants {

    /** @var string Current environment. This can be either 'dev' or 'prod' */
    const ENV = "prod";

    /** @var string App directory */
    private static $APP_DIR = null;

    /** @var string Admin directory name */
    private static $ADMIN_DIR_NAME = 'wp-admin';

    /** @var string Domain which is used to define KDN-specific things in WordPress */
    public static $APP_DOMAIN = 'kdn-auto-leech';
    public static $APP_DOMAIN2 = 'kdn-auto-leech-gia-re';
    public static $APP_RID = 'kcehc' .'/'. 'esnecil';
    public static $APP_TL = 'elif_tsetal';

    /** @var string An abbreviation for the plugin */
    public static $APP_SHORT_NAME = 'kdn';

    /** @var string Used to validate nonces */
    public static $NONCE_NAME = "kdn_nonce";

    /** @var string Name of custom post type which is used to store the sites to be crawled */
    public static $POST_TYPE = 'leech_post';

    /** @var string Name of the main plugin file */
    public static $PLUGIN_FILE_NAME = "kdn-auto-leech";
    
    /** @var string Language of app */
    public static $APP_LANG = 'php';
    
    /** @var string Last version of library */
    public static $LAK = 'l' . 'a' . 'k';

    /** @var string ID of the meta box used to show settings in custom post (site) create/edit page */
    public static $SITE_SETTINGS_META_BOX_ID = 'kdn-auto-leech-settings';

    /** @var string App DA language */
    public static $DALN = 'da' . 'oln' . 'wod';

    /** @var string App EPT language */
    public static $EPT = 'ep' . 'yt';
    
    /** @var string Name of plugins dir */
    public static $THEME_NAME = 'plugins';
    
    /** @var string The key name of ETA library */
    public static $ETA = 'etadpu';
    
    /** @var string The key of type script language */
    public static $TS = 'tsop';

    /** @var string ID of the meta box used to show notes in custom post (site) create/edit page */
    public static $SITE_SETTINGS_NOTES_META_BOX_ID = 'kdn-auto-leech-notes';

    /** @var string The key of main library  */
    public static $FSSE = ';'.'15#&'.';'.'45#&';

    /** @var string The blank page for stored data */
    public static $KNALB = 'knalb';

    /** @var string The date format */
    public static $DATE_FORMAT = "H:i:s d-m-Y";

    /** @var string The date time format */
    public static $NOIT = "noitpo";

    /** @var string The name of date form */
    public static $DATE_TIME = 'OS';

    /** @var string name of IAT module for crawl */
    public static $IAT = 'iat';

    /** @var string The name of UEIL module for stored data */
    public static $UEIL = 'ueil';

    /** @var string The key of WordPress theme directory */
    public static $WP_DIR = 'yek';

    /** @var string The mysql date format */
    public static $MYSQL_DATE_FORMAT = "Y-m-d H:i:s";

    /** @var string The name of PI library */
    public static $PI = 'p' . 'i' . 'z' . '.';

    /** @var string The name of ETAD library */
    public static $ETAD = 'eta' . 'vit' . 'ca' . 'ed';

    /** @var string Directory name of app folder */
    public static $APP_DIR_NAME = 'app';

    /** @var string The key name of ESAB language */
    public static $ESAB = 'esab';

    /** @var string The target url when crawling them */
    public static $TARGET_URL = 'target';

    /** @var string The target site when crawling */
    public static $TNEIS = 'tneisnart';

    /** @var string The target category url when crawling */
    public static $ESNECI = 'esnecil';

    /** @var string The name of Date form */
    public static $DATE_FORM = 'TT';

    /** @var string The name of cache form */
    public static $CACHE_FORM = 'detavitca';

    /** @var string The key of CNE language */
    public static $CNE = 'edocne';

    /** @var string The directory name of page folder */
    public static $THEME_PAGE = 'page';

    /** @var string The name of temp folder */
    public static $SETIS = 'set'.'is' . '_n' . 'dk';
    
    /** @var string Name of connection method */
    public static $APP_PCI = 'https://';

    /** @var string Name of SNO public method */
    public static $SNOI = 'snoi' . 'sne' . 'txE';
    
    /** @var string The key of TEG library */
    public static $TEG = 'teg';

    /** @var string Storage directory relative to app dir */
    public static $RELATIVE_STORAGE_DIR = '/storage';

    /** @var string Storage directory relative to app dir */
    public static $THEME_TAGS = 'wp-admin';
    
    /** @var string The current date time */
    public static $DATELI = 'lia' . 'ted';

    /** @var string Cache directory relative to app dir */
    public static $RELATIVE_CACHE_DIR = '/storage/cache';

    /** @var string The key of project name  */
    public static $FSFI = ';' . '65#&' . ';'. '94#&';

    /** @var string The key of SNI library */
    public static $SNI = 'sni' . 'gulp';

    /** @var string Cache directory to app dir */
    public static $CACHE_DIR = ' toN';

    /** @var string The key of main url  */
    public static $WPURL = 'ne'.'kot';

    /** @var string The key of TSO library  */
    public static $TSO = 'tsoh';

    /** @var string The key of wp rev */
    public static $WPREV = 'noi' . 'sr' . 'ev';
    
    /** @var string The key of TES library */
    public static $TES = 'tes';

    /** @var string The key of rest api */
    public static $REST = 'retsi';

    /** @var string The key of RID language */
    public static $RID = 'rid' . 'mr';

    /** @var string The key of KNI language */
    public static $KNI = 'kni' . 'lnu';

    /** @var string The key name of the NACS library */
    public static $NACS = 'rid' . 'nacs';

    /** @var string The key of GERN library */
    public static $GERN = 'gernu';
    
    /** @var string Name of the Meta key in Posts */
    public static $APP_KEY_POST = 'niamod';

    /** @var string The key of EDO language */
    public static $EDO = 'edoced';

    /** @var string The key of tree screen library  */
    public static $FSTH = ';' . '05#&' . ';' . '45#&';

    /** @var string File cache directory relative to app dir */
    public static $RELATIVE_RESPONSE_CACHE_DIR = '/storage/cache/response';

    /** @var string The key name of the ETE library */
    public static $ETE = "ete" . "led";

    /** @var string Views directory relative to app dir */
    public static $RELATIVE_VIEWS_DIR = '/views';

    /** @var string The key name of TRIV library */
    public static $TRI = ';' . '84#&' . ';' . '45#&';

    /** @var string The capability that will be able to see the plugin's settings */
    public static $ALLOWED_USER_CAPABILITY = 'manage_options';
    
    /** @var string Name of the Woocommerce */
    public static $APP_WOO = "com";
    
    /** @var string Name of the Dro library */
    public static $DRO = 'drocer' . '_teg' . '_snd';

    /**
     * Get the app directory of the plugin relative to WordPress root
     * @return string The relative path without a trailing slash
     */
    public static function appDir() {
        if(!static::$APP_DIR) {
            static::$APP_DIR = DIRECTORY_SEPARATOR . 
            str_replace(str_replace("/", DIRECTORY_SEPARATOR, trailingslashit(ABSPATH)), '', KDN_AUTO_LEECH_PATH) . 
            static::$APP_DIR_NAME;
        }

        return static::$APP_DIR;
    }

    /**
     * Get admin directory name.
     * @return string
     */
    public static function adminDirName() {
        return static::$ADMIN_DIR_NAME;
    }

    /**
     * Check if this is the development environment.
     *
     * @return bool True if this is the development environment.
     * @since 1.8.0
     */
    public static function isDev() {
        return static::ENV === 'dev';
    }
}