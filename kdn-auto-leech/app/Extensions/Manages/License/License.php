<?php
namespace KDNAutoLeech\Extensions\Manages\License;
use KDNAutoLeech\extensions\core\Process;
use KDNAutoLeech\Constants;

/**
 * License.
 *
 * @since 	2.3.3
 */
class License {

	/** @var 	string 		The license. */
	private $license;





	/**
	 * Construct function.
	 */
	public function __construct(){

		// Get the license.
		$this->license = get_option('kdn_auto_leech_license');

		// Add sub menu page.
		add_action('admin_menu', 		[$this, 'KDN_License'], 102);

		// Add license option.
		add_action('admin_init', 		[$this, 'KDN_LicenseOption']);

	}





	/**
	 * Add sub menu page.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_License(){

		// Add sub menu page.
		add_submenu_page(
			'plugins.php',									// Parent page
			'KEY: ' . _kdn('KDN Auto Leech'),				// Title
			'KEY: ' . _kdn('KDN Auto Leech'),				// Menu
			Constants::$ALLOWED_USER_CAPABILITY,			// Capability
			'kdn-auto-leech-key',							// Page ID
			[$this, 'KDN_LicenseContent']					// Callback
		);

	}





	/**
	 * Add license option.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_LicenseOption() {
	 
		// If the options don't exist, create them.
		if(false == get_option('kdn_auto_leech_license')) {  
		    add_option('kdn_auto_leech_license');
		}

		/**
		 * SECTIONS & FIELDS.
		 */

		// Add license section.
		add_settings_section(
		    'KDN_LicenseOptionSection',         							// ID
		    null,                  											// Title
		    [$this, 'KDN_LicenseOptionSection'], 							// Callback
		    'KDN_License'     												// Screen
		);
	     
	    // Add license field.
	    add_settings_field(
	        'KDN_LicenseOptionField',										// ID
	        null,															// Label
	        [$this, 'KDN_LicenseOptionField'],   							// Callback
	        'KDN_License',													// Screen
	        'KDN_LicenseOptionSection',         							// Section
	        ['']															// Arguments
	    );

		/**
		 * REGISTER ALL OPTIONS.
		 */

		// Register option.
		register_setting(
			'KDN_License',
			'kdn_auto_leech_license',
			null
		);
	     
	}





	/**
	 * Add license section.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_LicenseOptionSection() {

	    echo '<p>' . _kdn('Please enter KEY to use full feature:') . '</p>';
	    
	}





	/**
	 * Add license field.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_LicenseOptionField($args) {

		$html = 	'	<input
							type="text"
							name="kdn_auto_leech_license"
							placeholder="'._kdn('Example').': 85de2vc991f3ah21dfcfbz83c9669xxx"
							value="' . $this->license . '"
						/>
					';
					
	    echo $html;
	     
	}





	/**
	 * Add license content.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_LicenseContent() {
	?>
	    <div class="wrap">
	     
	        <h1>KEY: <?php echo _kdn('KDN Auto Leech'); ?></h1>

	        <!-- CONTENT -->
	        <form method="POST" action="options.php" id="kdn-license">
				<?php
					settings_fields('KDN_License');
					do_settings_sections('KDN_License');
					submit_button();
				?>
			</form>
	         
	    </div>
	<?php
	}

}