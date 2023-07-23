<?php

namespace KDNAutoLeech\Migrations;


use KDNAutoLeech\Constants;
use KDNAutoLeech\Migrations\Base\AbstractMigration;
use wpdb;

/**
 * The site settings page contain many multiple form items that contain a single input. For example, post title selectors
 * option requires only a CSS selector for each item. In this case, the name of the inputs are "_post_title_selectors[0]",
 * where 0 changes according to the position of the form item among other title selectors. However, in this naming
 * convention, we cannot store more information for each selector. For example, if we want to add attribute input for
 * the same item, it is not possible. If the CSS selector input's name was "_post_title_selectors[0][selector]", then we
 * could add the attribute option under the name of "_post_title_selectors[0][attr]" without doing any additional work,
 * such as upgrading the database. This naming convention makes it possible to extend the form items.
 *
 * This upgrade changes the structure of the form items that are stored like "_post_title_selectors[0]" to the form like
 * "_post_title_selectors[0][selector]".
 *
 * Name structure for this class:
 *
 *      "M001":                     "M" is for migration. "1" is the migration number. This number is independent of
 *                                  the database version. It will keep increasing as there are new migrations. It is
 *                                  3-digit because in this case the files will be properly ordered in ascending order.
 *      "V4_0":                     Database version, prepended a V, meaning "version", where dot is replaced with
 *                                  underscore. So, the database version is 4.0 for this migration.
 *      "UpdateSitePostMetaValues": What this class does, in short.
 *
 * Finally, all the strings above are joined with underscore. So, "M001"_"V4_0"_"UpdateSitePostMetaValues" gives
 * "M001_V4_0_UpdateSitePostMetaValues".
 *
 * @package KDNAutoLeech\migrations
 */
class M001_V4_0_UpdateSitePostMetaValues extends AbstractMigration {

    /** @var array Stores the IDs of posts of type KDN site */
    private $siteIds = null;

    /** @var string */
    private $siteIdsWhereIn = null;

    /**
     * Get the target database version. The target database version is the database version for which this migration is
     * intended for. If the value returned in this method is greater than the site's database version, the migration
     * will be applied.
     *
     * @return string
     */
    protected function getTargetDbVersion() {
        return "4.0";
    }

    /**
     * @return array A key-value pair where keys are "post meta key" and the values are keys under which the value of
     * that form item will be stored. For example, if the value of each input for post meta key "_post_title_selectors"
     * should be accessed under "selector" key, the array contains ["_post_title_selectors" => "selector"] mapping.
     * This means, after migration, the old value can be accessed with "_post_title_selectors[][selector]" input name.
     */
    private function getPostMetaKeyRestructuringMap() {
        $selector = 'selector';
        return [
            // Post meta key                       new key for the value

            // Category settings
            '_category_list_url_selectors'                          => $selector,
            '_category_post_link_selectors'                         => $selector,
            '_category_post_thumbnail_selectors'                    => $selector,
            '_category_unnecessary_element_selectors'               => $selector,

            // Post settings
            '_post_title_selectors'                                 => $selector,
            '_post_excerpt_selectors'                               => $selector,
            '_post_content_selectors'                               => $selector,
            '_post_thumbnail_selectors'                             => $selector,
            '_post_image_selectors'                                 => $selector,
            '_post_list_item_starts_after_selectors'                => $selector,
            '_post_list_item_number_selectors'                      => $selector,
            '_post_list_title_selectors'                            => $selector,
            '_post_list_content_selectors'                          => $selector,
            '_post_unnecessary_element_selectors'                   => $selector,

            // Child post settings
            '_child_post_title_selectors'                           => $selector,
            '_child_post_excerpt_selectors'                         => $selector,
            '_child_post_content_selectors'                         => $selector,
            '_child_post_thumbnail_selectors'                       => $selector,
            '_child_post_image_selectors'                           => $selector,
            '_child_post_list_item_starts_after_selectors'          => $selector,
            '_child_post_list_item_number_selectors'                => $selector,
            '_child_post_list_title_selectors'                      => $selector,
            '_child_post_list_content_selectors'                    => $selector,
            '_child_post_unnecessary_element_selectors'             => $selector,

            // Template settings
            '_template_unnecessary_element_selectors'               => $selector,

            // Child post template settings
            '_child_post_template_unnecessary_element_selectors'    => $selector,
        ];
    }

    /**
     * Perform the migration.
     *
     * @return void
     */
    public function migrate() {
        // Get the map
        $metaKeyNameMap = $this->getPostMetaKeyRestructuringMap();

        // Perform the updates
        foreach($metaKeyNameMap as $postMetaKey => $inputKey) {
            $this->migrateSingleItem($postMetaKey, $inputKey);
        }
    }

    /**
     * Reverse the migration.
     *
     * @return void
     */
    public function reverse() {
        // Get the map
        $metaKeyNameMap = $this->getPostMetaKeyRestructuringMap();

        // Perform the reverses
        foreach($metaKeyNameMap as $postMetaKey => $inputKey) {
            $this->reverseSingleItem($postMetaKey, $inputKey);
        }
    }

