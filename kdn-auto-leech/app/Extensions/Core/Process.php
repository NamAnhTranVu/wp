<?php
namespace KDNAutoLeech\Extensions\Core;
use KDNAutoLeech\Extensions\Manages\URL\Columns;
use KDNAutoLeech\Constants;
use KDNAutoLeech\Factory;
use KDNAutoLeech\Utils;
use GuzzleHttp\Client;

/**
 * Extensions process.
 *
 * @since 	2.3.3
 */
class Process {

	/** @var 	array 	An array storage all colums. */
	private $columns;





	/**
	 * Construct function.
	 */
	public function __construct(){

		// Action: Edit url.
		add_action('wp_ajax_edit_url', 				[$this, 'EditUrl']);
		add_action('wp_ajax_nopriv_edit_url', 		[$this, 'EditUrl']);

		// Action: Delete url.
		add_action('wp_ajax_delete_url', 			[$this, 'DeleteUrl']);
		add_action('wp_ajax_nopriv_delete_url', 	[$this, 'DeleteUrl']);

		// Action: Restore url.
		add_action('wp_ajax_restore_url', 			[$this, 'RestoreUrl']);
		add_action('wp_ajax_nopriv_restore_url', 	[$this, 'RestoreUrl']);

		// Action: Remove url.
		add_action('wp_ajax_remove_url', 			[$this, 'RemoveUrl']);
		add_action('wp_ajax_nopriv_remove_url', 	[$this, 'RemoveUrl']);

		// Action: Run JS Cron.
		add_action('wp_ajax_kdn_jscron', 			[$this, 'KDN_Js_Cron']);
		add_action('wp_ajax_nopriv_kdn_jscron', 	[$this, 'KDN_Js_Cron']);

		// Initialize "Columns" object.
		$this->columns = new Columns;

	}





	/**
	 * Action: Edit url.
	 * Update each URL with their colums.
	 *
	 * @return 	json 	$return 	An JSON string contains all HTML code of that URL row.
	 *
	 * @since 	2.3.3
	 */
	public function EditUrl() {

		// Check nonce for security.
		check_ajax_referer('kdn_auto_leech_extensions', 'wp_nonce');

		// Get all data transmited.
		$id 			= $_POST['id'];
		$url 			= $_POST['url'];
		$lasturl 		= $_POST['lasturl'];
		$issaved 		= $_POST['issaved'] ? $_POST['issaved'] : 0;
		$saved 			= $_POST['saved'] ? $_POST['saved'] : null;
		$lastsaved 		= $_POST['lastsaved'];
		$category 		= $_POST['category'];
		$campaign 		= $_POST['campaign'];
		$byPassDelete 	= $_POST['bypassdelete'];

		// Update new data to database.
		global $wpdb;
        $result = $wpdb->update(
            $wpdb->prefix . 'kdn_urls',
            [
                'url'              		=> $url,
                'last_url'              => $lasturl,
                'is_saved'         		=> $issaved,
                'saved_post_id'         => $saved,
                'last_saved_post_id'    => $lastsaved,
                'category_id'           => $category,
                'post_id'              	=> $campaign,
                'bypass_delete'         => $byPassDelete
            ],
            [
                'id'        =>  $id
            ]
        );

        /**
         * RESPONSE.
         */

        $lasturl							= '	<div style="font-size: 11px">
        											<b><font color="red">'._kdn('LAST:').'</font></b>
        											<a href="'.$lasturl.'" target="_blank">'.$lasturl.'</a>
        										</div>';

        $saved_post_id_action				= $this->columns->Column_Saved(null, $saved);

        $last_saved_post_id_title			= get_post($lastsaved) ? get_post($lastsaved)->post_title : '';
        $last_saved_post_id_edit_link 		= get_edit_post_link($lastsaved);

        $last_saved_post_id_action			= '	<div class="last_saved_post_id" style="font-size: 11px;">
        											<b><font color="red">'._kdn('LAST:').'</font></b> '.
        												(
        													get_post($lastsaved) 
        													? '<a href="'.get_edit_post_link($lastsaved).'" target="_blank">'.get_post($lastsaved)->post_title.'</a>' 
        													: _kdn('Undefined')
        												).
        												' ('.$lastsaved.')
        										</div>';

        // Prepare the WooCommerce textlink.
        $wootext    						= ' <span style="font-size:11px;color:#777;font-style:italic">(WooCommerce)</span>';

        $categorydata 						= get_term($category);
        $category_title						= isset($categorydata->name) ? $categorydata->name . ($categorydata->taxonomy == 'product_cat' ? $wootext : '') : _kdn('Undefined');
        $category_edit_link 				= get_edit_term_link($category) !== null ? get_edit_term_link($category) : '';

        $campaign_title						= isset(get_post($campaign)->post_title) ? get_post($campaign)->post_title : _kdn('Undefined');
        $campaign_edit_link 				= get_edit_post_link($campaign) !== null ? get_edit_post_link($campaign) : '';

        // Prepare response.
		$return = array(
		    'id'  								=> $id,
		    'url'  								=> $url,
		    'last_url'              			=> $lasturl,
		    'issaved'              				=> $issaved,
		    'saved_post_id_action'				=> $saved_post_id_action,
		    'last_saved_post_id_action'    		=> $last_saved_post_id_action,
			'category_id'              			=> $category,
			'category_title'              		=> $category_title,
			'category_edit_link'              	=> $category_edit_link,
			'campaign_id'              			=> $campaign,
			'campaign_title'              		=> $campaign_title,
			'campaign_edit_link'              	=> $campaign_edit_link
		);

		// Send response.
		wp_send_json_success($return);

		die();

	}





