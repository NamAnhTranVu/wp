<?php
error_reporting(0);
//-----include file--------//
include_once('metabox.php');
include_once( dirname( __FILE__ ) . '/inc/ajax.php' );
include_once( dirname( __FILE__ ) . '/inc/post-type.php' );
//-----theme custom-------//

add_theme_support('post-thumbnails', array('post'));
//add_image_size('image', 180, 80, true);
//set_post_thumbnail_size( 215, 322, true );

add_filter('excerpt_length', 'custom_excerpt_length', 999 );
add_filter('wp_trim_excerpt', 'tw_excerpt_more' );
add_filter('parse_query', 'tw_add_filter');
add_filter('pre_get_posts', 'tw_search_filter');

add_action('wp_ajax_tw_ajax', 'tw_ajax');
add_action('wp_ajax_nopriv_tw_ajax', 'tw_ajax');

add_action('save_post', 'tw_save_post');
add_shortcode( 'userview', 'vnkings_check_user_login' );
function vnkings_check_user_login($atts, $content = null) {
    if( is_user_logged_in() ) {return '<p>' . $content . '</p>';}
    else {return "";}
}
// xóa bộ lọc của wordpress
remove_filter( 'the_title', 'wptexturize' );

// remove classic editor
add_filter('use_block_editor_for_post', '__return_false', 10);

// add_description Yoast SEO for Chapter
add_action( 'wpseo_register_extra_replacements', function() {
	wpseo_register_var_replacement( '%%title_story%%', 'add_description', 'advanced', 'Some help text' );
} );
function add_description() {
	if (is_singular('chap')) { 
		global $post;
		$desc = get_the_title($post->post_parent).' - '.get_the_title();
	}

	return $desc;
}
#one for JS mime-type
add_action( 'template_redirect', function(){
	ob_start( function( $buffer ){
		$buffer = str_replace( array( 'type="text/javascript"', "type='text/javascript'" ), '', $buffer );        
		return $buffer;
	});
});

#one for CSS-Mime-Type
add_action( 'template_redirect', function(){
	ob_start( function( $buffer ){
		$buffer = str_replace( array( 'type="text/css"', "type='text/css'" ), '', $buffer );        
		return $buffer;
	});
});

# REMOVE WP EMOJI
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

#Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css(){
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_dequeue_style( 'wc-block-style' );
}
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );

# Remove Wp-Embed
function my_deregister_scripts(){
	wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'my_deregister_scripts' );

# Remove EditURI
remove_action ('wp_head', 'rsd_link');

# Remove WordPress generator 
function crunchify_remove_version() {
	return '';
}
add_filter('the_generator', 'crunchify_remove_version');

# Remove wlwmanifest link
remove_action( 'wp_head', 'wlwmanifest_link');

#Remove api.w.org relation link
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
remove_action('template_redirect', 'rest_output_link_header', 11, 0);

#Remove dns-prefetch
add_filter( 'emoji_svg_url', '__return_false' );

# Add Post Meta
function add_post_meta_listlink( $post_id ) {
	if (  get_post_meta($post_id, 'tw_listlink', true) == '' ) {
		add_post_meta($post_id, 'tw_listlink', '', true);
	}
}
add_action('save_post', 'add_post_meta_listlink');
//-------function------//
function thumb_img($src,$h,$w,$q){ //lấy ảnh dùng link

	echo bloginfo('template_url');
	echo '/timthumb.php?src='.$src.'&amp;h='.$h.'&amp;w='.$w.'&amp;q='.$q; 
}

function add_query_vars_filter( $vars ){
	$vars[] = "status";
	return $vars;
}
add_filter( 'query_vars', 'add_query_vars_filter' );
function is_post_type($type){
	global $wp_query;
	if($type == get_post_type($wp_query->post->ID)) 
		return true;
	return false;
}
function bodyclass( ) {
	global $post;
	if (is_page('contact')):
		$classes = 'body_contact';
	elseif (is_post_type('chap')):
		$classes = 'body_chapter';
	elseif (is_single()):
		$classes = 'body_truyen';
	elseif (is_home()):
		$classes = 'body_home';
	elseif (is_category()):
		$classes = 'body_cat';
	elseif (is_tax('tac-gia')):
		$classes = 'body_author';
	elseif (is_search()):
		$classes = 'body_search';
	elseif (is_page()):
		$classes = 'body_list';
	endif;
	echo $classes;
}

