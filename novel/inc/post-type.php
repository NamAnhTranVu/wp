<?php 
add_action('init', 'tw_chap_post_type', 0);
add_action('init', 'tw_add_author', 0);
add_action('init', 'tw_add_nguon', 0);
add_action('init', 'tw_add_prefix', 0);
add_action('init', 'error_report_type', 0);
// register nguồn
function tw_add_nguon(){

	$args = array(
		'labels'            => array(
			'name'      => 'Nguồn',
			'singular'  => 'Nguồn',
			'menu-name' => 'Nguồn',
			'all_items' => 'Tất cả nguồn',
			'edit_item' => 'Chỉnh sửa nguồn',
			'view_item' => 'Xem nguồn',
			'add_new_item' => 'Thêm nguồn',
			'new_item_name' => 'Tên nguồn',
			'parent_item' => 'Nguồn cha',
			'search_items' => 'Tìm nguồn',
			'popular_items' => 'Nguồn phổ biến',
			'separate_items_with_commas' => 'Phân tách các nguồn bằng dấu phẩy.',
			'add_or_remove_items' => 'Thêm hoặc xóa nguồn',
			'choose_from_most_used' => 'Chọn nguồn dùng nhiều nhất'
		),

		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_tagcloud'     => true,
		'show_in_nav_menus' => true
	);

	register_taxonomy('nguon',array('post'), $args);

}
// register tien to
function tw_add_prefix(){

	$args = array(
		'labels'            => array(
			'name'      => 'Tiền tố',
			'singular'  => 'Tiền tố',
			'menu-name' => 'Tiền tố',
			'all_items' => 'Tất cả tiền tố',
			'edit_item' => 'Chỉnh sửa tiền tố',
			'view_item' => 'Xem tiền tố',
			'add_new_item' => 'Thêm tiền tố',
			'new_item_name' => 'Tên tiền tố',
			'parent_item' => 'Tiền tố cha',
			'search_items' => 'Tìm tiền tố',
			'popular_items' => 'Tiền tố phổ biến',
			'separate_items_with_commas' => 'Phân tách các tiền tố bằng dấu phẩy.',
			'add_or_remove_items' => 'Thêm hoặc xóa tiền tố',
			'choose_from_most_used' => 'Chọn tiền tố dùng nhiều nhất'
		),

		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_tagcloud'     => true,
		'show_in_nav_menus' => true
	);

	register_taxonomy('tien_to',array('post'), $args);

}
// register error type
function error_report_type(){

	$label = array(
		'name' => 'Báo lỗi',
		'singular_name' => 'Báo lỗi',
		'add_new' => 'Thêm báo lỗi',
		'add_new_item' => 'Thêm báo lỗi mới',
		'edit_item' => 'Chỉnh sửa báo lỗi',
		'new_item' => 'Báo lỗi',
		'view_item' => 'Xem báo lỗi',
		'search_items' => 'Tìm báo lỗi',
		'not_found' => 'Không có báo lỗi nào',
		'not_found_in_trash' => 'Không có báo lỗi nào trong thùng rác',
		'all_items' => 'Tất cả báo lỗi',
		'menu_name' => 'Báo lỗi',
		'name_admin_bar' => 'Báo lỗi',
	);

	$args = array(
		'labels'              => $label,
		'description'         => 'Tất cả báo lỗi',
		'supports'            => array( 'title', 'editor', 'parent', 'revisions', 'thumbnail',
	),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true, 
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true, 
		'show_in_admin_bar'   => true,
		'menu_position'       => 3, 
		'menu_icon'           => 'dashicons-warning', 
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post'
	);

	register_post_type('error_report', $args);

}
// register chapter post
function tw_chap_post_type(){

	$label = array(
		'name' => 'Chapter', 
		'singular_name' => 'Chapter'
	);

	$args = array(
		'labels'              => $label,
		'description'         => 'All chap',
		'supports'            => array( 'title', 'editor', 'parent', 'revisions', 'thumbnail',
	),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true, 
		'show_in_menu'        => false,
		'show_in_nav_menus'   => true, 
		'show_in_admin_bar'   => true,
		'menu_position'       => 5, 
		'menu_icon'           => '', 
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post'
	);

	register_post_type('chap', $args);

}

function tw_add_author(){

	$args = array(
		'labels'            => array(
			'name'      => 'Tác giả',
			'singular'  => 'Tác giả',
			'menu-name' => 'Tác giả'
		),
		'hierarchical'      => false,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_tagcloud'     => true,
		'show_in_nav_menus' => true,
		'rewrite'           => array( 'slug' => 'tac-gia' )
	);

	register_taxonomy('tac-gia', 'post', $args);

}
?>