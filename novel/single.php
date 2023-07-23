<?php get_header(); ?>
<?php if(have_posts()):?>
<?php while (have_posts()):?>
<?php
the_post();
$ID_parent = get_the_ID();
tw_views($ID_parent);

$total_rate = tw_get_total_rate(get_the_ID());
if($total_rate == 0)
$rate = 10;
else
$rate = round((tw_get_rate(get_the_ID())/$total_rate), 1);

?>
<input id="id_post" type="hidden" value="<?php echo $ID_parent?>">
<div class="container csstransforms3d" id="truyen">
<div class="col-xs-12 col-sm-12 col-md-9 col-truyen-main">
<div class="col-xs-12 col-info-desc" itemscope="" itemtype="https://schema.org/Book">
<div class="title-list book-intro"><h2>Thông tin truyện</h2></div>
<h3 class="title" itemprop="name"><?php the_title(); ?> <?php echo do_shortcode( '[userview]'.$ID_parent.'[/userview]' ); ?></h3>
<div class="col-xs-12 col-sm-4 col-md-4 info-holder">
<div class="books">
<div class="book">
<img src="<?php echo thumb_img(tw_get_thumbnail(),322,215,100) ; ?>" alt="<?php the_title(); ?>" itemprop="image" />
</div>
</div>
<div class="info">
<div>
<h3><span class="glyphicon glyphicon-user"></span>&nbsp;Tác giả:</h3>
<?php $author = get_the_terms($post->ID, 'tac-gia'); ?>
<?php if ($author): ?>
<?php $out = array(); ?>
<?php foreach ($author as $authors): ?>
<?php
$out[] = ' <a itemprop="author" href="'.get_site_url().'/tac-gia/'.$authors->slug.'" title="'.$authors->name.'">'.$authors->name.'</a>';
?>
<?php endforeach; ?>
<?php echo implode(',', $out ); ?>
<?php endif; ?>
</div>
<div>
<h3><span class="glyphicon glyphicon-tag"></span>&nbsp;Thể loại:</h3>
<?php
$categories = get_the_category();
$genres = array();
foreach( $categories as $category ) {
$genres[] = ' <a itemprop="genre" href="'.esc_url( get_category_link( $category->term_id ) ).'" title="'.esc_html( $category->name ).'">'.esc_html( $category->name ).'</a>';
};
echo implode(',', $genres );
?>
</div>
<?php $nguon = get_the_terms($post->ID, 'nguon'); ?>
<?php if ($nguon): ?>
<div>
<h3><span class="glyphicon glyphicon-book"></span>&nbsp; Nguồn:</h3>
<?php  foreach ($nguon as $ten): ?>
<span class="source"><?php echo $ten->name; ?></span>
<?php endforeach; ?>
</div>
<?php endif; ?>

<div>
<h3><span class="glyphicon glyphicon-info-sign"></span>&nbsp;Tình trạng:</h3>
<?php if( get_post_meta($post->ID,'tw_status',true) == 'Full' ) : ?>
<span class="label label-success">Hoàn thành</span>
<?php elseif( get_post_meta($post->ID,'tw_status',true) == 'Đang ra' ): ?>
<span class="label label-info">Đang tiến hành</span>
<?php elseif( get_post_meta($post->ID,'tw_status',true) == 'Drop' ): ?>
<span class="label label-info">Tạm ngưng</span>
<?php endif; ?>

<?php if( get_post_meta($post->ID,'tw_loai',true) == 'Convert' ): ?>
<span class="label label-info">Convert</span>

<?php endif; ?>
<?php count_chap($post->ID); ?>
</div>



</div>
</div>
<div class="col-xs-12 col-sm-8 col-md-8 desc">
<div class="rate">
<div class="rate-holder" data-score="<?php echo $rate?>" style="cursor: pointer;">
</div>
<em class="rate-text"></em>
<div class="small" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
<em>
Đánh giá:
<strong>
<span itemprop="ratingValue"><?php echo $rate?></span>
</strong>
/<span class="text-muted" itemprop="bestRating">10</span> từ
<strong>
<span itemprop="ratingCount"><?php echo $total_rate?></span> lượt
</strong>
</em>
</div>
</div>