function tw_show_post_type($query){
	if(!is_single() && !is_admin()){
		$post_type = array('post', 'truyen-ngan', 'page');
		$query->set('post_type', $post_type);
	}
	return $query;
}


function tw_search_filter( $query ) {

	if ( $query->is_search && $query->is_main_query() )
		$query->set('post_type', array('post', 'tac-gia', 'truyen-ngan'));
}


function tw_save_post($post_id){

	$chapterID = isset($_POST['tw_parent']) ? $_POST['tw_parent'] : false;
	if (!wp_is_post_revision($post_id) && $chapterID){
		remove_action('save_post', 'tw_save_post');
		$postdata = array(
			'ID' => $post_id,
			'post_parent' => $chapterID
		);
		wp_update_post( $postdata );
		add_action('save_post', 'tw_save_post');
	}
}


function tw_add_filter($query){

	global $pagenow;
	if (is_admin() && $pagenow == 'edit.php' && isset($_GET['parent_chap']) && $_GET['parent_chap'] != '') {
		$query->query_vars['post_parent'] = $_GET['parent_chap'];
	}
}

function tw_get_chap_option($id, $chap){

	$args = array(
		'post_type'      => 'chap',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'post_parent'    => $id,
		'order'          => 'ASC'
	);
	$wp_query = new wp_query($args);
	echo '<select class="btn btn-success btn-chapter-nav chapter_jump" onchange="window.location.href=this.value">';
	while($wp_query->have_posts()){
		$wp_query->the_post();
		$title = explode(':', mb_substr(get_the_title() ,0, 23, 'utf-8'));
		echo '<option value="'.get_the_permalink().'"';
		if($chap == get_the_ID()) echo 'selected';
		echo '>'.$title[0].'</option>';
	}
	echo '</select>';
}

function tw_get_next_chap($id){

	global $wpdb;
	$current_post_id = get_the_ID();
	$query = $wpdb->get_results("select * from  ".$wpdb->posts." where ID > '$current_post_id' AND post_type = 'chap' and post_parent = '$id' and post_status = 'publish' ORDER BY ID ASC LIMIT 1");
	if($query){
		foreach($query as $chap) {
			echo '<a class="btn btn-success btn-chapter-nav" id="next_chap" href="'.get_the_permalink($chap->ID).'">Next <span class="glyphicon glyphicon-chevron-right"></span></a>';
		}
	}
	else
		echo '<a class="btn btn-success btn-chapter-nav disabled" href="javascript:void(0)" title="There is no chapter"> Next <span class="glyphicon glyphicon-chevron-right"></span></a>';
}

function tw_get_prev_chap($id){

	global $wpdb;
	$current_post_id = get_the_ID();
	$query = $wpdb->get_results("select * from  ".$wpdb->posts." where ID < '$current_post_id' AND post_type = 'chap' and post_parent = '$id' and post_status = 'publish' ORDER BY ID DESC LIMIT 1");
	if($query){
		foreach($query as $chap) {
			echo '<a class="btn btn-success btn-chapter-nav" id="prev_chap" href="'.get_the_permalink($chap->ID).'"><span class="glyphicon glyphicon-chevron-left"></span> Prev</a>';
		}
	}
	else
		echo '<a class="btn btn-success btn-chapter-nav disabled" href="javascript:void(0)" title="There is no chapter"><span class="glyphicon glyphicon-chevron-left"></span> Prev</a>';
}
function count_full($id){
	$args = array(
		'post_type'      => 'chap',
		'post_status'    => 'publish',
		'post_parent'    => $id,
	);
	$count = new wp_query($args);
	echo 'Full - '.$count->found_posts.' chương';
}
function count_chap($id){
	$args = array(
		'post_type'      => 'chap',
		'post_status'    => 'publish',
		'post_parent'    => $id,
	);
	$count = new wp_query($args);
	echo '<span class="label label-success">'.$count->found_posts.' Chương</span>';
}

function limitphuong($value, $limit = 12, $end = '...')
{
    if (mb_strwidth($value, 'UTF-8') <= $limit) {
        return $value;
    }

    return rtrim(mb_strimwidth($value, 0, $limit, '', 'UTF-8')).$end;
}
function last_update($custom = false){

global $post;
$args = array(
'post_type'      => 'chap',
'post_status'    => 'publish',
'posts_per_page' => 1,
'post_parent'    => $post->ID,
'order'          => 'DESC'
);
$c_query = new wp_query($args);
if($c_query->have_posts()){
while($c_query->have_posts()){
$c_query->the_post();
$title = get_the_title();
if($custom){
echo $title;
}
else {
echo '<a title="'.get_the_title($post->post_parent).' - '.get_the_title().'" href="'.get_the_permalink().'"><span class="chapter-text">'.limitphuong($title).' </span></a>';
}
}
}
	else {
		echo 'Không có chương';
		unset($c_query);
	}
    //}
}

