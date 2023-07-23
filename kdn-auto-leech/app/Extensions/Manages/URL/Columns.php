<?php
namespace KDNAutoLeech\Extensions\Manages\URL;

/**
 * Columns.
 *
 * @since   2.3.3
 */
class Columns extends Data {

    /**
     * Construct function.
     */
    public function __construct(){}





    /**
     * URL column.
     *
     * @since   2.3.3
     */
    public function Column_Url($item = null) {

        // Prepare some variables.
        $url                = $item->url;
        $urlId              = $item->id;
        $lastSavedPostId    = $item->last_saved_post_id;

        // Prepare the URL template.
        $urlTemplate = '<strong id="json-url-'.$urlId.'">
                            <a href="' . $url . '" target="_blank">' . $url . '</a>
                        </strong>';

        // Prepare the row actions.
        $actions = array(
            'id'        => sprintf('<span style="color:#444;display:inline-block">ID: %1$s</span>', $urlId),
            'edit'      => sprintf('<a onclick="KDN_ManagesURL_ButtonEditUrl('.$urlId.')">%1$s</a>', _kdn('Edit')),
            'delete'    => sprintf('<span id="json-delete-restore-'.$urlId.'">
                                        <a onclick="KDN_ManagesURL_DeleteUrl('.$urlId.', '.$lastSavedPostId.')">%1$s</a>
                                    </span>',
                                    _kdn('Delete temporarily')),
            'restore'   => sprintf('<span id="json-delete-restore-'.$urlId.'" class="delete">
                                        <a class="khoiphuc" onclick="KDN_ManagesURL_RestoreUrl('.$urlId.', '.$lastSavedPostId.')">%1$s</a>
                                    </span>',
                                    _kdn('Restore')),
            'remove'    => sprintf('<span id="remove-'.$urlId.'"><a onclick="KDN_ManagesURL_RemoveUrl('.$urlId.')">%1$s</a></span>', _kdn('Delete permanently'))
        );

        // If the "delete_at" column is null, we don't need "Restore" button and vice versa.
        if($item->deleted_at == null) unset($actions['restore']); else unset($actions['delete']);

        // Prepare the last URL if exists.
        $lastUrlTemplate =  '<span id="json-url-cuoi-'.$urlId.'">';
        if(isset($item->last_url) && $item->last_url)
            $lastUrlTemplate .= '<div style="font-size: 11px">
                                    <b><font color="red">'._kdn('LAST:').'</font></b>
                                    <a href="'.$item->last_url.'" target="_blank">'.$item->last_url.'</a>
                                 </div>';
        $lastUrlTemplate .= '</span>';

        // The final result will be displayed.
        return sprintf(
            '%1$s %2$s %3$s %4$s',
            $urlTemplate,
            $lastUrlTemplate,
            $this->row_actions($actions, false),
            $this->EditForm($item)
        );

    }