<div id="gioi-thieu-truyen" class="desc-text desc-text-full" itemprop="description">
<?php the_content(); ?>
</div>

<div class="showmore"><a class="btn btn-default btn-xs hide" href="javascript:void(0)" title="See more">Xem thêm »</a></div>



<br/>

<div class="group-gt">
<a class="btn btn-danger btn-block btn-style-1 btn-border" href="#gioi-thieu-truyen">Giới Thiệu</a>
<a class="btn btn-danger btn-block btn-style-1 btn-border" href="#danh-sach-chuong">Danh Sách Chương</a>
<a class="btn btn-danger btn-block btn-style-1 btn-border" href="#binh-luan">Bình Luận</a>
</div>
<div class="group-buttons">	<?php
$data = array(
'post_type'      => 'chap',
'post_status'    => 'publish',
'ignore_sticky_posts' => -1,
'posts_per_page' => 1,
'post_parent'    => $ID_parent,
'orderby'        => 'modified',
'orderby'          => array( 'meta_value_num' => 'ASC', 'ID' => 'ASC' )
);
$doctudau = new wp_query($data);
while($doctudau->have_posts()){
$doctudau->the_post();
?>
<?php
if(preg_match('#Chapter#', get_the_title())){
$tach = explode('Chapter', get_the_title());
$chapter_name = 'Chapter ';
$name_extend = $tach[1];
}else{
$chapter_name = $title;
$name_extend = '';
}?>
<a href="<?php the_permalink()?>" class="btn btn-danger btn-block btn-style btn-border"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;&nbsp;ĐỌC TỪ ĐẦU</a>
<?php }?></div>


<div class="l-chapter">
<div class="l-title"><h3>Chương mới nhất</h3></div>
<ul class="l-chapters">
<?php
$args = array(
'post_type'      => 'chap',
'post_status'    => 'publish',
'ignore_sticky_posts' => -1,
'posts_per_page' => 5,
'post_parent'    => $ID_parent,
'orderby'        => 'modified',
'orderby'          => array( 'meta_value_num' => 'DESC', 'ID' => 'DESC' )
);
$last_query = new wp_query($args);
while($last_query->have_posts()){
$last_query->the_post();
?>
<?php
if(preg_match('#Chapter#', get_the_title())){
$tach = explode('Chapter', get_the_title());
$chapter_name = 'Chapter ';
$name_extend = $tach[1];
}else{
$chapter_name = $title;
$name_extend = '';
}?>
<li>
<span class="glyphicon glyphicon-certificate"></span>
<a href="<?php the_permalink()?>" title="<?php the_title()?>">
<span class="chapter-text"><?php the_title(); ?></span>
</a>
</li>
<?php }?>
</ul>
</div>
</div>
</div>
<div class="col-xs-12" id="list-chapter">

						<div id="danh-sach-chuong" class="title-list"><h2>Danh sách chương</h2></div>
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6">
								<ul class="list-chapter">
									<?php
									$args = array(
										'post_type'      => 'chap',
										'post_status'    => 'publish',
										'posts_per_page' => 50,
										'post_parent'    => $ID_parent,
										'orderby'          =>  array( 'meta_value_num' => 'ASC', 'ID' => 'ASC' )
									);
									$wp_query = new wp_query($args);
									$i = 1;
									while($wp_query->have_posts()):
										$wp_query->the_post(); ?>
										<li>
											<span class="glyphicon glyphicon-certificate"></span>
											<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
												<span class="chapter-text"><?php the_title(); ?></span>
											</a>
										</li>
										<?php ++$i?>
										<?php if($i == 26):?>
										</ul>
									</div>
									<div class="col-xs-12 col-sm-6 col-md-6">
										<ul class="list-chapter">
										<?php endif;?>
									<?php endwhile; ?>
								</ul>
							</div>
						</div>
						<div id="pagination"><?php pagination()?></div>
						<?php wp_reset_query();?>
					</div>