function timeago($id) {
	global $post;
	$date = get_the_time('G', $id);
	if (empty($date)) {
		return __('Pending Post');
	}
	$chunks = array(
		array(60 * 60 * 24 * 365, __('year'), __('year')),
		array(60 * 60 * 24 * 30, __('month'), __('tháng')),
		array(60 * 60 * 24 * 7, __('week'), __('tuần')),
		array(60 * 60 * 24, __('days'), __('ngày')),
		array(60 * 60, __('hours'), __('giờ')),
		array(60, __('minutes'), __('phút')),
		array(1, __('second'), __('giây'))
	);

	if (!is_numeric($date)) {
		$time_chunks = explode(':', str_replace(' ', ':', $date));
		$date_chunks = explode('-', str_replace(' ', '-', $date));
		$date = gmmktime((int) $time_chunks[1], (int) $time_chunks[2], (int) $time_chunks[3], (int) $date_chunks[1], (int) $date_chunks[2], (int) $date_chunks[0]);
	}

	$current_time = current_time('mysql', $gmt = 0);
	$newer_date = strtotime($current_time);

	$since = $newer_date - $date;

	if (0 > $since)
		return __('sometime');
	for ($i = 0, $j = count($chunks); $i < $j; $i++) {
		$seconds = $chunks[$i][0];

        // Finding the biggest chunk (if the chunk fits, break)
		if (( $count = floor($since / $seconds) ) != 0)
			break;
	}
    // Set output var
	$output = ( 1 == $count ) ? '1 ' . $chunks[$i][1] : $count . ' ' . $chunks[$i][2];

	if (!(int) trim($output)) {
		$output = '0 ' . __('second');
	}
	$output .= __(' trước');
	return $output;
}

function tw_ajax(){

	switch($_POST['type']){
		case 'pagination':
		chap_pagination(intval($_POST['id']), intval($_POST['page']));
		break;
		case 'list_chap':
		tw_get_chap_option($_POST['id'], $_POST['chap']);
		break;
		default:
		case 'raty':
		$id   = $_POST['id'];
		$rate = $_POST['score'];
		echo tw_update_rate($id, $rate);
		break;
	}
	die();
}


function tw_get_rate($postID){

	$count_key = 'tw_rate';
	$count     = get_post_meta($postID, $count_key, true);
	if($count == ''){
		delete_post_meta($postID, $count_key);
		add_post_meta($postID, $count_key, '0');
		return "10";
	}
	return $count;

}

function tw_get_total_rate($postID){

	$count_key = 'tw_total_rate';
	$count     = get_post_meta($postID, $count_key, true);
	if($count == ''){
		delete_post_meta($postID, $count_key);
		add_post_meta($postID, $count_key, '0');
		return "0";
	}
	return $count;

}

function tw_update_rate($postID, $rate) {

    //update rate
	$tw_rate = get_post_meta($postID, 'tw_rate', true);
	$tw_rate =  $tw_rate + $rate;
	update_post_meta($postID, 'tw_rate', $tw_rate);

    //update total rate
	$count     = get_post_meta($postID, 'tw_total_rate', true);
	$count++;
	update_post_meta($postID, 'tw_total_rate', $count);

	return json_encode(array('status' => 'success', 'rateCount' => $count, 'ratePoint' => ceil($tw_rate / $count)));
}


function tw_get_views($postID){

	$count_key = 'tw_views_post';
	$count     = get_post_meta($postID, $count_key, true);
	if($count == ''){
		delete_post_meta($postID, $count_key);
		add_post_meta($postID, $count_key, '0');
		return "0";
	}
	return $count;

}



function tw_views($postID) {

	$count_key = 'tw_views_post';
	$count     = get_post_meta($postID, $count_key, true);
	if($count == ''){
		$count = 0;
		delete_post_meta($postID, $count_key);
		add_post_meta($postID, $count_key, '0');
	}
	else
	{
		$count++;
		update_post_meta($postID, $count_key, $count);
	}
}