    /**
     * Edit form in URL column.
     *
     * @since   2.3.3
     */
    public function EditForm($item = null){

        // Prepare some variables.
        $urlId              = $item->id;
        $url                = $item->url;
        $lastUrl            = $item->last_url;
        $isSaved            = $item->is_saved;
        $savedPostId        = $item->saved_post_id;
        $lastSavedPostId    = $item->last_saved_post_id;
        $categoryId         = $item->category_id;
        $siteId             = $item->post_id;
        $byPassDelete       = $item->bypass_delete;

        // The final result will be displayed.
        return '
            <div class="edit-form hidden" id="edit-form-'.$urlId.'" data-url-id="'.$urlId.'">
                <table width="100%">
                    <tr>
                        <td>
                            URL:
                        </td>
                        <td>
                            <input type="text" value="'.$url.'" id="url-'.$urlId.'"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            '._kdn('Last URL:').'
                        </td> 
                        <td>
                            <input type="text" value="'.$lastUrl.'" id="lasturl-'.$urlId.'"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            '._kdn('Saved:').'
                        </td>
                        <td>
                            <input type="number" value="'.$isSaved.'" id="issaved-'.$urlId.'" min="0" max="1"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            '._kdn('Post:').'
                        </td>
                        <td>
                            <input type="number" value="'.$savedPostId.'" id="saved-'.$urlId.'"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            '._kdn('Last post:').'
                        </td>
                        <td>
                            <input type="number" value="'.$lastSavedPostId.'" id="lastsaved-'.$urlId.'"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            '._kdn('Category:').'
                        </td>
                        <td>
                            <input type="number" value="'.$categoryId.'" id="category-'.$urlId.'"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            '._kdn('Site:').'
                        </td>
                        <td>
                            <input type="number" value="'.$siteId.'" id="campaign-'.$urlId.'"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            '._kdn('Bypass delete:').'
                        </td>
                        <td>
                            <input type="number" value="'.$byPassDelete.'" id="bypass-delete-'.$urlId.'" min="0" max="1"/>
                        </td>
                    </tr>
                </table>
                <input type="hidden" value="'.$urlId.'" id="id-'.$urlId.'"/>
                <div align="right">
                    <input type="button" class="button" value="'._kdn('Edit').'" onclick="KDN_ManagesURL_EditUrl('.$urlId.')"/> 
                    <input type="button" class="button" value="'._kdn('Cancel').'" onclick="KDN_ManagesURL_CancelEditUrl('.$urlId.')"/>
                </div>
            </div>
        ';

    }





    /**
     * Site column.
     *
     * @since   2.3.3
     */
    public function Column_Site($item = null) {

        // Prepare some variables.
        $urlId      = $item->id;
        $siteId     = $item->post_id;
        $editLink   = get_post($siteId) ? get_edit_post_link($siteId) : '';
        $theTitle   = get_post($siteId) ? get_post($siteId)->post_title : _kdn('Undefined');

        // The final result will be displayed.
        return '<span id="json-campaign-'.$urlId.'">
                    <a href="' . $editLink . '" target="_blank"> '. $theTitle . '</a>
                    <br/>ID: ' . $siteId . '
                </span>';

    }





    /**
     * Category column.
     *
     * @since   2.3.3
     */
    public function Column_Category($item = null) {

        // Prepare some variables.
        $urlId      = $item->id;
        $categoryId = $item->category_id;

        // Prepare the WooCommerce textlink.
        $wootext    = ' <span style="font-size:11px;color:#777;font-style:italic">(WooCommerce)</span>';

        // Prepare the textlink
        $textlink   = get_term($categoryId);
        $textlink   = isset($textlink->name) ? $textlink->name . ($textlink->taxonomy == 'product_cat' ? $wootext : '') : _kdn('Undefined');

        // The final result will be displayed.
        return '<span id="json-category-'.$urlId.'">
                    <a href="' . get_edit_term_link($categoryId) .' " target="_blank">' . $textlink . '</a>
                    <br/>ID: ' . $categoryId . '
                </span>';

    }





