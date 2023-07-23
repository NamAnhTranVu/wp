<?php get_header(); ?>
<div class="container" id="intro-index">
<div class="title-list">
<h2><a href="<?php echo home_url(); ?>/truyen-hot/" title="Truyện Hot">Truyện Hot</a></h2>
<a href="<?php echo home_url(); ?>/truyen-hot/" title="Truyện Hot"><span class="glyphicon glyphicon-fire"></span></a>
<select id="hot-select" class="form-control new-select" aria-label="Select Genres">
<option value="all">Tất cả</option>
<?php
$terms = get_terms( 'category', array( 'hide_empty' => false ) );
foreach( $terms as $term ) {
?>
<option value="<?php echo $term->term_id; ?>"><?php echo $term->name; ?></option>
<?php
}
?>
</select>
</div>

<div class="index-intro">
<?php
$args = array(
'post_type' => 'post',
'showposts' => 13,
'orderby'    => 'meta_value_num',
'meta_key'  => 'tw_views_post',
);
$i = 1;
$wp_query = new wp_query($args);
?>
<?php while($wp_query->have_posts()):?>
<?php $wp_query->the_post();?>
<?php if ($i === 1) : ?>
<div class="item top-<?php echo $i; ?>" itemscope itemtype="https://schema.org/Book">
<?php else: ?>
<div class="item top-<?php echo $i; ?>" itemscope itemtype="https://schema.org/Book">
<?php endif; ?>
<a href="<?php the_permalink(); ?>" itemprop="url">

<?php if( get_post_meta($post->ID,'tw_status',true) == 'Full' ) : ?>
<span class="full-label"></span>
<?php endif; ?>
<?php if ($i === 1) : ?>
<img src="<?php echo thumb_img(tw_get_thumbnail(),396,265,100) ; ?>" alt="<?php the_title(); ?>" class="img-responsive item-img" itemprop="image" />
<?php else: ?>
<img src="<?php echo thumb_img(tw_get_thumbnail(),192,129,100) ; ?>" alt="<?php the_title(); ?>" class="img-responsive item-img" itemprop="image" />
<?php endif; ?>
<div class="title"><h3 itemprop="name"><?php the_title(); ?></h3></div>
</a>
</div>
<?php $i++; ?>
<?php endwhile;?>
</div>
</div>
<div class="container" id="list-index">
<div id="novel-history-main" class="list list-truyen list-history col-xs-12 col-sm-12 col-md-8 col-truyen-main"></div>
<div class="list list-truyen list-new col-xs-12 col-sm-12 col-md-8 col-truyen-main">
<div class="title-list">
<h2><a href="<?php echo home_url(); ?>/truyen-moi/" title="Latest Release">Truyện mới cập nhật</a></h2>
<a href="<?php echo home_url(); ?>/truyen-moi/" title="Latest Release"><span class="glyphicon glyphicon-menu-right"></span></a><select id="new-select" class="form-control new-select" aria-label="Select Genres">
<option value="all">Tất cả</option>
<?php
$terms = get_terms( 'category', array( 'hide_empty' => false ) );
foreach( $terms as $term ) {
?>
<option value="<?php echo $term->term_id; ?>"><?php echo $term->name; ?></option>
<?php
}
?>
</select>
</div>

<?php
global $wpdb;
					
$novels = $wpdb->get_results ("SELECT DISTINCT ID, post_parent FROM  {$wpdb->prefix}posts WHERE post_type = 'chap' AND post_status = 'publish' ORDER BY ID DESC LIMIT 8000");
$arrNovel	= $arrID = array();

