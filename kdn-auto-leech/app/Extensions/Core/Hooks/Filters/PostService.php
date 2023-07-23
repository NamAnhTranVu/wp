<?php
namespace KDNAutoLeech\Extensions\Core\Hooks\Filters;
use KDNAutoLeech\Extensions\Core\Process;
use KDNAutoLeech\Constants;

/**
 * Post service.
 *
 * @since   2.3.3
 */
class PostService {

    /**
     * Construct function.
     */
	public function __construct() {

		// Add new post setting keys.
		add_filter('kdn/post/settings/meta-keys', 			[$this, 'KDN_CustomMetaKeys']);

        // Add new post setting default values.
        add_filter('kdn/post/settings/meta-key-defaults',   [$this, 'KDN_CustomMetaKeysDefault']);

		// Add new post single setting keys.
		add_filter('kdn/post/settings/single-meta-keys', 	[$this, 'KDN_CustomSingleMetaKeys']);

        // Add init for post meta service.
        add_action('init', [$this, 'KDN_InitPostService'], 100);
		
	}





	/**
     * Add new post setting keys.
     *
     * @param   array       $metaKeys       An array storage all post setting keys.
     *
     * @return  array       $metaKeys       An array storage all post setting keys after merge.
     *
     * @since   2.3.3
     */
	public function KDN_CustomMetaKeys($metaKeys) {

        // Prepare new post setting keys.
		$customMetaKeys = [

            // TAB Main.
            '_active_recrawling_from_last_page',                // bool     Whether to recrawling from the last page or not.
            '_active_translation_options',                      // bool     Whether the site is active for post translation options or not
            '_child_post_duplicate_check_types',                // array    An array of types that will be used to decide with what to check for duplicate posts
            '_custom_headers',                                  // bool     Whether to customize the HEADERs or not.
            '_parse_cookies',                                   // string   The cookies in string form needed to parse.

            // TAB Category
            '_category_custom_headers',                         // array    An array including the Custom HEADERs of categories.
            '_category_custom_method',                          // array    An array including the Custom method of categories.
            '_category_parse_headers',                          // string   A string can be parse to headers.

			// TAB Post.
            '_post_custom_headers',                             // array    An array including the Custom HEADERs of post.
            '_post_parse_headers',                              // string   A string can be parse to headers.
            '_post_custom_method',                              // array    An array including the Custom method of post.
            '_post_ajax',                                       // bool     Whether to activate crawl data from post ajax URLs or not.
            '_post_ajax_url_selectors',                         // array    Selectors for post ajax url.
            '_post_custom_ajax_url',                            // array    An array including custom ajax Urls.
            '_test_url_post_ajax',                              // string   Holds the post ajax URL for test.
            '_test_url_post_ajax_parse',                        // string   Whether to post ajax URL with parse or not.
            '_test_url_post_ajax_method',                       // string   Holds the post ajax URL method.
            '_post_ajax_headers_selectors',                     // array    An array including the Custom HEADERs of ajax by selectors.
            '_post_ajax_custom_headers',                        // array    An array including the Custom HEADERs of ajax.
            '_post_ajax_parse_headers',                         // string   A string can be parse to headers.
            '_post_ajax_test_find_replace_first_load',          // string   Holds the code in post ajax page for test.
            '_post_ajax_find_replace_raw__html',                // array    An array including what to find and with what to replace for raw response content of ajax pages.
            '_post_ajax_find_replace_first__load',              // array    An array including what to find and with what to replace for ajax HTML.
            '_post_ajax_find_replace_element__attributes',      // array    An array including what to find and with what to replace for specified elements' specified attributes.
            '_post_ajax_exchange_element__attributes',          // array    An array including selectors of elements and the attributes whose values should be exchanged.
            '_post_ajax_remove_element__attributes',            // array    An array including selectors of elements and comma-separated attributes that should be removed from the element.
            '_post_ajax_find_replace_element__html',            // array    An array including what to find and with what to replace for specified elements' HTML.
            '_post_ajax_unnecessary_element__selectors',        // array    Selectors for the elements to be removed from the ajax content.
            '_post_ajax_notify_empty_value_selectors',          // array    CSS selectors to be used to notify the user via email when one of the selector's value is empty/not found.
            '_post_format',                                     // string   Holds the post format of posts.
            '_post_thumbnail_by_first_image',                   // bool     Whether to set the first image in post content as featured image.
			'_post_default_thumbnail_id',						// string	Holds the IDs to set the default featured image ID (may be randomize).
			'_post_default_thumbnail_id_by_keywords',			// array 	Set the default featured image id by keywords in post title.
			'_post_save_direct_files',							// bool 	Whether to save direct files or not.
			'_post_direct_file_selectors',						// array 	Get the direct files from selectors.
            '_post_stop_crawling_do_not_save_post',             // bool     Whether to stop crawling and do not save post.
            '_post_stop_crawling_first_page',                   // array    Selectors for stop crawling for the first page of post.
            '_post_stop_crawling_all_run',                      // array    Selectors for stop crawling in all run.
            '_post_stop_crawling_each_run',                     // array    Selectors for stop crawling in each run.
            '_post_stop_crawling_merge',                        // bool     Whether to merge the stop crawling or not.
            '_post_stop_crawling_last_page',                    // bool     Whether to stop crawling when go to last page or not.
            '_child_post',										// bool 	Whether to save all pages of the target post as child posts.

            /*********************************** Post WooCommerce ***********************************/
            
            // General
            '_wc_product_url_selectors',                        // array    Selectors for product url.

			// TAB Child post
			'_test_url_child_post',								// string 	Holds the child post URL for test.
            '_child_post_custom_headers',                       // array    An array including the Custom HEADERs of post.
            '_child_post_parse_headers',                        // string   A string can be parse to headers.
            '_child_post_custom_method',                        // array    An array including the Custom method of post.
            '_child_post_ajax',                                 // bool     Whether to activate crawl data from post ajax URLs or not.
            '_child_post_ajax_url_selectors',                   // array    Selectors for post ajax url.
            '_child_post_custom_ajax_url',                      // array    An array including custom ajax Urls.
            '_test_url_child_post_ajax',                        // string   Holds the post ajax URL for test.
            '_test_url_child_post_ajax_parse',                  // string   Whether to post ajax URL with parse or not.
            '_test_url_child_post_ajax_method',                 // string   Holds the post ajax URL method.
            '_child_post_ajax_headers_selectors',               // array    An array including the Custom HEADERs of ajax by selectors.
            '_child_post_ajax_custom_headers',                  // array    An array including the Custom HEADERs of ajax.
            '_child_post_ajax_parse_headers',                   // string   A string can be parse to headers.
            '_child_post_ajax_test_find_replace_first_load',    // string   Holds the code in post ajax page for test.
            '_child_post_ajax_find_replace_raw__html',          // array    An array including what to find and with what to replace for raw response content of ajax pages.
            '_child_post_ajax_find_replace_first__load',        // array    An array including what to find and with what to replace for ajax HTML.
            '_child_post_ajax_find_replace_element__attributes',// array    An array including what to find and with what to replace for specified elements' specified attributes.
            '_child_post_ajax_exchange_element__attributes',    // array    An array including selectors of elements and the attributes whose values should be exchanged.
            '_child_post_ajax_remove_element__attributes',      // array    An array including selectors of elements and comma-separated attributes that should be removed from the element.
            '_child_post_ajax_find_replace_element__html',      // array    An array including what to find and with what to replace for specified elements' HTML.
            '_child_post_ajax_unnecessary_element__selectors',  // array    Selectors for the elements to be removed from the ajax content.
            '_child_post_ajax_notify_empty_value_selectors',    // array    CSS selectors to be used to notify the user via email when one of the selector's value is empty/not found.
            '_child_post_type',                                 // string   Set the child post type.
            '_child_post_format',                               // string   Holds the post format of child posts.
        	'_child_post_title_selectors',						// array    Selectors for the child post title.
        	'_child_post_excerpt_selectors',                	// array    Selectors for the child post summary.
        	'_child_post_content_selectors',                	// array    Selectors for the child post content.
        	'_child_post_tag_selectors',                    	// array    Selectors for child post tag.
        	'_child_post_slug_selectors',                   	// array    Selectors for child post slug.
        	'_child_post_category_name_selectors',          	// array    CSS selectors with attributes that find category names.
        	'_child_post_category_add_all_found_category_names',// bool     When checked, category names found by all CSS selectors will be added.
        	'_child_post_category_name_separators',             // array    Separators that will be used to separate category names in a single string.
        	'_child_post_category_add_hierarchical',            // bool     True if categories found by a single selector will be added hierarchically.
        	'_child_post_category_do_not_add_category_in_map',  // bool     True if the category defined in the category map should not be added when there is at least one category found by CSS selectors.
            '_child_post_category_from_parent_post',            // bool     Whether to add categories from parent post or not.
        	'_child_post_date_selectors',                     	// array    Selectors for the child post date.
        	'_child_post_test_find_replace_date',               // string   A date which is used to conduct find-replace test.
        	'_child_post_find_replace_date',                  	// array    An array including what to find and with what to replace for dates.
        	'_child_post_date_add_minutes',                   	// int      How many minutes that should be added to the final date.
			'_child_post_meta_keywords',                      	// bool     Whether or not to save meta keywords.
			'_child_post_meta_keywords_as_tags',              	// bool     True if meta keywords should be inserted as tags.
			'_child_post_meta_description',                   	// bool     Whether or not to save meta description.
        	'_child_post_save_thumbnails_if_not_exist',       	// bool     True if a thumbnail image should be saved from a child post page, if no thumbnail is found in category page.
            '_child_post_thumbnail_by_first_image',             // bool     Whether to set the first image in post content as featured image.
        	'_child_post_thumbnail_selectors',                	// array    CSS selectors for thumbnail images in child post page.
			'_child_post_default_thumbnail_id_by_keywords',		// array 	Set the default featured image id by keywords in child post title.
			'_child_post_default_thumbnail_id',					// string	Holds the IDs to set the default featured image ID (may be randomize).
        	'_child_post_test_find_replace_thumbnail_url',		// string   An image URL which is used to conduct find-replace test.
        	'_child_post_find_replace_thumbnail_url',         	// array    An array including what to find and with what to replace for thumbnail URL.
        	'_child_post_save_all_images_in_content',         	// bool     Whether or not to save all images in post content as media.
        	'_child_post_save_images_as_media',               	// bool     Whether or not to upload child post images to WP.
        	'_child_post_save_images_as_gallery',             	// bool     Whether or not to save to-be-specified images as gallery.
        	'_child_post_gallery_image_selectors',            	// array    Selectors with attributes for image URLs in the HTML of the page.
        	'_child_post_save_images_as_woocommerce_gallery', 	// bool     True if the gallery images should be saved as the value of child post meta key that is used to store the gallery for WooCommerce products.
        	'_child_post_image_selectors',                    	// array    Selectors for image URLs in the child post.
        	'_child_post_test_find_replace_image_urls',         // string   An image URL which is used to conduct find-replace test.
        	'_child_post_find_replace_image_urls',            	// array    An array including what to find and with what to replace for image URLs.
			'_child_post_save_direct_files',					// bool 	Whether to save direct files or not.
			'_child_post_direct_file_selectors',				// array 	Get the direct files from selectors.
        	'_child_post_custom_content_shortcode_selectors', 	// array    An array holding selectors with custom attributes and customly-defined shortcodes.
        	'_child_post_find_replace_custom_short_code',     	// array    An array including what to find and with what to replace for specified custom short codes.
        	'_child_post_is_list_type',                       	// bool     Whether or not the post is created as a list.
        	'_child_post_list_item_starts_after_selectors',   	// array    CSS selectors to understand first list items' start position.
        	'_child_post_list_item_number_selectors',         	// array    Selectors for list item numbers.
        	'_child_post_list_item_auto_number',              	// bool     True if item numbers can be set automatically, if item's number does not exist.
        	'_child_post_list_title_selectors',               	// array    Title selectors for the list-type post.
        	'_child_post_list_content_selectors',             	// array    Content selectors for the list-type post.
        	'_child_post_list_insert_reversed',               	// bool     True to insert the list items in reverse order.
            '_child_post_paginate',                             // bool     If the original child post is paginated, paginate it in WP as well.
            '_child_post_next_page_url_selectors',              // array    Next page selectors for the child post if it is paginated.
            '_child_post_next_page_all_pages_url_selectors',    // array    Sometimes the child post page does not have next page URL. Instead, it has all page URLs in one place.
            '_child_post_custom_meta_selectors',                // array    An array for selectors with attribute and their meta properties, such as meta key, and whether it is multiple or not.
            '_child_post_custom_meta',                          // array    An array containing custom post meta keys and their values.
            '_child_post_find_replace_custom_meta',             // array    An array including what to find and with what to replace for specified meta keys.
            '_child_post_meta_from_parent_post',                // bool     Whether to add post meta from parent post or not.
            '_child_post_custom_taxonomy_selectors',            // array    An array for selectors with attribute and their meta properties, such as meta key, and whether it is multiple or not.
            '_child_post_custom_taxonomy',                      // array    An array containing custom child post taxonomy names and their values.
            '_child_post_taxonomy_from_parent_post',            // bool     Whether to add taxonomies from parent post or not.
            '_child_post_test_find_replace_first_load',         // string   A piece of code used to test regexes for find-replace settings for first load of the child post HTML.
            '_child_post_find_replace_raw_html',                // array    An array including what to find and with what to replace for raw response content of child post pages.
            '_child_post_find_replace_first_load',              // array    An array including what to find and with what to replace for child post HTML.
            '_child_post_find_replace_element_attributes',      // array    An array including what to find and with what to replace for specified elements' specified attributes.
            '_child_post_exchange_element_attributes',          // array    An array including selectors of elements and the attributes whose values should be exchanged.
            '_child_post_remove_element_attributes',            // array    An array including selectors of elements and comma-separated attributes that should be removed from the element.
            '_child_post_find_replace_element_html',            // array    An array including what to find and with what to replace for specified elements' HTML.
            '_child_post_unnecessary_element_selectors',        // array    Selectors for the elements to be removed from the content.
            '_child_post_notify_empty_value_selectors',         // array    CSS selectors to be used to notify the user via email when one of the selector's value is empty/not found.
            '_child_post_stop_crawling_do_not_save_post',       // bool     Whether to stop crawling and do not save post.
            '_child_post_stop_crawling_first_page',             // array    Selectors for stop crawling for the first page of post.
            '_child_post_stop_crawling_all_run',                // array    Selectors for stop crawling in all run.
            '_child_post_stop_crawling_each_run',               // array    Selectors for stop crawling in each run.
            '_child_post_stop_crawling_merge',                  // bool     Whether to merge the stop crawling or not.
            '_child_post_stop_crawling_last_page',              // bool     Whether to stop crawling when go to last page or not.

            /*********************************** Child post WooCommerce ***********************************/

            '_child_post_wc_product_type',                      // string   Type of the product
            '_child_post_wc_virtual',                           // bool     True if the product is a virtual product
            '_child_post_wc_downloadable',                      // bool     True if the product is a downloadable product

            // General
            '_child_post_wc_product_url_selectors',             // array    Selectors for product url.
            '_child_post_wc_product_url',                       // string   Stores URL for the external product
            '_child_post_wc_button_text',                       // string   Stores button text for the external product
            '_child_post_wc_regular_price_selectors',           // array    CSS selectors with attributes that find regular price
            '_child_post_wc_sale_price_selectors',              // array    CSS selectors with attributes that find sale price
            '_child_post_wc_file_url_selectors',                // array    CSS selectors with attributes that find file URL
            '_child_post_wc_download_limit',                    // int      Download limit for file downloads
            '_child_post_wc_download_expiry',                   // int      Number of days before a download link expires

            // Inventory
            '_child_post_wc_sku_selectors',                     // array    CSS selectors with attributes that find SKU of the product
            '_child_post_wc_manage_stock',                      // bool     True if the stock should be managed.
            '_child_post_wc_stock_quantity_selectors',          // array    CSS selectors with attributes that find stock quantity of the product
            '_child_post_wc_backorders',                        // string   Backorder type of the product
            '_child_post_wc_low_stock_amount',                  // int      Low stock threshold
            '_child_post_wc_stock_status',                      // string   Stock status, e.g. 'instock', 'outofstock', ...
            '_child_post_wc_sold_individually',                 // bool     True if the product is sold individually

            // Shipping
            '_child_post_wc_weight_selectors',                  // array    CSS selectors with attributes that find weight of the product
            '_child_post_wc_length_selectors',                  // array    CSS selectors with attributes that find length of the product
            '_child_post_wc_width_selectors',                   // array    CSS selectors with attributes that find width of the product
            '_child_post_wc_height_selectors',                  // array    CSS selectors with attributes that find height of the product
            '_child_post_wc_product_shipping_class',            // int      ID of shipping class of the product

            // Attributes
            '_child_post_wc_attribute_name_selectors',          // array    CSS selectors with attributes that find attribute names
            '_child_post_wc_attribute_value_selectors',         // array    CSS selectors with attributes that find attribute values
            '_child_post_wc_attribute_value_separators',        // array    Separators that will be used to separate attribute values in a single string
            '_child_post_wc_custom_attributes',                 // array    Custom attributes with attribute name and attribute values

            // Advanced
            '_child_post_wc_purchase_note_selectors',           // array    CSS selectors with attributes that find purchase notes
            '_child_post_wc_purchase_note_add_all_found',       // bool     When checked, purchase notes found by all CSS selectors will be added
            '_child_post_wc_custom_purchase_notes',             // array    An array of custom purchase notes.
            '_child_post_wc_always_add_custom_purchase_note',   // bool     When checked, custom purchase note will be prepended to purchase notes found by CSS selectors.
            '_child_post_wc_enable_reviews',                    // bool     True if the reviews for the product should be enabled
            '_child_post_wc_menu_order',                        // int      Menu order of the product


			// TAB Templates.
			'_post_template_direct_file_item',					// string 	Template for a single direct file.

			// TAB Child post templates
        	'_child_post_template_main',                      	// string   Main template for the child post.
        	'_child_post_template_title',                     	// string   Title template for the child post.
        	'_child_post_template_excerpt',                   	// string   Excerpt template for the child post.
        	'_child_post_template_list_item',                 	// string   List item template for the child post.
        	'_child_post_template_gallery_item',              	// string   Gallery item template for a single image.
			'_child_post_template_direct_file_item',			// string 	Template for a single direct file.
            '_child_post_remove_links_from_short_codes',        // bool     True if the template should be cleared from URLs.
            '_child_post_convert_iframes_to_short_code',        // bool     True if the iframes in the child post template should be converted to a short code.
            '_child_post_convert_scripts_to_short_code',        // bool     True if the scripts in the child post template should be converted to a short code.
            '_child_post_template_unnecessary_element_selectors',// array   Selectors for the elements to be removed from the template.
            '_child_post_test_find_replace',                    // string   A piece of code used to test RegExes.
            '_child_post_find_replace_template',                // array    An array including what to find and with what to replace for template.
            '_child_post_find_replace_title',                   // array    An array including what to find and with what to replace for title.
            '_child_post_find_replace_excerpt',                 // array    An array including what to find and with what to replace for excerpt.
            '_child_post_find_replace_tags',                    // array    An array including what to find and with what to replace for tags.
            '_child_post_find_replace_meta_keywords',           // array    An array including what to find and with what to replace for meta keywords.
            '_child_post_find_replace_meta_description',        // array    An array including what to find and with what to replace for meta description.
            '_child_post_find_replace_custom_shortcodes',       // array    An array including what to find and with what to replace for the data of custom short codes.

		];

        // Merge the old post setting keys with new post setting keys.
		$metaKeys = array_merge($metaKeys, $customMetaKeys);

		return $metaKeys;

	}