function tw_get_thumbnail(){
	$thumbnail_src = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'image');
	$domain = parse_url($thumbnail_src[0]);
	$img = str_replace($domain['host'], 'i0.wp.com/'.$domain['host'], $thumbnail_src);
	if($img)
		return $img[0];
	elseif(preg_match("/(http|https):\/\/[^\s]+(\.gif|\.jpg|\.jpeg|\.png)/is", $post->post_content, $thumb))
		return $thumb[0];
	else
		return get_bloginfo('template_url') . '/images/poster.jpg';
}

function custom_excerpt_length($length){

	return 40;

}

function tw_excerpt_more( $excerpt ) {

	return str_replace( '[...]', '...', $excerpt );

}

function chap_pagination($ID_parent, $page) {
	$chapnum = 50;
	$args = array(
		'post_type'      => 'chap',
		'post_status'    => 'publish',
		'posts_per_page' => $chapnum,
		'paged'          => $page,
		'post_parent'    => $ID_parent,
		'order'          => 'ASC'
	);
	$my_query = new wp_query($args);
	$html = '<div class="col-xs-12 col-sm-6 col-md-6"><ul class="list-chapter">';
	$i = 1;
	while($my_query->have_posts()){
		$my_query->the_post();
		if($i === 26)
			$html .= '</ul></div><div class="col-xs-12 col-sm-6 col-md-6"><ul class="list-chapter">';
		$html .= '<li>
		<span class="glyphicon glyphicon-certificate"></span>
		<a href="'.get_the_permalink().'" title="'.get_the_title($post->post_parent).' - '.get_the_title().'">
		<span class="chapter-text">'.get_the_title().'</span>
		</a>
		</li>';
		++$i;
	}
	$html .= '</ul></div>';
	$pagination = preg_replace("/href=\"(.+?)\"/is", 'href="#"', pagination(true, $my_query->max_num_pages, $page));
	echo json_encode(array('list_chap' => $html, 'pagination' => $pagination));
}



// PAGINATION
function pagination($return = false, $max = false, $paged = false) {

	global $wp_query;

	if($wp_query->max_num_pages <= 1 && !$max)
		return 'Trang không tồn tại<br/><br/>';
	if(!$paged)
		$paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
	$max   = (!$max) ? intval($wp_query->max_num_pages) : $max;
	$links[] = $paged;
	for($i = $paged; $i < $paged + 5; $i++){
		if($i <= $max && $i != $paged)
			$links[] = $i;
	}
	for($i = $paged; $i >= ($paged - 5);$i--){
		if($i >= 1 && $i != $paged)
			$links[] = $i;
	}
	$html = '<ul class="pagination pagination-sm">' . "\n";

	if ( ! in_array( 1, $links ) ) {
		$class = 1 == $paged ? ' class="active"' : '';
		$html .= '<li '.$class.'><a data-page="1" href="'.esc_url( get_pagenum_link( 1 ) ).'" title="1">Đầu</a></li>';

	}

	sort( $links );
	foreach ( (array) $links as $link ) {
		$class = $link == $paged ? ' class="active"' : '';
		$html .= '<li '.$class.'><a data-page="'.$link.'" href="'.esc_url( get_pagenum_link( $link ) ).'">'.$link.'</a></li>';
	}

	if ( ! in_array( $max, $links ) ) {
		$class = $paged == $max ? ' class="active"' : '';
		$html .= '<li '.$class.'><a data-page="'.$max.'" href="'.esc_url( get_pagenum_link( $max ) ).'" title="'.$max.'">Cuối</a></li>';
	}
	$html .= '<li class="dropup page-nav"><span href="javascript:void(0)" data-toggle="dropdown">Chọn trang <span class="caret"></span></span>
	<div class="dropdown-menu dropdown-menu-right" role="menu">
	<form action="." name="page_jump" id="page_jump" method="get">
	<div class="input-group">';
	if(is_category())
		$html .= '<input name="page_url" type="hidden" value="'.get_pagenum_link().'">';
	else
		$html .= '<input name="total-page" type="hidden" value="'.$max.'"><input name="page_url" type="hidden" value="'.get_pagenum_link().'">';
	$html .= '<input class="form-control" name="page" type="number" placeholder="Số trang..." value="">
	<span class="input-group-btn">
	<button class="btn btn-default" type="submit">Đi</button>
	</span>
	</div>
	</form>
	</div>
	</li>';
	$html .= '</ul>' . "\n";
	if($return)
		return $html;
	else
		echo $html;

}


