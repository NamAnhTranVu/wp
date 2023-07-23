<?php
namespace KDNAutoLeech\Extensions\Core\Hooks\Actions;

/**
 * Database service.
 *
 * @since 	2.3.3
 */
class DatabaseService {

	/**
	 * Construct funtion.
	 */
	public function __construct(){

		// Reset database check option.
		register_deactivation_hook(KDN_AUTO_LEECH_MAINFILE_PATH, function() {
			update_option('kdn_database_check', '0');
        });

		// Add new column to database.
		add_action('kdn/database/after_create', [$this, 'KDN_CustomDatabase']);

	}





	/**
	 * Add new column to database function.
	 *
	 * @param 	string 		$currentDbVersion 		The current database version.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_CustomDatabase($currentDbVersion){

		// First, reset database check option.
		update_option('kdn_database_check', '0');

		// Prepare columns.
		$customColumns = [
			'last_url'				=> 'varchar(2560) DEFAULT NULL AFTER url',
			'last_saved_post_id' 	=> 'bigint(20) UNSIGNED AFTER saved_post_id',
			'is_locked'				=> 'TINYINT NOT NULL DEFAULT 0 AFTER is_saved',
			'update_count'			=> 'INT UNSIGNED NOT NULL DEFAULT 0 AFTER last_saved_post_id',
			'saved_at' 				=> 'datetime DEFAULT NULL AFTER updated_at',
			'recrawled_at' 			=> 'datetime DEFAULT NULL AFTER saved_at',
			'deleted_at' 			=> 'datetime DEFAULT NULL AFTER recrawled_at',
			'cache_process'			=> 'bigint(20) DEFAULT 0 AFTER deleted_at',
			'cache_content'			=> 'longtext DEFAULT NULL AFTER cache_process',
			'stop_crawling_all'		=> 'varchar(2560) DEFAULT NULL AFTER cache_content',
			'bypass_delete'			=> 'TINYINT NOT NULL DEFAULT 0 AFTER stop_crawling_all'
		];

		global $wpdb;

		// Get database prefix.
		$tableName = $wpdb->prefix . 'kdn_urls';

		// Check the current database have these columns below or not.
		foreach ($customColumns as $customColumn => $query) {
			
			$column = $wpdb->get_results($wpdb->prepare(
				"SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
				DB_NAME, $tableName, $customColumn
			));

			// If the current database do not have these columns above, then add new columns below.
			if(empty($column)){
				$wpdb->query("ALTER TABLE {$tableName}
					ADD COLUMN {$customColumn} {$query};
				");
			}

			// Finally, update new database check option.
			update_option('kdn_database_check', $customColumn);

		}

	}
}