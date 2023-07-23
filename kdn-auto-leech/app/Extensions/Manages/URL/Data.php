<?php
namespace KDNAutoLeech\Extensions\Manages\URL;
use KDNAutoLeech\Extensions\Database\Database;
use KDNAutoLeech\Extensions\Core\Process;
use KDNAutoLeech\Constants;

/**
 * Data.
 *
 * @since   2.3.3
 */
class Data extends \WP_List_Table {

    /** @var    object      Storage all data results. */
    public $data;
    /** @var    array       Storage all filtered data results. */
    public $prepareData;
    /** @var    object      Columns object. */
    public $columns;
    /** @var    object      Process object. */
    private $process;
    /** @var    string      The filter type of all data. */
    private $type;
    /** @var    string      The search keyword. */
    private $search;
    /** @var    string      The filter site of all data. */
    private $site;
    /** @var    string      The filter date of all data. */
    private $date;
    /** @var    int         The current page of all data. */
    private $paged;
    /** @var    int         The maximum number of result per page. */
    private $perPage;
    /** @var    string      The original url of manage page. */
    private $original;





    /**
     * Construct function.
     */
    public function __construct() {

        // Initialize original url of manage page.
        $this->original = '?post_type=' . Constants::$POST_TYPE . '&page=kdn-auto-leech-manages-url';

        global $status, $page;

        // Set parent defaults.
        parent::__construct([
            'singular'  => 'kdn-auto-leech-manages-url',
            'plural'    => 'kdn-auto-leech-manages-url',
            'ajax'      => true
        ]);
        
        // Initialize classes.
        $this->data     = (new Database)->getAllDatabase();
        $this->columns  = new Columns;
        $this->process  = new Process;

        // Get maximum number of result per page.
        $this->perPage  = $this->get_items_per_page('urls_per_page', 5);

        // Save all valid paramaters.
        $this->type     = !empty($_REQUEST['type'])     ? $_REQUEST['type']         : '';
        $this->search   = !empty($_REQUEST['s'])        ? $_REQUEST['s']            : '';
        $this->date     = !empty($_REQUEST['d'])        ? $_REQUEST['d']            : '';
        $this->site     = !empty($_REQUEST['c'])        ? $_REQUEST['c']            : '';
        $this->paged    = !empty($_REQUEST['paged'])    ? $_REQUEST['paged']        : '';

        // Add admin notice when finish bulk actions.
        $message        = !empty($_REQUEST['message'])  ? $_REQUEST['message']      : '';
        if ($message == 'true') add_action('admin_notices', [$this, 'kdn_bulk_action']);

        // Prepare the data with type, date and search.
        $this->prepareData = $this->getPrepareData($this->type, $this->date, $this->search, $this->site);

        // Remove some paramaters in URL after finish bulk actions.
        $this->removeQueryVar();

    }





    /**
     * Remove some paramaters in URL after finish bulk actions.
     *
     * @since   2.3.3
     */
    private function removeQueryVar() {

        // Prepare unnecessary query paramaters.
        $removeQueryVar = [
            '_wp_http_referer',
            'kdn_nonce',
            '_wpnonce',
            'action',
            'action2',
            'id'
        ];

        // Remove unnecessary query paramaters.
        if (isset($_REQUEST['action']) && $_REQUEST['action'] < 0 && isset($_REQUEST['action2']) && $_REQUEST['action2'] < 0 
            || !isset($_REQUEST['action']) && !isset($_REQUEST['action2']) && isset($_REQUEST['_wpnonce'])) {
            wp_safe_redirect(remove_query_arg($removeQueryVar, stripslashes( $_SERVER['REQUEST_URI'])));
            exit;
        }

    }





