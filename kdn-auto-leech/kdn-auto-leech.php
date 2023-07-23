<?php
/**
 * Plugin Name:     KDN Auto Leech
 * Description:     <strong>A great tool to help you auto crawl content from any website in any field. Requires PHP version 7.2 or higher!</strong>
 * Version:         2.3.6
 * Plugin URI:      https://kdnautoleech.com
 * Author:          KDN Auto Leech
 * Author URI:      https://facebook.com/kdnautoleech
 * Text Domain:     kdn-auto-leech
*/





// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Require some file.
 */
if (!class_exists('WP_List_Table')) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

if (!function_exists('get_plugin_data')) {
	require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}

if (!function_exists('wp_get_current_user')) {
    require_once(ABSPATH . 'wp-includes/pluggable.php');
}

// Define a path to be able to get the plugin directory.
// By this way, we'll be able to get the path no matter what names the user defined for the WordPress directory names.
if (!defined('KDN_AUTO_LEECH_PATH')) {

    /**
     * The plugin path with a trailing slash.
     */
    define('KDN_AUTO_LEECH_PATH', trailingslashit(plugin_dir_path(__FILE__)));
    define('KDN_AUTO_LEECH_MAINFILE_PATH', __FILE__);
    define('KDN_AUTO_LEECH_URL', trailingslashit(plugin_dir_url(__FILE__)));
    define('KDN_AUTO_LEECH_VERSION', get_plugin_data(__FILE__)['Version']);

}

// Autoload file.
require 'app/vendor/autoload.php';

// Initialize everything.
\KDNAutoLeech\KDNAutoLeech::getInstance();