<div id="binh-luan" class="col-xs-12 comment-box">
<div class="title-list"><h2>Bình luận</h2></div>
<div class="col-xs-12">
<div class="row" id="fb-comment-story">
<div id="fb-comments" class="fb-comments" data-href="<?php echo get_the_permalink($story)?>" style="width: 100%;" data-width="100%" data-order-by="reverse_time" data-numposts="10"></div>
</div>
</div>
</div>
</div>
<div class="visible-md-block visible-lg-block col-md-3 text-center col-truyen-side">
<?php if( has_term($ID_parent, 'tac-gia')): ?>
<div class="list list-truyen col-xs-12">
<div class="title-list"><h4>Cùng tác giả</h4></div>
<?php
$term = get_the_terms(get_the_ID(), 'tac-gia');
foreach($term as $t){
$search = $t->slug;
}
$args = array(
'post_type'      => 'post',
'post_status'    => 'publish',
'posts_per_page' => 10,
'post__not_in'   => array($ID_parent),
'order'          => 'rand',
'tax_query'      => array(
array(
'taxonomy' => 'tac-gia',
'field' => 'slug',
'terms' => $search
)
),
);
$list = new wp_query($args);
?>
<?php while($list->have_posts()):?>
<?php
$list->the_post();
?>
<div class="row">
<div class="col-xs-12">
<span class="glyphicon glyphicon-chevron-right"></span>
<h3><a href="<?php the_permalink()?>" title="<?php the_title()?>"><?php the_title()?></a></h3>
</div>
</div>
<?php endwhile;?>
</div>
<?php endif; ?>
<?php get_sidebar(); ?>
</div>
</div>
<?php endwhile;?>
<?php endif;?>
</div>
<style>
.group-buttons {
display: flex;
justify-content: space-between;
margin: 0 0 10px;
}
.btn.btn-style {
-webkit-box-shadow: 0 3px 4px 0 #ced9d9;
-moz-box-shadow: 0 3px 4px 0 #ced9d9;
box-shadow: 0 3px 4px 0 #ced9d9;
color: #fff;
background-color: #9f251e;
border-color: #94221c;
-webkit-box-align: center!important;
-webkit-align-items: center!important;
-moz-box-align: center!important;
-ms-flex-align: center!important;
align-items: center!important;
}
.btn.btn-style-1 {
-webkit-box-shadow: 0 3px 4px 0 #ced9d9;
-moz-box-shadow: 0 3px 4px 0 #ced9d9;
box-shadow: 0 3px 4px 0 #ced9d9;
color: #222;
border-color: #bdbbba;
-webkit-box-align: center!important;
-webkit-align-items: center!important;
-moz-box-align: center!important;
-ms-flex-align: center!important;
align-items: center!important;
margin-top: 0!important;
}
.group-buttons .btn {
padding: 12px 10px;
}
.btn-border {
border-radius: 30px;
}
.btn {
display: inline-block;
margin-bottom: 0;
font-weight: 400;
text-align: center;
vertical-align: middle;
-ms-touch-action: manipulation;
touch-action: manipulation;
background-image: none;
border: 1px solid transparent;
white-space: nowrap;
padding: 6px 12px;
font-size: 14px;
line-height: 1.42857143;
}
.btn-block {
display: block;
width: 100%;
background-color: #fff;
}
.btn-danger {
background-color: #ddd;
border-color: #d43f3a;
}
.group-gt {
font-family: roboto;
font-weight: bold;
border-radius: 90px;
margin:0 0 10px;
margin-top: 10px;
display: flex;
justify-content: space-between;
}
.group-gt .btn {
border-radius: 30px;
}
</style>
<?php get_footer(); ?>