    /**
     * Saved column.
     *
     * @since   2.3.3
     */
    public function Column_Saved($item = null, $postId = null){

        // Prepare the saved post id template when process via ajax.
        if ($postId && $post = get_post($postId)) {

            return '
                <strong><a href="'.get_edit_post_link($postId).'" target="_blank">'.$post->post_title.'</a></strong>
                                                
                <div class="row-actions" style="display:block">
                    <span class="id" style="color:#444;display:inline-block">
                        ID: '.$postId.'  
                    </span>
                    <span class="view"> | 
                        <a href="'.get_permalink($postId).'" target="_blank">' . _kdn('View') . '</a> | 
                    </span>
                    <span class="edit">
                        <a href="'.get_edit_post_link($postId).'" target="_blank">' . _kdn('Edit') . '</a>
                    </span>
                </div>
            ';

        }

        // If not have "$item", stop here.
        if (!$item) return;

        // Prepare some variables.
        $urlId              = $item->id;
        $savedPostId        = $item->saved_post_id;
        $lastSavedPostId    = $item->last_saved_post_id;

        // Prepare the saved post id template.
        $savedPostIdTemplate = '<span id="json-saved-'.$urlId.'">';

        // If this is a duplicate post.
        if($item->is_saved && !$savedPostId){
            $savedPostIdTemplate .= '<i>'._kdn('Saved but without ID of post').'</i>';
        }

        // If have post data.
        if($post = get_post($savedPostId)){
            $savedPostIdTemplate .= '
                <strong><a href="'.get_edit_post_link($savedPostId).'" target="_blank">'.$post->post_title.'</a></strong>
                                                
                <div class="row-actions" style="display:block">
                    <span class="id" style="color:#444;display:inline-block">
                        ID: '.$savedPostId.'  
                    </span>
                    <span class="view"> | 
                        <a href="'.get_permalink($savedPostId).'" target="_blank">' . _kdn('View') . '</a> | 
                    </span>
                    <span class="edit">
                        <a href="'.get_edit_post_link($savedPostId).'" target="_blank">' . _kdn('Edit') . '</a>
                    </span>
                </div>
            ';
        }
        $savedPostIdTemplate .= '</span>';

        // Prepare the last saved post id template.
        $lastSavedPostIdTemplate = '<span id="json-last-saved-'.$urlId.'">';
        if ($lastSavedPostId && $lastSavedPostId !== $savedPostId) {
            $lastSavedPostIdTemplate .= '
                <div class="last_saved_post_id" style="font-size: 11px;">
                    <b><font color="red">'._kdn('LAST:').'</font></b> '.(get_post($lastSavedPostId) ? '<a href="'.get_edit_post_link($lastSavedPostId).'" target="_blank">'.get_post($lastSavedPostId)->post_title.'</a>' : _kdn('Undefined')).' ('.$lastSavedPostId.')
                </div>
            ';
        }
        $lastSavedPostIdTemplate .= '</span>';

        // The final result will be displayed.
        $columSaved = $savedPostIdTemplate . $lastSavedPostIdTemplate;
        return $columSaved;

    }





    /**
     * Recrawled column.
     *
     * @since   2.3.3
     */
    public function Column_Recrawled($item = null) {

        // Get count number of recrawl.
        $updateCount = $item->update_count;
        $updateCount = number_format($updateCount, 0, ',', '.');
        return $updateCount;

    }





    /**
     * Time column.
     *
     * @since   2.3.3
     */
    public function Column_Time($item = null) {

        // Get all data of row.
        $urlId          = $item->id;
        $createdAt      = $item->created_at;
        $savedAt        = $item->saved_at;
        $recrawledAt    = $item->recrawled_at;
        $deletedAt      = $item->deleted_at;
        $savedPostId    = $item->saved_post_id;
        $isSaved        = $item->is_saved;

        // Return the time list.
        $timeList       = '<div id="json-time-'.$urlId.'">';
        $timeList      .=   '<span class="kdn_url url_created_at">'.date("H:i:s - d/m/Y", strtotime($createdAt)).'</span>';
        if ($savedAt && $isSaved && $savedPostId)
            $timeList  .=   '<span class="kdn_url url_saved_at">'.date("H:i:s - d/m/Y", strtotime($savedAt)).'</span>';
        if ($recrawledAt)
            $timeList  .=   '<span class="kdn_url url_recrawled_at">'.date("H:i:s - d/m/Y", strtotime($recrawledAt)).'</span>';
        if ($deletedAt && !$savedPostId)
            $timeList  .=   '<span class="kdn_url url_deleted_at">'.date("H:i:s - d/m/Y", strtotime($deletedAt)).'</span>';
        $timeList      .= '</div>';

        return $timeList;
    }

}