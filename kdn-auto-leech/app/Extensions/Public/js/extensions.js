/**
 * When document ready.
 *
 * @since   2.3.3
 */
jQuery(document).ready(function(){

    // Add custom shortcode button into tab child post templates.
    KDN_SITES_AddShortcodeButton();

    // When click the custom shortcode button in tab child post templates.
    KDN_SITES_ClickShortcodeButton();

    // Disable "#post_stop_crawling_first_page" when child post activated.
    KDN_SITES_DisablePostStopCrawlingFirstPage();

});





/**
 * When document click.
 *
 * @since   2.3.3
 */
jQuery(document).click(function(){

    // Add custom shortcode button into tab child post templates.
    KDN_SITES_AddShortcodeButton();

    // When click the custom shortcode button in tab child post templates.
    KDN_SITES_ClickShortcodeButton();

});





// ------------------------------ MANAGES URL ------------------------------ //

/**
 * Add and remove class when click edit url button.
 *
 * @param   int     id      The ID of this edit url form.
 *
 * @since   2.3.3
 */
function KDN_ManagesURL_ButtonEditUrl(id){

	jQuery('.edit-form').addClass('hidden');
	jQuery('#edit-form-'+id).removeClass('hidden');

}






/**
 * When click "Cancel" button in edit url form.
 *
 * @param   int     id      The ID of this edit url form.
 *
 * @since   2.3.3
 */
function KDN_ManagesURL_CancelEditUrl(id){

	jQuery('#edit-form-'+id).addClass('hidden');

}





/**
 * When press "Enter" in edit url form.
 *
 * @param   object      event       The event when key press.
 *
 * @since   2.3.3
 */
jQuery('.edit-form').keypress(function(event) {

    // If this is "Enter" key.
    if(event.keyCode === 13) {

        event.preventDefault();
        var urlid = jQuery(this).attr('data-url-id');

        // Run edit url function.
        KDN_ManagesURL_EditUrl(urlid);

    }

});





/**
 * Edit each URL via Ajax.
 *
 * @param   int     id      The ID of this URL.
 *
 * @since   2.3.3
 */
function KDN_ManagesURL_EditUrl(id){

    // Get all field data in edit url form.
    var id              = jQuery('#id-'+id).val();
	var url 		    = jQuery('#url-'+id).val();
    var lasturl         = jQuery('#lasturl-'+id).val();
    var issaved         = jQuery('#issaved-'+id).val();
	var saved 		    = jQuery('#saved-'+id).val();
	var lastsaved 	    = jQuery('#lastsaved-'+id).val();
    var category        = jQuery('#category-'+id).val();
	var campaign        = jQuery('#campaign-'+id).val();
    var bypassdelete    = jQuery('#bypass-delete-'+id).val();

    // Send a request.
	jQuery.ajax({
        type        : "POST",
        dataType    : "JSON",
        url         : KDN_JS_Localize.ajax_url,
        data        : {
            action:         "edit_url",
            id              : id,
            url   		    : url,
            lasturl         : lasturl,
            issaved         : issaved,
            saved   	    : saved,
            lastsaved       : lastsaved,
            category        : category,
            campaign   	    : campaign,
            bypassdelete    : bypassdelete,
            wp_nonce	    : KDN_JS_Localize.wp_nonce
        },

        // When request successfully.
        success: function(response) {

            if(response.data.id) {

                // Replace all HTML in this row.
                jQuery('#json-url-'+id).html('<a href="'+response.data.url+'" target="_blank">'+response.data.url+'</a>');
                jQuery('#json-url-cuoi-'+id).html(response.data.last_url);
                jQuery('#json-category-'+id).html('<a href="'+response.data.category_edit_link+'" target="_blank">'+response.data.category_title+'</a><br/>ID: '+response.data.category_id);
                jQuery('#json-campaign-'+id).html('<a href="'+response.data.campaign_edit_link+'" target="_blank">'+response.data.campaign_title+'</a><br/>ID: '+response.data.campaign_id);
                jQuery('#json-saved-'+id).html(response.data.saved_post_id_action);
                jQuery('#json-last-saved-'+id).html(response.data.last_saved_post_id_action);

                // Add class "success" in check column.
                jQuery('.check-column').has('input[value^="'+id+'"]').addClass('success');

                // Hide the edit url form after 300 ms.
                setTimeout(function(){
                    KDN_ManagesURL_CancelEditUrl(id);
                }, 300);

                // Add or remove class "bypass_delete" in this row.
                if (bypassdelete < 1) {
                    jQuery('input#checkbox-'+id).removeClass('bypass_delete');
                } else {
                    jQuery('input#checkbox-'+id).addClass('bypass_delete');
                }

                // Remove class "success" in check column after 2s.
                setTimeout(function(){
                    jQuery('.check-column').has('input[value^="'+id+'"]').removeClass('success');
                }, 2000);

            }

        },

        // When request failed.
        error: function() {

            alert(KDN_JS_LocalizeManages_URL.error);
            window.location.href='';

        }

    });

}






