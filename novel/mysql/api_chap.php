<?php
include '../wp-config.php';
global $wpdb;
$server = $_GET['server'];
/*$result	= array();
$query = $wpdb->get_results("SELECT ID,post_excerpt FROM wp_posts where post_status = 'publish' and post_type = 'wp-manga' order by ID");
*/
$term_args = array( 'taxonomy' => 'server' );
$terms = get_terms( $term_args );
$term_ids = array();
//var_dump($terms);
foreach( $terms as $term ) {
	if( $term->name === $server ) {
        // push the ID into the array
		$term_ids[] = $term->term_id;
	}
}
// Loop Args
$args = get_posts(
	array(
		'post_status' => 'publish',
		'post_type' => 'post',
		'posts_per_page' => -1,
		'tax_query' => array(
			array(
				'taxonomy' => 'server',
				'terms'    => $term_ids,
			),
		),
	)
);
$i = 0;
foreach ($args as $row) {
	//$result[$i]['id']	= $row->ID;
	if (get_post_meta($row->ID, 'tw_status', true) === 'OnGoing') {
		$result[$i]['id_post']	= $row->ID;
		$result[$i]['source']	= get_post_meta($row->ID, 'tw_source', true); 
		$result[$i]['list_link']= get_post_meta($row->ID, 'tw_listlink', true); 
		$i++;
	}
}
echo json_encode($result);