function the_breadcrumb() {

	global $post;
	if (!is_home()) {
		echo '<ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">';
		echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="'.home_url().'" accesskey="1"><span class="glyphicon glyphicon-home"></span></a><a href="'.home_url().'" title="Đọc Truyện Hot Online" itemprop="item"><span itemprop="name">Home</span></a><meta itemprop="position" content="1" />';
		if (is_single() && $post->post_type != 'chap') {
			$categories = get_the_category();
			echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
			<a href="'.esc_url( get_category_link( $categories[0]->term_id ) ).'" title="'.esc_html( $categories[0]->name ).'" itemprop="item"><span itemprop="name">'.esc_html( $categories[0]->name ).'</span></a>
			<meta itemprop="position" content="2" />
			</li>';
			echo '<li class="active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
			<h1><a href="'.get_the_permalink().'" title="'.esc_html( get_the_title() ).'" itemprop="item"><span itemprop="name">'.esc_html( get_the_title() ).'</span></a></h1>
			<meta itemprop="position" content="3" />
			</li>';
		}
		elseif (is_category()) {
			$cat = get_category(get_query_var('cat'), false);
			echo '<li class="active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
			<h1><a href="'.home_url().'/the-loai/'.$cat->slug.'/" title="'.esc_html( $cat->name ).'" itemprop="item"><span itemprop="name">'.esc_html( $cat->name ).'</span></a></h1>
			<meta itemprop="position" content="2" />
			</li>';
		}
		elseif($post->post_type == 'chap' && !is_search()){
			$id_parent = $post->post_parent;
			$parent    = get_post($id_parent);
			$title     = $parent->post_title;
			echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
			<a href="'.get_permalink($parent).'" title="'.esc_html( get_post($post->post_parent)->post_title ).'" itemprop="item"><span itemprop="name">'.esc_html( get_post($post->post_parent)->post_title ).'</span></a>
			<meta itemprop="position" content="2" />
			</li>';
			echo '<li class="active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
			<h1><a href="'.home_url('/').get_post($post->post_parent)->post_name.'/'.$post->post_name.'.html" title="'.esc_html( $post->post_title ).'" itemprop="item"><span itemprop="name">'.esc_html( $post->post_title ).'</span></a></h1>
			<meta itemprop="position" content="3" />
			</li>';
		}
		elseif (is_page()) {
			echo '<li class="active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
			<h1><a href="'.get_the_permalink().'" title="'.esc_html( get_the_title() ).'" itemprop="item"><span itemprop="name">'.esc_html( get_the_title() ).'</span></a></h1>
			<meta itemprop="position" content="2" />
			</li>';

		}
		elseif (is_search()) {
			global $s;
			echo '<li class="active" itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><h1><a href="'.home_url('/').'?s='.urlencode($s).'" title="Tìm kiếm '.$s.'" itemprop="url"><span itemprop="title">Tìm kiếm: '.$s.'</span></a></h1></li>';
		}elseif (is_tax('tac-gia')) {
			echo '<li class="active" itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem"><h1><a href="'.home_url('/').'tac-gia/'.single_term_title('', false).'/" title="'.single_term_title('', false).'" itemprop="item"><span itemprop="name">'.single_term_title('', false).'</span></a></h1><meta itemprop="position" content="2"></li>';
		}
		echo '</ol>';
	}
	else
		echo 'Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp đầy đủ và cập nhật liên tục.';
}


//rewrite url
add_filter('post_type_link', 'tw_rewrite_chapter_link', 1, 3);
add_action('init', 'tw_add_new_rules');
function tw_rewrite_chapter_link($link, $post = 0){
    if($post->post_type == 'chap') {
        $parents = get_post_ancestors($post->ID);
        $parent_id = ($parents) ? $parents[count($parents) - 1] : 0;
        $parent = get_post($parent_id);
        $newlink = $parent->post_name . '/' . $post->post_name . '.html';
        return home_url($newlink);
    } else {
        return $link;
    }
}

function wpb_change_search_url() {
    if ( is_search() && ! empty( $_GET['s'] ) ) {
        wp_redirect( home_url( "/search/" ) . urlencode( get_query_var( 's' ) ) );
        exit();
    }   
}
add_action( 'template_redirect', 'wpb_change_search_url' );

function tw_add_new_rules() {
	add_rewrite_rule('^tac-gia/([^/]+)$','index.php?tac-gia=$matches[1]', 'top');
	add_rewrite_rule('([^/]+)/([^/]+).html$','index.php?post_type=chap&name=$matches[2]', 'top');
	flush_rewrite_rules();
}
?>