/**
 * Delete each URL by Ajax.
 *
 * @param   int     id              The ID of this URL.
 * @param   int     lastsaved       The ID of last saved post.
 *
 * @since   2.3.3
 */
function KDN_ManagesURL_DeleteUrl(id, lastsaved){

    // Send a request.
    jQuery.ajax({
        type        : "POST",
        dataType    : "JSON",
        url         : KDN_JS_Localize.ajax_url,
        data        : {
            action      : "delete_url",
            id          : id,
            wp_nonce    : KDN_JS_Localize.wp_nonce
        },

        // When request successfully.
        success: function(response) {

            if(response.data.deleted_at) {

                // Replace all HTML in this row.
                jQuery('#json-delete-restore-'+id).html('<a class="khoiphuc" onclick="KDN_ManagesURL_RestoreUrl('+id+','+lastsaved+')">'+KDN_JS_LocalizeManages_URL.restore+'</a>');
                jQuery('#json-saved-'+id).html('');
                jQuery('#json-time-'+id).children('.url_saved_at').hide();
                jQuery('#json-time-'+id).append('<span class="kdn_url url_deleted_at">'+response.data.deleted_at+'</span>');

                // Add class "error" in check column.
                jQuery('.check-column').has('input[value^="'+id+'"]').addClass('error');

                // Remove class "error" in check column after 2s.
                setTimeout(function(){
                    jQuery('.check-column').has('input[value^="'+id+'"]').removeClass('error');
                }, 2000);

            }

        },

        // When request failed.
        error: function() {

            alert(KDN_JS_LocalizeManages_URL.error);
            window.location.href='';

        }

    });

}





/**
 * Restore each URL by Ajax.
 *
 * @param   int     id              The ID of this URL.
 * @param   int     lastsaved       The ID of last saved post.
 *
 * @since   2.3.3
 */
function KDN_ManagesURL_RestoreUrl(id, lastsaved){

    // Send a request.
    jQuery.ajax({
        type        : "POST",
        dataType    : "JSON",
        url         : KDN_JS_Localize.ajax_url,
        data        : {
            action      : "restore_url",
            id          : id,
            lastsaved   : lastsaved,
            wp_nonce    : KDN_JS_Localize.wp_nonce
        },

        // When request successfully.
        success: function(response) {

            if(response.data) {

                // Replace all HTML in this row.
                jQuery('#json-delete-restore-'+id).html('<a class="submitdelete" onclick="KDN_ManagesURL_DeleteUrl('+id+','+lastsaved+')">'+KDN_JS_LocalizeManages_URL.delete_temporarily+'</a>');
                jQuery('#json-saved-'+id).html(response.data.saved_post_id_action);
                jQuery('#json-time-'+id).children('.url_deleted_at').remove();
                jQuery('#json-time-'+id).children('.url_saved_at').show();

                // Add class "success" in check column.
                jQuery('.check-column').has('input[value^="'+id+'"]').addClass('success');

                // Remove class "success" in check column after 2s.
                setTimeout(function(){
                    jQuery('.check-column').has('input[value^="'+id+'"]').removeClass('success');
                }, 2000);

            }

        },

        // When request failed.
        error: function() {

            alert(KDN_JS_LocalizeManages_URL.error);
            window.location.href='';
        }

    });

}





/**
 * Remove each URL by Ajax.
 *
 * @param   int     id              The ID of this URL.
 *
 * @since   2.3.3
 */
function KDN_ManagesURL_RemoveUrl(id){

    // Replace this "Remove" text with "Deleting..." text.
    jQuery('#remove-'+id).html(KDN_JS_LocalizeManages_URL.deleting);

    // Send a request.
    jQuery.ajax({
        type        : "POST",
        dataType    : "JSON",
        url         : KDN_JS_Localize.ajax_url,
        data        : {
            action      : "remove_url",
            id          : id,
            wp_nonce    : KDN_JS_Localize.wp_nonce
        },

        // When request successfully.
        success: function(response) {

            if(response.data) {

                // Remove this row.
                jQuery('#remove-'+id).hide();
                setTimeout(function(){
                    jQuery('tr').has('#remove-'+id).fadeOut();
                }, 500);

            }

        },

        // When request failed.
        error: function() {

            alert(KDN_JS_LocalizeManages_URL.error);
            window.location.href='';

        }

    });

}





// ------------------------------ SITE SETTINGS ------------------------------ //