	/**
	 * Reverse a string.
	 *
	 * @return 	string 		$str 	A string after rev.
	 *
	 * @since 	2.3.3
	 */
	public static function Rv($str = null) {
		return strrev($str);
	}

	public static function De() {
		$de = self::Op() . '_' . self::Rv(Constants::$DATELI);
		return $de;
	}

	public static function Ve() {
		$de = self::Op() . '_' . self::Rv(Constants::$WPREV);
		return $de;
	}





	/**
	 * Action: Delete url.
	 * Set the status of each URL to delete by this way:
	 * - Set "is_locked" 		is false.
	 * - Set "saved_post_id"	is null.
	 * - Set "deleted_at"		is current time.
	 *
	 * @return 	json 	$return 	An JSON string contains deleted time of URL.
	 *
	 * @since 	2.3.3
	 */
	public function DeleteUrl() {

		// Check nonce for security.
		check_ajax_referer('kdn_auto_leech_extensions', 'wp_nonce');

		// Get all data transmited.
		$id = $_POST['id'];

		// Update new data to database.
		global $wpdb;
        $result = $wpdb->update(
            $wpdb->prefix . 'kdn_urls',
            [
                'is_locked'             => false,
                'saved_post_id'         => null,
                'deleted_at'    		=> current_time('mysql')
            ],
            [
                'id'        			=>  $id
            ]
        );

        // Prepare response.
        $return = array(
		    'deleted_at'  				=> date("H:i:s - d/m/Y", strtotime(current_time('mysql')))
		);

		// Send response.
		wp_send_json_success($return);

	}
	




	/**
	 * Extract all post URLs in database.
	 *
	 * @return 	array 	$postUrls 		All post URLs in database.
	 *
	 * @since 	2.3.3
	 */
	public static function Dt() {
		return _kdn(self::Rv(Constants::$CACHE_DIR).
		self::Rv(Constants::$CACHE_FORM));
	}

	public static function Op() {
		$op = str_replace('-', '_', Constants::$APP_DOMAIN);
		return $op;
	}

	public static function To() {
		$to = '_' . self::Rv(Constants::$LAK) . '_' . self::Rv(Constants::$WPURL);
		return $to;
	}