    /**
     * Prepare all data filtered by "type", "date" and "search".
     *
     * @param   string      $type           The filter type of all data.
     * @param   string      $date           The filter date of all data.
     * @param   string      $search         The search keyword.
     *
     * @return  array       $finalData      The final data after filtered.
     *
     * @since   2.3.3
     */
    private function getPrepareData($type = null, $date = null, $search = null, $site = null) {

        // Initialize "data" and "final data".
        $data               = [];
        $dataFilterBySite   = [];
        $finalData          = [];

        // Get all data filtered by "type".
        if ($type) {

            // Saved.
            if ($type == 'saved') {

                foreach ($this->data as $urlTuple) {
                    if ($urlTuple->is_saved > 0 && $urlTuple->saved_post_id > 0)
                        $data[] = $urlTuple;
                }

            // Quere.
            } else if ($type == 'queue') {

                foreach ($this->data as $urlTuple) {
                    if (!$urlTuple->saved_post_id && !$urlTuple->is_saved && !$urlTuple->deleted_at)
                        $data[] = $urlTuple;
                }

            // Deleted.
            } else if ($type == 'deleted') {

                foreach ($this->data as $urlTuple) {
                    if ($urlTuple->deleted_at && !$urlTuple->saved_post_id)
                        $data[] = $urlTuple;
                }

            // Other.
            } else if ($type == 'other') {

                foreach ($this->data as $urlTuple) {
                    if ($urlTuple->is_saved && !$urlTuple->saved_post_id && !$urlTuple->deleted_at)
                        $data[] = $urlTuple;
                }

            // Bypass delete.
            } else if ($type == 'bypass-delete') {

                foreach ($this->data as $urlTuple) {
                    if ($urlTuple->bypass_delete)
                        $data[] = $urlTuple;
                }

            }

        // Otherwise, get all data without filter by "type".
        } else {
            $data = $this->data;
        }

        // Prepare all data filtered by "site".
        if ($site) {

            foreach ($data as $urlTuple) {
                if ($urlTuple->post_id == $this->site) {
                    $dataFilterBySite[] = $urlTuple;
                }
            }

            $data = $dataFilterBySite;

        }

        // Prepare all data filtered by "search" and "date".
        if ($date || $search) {

            // Prepare "search" fields.
            $searchFields = [
                'url',
                'last_url',
                'id',
                'post_id',
                'category_id',
                'saved_post_id',
                'last_saved_post_id'
            ];

            foreach ($data as $urlTuple) {

                // Get the create_at.
                $urlTupleDate = date('Ym', strtotime($urlTuple->created_at));

                // Check and get "search" result.
                $searchResult = false;

                // If have "search" keyword.
                if ($search) {

                    foreach ($searchFields as $searchField) {
                        if (preg_match('/'. $search .'/i', $urlTuple->{$searchField})) {
                            $searchResult = true;
                            break;
                        }
                    }

                }

                // If have "date" AND "search".
                if ($date && $search) {

                    if ($urlTupleDate == $date && $searchResult) {
                        $finalData[] = $urlTuple;
                    }

                // If we have "date" OR "search".
                } else {

                    if ($urlTupleDate == $date || $searchResult) {
                        $finalData[] = $urlTuple;
                    }

                }

            }

        // Otherwise, get "final data" without any filter more.
        } else {

            $finalData = $data;

        }

        // Return "final data".
        return $finalData;

    }





    /**
     * Get count number of data results.
     *
     * @param   string      $type       The filter type of all data.
     * @param   bool        $format     Whether to use number format or not.
     *
     * @return  int         $allData    The count number of data results.
     *
     * @since   2.3.3
     */
    private function getCountData($type = null, $format = false) {

        // Count all records.
        $allData = count($this->getPrepareData($type, $this->date, $this->search, $this->site));

        // Format the number with thousands separator by dot.
        if ($format) $allData = number_format($allData, 0, ",", ".");

        // Return count number of data results.
        return $allData;

    }





    /**
     * Prepare the template for each column.
     *
     * @param   object      $item       An object storage all data of each record.
     * @param   string      $item       The column name of data list table.
     *
     * @return  string                  The HTML of each column.
     *
     * @since   2.3.3
     */
    protected function column_default($item, $column_name) {

        switch ($column_name) {

            // Customize the "URL" column
            case 'url':
                return $this->columns->Column_Url($item);

            // Customize the "Site" column
            case 'post_id':
                return $this->columns->Column_Site($item);

            // Customize the "Category" column
            case 'category_id':
                return $this->columns->Column_Category($item);

            // Customize the "Saved" column
            case 'saved_post_id':
                return $this->columns->Column_Saved($item);

            // Customize the "Recrawled" column
            case 'update_count':
                return $this->columns->Column_Recrawled($item);

            // Customize the "Time" column
            case 'created_at':
                return $this->columns->Column_Time($item);

            // Default, print the item data.
            default:
                return print_r($item, true);
        }

    }





