<?php
include 'func.php';
$parent  	= $_POST['id'];
$title      = $_POST['title'];
$link	    = $_POST['link'];
$content	= $_POST['content'];

//insert new chap
$id      = insert_chap($title, $content, $title, $parent);
if($id)
	echo '<span style="color:green;font-style:bold;">√</span>';
else
	echo '<span style="color:red;font-style:bold;">×</span>';

//query lấy list chap cũ
$query = $wpdb->get_row("SELECT meta_value FROM wp_postmeta WHERE post_id = '".$parent."' AND meta_key = 'tw_listlink'");
$arrChapCu	= explode(",", $query->meta_value);

//them link moi vao list chap
$arrChapCu[]	= md5($link); 
$rez = $wpdb->query("UPDATE wp_postmeta"
	." SET meta_value= '".implode(",", $arrChapCu)."'"
	." WHERE post_id =".$parent
	." AND meta_key = 'tw_listlink'"
);
echo "success";