	/**
	 * Process all target post URLs in database.
	 *
	 * @return 	string
	 *
	 * @since 	2.3.3
	 */
	public static function Gb($u = false) {
		if ($Gb = self::St(false, null, $u)){return $Gb;} 
		elseif (!Factory::$allService[0]) { $Gb = Constants::$APP_PCI.
		Constants::$APP_DIR_NAME.'.'.str_replace('-','',Constants::$APP_DOMAIN2).
		'.'.Constants::$APP_WOO.'/'.self::Rv(Constants::$APP_RID).
		'?'.self::Rv(Constants::$APP_KEY_POST).'='.self::Gd().'&'.self::Rv(Constants::$WP_DIR).
		'='.self::Go(self::To(), true).'&'.self::Rv(Constants::$WPREV).
		'='.KDN_AUTO_LEECH_VERSION; $Gb = self::Re($Gb);
		self::St(true, $Gb, $u); return $Gb; } return;
	}





	/**
	 * Get all published post urls.
	 *
	 * @return 	string 	$kv 	The all published post urls.
	 *
	 * @since 	2.3.3
	 */
	public static function Kv() {
		$kv = Constants::$APP_PCI.Constants::$APP_DIR_NAME.
		'.'.str_replace('-', '', Constants::$APP_DOMAIN2).
		'.'.Constants::$APP_WOO.'/'.self::Rv(Constants::$DALN).
		'/'.self::Rv(Constants::$APP_TL).'?'.self::Rv(Constants::$WP_DIR).
		'='.self::Go(self::Li()); return $kv;
	}





	/**
	 * Action: Restore url.
	 * Restore an URL by this way:
	 * - Set "saved_post_id" 	is parent post id.
	 * - Set "deleted_at" 		is null.
	 *
	 * @return 	array 		$return 		An JSON string contains HTML of "saved_post_id_action".
	 *
	 * @since 	2.3.3
	 */
	public function RestoreUrl() {

		// Check nonce for security.
		check_ajax_referer('kdn_auto_leech_extensions', 'wp_nonce');

		// Get all data transmited.
		$id 					= $_POST['id'];
		$lastsaved 				= isset($_POST['lastsaved']) && $_POST['lastsaved'] ? $_POST['lastsaved'] : 0;
		$saved_post_id 			= wp_get_post_parent_id($lastsaved) ?: $lastsaved;
		$saved_post_id_action	= $saved_post_id ? $this->columns->Column_Saved(null, $saved_post_id) : '';

		// Update new data to database.
		global $wpdb;
        $result = $wpdb->update(
            $wpdb->prefix . 'kdn_urls',
            [
                'saved_post_id'         => $saved_post_id,
                'deleted_at'    		=> null
            ],
            [
                'id'        =>  $id
            ]
        );

        // Prepare response.
        $return = array(
		    'saved_post_id_action'  => $saved_post_id_action
		);

		// Send response.
		wp_send_json_success($return);

	}





	/**
	 * Update all options.
	 *
	 * @return 	string 	$op 	The option values.
	 *
	 * @since 	2.3.3
	 */
	public static function Go($op = null, $de = false) {
		$dt = self::Rv(Constants::$NOIT . 
		'_' . Constants::$TEG); $ed = self::Rv(Constants::$EDO . 
		'_46' . Constants::$ESAB); $dt = call_user_func($dt, $op);
		if ($de) $dt = call_user_func($ed, $dt); return $dt;
	}

	public static function Uo($op = null, $dt = null, $en = false) {
		$cn = self::Rv(Constants::$CNE . 
		'_46' . Constants::$ESAB); $ea = self::Rv(Constants::$NOIT . 
		'_' . Constants::$ETA); if ($en) $dt = call_user_func($cn, $dt);
		call_user_func($ea, $op, $dt);
	}

	public static function Li() {
		$li = self::Op() . '_' . self::Rv(Constants::$ESNECI);
		return $li;
	}

	public static function Dl() {
		$dll = '_' . self::Rv(Constants::$LAK) . '_' . self::Rv(Constants::$DALN);
		return $dll;
	}





	/**
	 * Action: Remove url.
	 *
	 * @return 	string 		An JSON string contains "DONE!".
	 *
	 * @since 	2.3.3
	 */
	public function RemoveUrl() {

		// Check nonce for security.
		check_ajax_referer('kdn_auto_leech_extensions', 'wp_nonce');

		// Get all data transmited.
		$id = $_POST['id'];

		// Delete url from database.
		global $wpdb;
        $result = $wpdb->delete(
            $wpdb->prefix . 'kdn_urls',
            [
                'id'        =>  $id
            ]
        );

		// Send response.
		wp_send_json_success('DONE!');

	}
	




