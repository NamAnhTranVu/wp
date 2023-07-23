<?php
namespace KDNAutoLeech\Extensions\Core;
use KDNAutoLeech\Constants;
use KDNAutoLeech\Extensions\Core\Process;
use KDNAutoLeech\Extensions\Manages\URL\Main;
use KDNAutoLeech\Extensions\Manages\License\License;
use KDNAutoLeech\Extensions\Core\Hooks\Actions\DatabaseService;
use KDNAutoLeech\Extensions\Core\Hooks\Filters\PostService;
use KDNAutoLeech\Extensions\Core\Hooks\Filters\GeneralSettingsController;

/**
 * Extensions controllers.
 *
 * @since 	2.3.3
 */
class Controller {
	
	/**
	 * Construct function.
	 */
	public function __construct() {

		// Admin enqueue scripts.
		add_action('admin_enqueue_scripts', [$this, 'KDN_AdminEnqueueScripts'], 100, 1);

		// WP enqueue scripts.
		add_action('wp_enqueue_scripts', 	[$this, 'KDN_WPEnqueueScripts'], 100, 1);

		// Pages.
		new Main;
		new License;

		// Actions.
		new DatabaseService;

		// Filters.
		new PostService;
		new GeneralSettingsController;

		// Change menu orders.
		add_filter('custom_menu_order', 	[$this, 'KDN_MenuOrder']);

		// Admin footer text.
		add_filter('admin_footer_text', 	[$this, 'KDN_AdminFooter'], 200);
		
		// Update footer text.
		add_filter('update_footer', 		[$this, 'KDN_UpdateFooter'], 200);

		// Action when save general settings.
		add_action('load-options.php', 		[$this, 'KDN_LoadOptions'], 10, 0);

	}





    /**
     * Admin enqueue scripts.
     *
     * @since   2.3.3
     */
    public function KDN_AdminEnqueueScripts($context) {

    	// Enqueue CSS.
    	wp_enqueue_style('kdn-auto-leech-extensions',		KDN_AUTO_LEECH_URL . 'app/Extensions/Public/css/extensions.css', 	null, KDN_AUTO_LEECH_VERSION);

    	// Enqueue JS.
		wp_enqueue_script('kdn-auto-leech-extensions',		KDN_AUTO_LEECH_URL . 'app/Extensions/Public/js/extensions.js', 		null, KDN_AUTO_LEECH_VERSION, true);
		wp_enqueue_script('kdn-auto-leech-tab-override',	KDN_AUTO_LEECH_URL . 'app/Extensions/Public/js/tab-override.js', 	null, KDN_AUTO_LEECH_VERSION, true);
		wp_enqueue_script('kdn-auto-leech-js-cron',			KDN_AUTO_LEECH_URL . 'app/Extensions/Public/js/js-cron.js', 		null, KDN_AUTO_LEECH_VERSION, true);

        // Enqueue localize scripts.
		wp_localize_script('kdn-auto-leech-extensions', 'KDN_JS_Localize',
			array(
				'plugin_url'	=> KDN_AUTO_LEECH_URL,
				'ajax_url'		=> admin_url('admin-ajax.php'),
				'wp_nonce'		=> wp_create_nonce('kdn_auto_leech_extensions'),
				'dashboard_url' => get_site_url().'/wp-admin/edit.php?post_type=' . Constants::$POST_TYPE . '&page=kdn-auto-leech-dashboard',
				'js_cron'		=> get_option('_kdn_js_cron')
			)
		);

    }





    /**
     * WP enqueue scripts.
     *
     * @since   2.3.3
     */
    public function KDN_WPEnqueueScripts($context) {

    	// Enqueue JS.
		wp_enqueue_script('jquery');
		wp_enqueue_script('kdn-auto-leech-js-cron', KDN_AUTO_LEECH_URL . 'app/Extensions/Public/js/js-cron.js', null, KDN_AUTO_LEECH_VERSION, true);

        // Enqueue localize scripts.
		wp_localize_script('kdn-auto-leech-js-cron', 'KDN_JS_Localize',
			[
				'ajax_url'		=> admin_url('admin-ajax.php'),
				'js_cron'		=> get_option('_kdn_js_cron')
			]
		);

    }





	/**
	 * Change menu orders.
	 *
	 * @param 	array 	$menuOrder 		An array storage the menu orders.
	 *
	 * @return 	array 	$menuOrder 		An array storage the menu orders.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_MenuOrder($menuOrder) {

		// Prepare exactly menu orders we are want.
		$exactMenu = [
			'edit.php?post_type=' . Constants::$POST_TYPE,
			'post-new.php?post_type=' . Constants::$POST_TYPE,
			'kdn-auto-leech-dashboard',
			'kdn-auto-leech-site-tester',
			'kdn-auto-leech-tools',
			'kdn-auto-leech-manages-url',
			'kdn-auto-leech-general-settings'
		];

		// Get original menu orders.
	    global $submenu;
	    $menu = $submenu['edit.php?post_type=' . Constants::$POST_TYPE];

	    // If have default menu order.
	    if (isset($menu[10]) && $menu[10]) {

	    	// Initialize new menu orders.
	        $newMenu = [];

	        // Create each new menu order.
	        foreach ($menu as $key => $menuData) {
	        	$exactMenuKey = array_search($menuData[2], $exactMenu);
	        	if ($exactMenuKey !== false) {
	        		$newMenu[$exactMenuKey] = $menu[$key];
	        	}
	        }

	        // Sort new menu orders.
			uksort($newMenu, function($a, $b) {
				return $a - $b;
			});

			// Replace original menu orders with new menu orders.
	        $submenu['edit.php?post_type=' . Constants::$POST_TYPE] = $newMenu;

	        return $menuOrder;

	    }

	}





	/**
	 * Change admin footer text.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_AdminFooter() {

		echo '	<span id="footer-thankyou">' . 
					_kdn('Thank you for using <a href="https://kdnautoleech.com" target="_blank">KDN Auto Leech</a>') .
			 '	</span>';

	}





	/**
	 * Change update footer text.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_UpdateFooter() {

		echo _kdn('Version') . ' ' . KDN_AUTO_LEECH_VERSION;
		
	}





	/**
	 * Action when save general settings.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_LoadOptions() {
		$li = isset($_POST[Process::Li()]) ? $_POST[Process::Li()] : '';
		if (isset($_POST[Process::Li()])) { Process::Rt();
		Process::Uo(Process::To(), $li, true); }
	}

}