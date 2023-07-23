/**
 * Change number plugin update count.
 *
 * @since   2.3.3
 */
jQuery(document).ready(function() {

    if (KDN_JS_LocalizeUpdate.update_count > 0) {
        var updateCount = jQuery('#menu-plugins span.plugin-count').html();
        jQuery('#menu-plugins span.plugin-count').html(KDN_JS_LocalizeUpdate.update_count * 1 + updateCount * 1);
        jQuery('#menu-plugins span.update-plugins').removeClass('count-0');
    }

});





/**
 * When click "Update" button, download the plugin package.
 *
 * @since   2.3.3
 */
function KDN_Update() {

    // Hide the "Update" button.
    jQuery('#update_btn').hide();

    // Append "Downloading plugin package..." text.
    jQuery('#update_info').html('<p>' + KDN_JS_LocalizeUpdate.message_01 + '</p>');

    // Send a request.
    jQuery.ajax({
        type        : "POST",
        dataType    : "JSON",
        url         : KDN_JS_Localize.ajax_url,
        data        : {
            action      : "update_download",
            wp_nonce    : KDN_JS_Localize.wp_nonce
        },

        // When request successfully.
        success: function(response) {

            // If finish download plugin package, append text and extract it.
            if(response.success == true) {

                // Append "Plugin package was downloaded." text.
                jQuery('#update_info').append('<p>' + response.data + '</p>');

                // Extract plugin package after 2s.
                setTimeout(function(){
                    KDN_Extract();
                }, 2000);

            // Otherwise, Append the fail text.
            } else {

                // Append "Cannot download the plugin package." text.
                jQuery('#update_info').append('<p>' + response.data + '</p>');

                // Append "An error occurred when updating plugin. Please try again!" text after 2s.
                setTimeout(function(){
                    jQuery('#update_info').append('<p>' + KDN_JS_LocalizeUpdate.message_03 + '</p>');
                }, 2000);

            }

        },

        // When request failed.
        error: function() {

            // Alert a message is "An error was occurred!".
            alert(KDN_JS_LocalizeUpdate.message_04);

            // Reload current page.
            window.location.href = '';

        }

    });

}





/**
 * Extract the plugin package.
 *
 * @since   2.3.3
 */
function KDN_Extract() {

    // Append "Extracting plugin package..." text.
    jQuery('#update_info').append('<p>' + KDN_JS_LocalizeUpdate.message_02 + '</p>');

    // Send a request.
    jQuery.ajax({
        type        : "POST",
        dataType    : "JSON",
        url         : KDN_JS_Localize.ajax_url,
        data        : {
            action      : "update_extract",
            wp_nonce    : KDN_JS_Localize.wp_nonce
        },

        // When request successfully.
        success: function(response) {

            // If finish extract plugin package, append text and go to dashboard.
            if(response.success == true) {

                // Append "Plugin package was extracted." text.
                jQuery('#update_info').append('<p>' + response.data + '</p>');

                // Append texts and go to dashboard.
                setTimeout(function(){

                    // Append "Plugin updated successfully!" text.
                    jQuery('#update_info').append('<p>' + KDN_JS_LocalizeUpdate.message_05 + '</p>');

                    // Append "If this page not redirect automatically, please click here!" text.
                    jQuery('#update_info').append('<p>' + KDN_JS_LocalizeUpdate.message_06 + '</p>');

                    // Redirect to dashboard after 4s.
                    setTimeout(function(){
                        window.location.href = KDN_JS_Localize.dashboard_url;
                    }, 2000);

                }, 2000);

            // Otherwise, Append the fail text.
            } else {

                // Append "Cannot extract the plugin package." text.
                jQuery('#update_info').append('<p>' + response.data + '</p>');

                // Append "An error occurred when updating plugin. Please try again!" text after 2s.
                setTimeout(function(){
                    jQuery('#update_info').append('<p>' + KDN_JS_LocalizeUpdate.message_03 + '</p>');
                }, 2000);

            }

        },

        // When request failed.
        error: function() {

            // Alert a message is "An error was occurred!".
            alert(KDN_JS_LocalizeUpdate.message_04);

            // Reload current page.
            window.location.href = '';

        }

    });
    
}