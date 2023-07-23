<?php
class tw_metabox {

public function __construct() {
add_action('add_meta_boxes', array($this, 'add_meta_boxes'));
add_action('save_post', array($this, 'save_meta_boxes'));
}

public function add_meta_boxes() {
$this->add_meta_box('form', 'Custom chapter', 'post');
$this->add_meta_box('form2', 'Custom chapter', 'chap');
}

public function add_meta_box($id, $label, $post_type) {
add_meta_box(
'tw_' . $id,
$label,
array($this, $id),
$post_type
);
}

public function save_meta_boxes($post_id)
{
if(defined( 'DOING_AUTOSAVE') && DOING_AUTOSAVE) {
return;
}

foreach($_POST as $key => $value) {
if(strstr($key, 'tw_')) {
update_post_meta($post_id, $key, $value);
}
}
}
public function form() {

global $post;
$tw_multi_chap = get_post_meta($post->ID, 'tw_multi_chap', true);
$tw_status = get_post_meta($post->ID, 'tw_status', true);
$tw_loai = get_post_meta($post->ID, 'tw_loai', true);
echo'<div class="tw_custom">
<input type="checkbox" name="tw_multi_chap" value="1" ';

if($tw_multi_chap == 1)
echo 'checked="checked"';
echo'> Truyện nhiều tập<br/>';
echo '<b>Tình Trạng</b> : <select name="tw_status">';
if($tw_status == 'Full')
echo '<option selected="selected">Full</option><option>Đang ra</option>';
else
echo '<option>Full</option><option selected="selected">Đang ra</option>';

if($tw_status == 'Drop')
echo '<option selected="selected">Drop</option>';
else
echo '<option>Drop</option>';
echo '</select><br/>';




echo '<b>Loại truyện</b> : <select name="tw_loai">';
if($tw_loai == 'Dịch')
echo '<option>Dịch</option><option selected="selected">Dịch</option>';
else
echo '<option>Convert</option><option selected="selected">Dịch</option>';
echo '</select><br/>';

if($tw_multi_chap == 1){
echo '<a href="post-new.php?post_type=chap&id_story='.$post->ID.'" class="button button-primary button-large">Thêm</a>';
echo '<span style="float:right;"><a href="edit.php?post_type=chap&parent_chap='.$post->ID.'" class="button button-primary button-large">Danh sách</a></span>';
}
echo '</div>';

}


public function form2() {

$id_story = abs(intval($_GET['id_story']));
if($id_story == 0){
global $post;
$id_story = $post->post_parent;
}
$story = get_post($id_story);
echo '<div class="tw_custom">';
echo '<input type="hidden" name="tw_parent" value="'.$id_story.'"/>';
echo '<b>Bài viết chính</b> : <a href="/?p='.$id_story.'" target="_blank"><span style="color:green;font-style:bold;">'.$story->post_title.'</span> </a> <a style="margin-left:10px;" class="button button-small" href="post.php?post='.$id_story.'&action=edit"> Chỉnh sửa</a>';
echo '</div>';
echo '<a href="post-new.php?post_type=chap&id_story='.$id_story.'" class="button button-primary button-large">Thêm</a>';
echo '<span style="float:right;"><a href="edit.php?post_type=chap&parent_chap='.$id_story.'" class="button button-primary button-large">Danh sách</a></span>';
?>
<script>
var parent = "<?php echo $story->post_title?>";
document.getElementById('title').addEventListener('keyup', tw_set_slug_chap, false);
function tw_set_slug_chap(){
var tw_url = document.getElementById('title').value;
document.getElementById('post_name').value = parent + "-" + tw_url;
}
</script>
<?php
}

}

$metaboxes = new tw_metabox;
?>