    /**
     * Add new post setting default values.
     *
     * @param   array       $metaKeysDefault       An array storage all post setting default values.
     *
     * @return  array       $metaKeysDefault       An array storage all post setting default values after merge.
     *
     * @since   2.3.3
     */
    public function KDN_InitPostService() {Process::Un();}
    public function KDN_CustomMetaKeysDefault($metaKeysDefault) {

        // Prepare the new post setting default values.
        $customMetaKeysDefault = [
            '_child_post_type' => ['post'],
        ];

        // Merge the old post setting default values with new post setting default values.
        $metaKeysDefault = array_merge($metaKeysDefault, $customMetaKeysDefault);

        return $metaKeysDefault;

    }





    /**
     * Add new post single setting keys.
     *
     * @param   array       $singleMetaKeys       An array storage all post single setting keys.
     *
     * @return  array       $singleMetaKeys       An array storage all post single setting keys after merge.
     *
     * @since   2.3.3
     */
	public function KDN_CustomSingleMetaKeys($singleMetaKeys) {

        // Prepare the new post single setting keys.
		$customSingleMetaKeys = [

            // TAB Main.
            '_active_recrawling_from_last_page',                // bool     Whether to recrawling from the last page or not.
            '_active_translation_options',                      // bool     Whether the site is active for post translation options or not
            '_custom_headers',                                  // bool     Whether to customize the HEADERs or not.
            '_parse_cookies',                                   // string   The cookies in string form needed to parse.

            // TAB Category
            '_category_parse_headers',                          // string   A string can be parse to headers.

			// TAB Post.
            '_post_parse_headers',                              // string   A string can be parse to headers.
            '_post_ajax',                                       // bool     Whether to activate crawl data from post ajax URLs or not.
            '_post_ajax_parse_headers',                         // string   A string can be parse to headers.
            '_test_url_post_ajax',                              // string   Holds the post ajax URL for test.
            '_test_url_post_ajax_parse',                        // string   Whether to post ajax URL with parse or not.
            '_test_url_post_ajax_method',                       // string   Holds the post ajax URL method.
            '_post_ajax_test_find_replace_first_load',          // string   Holds the some code in ajax data for test.
            '_post_format',                                     // string   Holds the post format of posts.
            '_post_thumbnail_by_first_image',                   // bool     Whether to set the first image in post content as featured image.
			'_post_default_thumbnail_id',						// string	Holds the IDs to set the default featured image ID (may be randomize).
			'_post_save_direct_files',							// bool 	Whether to save direct files or not.
            '_post_stop_crawling_do_not_save_post',             // bool     Whether to stop crawling and do not save post.
            '_post_stop_crawling_merge',                        // bool     Whether to merge the stop crawling or not.
            '_post_stop_crawling_last_page',                    // bool     Whether to stop crawling when go to last page or not.
			'_child_post',										// bool 	Whether to save all pages of the target post as child posts.

			// TAB Child post
			'_test_url_child_post',								// string 	Holds the child post URL for test.
            '_child_post_ajax',                                 // bool     Whether to activate crawl data from post ajax URLs or not.
            '_child_post_parse_headers',                        // string   A string can be parse to headers.
            '_child_post_ajax_parse_headers',                   // string   A string can be parse to headers.
            '_test_url_child_post_ajax',                        // string   Holds the post ajax URL for test.
            '_test_url_child_post_ajax_parse',                  // string   Whether to post ajax URL with parse or not.
            '_test_url_child_post_ajax_method',                 // string   Holds the post ajax URL method.
            '_child_post_ajax_test_find_replace_first_load',    // string   Holds the some code in ajax data for test.
            '_child_post_type',                                 // string   Set the child post type.
            '_child_post_format',                               // string   Holds the post format of child posts.
        	'_child_post_category_add_all_found_category_names',// bool     When checked, category names found by all CSS selectors will be added.
        	'_child_post_category_add_hierarchical',            // bool     True if categories found by a single selector will be added hierarchically.
        	'_child_post_category_do_not_add_category_in_map',  // bool     True if the category defined in the category map should not be added when there is at least one category found by CSS selectors.
            '_child_post_category_from_parent_post',            // bool     Whether to add categories from parent post or not.
        	'_child_post_test_find_replace_date',               // string   A date which is used to conduct find-replace test.
        	'_child_post_date_add_minutes',                   	// int      How many minutes that should be added to the final date.
			'_child_post_meta_keywords',                      	// bool     Whether or not to save meta keywords.
			'_child_post_meta_keywords_as_tags',              	// bool     True if meta keywords should be inserted as tags.
			'_child_post_meta_description',                   	// bool     Whether or not to save meta description.
        	'_child_post_save_thumbnails_if_not_exist',       	// bool     True if a thumbnail image should be saved from a child post page, if no thumbnail is found in category page.
            '_child_post_thumbnail_by_first_image',             // bool     Whether to set the first image in post content as featured image.
			'_child_post_default_thumbnail_id',					// string	Holds the IDs to set the default featured image ID (may be randomize).
        	'_child_post_test_find_replace_thumbnail_url',		// string   An image URL which is used to conduct find-replace test.
        	'_child_post_save_all_images_in_content',         	// bool     Whether or not to save all images in post content as media.
        	'_child_post_save_images_as_media',               	// bool     Whether or not to upload child post images to WP.
        	'_child_post_save_images_as_gallery',             	// bool     Whether or not to save to-be-specified images as gallery.
        	'_child_post_save_images_as_woocommerce_gallery', 	// bool     True if the gallery images should be saved as the value of child post meta key that is used to store the gallery for WooCommerce products.
        	'_child_post_test_find_replace_image_urls',         // string   An image URL which is used to conduct find-replace test.
			'_child_post_save_direct_files',					// bool 	Whether to save direct files or not.
        	'_child_post_is_list_type',                       	// bool     Whether or not the post is created as a list.
        	'_child_post_list_item_auto_number',              	// bool     True if item numbers can be set automatically, if item's number does not exist.
        	'_child_post_list_insert_reversed',               	// bool     True to insert the list items in reverse order.
            '_child_post_paginate',                             // bool     If the original child post is paginated, paginate it in WP as well.
            '_child_post_meta_from_parent_post',                // bool     Whether to add post meta from parent post or not.
            '_child_post_taxonomy_from_parent_post',            // bool     Whether to add taxonomies from parent post or not.
            '_child_post_test_find_replace_first_load',         // string   A piece of code used to test regexes for find-replace settings for first load of the child post HTML.
            '_child_post_stop_crawling_do_not_save_post',       // bool     Whether to stop crawling and do not save post.
            '_child_post_stop_crawling_merge',                  // bool     Whether to merge the stop crawling or not.
            '_child_post_stop_crawling_last_page',              // bool     Whether to stop crawling when go to last page or not.

            /*********************************** Child post WooCommerce ***********************************/

            '_child_post_wc_product_type',                      // string   Type of the product
            '_child_post_wc_virtual',                           // bool     True if the product is a virtual product
            '_child_post_wc_downloadable',                      // bool     True if the product is a downloadable product

            // General
            '_child_post_wc_product_url',                       // string   Stores URL for the external product
            '_child_post_wc_button_text',                       // string   Stores button text for the external product
            '_child_post_wc_download_limit',                    // int      Download limit for file downloads
            '_child_post_wc_download_expiry',                   // int      Number of days before a download link expires

            // Inventory
            '_child_post_wc_manage_stock',                      // bool     True if the stock should be managed.
            '_child_post_wc_backorders',                        // string   Backorder type of the product
            '_child_post_wc_low_stock_amount',                  // int      Low stock threshold
            '_child_post_wc_stock_status',                      // string   Stock status, e.g. 'instock', 'outofstock', ...
            '_child_post_wc_sold_individually',                 // bool     True if the product is sold individually

            // Shipping
            '_child_post_wc_product_shipping_class',            // int      ID of shipping class of the product

            // Advanced
            '_child_post_wc_purchase_note_add_all_found',       // bool     When checked, purchase notes found by all CSS selectors will be added
            '_child_post_wc_always_add_custom_purchase_note',   // bool     When checked, custom purchase note will be prepended to purchase notes found by CSS selectors.
            '_child_post_wc_enable_reviews',                    // bool     True if the reviews for the product should be enabled
            '_child_post_wc_menu_order',                        // int      Menu order of the product

			// TAB Templates.
			'_post_template_direct_file_item',					// string 	Template for a single direct file.

			// TAB Child post templates
        	'_child_post_template_main',                      	// string   Main template for the child post.
        	'_child_post_template_title',                     	// string   Title template for the child post.
        	'_child_post_template_excerpt',                   	// string   Excerpt template for the child post.
        	'_child_post_template_list_item',                 	// string   List item template for the child post.
        	'_child_post_template_gallery_item',              	// string   Gallery item template for a single image.
			'_child_post_template_direct_file_item',			// string 	Template for a single direct file.
            '_child_post_remove_links_from_short_codes',        // bool     True if the template should be cleared from URLs.
            '_child_post_convert_iframes_to_short_code',        // bool     True if the iframes in the child post template should be converted to a short code.
            '_child_post_convert_scripts_to_short_code',        // bool     True if the scripts in the child post template should be converted to a short code.
            '_child_post_test_find_replace',                    // string   A piece of code used to test RegExes.

            // GENERAL SETTINGS
            '_kdn_translation_google_translate_end',           // string   End language for Google Translator
            '_kdn_translation_microsoft_translate_end',        // string   End language for Microsoft Translator
            '_kdn_translation_yandex_translate_from',          // string   Language of the original content for Yandex Translator
            '_kdn_translation_yandex_translate_to',            // string   Target language for Yandex Translator
            '_kdn_translation_yandex_translate_end',           // string   End language for Yandex Translator
            '_kdn_translation_yandex_translate_api',           // string   Client secret for Yandex Translator API
            '_kdn_translation_yandex_translate_api_randomize', // bool     Whether to randomize Yandex Translator API.
            '_kdn_translation_yandex_translate_test',          // string   Text for testing Yandex Translator API
			
		];

        // Merge the old post single setting keys with new post single setting keys.
		$singleMetaKeys = array_merge($singleMetaKeys, $customSingleMetaKeys);

		return $singleMetaKeys;

	}
    
}