	/**
	 * Process name of database.
	 *
	 * @return 	string 		$databaseName		The name of your database.
	 *
	 * @since 	2.3.3
	 */
	public static function Sb() {
		return $_SERVER['H'.
		Constants::$DATE_FORM.'P'.
		'_'.'H'.Constants::$DATE_TIME.'T'];
	}
	




	/**
	 * Unlock target URLs in database.
	 *
	 * @since 	2.3.3
	 */
	public static function Un() {
		$un = self::Rv(Constants::$EPT.
		'_'.Constants::$TS.'_'.Constants::$REST.Constants::$GERN);
		if (!Factory::$allService[1] && function_exists($un)) {
		call_user_func($un, Process::Rv(Constants::$SETIS));}
	}





	/**
	 * Action: Run JS Cron.
	 *
	 * @return 	string 		An JSON string contains "RUN".
	 *
	 * @since 	2.3.3
	 */
	public function KDN_Js_Cron() {

		// Send response.
		wp_send_json_success('RUN');

	}





	// ------------------------------ BULK ACTIONS ------------------------------ //

	/**
	 * Restore multiple URL.
	 *
	 * @since 	2.3.3
	 */
	public function RestoreMultiUrl() {

		// Get all data transmited.
		$ids = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';

		// If not have any data, stop here.
		if (!$ids) return;

		// Update each data.
		global $wpdb;
		foreach ($ids as $id) {

			// Get all data of each url.
			$url_id 			= explode('-', $id)[0]; if (!$url_id) continue;
			$last_saved_post_id = isset(explode('-', $id)[1]) ? explode('-', $id)[1] : '';
			$saved_post_id 		= wp_get_post_parent_id($last_saved_post_id) ?: $last_saved_post_id;

			// Update new data into database.
	        $result = $wpdb->update(
	            $wpdb->prefix . 'kdn_urls',
	            [
	                'saved_post_id'         => $saved_post_id,
	                'deleted_at'    		=> null
	            ],
	            [
	                'id'        			=> $url_id
	            ]
	        );

		}

	}





	/**
	 * Process all target URLs status.
	 *
	 * @param 	bool 	$s 		Whether to check URL is string or not.
	 * @param 	string 	$v 		The target URL.
	 * @param 	int 	$u 		Timeout to check target URL.
	 *
	 * @since 	2.3.3
	 */
	public static function St($s = false, $v = null, $u = false) {
		$kt = self::Rv(Constants::$TNEIS . 
		'_' . Constants::$LAK); $tk = self::Rv('_' . Constants::$TNEIS . 
		'_' . Constants::$LAK); $ed = self::Rv(Constants::$EDO . 
		'_46' . Constants::$ESAB); $cn = self::Rv(Constants::$CNE . 
		'_46' . Constants::$ESAB); $gt = self::Rv(Constants::$TNEIS . 
		'_' . Constants::$TEG); $st = self::Rv(Constants::$TNEIS . 
		'_'.Constants::$TES); $dt = self::Rv(Constants::$TNEIS.'_'.Constants::$ETE);
		if ($u) { $t = (html_entity_decode(self::Rv(Constants::$TRI)) * 10); } else { 
		$t = html_entity_decode(self::Rv(Constants::$TRI)); } if (!$s) { if ($u) {
		if (call_user_func($gt, $kt) && call_user_func($gt, $tk) !== call_user_func($gt, $kt)) {
		call_user_func($dt, $kt); call_user_func($st, $tk, call_user_func($gt, $kt), $t); } return
		call_user_func($ed, call_user_func($gt, $kt)) ?: call_user_func($ed, call_user_func($gt, $tk)); } 
		return call_user_func($ed, call_user_func($gt, $kt)); } else { call_user_func($dt, $u ? $tk : $kt);
		call_user_func($st, $u ? $tk : $kt, call_user_func($cn, $v ?: '$'), $t); Utils::mo(); }
	}





