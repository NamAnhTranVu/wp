<?php
namespace KDNAutoLeech\Extensions\Database;

/**
 * Database.
 *
 * @since   2.3.3
 */
class Database {

    /**
     * Get all database.
     *
     * @return  object      $result     The object contains all target URLs.
     */
    public function getAllDatabase(){
        
        global $wpdb;

        // Get all database as object.
        $results = $wpdb->get_results("
            SELECT * 
            FROM {$wpdb->prefix}kdn_urls
            ", 
            OBJECT
        );
        
        // If not have data, create them.
        if(!$results) $results = [];

        // Return all data.
        return $results;
    }

}