/**
 * Cookies parse.
 *
 * @since   2.3.3
 */
function splitLimit(inString, separator, limit){
    var ary = inString.split(separator);
    var aryOut = ary.slice(0, limit - 1);
    if(ary[limit - 1]){
        aryOut.push(ary.slice(limit - 1).join(separator));
    }
    return aryOut;
}

jQuery('button.parse-cookies').click(function(event) {

    // Get cookies string.
    var cookies = jQuery('#_parse_cookies').val();

    // If not have anything, stop here.
    if (!cookies) return;

    // Split cookies.
    cookies = cookies.split(';');

    // Prepare the final HTML to append.
    var html = '<div class="input-group key-value remove cookies-container" data-key="{key}"><div class="input-container"> <input type="text" name="_cookies[{key}][key]" id="_cookies[{key}][key]" placeholder="'+ KDN_JS_LocalizeManages_URL.cookie_name +'" value="{cookieName}"/> <input type="text" name="_cookies[{key}][value]" id="_cookies[{key}][value]" placeholder="'+ KDN_JS_LocalizeManages_URL.cookie_content +'" value="{cookieValue}"/> </div> <button class="button kdn-remove" title="'+ KDN_JS_LocalizeManages_URL.delete +'"><span class="dashicons dashicons-trash"></span></button> <div class="kdn-sort ui-sortable-handle"><span class="dashicons dashicons-move"></span></div></div></div>';

    // Get key of the last cookie field.
    var lastKey = jQuery('.cookies-container').last().data('key');

    // Append each new cookie field.
    jQuery(cookies).each(function(key, value) {

        var cookieName = splitLimit(value, '=', 2)[0] ? splitLimit(value, '=', 2)[0] : '';
        var cookieValue = splitLimit(value, '=', 2)[1] ? splitLimit(value, '=', 2)[1] : '';
        var xhtml = html.replace(/{key}/ig, lastKey + key + 1);
        xhtml = xhtml.replace(/{cookieName}/ig, cookieName.replace(/^\s/ig, ''));
        xhtml = xhtml.replace(/{cookieValue}/ig, cookieValue ? cookieValue : '');
        jQuery('.cookies-container').parent().append(xhtml);
        
    });

});




/**
 * Headers parse.
 *
 * @since   2.3.3
 */
jQuery('button[class$="parse-headers"]').click(function() {

    // Get parse type.
    var parseType = jQuery(this).data('kdn');
        parseType = JSON.parse(JSON.stringify(parseType));
        parseType = parseType.parse_type;
    
    // Get the current tab.
    var parentElement = jQuery(this).closest('td');

    // Get the header string.
    var headers = jQuery(parentElement).find('textarea[id$="_parse_headers"]').val();

    // If not have anything, stop here.
    if (!headers) return;
    
    headers = headers.split("\n");

    // Prepare the final HTML to append.
    var html = '<div class="input-group key-value remove headers-container" data-key="{key}"> <div class="input-container"> <input type="text" name="_{parseType}_custom_headers[{key}][key]" id="_{parseType}_custom_headers[{key}][key]" placeholder="HEADER" value="{headerName}"/> <input type="text" name="_{parseType}_custom_headers[{key}][value]" id="_{parseType}_custom_headers[{key}][value]" placeholder="'+ KDN_JS_LocalizeManages_URL.value +'" value="{headerValue}"/> </div> <button class="button kdn-remove" title="'+ KDN_JS_LocalizeManages_URL.delete +'"><span class="dashicons dashicons-trash"></span></button> <div class="kdn-sort ui-sortable-handle"><span class="dashicons dashicons-move"></span></div> </div>';

    // Get key of the last header field.
    var lastKey = jQuery(this).closest('td').find('.headers-container').last().data('key');

    // Append each new header field.
    jQuery(headers).each(function(key, value) {

        var eachHeader = value.replace(/^\:/ig, '%%colon%%');
        var headerName = eachHeader.split(':')[0] ? eachHeader.split(':')[0].replace(/\%%colon%%/ig, ':') : '';
        var headerValue = splitLimit(eachHeader, ':', 2)[1] ? splitLimit(eachHeader, ':', 2)[1].replace(/^\s/ig, '') : '';
        var xhtml = html.replace(/{parseType}/ig, parseType);
            xhtml = xhtml.replace(/{key}/ig, lastKey + key + 1);
            xhtml = xhtml.replace(/{headerName}/ig, headerName);
            xhtml = xhtml.replace(/{headerValue}/ig, headerValue);
        jQuery(parentElement).find('.headers-container').parent().append(xhtml);
        
    });

});





/**
 * Add custom shortcode button into tab child post templates.
 *
 * @since   2.3.3
 */
