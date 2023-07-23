<?php get_header();?>
<div class="container" id="list-page">
<div class="col-xs-12 col-sm-12 col-md-9 col-truyen-main">
<div class="text-center"></div>
<div class="list list-truyen col-xs-12">
<div class="title-list">
<?php if (get_query_var('status') === 'completed'): ?>
<h2><?php the_title()?> (Hoàn thành)</h2>
<div class="filter"><a href="<?php the_permalink(); ?>"><?php the_title()?></a></div>
<?php else: ?>
<h2><?php the_title()?></h2>
<div class="filter"><a href="<?php the_permalink();?>?status=completed"><?php the_title()?> (Hoàn thành)</a></div>
<?php endif; ?>
</div>
<?php
$paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
if (get_query_var('status') === 'completed'):
$args = array(
'post_type'  => 'post',
'paged'      => $paged,
'orderby'    => 'meta_value_num',
'meta_key'   => 'tw_views_post',
'showposts'  => 27,
'meta_query' => array(
array(
'key'     => 'tw_status',
'value'   => 'Hoành Thành'
),
),
);
else:
$args = array(
'post_type'  => 'post',
'paged'      => $paged,
'orderby'    => 'meta_value_num',
'meta_key'   => 'tw_views_post',
'showposts'  => 27,
);
endif;
$wp_query = new wp_query($args);?>
<?php while(have_posts()):?>
<?php the_post();?>
<div class="row" itemscope="" itemtype="https://schema.org/Book">
<div class="col-xs-3">
<div><img src="<?php echo thumb_img(tw_get_thumbnail(),80,180,100) ; ?>" class="cover" alt="<?php the_title()?>"></div>
</div>
<div class="col-xs-7">
<div><span class="glyphicon glyphicon-book"></span>
<h3 class="truyen-title" itemprop="name"><a href="<?php the_permalink()?>" title="<?php the_title()?>" itemprop="url"><?php the_title()?></a></h3>

<?php if( get_post_meta($post->ID,'tw_status',true) == 'Hoành Thành' ) : ?>
<span class="label-title label-full"></span>
<?php endif; ?>

<?php $terms = get_the_terms($post->ID, 'tien_to'); ?>
<?php if ($terms): ?>
<?php  foreach ($terms as $t): ?>
<span class="label-title label-<?php echo strtolower($t->name); ?>"></span>
<?php endforeach; ?>
<?php endif; ?>

<?php $author = get_the_terms($post->ID, 'tac-gia'); ?>
<?php if ($author): ?>
<?php foreach ($author as $authors): ?>
<span class="author" itemprop="author"><?php echo $authors->name; ?></span>
<?php endforeach; ?>
<?php endif; ?>

</div>
</div>
<div class="col-xs-2 text-info">
<div><?php last_update()?></div>
</div>
</div>
<?php endwhile;?>
</div>
</div>
<div class="visible-md-block visible-lg-block col-md-3 text-center col-truyen-side">
<?php get_sidebar(); ?>
</div>
</div>
<div class="row category">
<div class="container text-center pagination-container">
<div class="col-xs-12 col-sm-12 col-md-9 col-truyen-main">
<?php pagination();?>
</div>
</div>
</div>
</div>
<?php get_footer(); ?>