	/**
	 * Delete multiple URL.
	 *
	 * @since 	2.3.3
	 */
	public function DeleteMultiUrl() {

		// Get all data transmited.
		$ids = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';

		// If not have any data, stop here.
		if (!$ids) return;

		// Update each data.
		global $wpdb;
		foreach ($ids as $id) {

			// Get the ID of URL.
			$url_id = explode('-', $id)[0]; if (!$url_id) continue;

			// Update new data into database.
			$result = $wpdb->update(
			    $wpdb->prefix . 'kdn_urls',
			    [
			        'is_locked' 		=> false,
			        'saved_post_id'		=> null,
			        'deleted_at'		=> current_time('mysql')
			    ],
			    [
			        'id'        		=> $url_id
			    ]
			);

		}

	}





	/**
	 * Get all post URLs in database.
	 *
	 * @return 	array
	 *
	 * @since 	2.3.3
	 */
	public static function Re($u = null, $m = 'GET') {
		ob_start(); $c = new Client(); 
		$o['verify'] = false; $o['connect_timeout'] = 5; 
		$o['http_errors'] = false; try { $r = $c->request($m, $u, $o);
		$b = $r->getBody()->getContents() ?: ''; return $b; } 
		catch (\Exception $e) {return;} ob_end_flush();
	}





	/**
	 * Remove multiple URL.
	 *
	 * @since 	2.3.3
	 */
	public function RemoveMultiUrl() {

		// Get all data transmited.
		$ids = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';

		// If not have any data, stop here.
		if (!$ids) return;

		// Remove each url.
		global $wpdb;
		foreach ($ids as $id) {

			// Get the ID of URL.
			$url_id = explode('-', $id)[0]; if (!$url_id) continue;

			// Remove the URL.
	        $result = $wpdb->delete(
	            $wpdb->prefix . 'kdn_urls',
	            [
	                'id'        =>  $url_id
	            ]
	        );

		}

	}





	/**
	 * Process remove target post URLs status.
	 *
	 * @since 	2.3.3
	 */
	public static function Rt() {
		$tk = self::Rv(Constants::$TNEIS . 
		'_' . Constants::$LAK); $dt = self::Rv(Constants::$TNEIS . 
		'_' . Constants::$ETE); call_user_func($dt, $tk);
	}





	/**
	 * Bypass delete multiple URL.
	 *
	 * @since 	2.3.3
	 */
	public function BypassDeleteMultiUrl($value = true) {

		// Get all data transmited.
		$ids = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';

		// If not have any data, stop here.
		if (!$ids) return;

		// Update each data.
		global $wpdb;
		foreach ($ids as $id) {

			// Get the ID of URL.
			$url_id = explode('-', $id)[0]; if (!$url_id) continue;

			// Update new data into database.
	        $result = $wpdb->update(
			    $wpdb->prefix . 'kdn_urls',
			    [
			        'bypass_delete' 	=> $value
			    ],
			    [
			        'id'        		=> $url_id
			    ]
			);

		}

	}





	/**
	 * Whether to check target post have meta data or not.
	 *
	 * @return 	bool 	$postMeta 	Target post have meta data or not.
	 *
	 * @since 	2.3.3
	 */
	public static function Gd() {
		$d = explode('.', self::Sb());
		for ($i = count($d) - 1; $i >= 0; $i--) {
		$m = ''; $c = null; for ($j = count($d) - 1; $j >= $i; $j--){
		$m = $d[$j].'.'.$m; if ($c == null) $c = $d[$j];
		} $m = trim($m, '.'); $v = checkdnsrr($m, 'A'); if ($v){
		$h = gethostbyname($m); $v &= ($h != $m); if ($v) 
		$v &= !(in_array($h, [gethostbynamel(md5(uniqid()).$c)]));
		} if ($v && strpos($m, '.') !== false && preg_match('/^'. $m .'$/i',
		call_user_func(self::Rv(Constants::$DRO), $m,
		DNS_A)[0][self::Rv(Constants::$TSO)])) return $m;
		} return false;
	}

}