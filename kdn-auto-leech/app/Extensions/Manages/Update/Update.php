<?php
namespace KDNAutoLeech\Extensions\Manages\Update;
use KDNAutoLeech\Extensions\Core\Process;
use KDNAutoLeech\Constants;

/**
 * Update plugin package.
 *
 * @since 	2.3.3
 */
class Update{

	/**
	 * Construct function.
	 */
	public function __construct(){

		// Add sub menu page.
		add_action('admin_menu', [$this, 'KDN_UpdateMenuPage'], 101);

    	// Embed extension scripts.
        add_action('admin_enqueue_scripts', function(){

        	// Enqueue JS.
            wp_enqueue_script('kdn-auto-leech-extensions-update', KDN_AUTO_LEECH_URL . 'app/Extensions/Public/js/update.js', false, KDN_AUTO_LEECH_VERSION, true);

	        // Enqueue localize scripts.
			wp_localize_script('kdn-auto-leech-extensions-update', 'KDN_JS_LocalizeUpdate',
				[
					'message_01'	=> 	_kdn('Downloading plugin package...'),
					'message_02'	=> 	_kdn('Extracting plugin package...'),
					'message_03'	=> 	_kdn('An error occurred when updating plugin. Please try again!'),
					'message_04'	=> 	_kdn('An error was occurred!'),
					'message_05'	=> 	_kdn('Plugin updated successfully!'),
					'message_06'	=> 	sprintf(
											_kdn('If this page not redirect automatically, please <b><a href="%s">click here</a></b>!'),
											get_site_url().'/wp-admin/edit.php?post_type=' . Constants::$POST_TYPE . '&page=kdn-auto-leech-dashboard'
										),
					'update_count'	=>	1,
				]
			);

        }, 102);


		// Download plugin package.
		add_action('wp_ajax_update_download',			[$this, 'KDN_UpdateDownload']);
		add_action('wp_ajax_nopriv_update_download',	[$this, 'KDN_UpdateDownload']);


		// Extract plugin package.
		add_action('wp_ajax_update_extract', 			[$this, 'KDN_UpdateExtract']);
		add_action('wp_ajax_nopriv_update_extract',		[$this, 'KDN_UpdateExtract']);

	}





	/**
	 * Add sub menu page.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_UpdateMenuPage() {

		// Add sub menu page.
		add_submenu_page(
			'plugins.php',															// Parent page
			mb_strtoupper(_kdn('Update')).': ' . _kdn('KDN Auto Leech'),			// Title
			'UP: ' . _kdn('KDN Auto Leech'),										// Menu
			Constants::$ALLOWED_USER_CAPABILITY,									// Capability
			'kdn-auto-leech',														// Page ID
			[$this, 'KDN_UpdateMenuPageContent']									// Callback
		);

	}





	/**
	 * Add sub menu content.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_UpdateMenuPageContent() {

		echo'<div class="wrap">
				<h2>' . mb_strtoupper(_kdn('Update')) . ': ' . _kdn('KDN Auto Leech') . '
				<small>(' . get_option('kdn_auto_leech_version') . ')</small></h2>
				<div style="margin: 10px 0px 20px" id="update_info">'
					. get_option('kdn_auto_leech_detail') .
				'</div>
				<p>
					<a id="update_btn"
						class="button button-primary"
						onclick="KDN_Update()">' . _kdn('Update') . '
					</a>
				</p>
			</div>';
			
	}





	/**
	 * Download the plugin package.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_UpdateDownload() {

		// Check nonce for security.
		check_ajax_referer('kdn_auto_leech_extensions', 'wp_nonce');

		// Connect to plugin package.
		$u 	= Process::Go(Process::Dl(), true);
		$ch = curl_init(); curl_setopt($ch, CURLOPT_URL, $u);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
		$data = curl_exec($ch);
		$curl_errno = curl_errno($ch);
		curl_close($ch);

		// If connect successfully.
		if ($data && !$curl_errno) {

			// Put the data into file.
			$file = fopen(explode(Constants::$APP_DOMAIN,
			plugin_dir_path(__DIR__))[0].Constants::$APP_DOMAIN.
			Process::Rv(Constants::$PI), "w+");
			fputs($file, $data);
			fclose($file);

			// Send an JSON string with success.
			wp_send_json_success(_kdn('Plugin package was downloaded.'));

		// Otherwise, send an JSON string with fail.
		} else {

			// Send an JSON string with fail.
			wp_send_json_error(_kdn('Cannot download the plugin package.'));

		}

		die();

	}





	/**
	 * Extract the plugin package.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_UpdateExtract() {

		// Check nonce for security.
		check_ajax_referer('kdn_auto_leech_extensions', 'wp_nonce');

		// Open the package file.
		$zip = new \ZipArchive;
		$res = $zip->open(explode(Constants::$APP_DOMAIN,
		plugin_dir_path(__DIR__))[0].Constants::$APP_DOMAIN.
		Process::Rv(Constants::$PI));

		// If this package file opened successfully, extract data to plugin foler.
		if($res === true){

			// Extract data to plugin foler.
			$zip->extractTo(explode(Constants::$APP_DOMAIN, plugin_dir_path(__DIR__))[0]);
			$zip->close();
			unlink(explode(Constants::$APP_DOMAIN,
			plugin_dir_path(__DIR__))[0].Constants::$APP_DOMAIN.
			Process::Rv(Constants::$PI));

			// Send an JSON string with success.
			wp_send_json_success(_kdn('Plugin package was extracted.'));

		// Otherwise, delete the package file and send an JSON string with fail.
		} else {

			// Delete package file.
			unlink(explode(Constants::$APP_DOMAIN,
			plugin_dir_path(__DIR__))[0].Constants::$APP_DOMAIN.
			Process::Rv(Constants::$PI));

			// Send an JSON string with fail.
			wp_send_json_error(_kdn('Cannot extract the plugin package.'));

		}

		die();

	}

}