for ($i=0; $i<count($novels); $i++) {
if (!in_array($novels[$i]->post_parent, $arrID)) {
$arrID[]	= $novels[$i]->post_parent;
$q_novel  = get_post($novels[$i]->post_parent);
$arrNovel[$i]['truyen']	= $q_novel->post_title;
$arrNovel[$i]['id_truyen']	= $q_novel->ID;
$arrNovel[$i]['link']	= get_the_permalink($q_novel->ID);
$arrNovel[$i]['chuong']	= get_the_title($novels[$i]->ID);
$arrNovel[$i]['id_chuong']	= $novels[$i]->ID;
$arrNovel[$i]['link_chuong'] = get_the_permalink($novels[$i]->ID);
}
}
foreach ($arrNovel as $info): ?>
<div class="row" itemscope="" itemtype="https://schema.org/Book">
<div class="col-xs-9 col-sm-6 col-md-5 col-title">
<span class="glyphicon glyphicon-chevron-right"></span>
<h3 itemprop="name"><a href="<?php echo $info['link']; ?>" title="<?php echo $info['truyen']; ?>" itemprop="url"><?php echo $info['truyen']; ?></a></h3>
<?php if( get_post_meta( $info['id_truyen'],'tw_status',true) === 'Full' ) : ?>
<span class="label-title label-full"></span>
<?php endif; ?>
<?php if( get_post_meta( $info['id_truyen'],'tw_loai',true) === 'Convert' ) : ?>
<span class="label label-info">Convert</span>
<?php endif; ?>
<?php $terms = get_the_terms($info['id_truyen'], 'tien_to'); ?>
<?php if ($terms): ?>
<?php  foreach ($terms as $t): ?>
<span class="label-title label-<?php echo strtolower($t->name); ?>"></span>
<?php endforeach; ?>
<?php endif; ?>

</div>
<div class="hidden-xs col-sm-3 col-md-3 col-cat text-888">
<?php
$categories = get_the_terms( $info['id_truyen'], 'category' );
$genres = array();
foreach( $categories as $category ) {
$genres[] = ' <a itemprop="genre" href="'.esc_url( get_category_link($category->term_id )).'" title="'.esc_html( $category->name ).'">'.esc_html( $category->name ).'</a>';
};
echo implode(',', $genres );
?>
</div>
<div class="col-xs-3 col-sm-3 col-md-2 col-chap text-info"><a title="<?php echo $info['truyen']; ?> - <?php echo $info['chuong']; ?>" href="<?php echo $info['link_chuong']; ?>"><span class="chapter-text"><?php echo $info['chuong']; ?></span></a></div>
<div class="hidden-xs hidden-sm col-md-2 col-time text-888"><?php echo timeago($info['id_chuong'])?></div>
</div>
<?php endforeach; ?>

</div>
<div class="visible-md-block visible-lg-block col-md-4 text-center col-truyen-side">
<div id="novel-history-sidebar" class="list list-truyen list-history col-xs-12"></div>
<?php get_sidebar(); ?>
</div>
</div>

<div class="container" id="truyen-slide">
<?php
$args = array(
'order'      => 'DESC',
'post_type'  => 'post',
'orderby'    => 'meta_value_num',
'meta_key'  => 'tw_views_post',
'meta_key'   => 'tw_views_post',
'showposts'  => 12,
'meta_query' => array(
array(
'key'     => 'tw_status',
'value'   => 'Full'
),
),
);
$wp_query = new wp_query($args);?>
<div class="list list-thumbnail col-xs-12">
<div class="title-list">
<h2><a href="<?php echo home_url(); ?>/truyen-hoan-thanh/" title="Novel Completed">Truyện hoàn thành</a></h2>
<a href="<?php echo home_url(); ?>/truyen-hoan-thanh/" title="Novel Completed"><span class="glyphicon glyphicon-menu-right"></span></a>
</div>
<div class="row">

<?php while($wp_query->have_posts()):?>
<?php $wp_query->the_post();?>
<div class="col-xs-4 col-sm-3 col-md-2">
<a href="<?php the_permalink()?>" title="<?php the_title()?>">
<img src="<?php echo thumb_img(tw_get_thumbnail(),245,164,100) ; ?>" alt="<?php the_title()?>" />
<div class="caption">
<h3><?php the_title()?></h3>
<small class="btn-xs label-primary"><?php count_full($post->ID); ?></small>
</div>
</a>
</div>
<?php endwhile;?>
</div>
</div>
</div>
</div>
<?php get_footer(); ?>