function KDN_SITES_AddShortcodeButton(){

    // Define the CSS selector of custom shortcode button in tab child post.
    var tr_shortcode = '#tab-child-post .selector-custom-shortcode';

    // Reset HTML of custom shortcode button in tab child post templates.
    jQuery('#tab-child-post-templates .custom-short-code-container').html('');

    var child_shortcode_buttons = '';

    // Get each custom shortcode in tab child post and append it into tab child post templates.
    jQuery(tr_shortcode + ' .short-code').each(function(){

        var child_shortcode_name = jQuery(this).attr('value');
        if (child_shortcode_name) {
            child_shortcode_buttons += '<button class="button child-post-shortcode" type="button" data-shortcode-name="'+child_shortcode_name+'" data-clipboard-text="['+child_shortcode_name+']" data-toggle="tooltip" data-placement="top" title="" data-original-title="'+KDN_JS_LocalizeManages_URL.custom_shortcode + ' ' + child_shortcode_name+'">['+child_shortcode_name+']</button>';
            jQuery('#tab-child-post-templates .custom-short-code-container').html(child_shortcode_buttons);
        }

    });

}





/**
 * When click the custom shortcode buttons in tab child post templates.
 *
 * @since   2.3.3
 */
function KDN_SITES_ClickShortcodeButton(){

    // When click each custom shortcode button in tab child post templates.
    jQuery('button.child-post-shortcode').each(function(){

        // When hover to custom shortcode button, show the tooltip.
        jQuery(this).mouseover(function(){

            currentHTML             = jQuery(this).attr('data-clipboard-text');
            buttonWidth             = jQuery(this).width();
            toolTipPosition         = buttonWidth / 2;

            toolTipInner            = jQuery(this).attr('data-original-title');
            var toolTipContainer    = '<div class="tooltip fade top in">'+toolTipInner+'</div>';
            jQuery(this).html(currentHTML + toolTipContainer);

        });

        // When un-hover to custom shortcode button, remove the tooltip.
        jQuery(this).mouseout(function(){

            jQuery(this).html(currentHTML);

        });

        // When click to custom shortcode button, copy the shortcode.
        jQuery(this).click(function(event){

            jQuery(this).html(currentHTML + '<input type="text" value="'+currentHTML+'" id="child-post-shortcode"/>');
            jQuery('#child-post-shortcode').select();
            document.execCommand('copy');
            jQuery(this).html(currentHTML + '<div class="tooltip fade top in">'+(KDN_JS_LocalizeManages_URL.copied)+'</div>');
            event.stopPropagation();

        });

    });

}





/**
 * When click the "_active_recrawling_from_last_page" check box.
 *
 * @since   2.3.3
 */
jQuery('#_active_recrawling_from_last_page').click(function(){

    setTimeout(function(){

        KDN_SITES_DisablePostStopCrawlingFirstPage();

    }, 100);

});





/**
 * When click the "child_post" check box.
 *
 * @since   2.3.3
 */
jQuery('#_child_post').click(function(){

    KDN_SITES_DisablePostStopCrawlingFirstPage();

});





/**
 * Hide "#post_stop_crawling_first_page" when child post activated.
 *
 * @since   2.3.3
 */
function KDN_SITES_DisablePostStopCrawlingFirstPage(){

    // If the "_active_recrawling_from_last_page" check box is checked.
    if(jQuery('#_active_recrawling_from_last_page').prop('checked') == true){

        // If child post is activated, hide "#post_stop_crawling_first_page".
        if(jQuery('#_child_post').prop('checked') == true){

            jQuery('#post-stop-crawling-first-page').addClass('hidden');

        // Otherwise, show "#post_stop_crawling_first_page".
        } else {

            jQuery('#post-stop-crawling-first-page').removeClass('hidden');

        }

    }

}





/**
 * When click to "_post_stop_crawling_last_page" check box in both tab post and tab child post, sync the data.
 *
 * @since   2.3.3
 */
jQuery("#post-stop-crawling-last-page #_post_stop_crawling_last_page").change(function() {
    jQuery("#child-post-stop-crawling-last-page #_post_stop_crawling_last_page").prop("checked", this.checked);
});

jQuery("#child-post-stop-crawling-last-page #_post_stop_crawling_last_page").change(function() {
    jQuery("#post-stop-crawling-last-page #_post_stop_crawling_last_page").prop("checked", this.checked);
});





/**
 * Tab override.
 *
 * @since   2.3.3
 */
jQuery(document).delegate('textarea', 'keydown', function(e) {

    // Get keycode when press.
    var keyCode = e.keyCode || e.which;

    // If this is "tab" press, run tab override.
    if (keyCode == 9) {
        tabOverride.set(document.getElementsByTagName('textarea'));
        e.preventDefault();
    }

});