    /**
     * Updates a single post meta key's structure
     *
     * @param string $postMetaKey Post meta key of the item
     * @param string $inputKey    New input key under which the item will be stored
     */
    public function migrateSingleItem($postMetaKey, $inputKey) {
        $this->updateSingleItem($postMetaKey, $inputKey, function($inputKey, $value) {
            // The value must NOT be an array.
            if (is_array($value)) return $value;

            return [$inputKey => $value];
        });
    }

    /**
     * Reverses a single post meta key's structure. Reverses the update performed by {@link migrateSingleItem()}
     *
     * @param string $postMetaKey Post meta key of the item
     * @param string $inputKey    New input key under which the item will be stored
     */
    public function reverseSingleItem($postMetaKey, $inputKey) {
        $this->updateSingleItem($postMetaKey, $inputKey, function($inputKey, $value) {
            // The value must be an array and it must contain an item with $inputKey as key.
            if (!is_array($value) || !isset($value[$inputKey])) return $value;

            return $value[$inputKey];
        });
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * Updates a single post meta key's structure
     *
     * @param string $postMetaKey Post meta key of the item
     * @param string $inputKey    New input key under which the item will be stored
     * @param callable $callback Callback to modify the value. Takes two parameters:
     *                           $inputKey: The input key provided as parameter,
     *                           $value: An item in the current value of the found post meta value
     *                           The callback MUST return a value, either untouched value or modified value.
     *                           Example callback: function($inputKey, $value) { return $modifiedValue; }
     */
    private function updateSingleItem($postMetaKey, $inputKey, $callback) {
        /** @var wpdb $wpdb */
        global $wpdb;

        // Perform the update for only posts of KDN Site post type.
        // Get the site IDs
        $siteIdsPrepared = $this->getSiteIdsPreparedForWhereIn();

        // If there is no site, we do not need to update anything.
        if (!$siteIdsPrepared) return;

        // Find the post meta keys for site posts
        $query = $wpdb->prepare(
            "SELECT meta_id, meta_value FROM {$wpdb->postmeta} WHERE meta_key = '%s' AND post_id IN ({$siteIdsPrepared})",
            $postMetaKey
        );
        $results = $wpdb->get_results($query,ARRAY_A);

        $format = ['%s'];
        $whereFormat = ['%d'];

        // Modify the results
        foreach($results as $result) {
            $oldValue = $result["meta_value"];

            // If there is no old value or the old value is not serialized, continue with the next one.
            if (!$oldValue || !is_serialized($oldValue)) continue;

            // Unserialize the value
            $oldValueArr = unserialize($oldValue);

            // If the unserialized value is not an array, continue with the next one. It must be an array.
            if (!is_array($oldValueArr)) continue;

            // Create the new value by using the given callback
            $newValueArr = array_map(function($v) use (&$callback, &$inputKey) {
                return call_user_func($callback, $inputKey, $v);
            }, $oldValueArr);

            // Serialize the new value
            $newValue = serialize($newValueArr);

            // Update the value
            $wpdb->update($wpdb->postmeta,
                ['meta_value'   => $newValue],              // Data
                ['meta_id'      => $result["meta_id"]],     // Where
                $format,                                    // Format of items in the data
                $whereFormat                                // Format of items in the where clause
            );
        }
    }

    /**
     * @return string Site IDs as a single string separated via comma. Ready for use in "where in" statement.
     */
    private function getSiteIdsPreparedForWhereIn() {
        if ($this->siteIdsWhereIn === null) {
            $siteIds = $this->getSiteIds();

            // If there are site IDs
            if ($siteIds) {
                // Escape each site ID for SQL query
                $siteIds = array_map(function($v) {
                    return esc_sql($v);
                }, $siteIds);

                // Implode with comma and assign it to the instance variable
                $this->siteIdsWhereIn = implode(',', $siteIds);

            // Otherwise, make sure the instance variable is set to empty string so that this method will not try to
            // perform the same job later on when needed.
            } else {
                $this->siteIdsWhereIn = '';
            }
        }

        return $this->siteIdsWhereIn;
    }

    /**
     * @return array Site IDs. See {@link $siteIds}
     */
    private function getSiteIds() {
        if ($this->siteIds === null) {
            global $wpdb;

            // Find IDs of the posts of site type. This will find all IDs regardless of post status, etc.
            $results = $wpdb->get_results($wpdb->prepare(
                "SELECT ID FROM {$wpdb->posts} WHERE post_type = '%s'",
                Constants::$POST_TYPE
            ), ARRAY_N);

            // If there are posts
            if ($results) {
                // Make sure the array is flat and contains only valid values
                $this->siteIds = array_filter(array_map(function($v) {
                    return isset($v[0]) ? $v[0] : null;
                }, $results));

            // Otherwise, make sure the site IDs is assigned as an empty array so that this method will not try to
            // find site IDs later on.
            } else {
                $this->siteIds = [];
            }

        }

        return $this->siteIds;
    }
}