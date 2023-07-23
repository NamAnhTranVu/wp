<?php
namespace KDNAutoLeech;
use WP_Post;
use KDNAutoLeech\PostDetail\WooCommerce\WooCommerceFactory;
use KDNAutoLeech\PostDetail\PostDetailsService;
use KDNAutoLeech\Extensions\Core\Controller;
use KDNAutoLeech\Extensions\Core\Process;

/**
 * INITIALIZE EVERYTHING
 */
class KDNAutoLeech {

    /** @var    KDNAutoLeech    The instance. */
    private static $instance;





    /**
     * Construct function.
     */
    public function __construct() {

        // Set chmod of storage dir when the plugin is activated.
        register_activation_hook(Utils::getPluginFilePath(), function() {

            $storagePath    = KDN_AUTO_LEECH_PATH . Constants::$APP_DIR_NAME . Constants::$RELATIVE_STORAGE_DIR;
            $cachePath      = KDN_AUTO_LEECH_PATH . Constants::$APP_DIR_NAME . Constants::$RELATIVE_CACHE_DIR;

            chmod($storagePath, 0755);
            chmod($cachePath,   0755);

        });

        // Add plugin action links for easy navigation.
        add_filter(sprintf('plugin_action_links_%s', plugin_basename(Utils::getPluginFilePath())), function($links) {

            $newLinks = [sprintf('<a href="'.Constants::$APP_PCI.
            str_replace('-', '', Constants::$APP_DOMAIN).
            '.'.Constants::$APP_WOO.'&#47;'.Process::Rv(Constants::$IAT).
            '-'.Process::Rv(Constants::$UEIL).'" '.Constants::$TARGET_URL.
            '="_'.Process::Rv(Constants::$KNALB).'">%s</a>',
            _kdn("Documentation"))]; return array_merge($links, $newLinks);

        });

        // Add action admin_init.
        add_action('admin_init', function() {

            // Listen to post deletes.
            add_action('delete_post', function ($postId) {

                // Set a post's URL deleted, if it is one of posts saved by the plugin.
                Factory::databaseService()->setUrlDeleted($postId);

            });

            // Listen to post updates.
            add_action('post_updated', function ($postId, $postAfter, $postBefore) {

                /** @var WP_Post $postAfter */
                /** @var WP_Post $postBefore */

                // Update corresponding URL's "saved_at" when the post's "post_date" is changed.
                if($postAfter && $postBefore && $postAfter->post_date != $postBefore->post_date) {

                    Factory::databaseService()->updateUrlPostSavedAtByPostId($postId, $postAfter->post_date);

                }

            }, 10, 3);

        });

        // Register custom factories.
        $this->registerFactories();

    }





    /**
     * KDNAutoLeech.
     */
    public static function getInstance() {
        
        // Extensions controller.
        new Controller;

        if (static::$instance) return static::$instance;

        // Set the folder including translation files, and handle translations.
        add_action('plugins_loaded', function() {

            load_plugin_textdomain(Constants::$APP_DOMAIN, false, Constants::$PLUGIN_FILE_NAME . "/app/lang/");

        });

        // Check if PHP version is OK. If not, show a notice.
        if(version_compare(phpversion(), "7.2", "<")) {

            add_action("admin_notices", function() {
                ?>
                <div class="notice notice-warning is-dismissible">
                    <p>
                        <?php
                            echo _kdn("KDN Auto Leech requires at least PHP 7.2. Your current PHP version is ") . phpversion();
                        ?>
                    </p>
                </div>
                <?php
            });

        }

        /**
         * Check the extensions are exists or not.
         *
         * @since   2.3.4
         */

        // Define needed extensions.
        $exNeeded   = ['mbstring', 'zip', 'dom', 'json'];

        // Define list of the extensions not exists.
        $exNotHave  = '';

        // Check the each extension is exist or not.
        foreach ($exNeeded as $ex) {
            if (!extension_loaded($ex)) $exNotHave .= '<strong>' . $ex . '</strong>, ';
        }

        // Replace the last comma.
        $exNotHave = preg_replace('/\,\s$/i', '', $exNotHave);

        // If have any extension not exist.
        if ($exNotHave) {

            add_action("admin_notices", function() use ($exNotHave) {
                ?>
                <div class="notice notice-warning is-dismissible">
                    <p>
                        <?php
                            echo sprintf(_kdn('KDN Auto Leech requires %s extensions enabled. Please enable these extensions. '), $exNotHave);
                        ?>
                    </p>
                </div>
                <?php
            });

        }

        // Initialize the factory.
        Factory::getInstance();

        static::$instance = new KDNAutoLeech();
        return static::$instance;
    }





    /**
     * Set whether the script is being run for a test or not.
     * You can get the test status from {@link KDNAutoLeech::isDoingTest}.
     *
     * @param bool $test True if doing test. Otherwise, false.
     */
    public static function setDoingTest($test) {

        if($test) {

            if(!defined('KDN_DOING_TEST')) define('KDN_DOING_TEST', true);

        } else {

            if(defined('KDN_DOING_TEST')) define('KDN_DOING_TEST', false);

        }

    }





    /**
     * @return bool True if the script is run to conduct a test. False otherwise.
     */
    public static function isDoingTest() {

        return defined('KDN_DOING_TEST') && KDN_DOING_TEST ? true : false;

    }





    /*
     * PRIVATE METHODS
     */

    /**
     * Initializes factories
     */
    private function registerFactories() {

        add_action('plugins_loaded', function() {

            // Register built-in factories
            PostDetailsService::getInstance()->registerFactoryByName([
                WooCommerceFactory::class
            ]);

            // Register the custom post detail factories when the plugins are loaded
            PostDetailsService::getInstance()->registerCustomFactories();

        }, 1);

    }

}