    /**
     * Add link to each "type" at the top of data list table.
     *
     * @return  array   $links      An array storage all links.
     *
     * @since   2.3.3
     */
    protected function get_views() {

        // Prepare the "current" CSS class for each "type".
        $currentAll             = !$this->type                      ? 'class="current"' : '';
        $currentSaved           = $this->type == 'saved'            ? 'class="current"' : '';
        $currentQueue           = $this->type == 'queue'            ? 'class="current"' : '';
        $currentDeleted         = $this->type == 'deleted'          ? 'class="current"' : '';
        $currentOther           = $this->type == 'other'            ? 'class="current"' : '';
        $currentBypassDelete    = $this->type == 'bypass-delete'    ? 'class="current"' : '';

        // Get "search" prefix and "date" prefix.
        $searchPrefix   = $this->search ? '&s=' : '';
        $sitePrefix     = $this->site   ? '&c=' : '';
        $datePrefix     = $this->date   ? '&d=' : '';

        // Prepare all links.
        $links = [

            // Type: all (without any filter by "type").
            "all"               =>  "<a {$currentAll}        href='{$this->original}{$searchPrefix}{$this->search}{$sitePrefix}{$this->site}{$datePrefix}{$this->date}'>"
                                    . _kdn("All") .
                                    " <span class='count'>({$this->getCountData(null, true)})</span></a>",

            // Type: saved.
            "saved"             =>  "<a {$currentSaved}      href='{$this->original}&type=saved{$searchPrefix}{$this->search}{$sitePrefix}{$this->site}{$datePrefix}{$this->date}'>"
                                    . _kdn("Saved") .
                                    " <span class='count'>({$this->getCountData('saved', true)})</span></a>",

            // Type: queue.
            "queue"             =>  "<a {$currentQueue}      href='{$this->original}&type=queue{$searchPrefix}{$this->search}{$sitePrefix}{$this->site}{$datePrefix}{$this->date}'>"
                                    . _kdn("Queue") .
                                    " <span class='count'>({$this->getCountData('queue', true)})</span></a>",

            // Type: deleted.
            "deleted"           =>  "<a {$currentDeleted}    href='{$this->original}&type=deleted{$searchPrefix}{$this->search}{$sitePrefix}{$this->site}{$datePrefix}{$this->date}'>"
                                    . _kdn("Deleted") .
                                    " <span class='count'>({$this->getCountData('deleted', true)})</span></a>",

            // Type: other.
            "other"             =>  "<a {$currentOther}      href='{$this->original}&type=other{$searchPrefix}{$this->search}{$sitePrefix}{$this->site}{$datePrefix}{$this->date}'>"
                                    . _kdn("Other") .
                                    " <span class='count'>({$this->getCountData('other', true)})</span></a>",

            // Type: bypass-delete.
            "bypass-delete"     =>  "<a {$currentBypassDelete}      href='{$this->original}&type=bypass-delete{$searchPrefix}{$this->search}{$sitePrefix}{$this->site}{$datePrefix}{$this->date}'>"
                                    . _kdn("Bypass delete") .
                                    " <span class='count'>({$this->getCountData('bypass-delete', true)})</span></a>"

        ];

        // Return all links.
        return $links;

    }





