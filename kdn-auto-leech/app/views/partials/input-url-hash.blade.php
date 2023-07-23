<?php

$isSiteSetting = isset($postId) && $postId;
$data = $isSiteSetting ? get_post_meta($postId, '_kdn_site_query_params', true) : $_GET;

?>

<input type="hidden" name="url_hash" @if($data && isset($data["url_hash"]) && $data["url_hash"]) value="{{ $data["url_hash"] }}" @endif>

<?php

// Delete the post meta after we are done with it. By this way, we will avoid unwanted tab activations. For example,
// the user won't be seeing a tab activation when he/she opens the site setting by clicking a site link in site list.
// By doing this, we ensure that the tab activation will be done only after the settings are updated.
if($isSiteSetting && $data) delete_post_meta($postId, '_kdn_site_query_params');

?>