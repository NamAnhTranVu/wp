<div id="footer" class="footer">
<div class="container">
<div class="xs col-sm-5">
<strong><?php bloginfo('name'); ?></strong> - <a href="/" title="Đọc truyện online">Đọc truyện</a> online, <a href="/" title="Đọc truyện chữ">đọc truyện</a> chữ, <a href="/" title="Truyện hay">truyện hay</a>. Website luôn cập nhật những bộ <a href="/truyen-moi/" title="Truyện mới">truyện mới</a> thuộc các thể loại đặc sắc như <a href="/the-loai/tien-hiep/" title="Truyện tiên hiệp">truyện tiên hiệp</a>, <a href="/the-loai/kiem-hiep/" title="Truyện kiếm hiệp">truyện kiếm hiệp</a>, hay <a href="/the-loai/ngon-tinh/" title="Truyện ngôn tình">truyện ngôn tình</a> một cách nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính bảng.
<br />
<strong>Liên kết web</strong> -	<a href="/">Tuyển sinh đại học - học viện</a>, <a href="/">Tin tức tuyển sinh</a>, <a href="/">Tuyển sinh cao đẳng</a>, <a href="/">sữa tăng cân cho bé</a>, <a href="/">cao đẳng y dược hà nội</a>
</div>
<ul class="col-xs-12 col-sm-7 list-unstyled">
<li class="text-right pull-right">
<a href="<?php echo home_url(); ?>/contact/" title="Contact">Contact</a> - <a href="<?php echo home_url(); ?>/tos/" title="Terms of Service">ToS</a>
<a class="backtop" title="Back to top" href="#wrap" rel="nofollow" aria-label="Back to top"><span class="glyphicon glyphicon-upload"></span></a>
</li>
<li class="hidden-xs tag-list">
<?php
$args = array(
'orderby'       => 'DESC',
'post_type'     => 'post',
'showposts'     => 8,
'cache_results' => true
);
$my_query = new wp_query($args);
while($my_query->have_posts()){
$my_query->the_post();
?>
<a href="<?php the_permalink()?>" title="<?php the_permalink()?>">
<?php the_title('', '');?>
</a>
<?php }?>
</li>
</ul>
</div>
</div>
<?php if (is_post_type('chap')): ?>
<script>
function getCookie(d) {
d += "=";
for (var b = decodeURIComponent(document.cookie).split(";"), c = [], a = 0; a < b.length; a++) 0 == b[a].trim().indexOf(d) && (c = b[a].trim().split("="));
return 0 < c.length ? c[1] : "";
}
var js_bgcolor = getCookie("bgcolor-cookie"),
js_font = getCookie("font-cookie"),
js_size = getCookie("size-cookie"),
js_lineheight = getCookie("lineheight-cookie"),
js_hidenav = getCookie("hidenav-cookie"),
js_fluid_switch = getCookie("fluid-switch-cookie"),
js_onebreak_switch = getCookie("onebreak-switch-cookie"),
js_body_insert_class = "";
"" != js_bgcolor &&
"#F4F4F4" != js_bgcolor &&
((js_bgcolor = js_bgcolor.replace("#", "")), (js_body_insert_class = "232323" == js_bgcolor ? js_body_insert_class + " background-232323 dark-theme" : js_body_insert_class + (" background-" + js_bgcolor)));
1 == js_hidenav && (document.getElementById("body_chapter").className += " hidenav");
"" != js_size && (js_body_insert_class += " size-" + js_size);
"" != js_font && ((js_font = js_font.replace(/, serif|, sans-serif|'|s/g, "")), (js_body_insert_class += " font-" + js_font));
"" != js_lineheight && "180%" != js_lineheight && ((js_lineheight = js_lineheight.replace("%", "")), (js_body_insert_class += " lineheight-" + js_lineheight));
1 == js_fluid_switch && (js_body_insert_class += " container-fluid-switch");
document.getElementById("body_chapter").className += js_body_insert_class;
</script>
<script src="<?php bloginfo('template_url')?>/js/chapter.js"></script>
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url')?>/css/chapter.css" />
<?php else: ?>
<script>
function getCookie(d) {
d += "=";
for (var b = decodeURIComponent(document.cookie).split(";"), c = [], a = 0; a < b.length; a++) 0 == b[a].trim().indexOf(d) && (c = b[a].trim().split("="));
return 0 < c.length ? c[1] : "";
}
var js_bgcolor = getCookie("bgcolor-cookie");
"#232323" == js_bgcolor && (document.getElementsByTagName("body")[0].className += " dark-theme");
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
function reShowChapterText() {
$(".chapter-text").each(function (k, v) {
if (isMobile) {
var chapterText = $(this).html();
chapterText = chapterText.replace("Chapter ", "C");
chapterText = chapterText.replace("Volume ", "V");
$(this).html(chapterText);
}
});
}
reShowChapterText();
</script>
<?php endif; ?>
<?php if (is_home()): ?>
<script>
$(document).ready(function() {
var novels = $.cookie("novels_history");
if (novels) novels = JSON.parse(novels);
else novels = [];
if (novels.length > 0) {
novels = novels.slice(0, 5);

// Main
$novelHistory = $('#novel-history-main');
$novelHistory.append('<div class="title-list"><h2>Truyện đang đọc</h2></div>');
for (var i in novels) {
var novel = novels[i];
var html = '<div class="row"><div class="col-xs-7 col-sm-6 col-md-8 col-title-history"><span class="glyphicon glyphicon-chevron-right"></span>';
html += ' <h3 itemprop="name"><a href="'+novel.url+'">'+novel.name+'</a></h3></div>';
html += '<div class="col-xs-5 col-sm-6 col-md-4 text-info">';
html += '<a href="'+novel.chapter.url+'"><span class="chapter-text">'+novel.chapter.name+'</span></a></div>';
html += '</div></div>';
$novelHistory.append(html);
}

// Sidebar
$novelHistory = $('#novel-history-sidebar');
$novelHistory.append('<div class="title-list"><h2>Your novel reading</h2></div>');
for (var i in novels) {
var novel = novels[i];
var html = '<div class="row"><div class="col-md-5 col-lg-7"><span class="glyphicon glyphicon-chevron-right"></span>';
html += ' <h3 itemprop="name"><a href="'+novel.url+'">'+novel.name+'</a></h3></div>';
html += '<div class="col-md-7 col-lg-5 text-info">';
html += '<a href="'+novel.chapter.url+'"><span class="chapter-text">'+novel.chapter.name+'</span></a></div>';
html += '</div></div>';
$novelHistory.append(html);
}
}
});
</script>

<?php endif; ?>

<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v9.0" nonce="ttoYb9Ll"></script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-14DG12WN4Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-14DG12WN4Z');
</script>
<?php wp_footer(); ?>
</body>
</html>