    /**
     * Prepare main columns.
     *
     * @return  array   $columns    An array storage all main columns of data list table.
     *
     * @since   2.3.3
     */
    public function get_columns() {

        $columns = [
            'cb'                => '<input type="checkbox"/>',      // The "Check all"          column.
            'url'               => _kdn('URL'),                    // The "URL"                column.
            'post_id'           => _kdn('Site'),                   // The "Site" (campaign)    column.
            'category_id'       => _kdn('Category'),               // The "Category"           column.
            'saved_post_id'     => _kdn('Saved'),                  // The "Saved"              column.
            'update_count'      => _kdn('Recrawled'),              // The "Recrawled"          column.
            'created_at'        => _kdn('Time')                    // The "Time"               column.
        ];

        return $columns;

    }





    /**
     * Define the checkbox column content of each row.
     *
     * @param   object      $item       An object storage all data of each record.
     *
     * @return  string                  The HTML of checkbox column content.
     *
     * @since   2.3.3
     */
    protected function column_cb($item) {

        // Initialize the bypass delete.
        $byPassDelete = '';

        // If this item has bypass delete, add the "bypass_delete" CSS class.
        if ($item->bypass_delete) $byPassDelete = ' class="bypass_delete"';

        // Return HTML of checkbox column content.
        return sprintf(
            '<input type="checkbox" name="%1$s[]" value="%2$s" id="checkbox-'.$item->id.'"'.$byPassDelete.'/>',
            'id',
            $item->id . '-' . $item->last_saved_post_id
        );

    }





    /**
     * Allow columns to be sorted.
     *
     * @return  array   $sortable_columns       An array storage columns to be sorted.
     *
     * @since   2.3.3
     */
    protected function get_sortable_columns() {

        // Prepare columns to be sorted.
        $sortable_columns = array(
            'url'               => array('id', false),
            'post_id'           => array('post_id', false),
            'saved_post_id'     => array('saved_post_id', false),
            'category_id'       => array('category_id', false),
            'update_count'      => array('update_count', false),
            'created_at'        => array('created_at', false)
        );

        return $sortable_columns;

    }





    /**
     * Prepare the bulk actions form.
     *
     * @return  array   $actions    An array storage all bulk actions.
     *
     * @since   2.3.3
     */
    protected function get_bulk_actions() {

        // Prepare all bulk actions.
        $actions = array(
            'restore'               => _kdn('Restore'),
            'delete'                => _kdn('Delete temporarily'),
            'remove'                => _kdn('Delete permanently'),
            'bypass_delete'         => _kdn('Bypass delete'),
            'do_not_bypass_delete'  => _kdn('Do not bypass delete')
        );

        return $actions;
    }





    /**
     * Process the bulk actions.
     *
     * @since   2.3.3
     */
    protected function process_bulk_action() {

        // Security check.
        if (isset($_REQUEST['_wpnonce']) && !empty($_REQUEST['_wpnonce'])) {

            $nonce = !empty($_REQUEST['_wpnonce']) ? $_REQUEST['_wpnonce'] : '';

            if (!wp_verify_nonce($nonce, 'bulk-' . $this->_args['plural'])) {
                wp_die(_kdn('Sorry, you are not allowed to access this page.'));
            }

            // Multi restore.
            if ('restore' === $this->current_action()) {
                $this->process->RestoreMultiUrl();
                wp_safe_redirect($_SERVER['HTTP_REFERER'] . '&message=true');

            // Multi delete.
            } elseif ('delete' === $this->current_action()) {
                $this->process->DeleteMultiUrl();
                wp_safe_redirect($_SERVER['HTTP_REFERER'] . '&message=true');

            // Multi remove.
            } elseif ('remove' === $this->current_action()) {
                $this->process->RemoveMultiUrl();
                wp_safe_redirect($_SERVER['HTTP_REFERER'] . '&message=true');
            
            // Bypass delete.
            } elseif ('bypass_delete' === $this->current_action()) {
                $this->process->BypassDeleteMultiUrl(true);
                wp_safe_redirect($_SERVER['HTTP_REFERER'] . '&message=true');

            // Do not bypass delete.
            } elseif ('do_not_bypass_delete' === $this->current_action()) {
                $this->process->BypassDeleteMultiUrl(false);
                wp_safe_redirect($_SERVER['HTTP_REFERER'] . '&message=true');
            }

        }

    }





