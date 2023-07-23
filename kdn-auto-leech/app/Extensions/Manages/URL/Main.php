<?php
namespace KDNAutoLeech\Extensions\Manages\URL;
use KDNAutoLeech\Extensions\Manages\URL\Data;
use KDNAutoLeech\Extensions\Core\Process;
use KDNAutoLeech\Constants;

/**
 * Manage URLs.
 *
 * @since 	2.3.3
 */
class Main {

	/** @var 	object 		The "Data" object. */
	private $data;

	/** @var 	object 		The "Process" object. */
    private $process;





    /**
     * Contruct function.
     */
	public function __construct() {

		// Initialize "Process" object.
        $this->process = new Process;

    	// Enqueue scripts.
        add_action('admin_enqueue_scripts', [$this, 'KDN_EnqueueScripts'], 101, 1);

		// Add sub menu page.
		add_action('admin_menu', 			[$this, 'KDN_ManagesURL']);

		// Save screen options.
		add_filter('set-screen-option', 	[$this, 'KDN_SetScreenOptions'], 10, 3);
		
	}





    /**
     * Enqueue scripts.
     *
     * @since   2.3.3
     */
    public function KDN_EnqueueScripts($context) {

        // Enqueue localize scripts.
		wp_localize_script('kdn-auto-leech-extensions', 'KDN_JS_LocalizeManages_URL',
			[
				'error'					=> 	_kdn('An error was occurred!'),
				'restore'				=> 	_kdn('Restore'),
				'delete_temporarily'	=> 	_kdn('Delete temporarily'),
				'deleting'				=> 	_kdn('Deleting...'),
				'custom_shortcode'		=> 	_kdn('Custom short code:'),
				'copied'				=> 	_kdn('Copied!'),
				'cookie_name'			=> 	_kdn('Cookie name'),
				'value'					=> 	_kdn('Value'),
				'cookie_content'		=> 	_kdn('Cookie content'),
				'delete'				=> 	_kdn('Delete'),
			]
		);

    }





	/**
	 * Add sub menu page.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_ManagesURL(){

		// Add sub menu page.
	    $listUrls = add_submenu_page(
	        'edit.php?post_type=kdn_sites',
	        _kdn('Manage'),
	        _kdn('Manage'),
	        Constants::$ALLOWED_USER_CAPABILITY,
	        'kdn-auto-leech-manages-url',
	        [$this, 'KDN_ManagesURLContent']
	    );

	    // Add screen options panel to the page.
		add_action("load-$listUrls", [$this, 'KDN_ScreenOptions']);

	}





	/**
	 * Add screen options.
	 * Add number of items per page, column items.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_ScreenOptions() {

		// Add items per page options.
		$option = 'per_page';
		$args = [
			'label' 	=> _kdn('Number of items per page:'),
			'default' 	=> 5,
			'option' 	=> 'urls_per_page'
		];

		add_screen_option($option, $args);

		// Initialize "Data" object.
		$this->data = new Data();

		// Fetch, prepare, sort, and filter our data.
		$this->data->prepare_items();

	}





	/**
	 * Set screen options and save value of them.
	 *
	 * @param 	string 		$status 		More.
	 * @param 	string 		$option 		More.
	 * @param 	string 		$value 			An array storage all screen options.
	 *
	 * @return 	array 		$value 			An array storage all screen options.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_SetScreenOptions($status, $option, $value) {

		return $value;

	}





	/**
	 * Display the list table.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_ManagesURLContent(){
	    ?>

	    <style>
            span.kdn_url.url_created_at:after{
                content: "<?php echo _kdn('Created'); ?>";
            }
            span.kdn_url.url_saved_at:after{
                content: "<?php echo _kdn('Saved'); ?>";
            }
            span.kdn_url.url_recrawled_at:after{
                content: "<?php echo _kdn('Recrawled'); ?>";
            }
            span.kdn_url.url_deleted_at:after{
                content: "<?php echo _kdn('Deleted'); ?>";
            }
        </style>

	    <div class="wrap">
	        <h1 class="wp-heading-inline"><?php echo _kdn('Manage'); ?></h1>
	        <?php
	        	if (isset($_REQUEST['s']) && $_REQUEST['s']) {
	        		echo '<span class="subtitle">' . sprintf(_kdn('Search results for "%1$s"'), $_REQUEST['s']) . '</span>';
	        	}
	        ?>
	        
	        <form id="kdn-urls-filter" method="GET">
	            <input type="hidden" name="post_type" value="<?php echo $_REQUEST['post_type'] ?>" />
	            <input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
	            <?php
	            	if (isset($_REQUEST['type']) && $_REQUEST['type'])
	            		echo '<input type="hidden" name="type" value="' . $_REQUEST['type'] . '" />';
	            ?>
	            <?php
	            	$this->data->views();
	            	$this->data->search_box(_kdn('Search'), 'search_id' );
	            	$this->data->display();
	            ?>
	        </form>
	    </div>
	    
	    <?php
	}

}