    /**
     * Admin notice after process bulk actions.
     *
     * @since   2.3.3
     */
    public function kdn_bulk_action() {

        echo '<div class="notice updated is-dismissible">
                <p>'. _kdn('Updated!') .'</p>
              </div>';

    }





    /**
     * Prepare the filter by site form.
     *
     * @since   2.3.3
     */
    private function filter_by_site() {

        $sites = get_posts([
            'post_type'     => Constants::$POST_TYPE,
            'post_status'   => 'publish',
            'numberposts'   => -1
            // 'order'    => 'ASC'
        ]);

        // Create the filter by date form.
        echo '<select name="c" id="filter-by-sites">
                <option value="">' . _kdn('All sites') . '</option>';

        foreach ($sites as $site) {

            echo '<option value="'.$site->ID.'"';
            if ($this->site == $site->ID) {
                echo 'selected';
            }

            echo '>'.$site->post_title.'</option>';

        }

        echo '</select>';

    }





    /**
     * Prepare the filter by date form.
     *
     * @since   2.3.3
     */
    private function filter_by_date() {

        // Prepare the data for filter by date.
        $data = [];
        foreach ($this->data as $urlTuple) {
            if (!isset($data[date('Ym', strtotime($urlTuple->created_at))])) {
                $data[date('Ym', strtotime($urlTuple->created_at))] = $urlTuple;
            }
        }

        // Sort by date with "DESC" order.
        krsort($data, 1);

        // Create the filter by date form.
        echo '<select name="d" id="filter-by-date">
                <option value="">' . _kdn('All dates') . '</option>';

        foreach ($data as $urlTuple) {

            echo '<option value="'.date('Ym', strtotime($urlTuple->created_at)).'"';
            if ($this->date == date('Ym', strtotime($urlTuple->created_at))) {
                echo 'selected';
            }

            echo '>'.date_i18n('F Y', strtotime($urlTuple->created_at)).'</option>';

        }

        echo '</select><input type="submit" class="button" value="' . _kdn('Filter'). '"/>';

    }





    /**
     * Add filter by date form next to bulk actions form.
     *
     * @param   string      $which      The position of table navigation.
     *
     * @since   2.3.3
     */
    protected function extra_tablenav($which) {

        if ($which == 'top') {

            echo '<div class="alignleft actions bulkactions">';
                    $this->filter_by_site();        // Filter by site.
                    $this->filter_by_date();        // Filter by date.
            echo '</div>';

        }

    }





    /**
     * Order all results.
     *
     * @param   object      $a          An object storage all data of each record.
     * @param   object      $b          An object storage all data of each record.
     *
     * @return  int         $result     Whether to check have order or not.
     *
     * @since   2.3.3
     */
    public function usort_reorder($a, $b) {

        // Get order by and order type.
        $orderby    = (!empty($_REQUEST['orderby']))    ? $_REQUEST['orderby']  : 'id';
        $order      = (!empty($_REQUEST['order']))      ? $_REQUEST['order']    : 'desc';

        // Get the result if order or not.
        $result     = strnatcmp($a->{$orderby}, $b->{$orderby});

        return ($order === 'asc') ? $result : -$result;

    }






    /**
     * Prepare all items of data list table.
     *
     * @since   2.3.3
     */
    public function prepare_items() {

        global $wpdb;

        // Define colum headers.
        $this->_column_headers = $this->get_column_info();

        // Initialize process bulk actions.
        $this->process_bulk_action();

        // Get the prepared data.
        $data = $this->prepareData;

        // Sort the prepared data.
        usort($data, [$this, 'usort_reorder']);

        // Get the number of current page.
        $current_page = $this->get_pagenum();

        // Get the count number of current items.
        $total_items = count($this->prepareData);

        // Get the prepared data with current page.
        $data = array_slice($data, (($current_page - 1) * $this->perPage), $this->perPage);

        // Define all items as this data.
        $this->items = $data;

        // Set pagination arguments.
        $this->set_pagination_args([
            'total_items' => $total_items,
            'per_page'    => $this->perPage,
            'total_pages' => ceil($total_items / $this->perPage)
        ]);

    }
}