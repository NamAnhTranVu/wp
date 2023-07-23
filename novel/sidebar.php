<?php if (is_category()) {
	$cat_ID = get_category( get_query_var( 'cat' ) )->cat_ID;
	$title = 'Truyện '.get_cat_name($cat_ID).' Hot';
	$args = array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'cat'            => $cat_ID,
		'posts_per_page' => 10,
		'meta_key'       => 'tw_views_post',
		'order'          => 'DESC',
	);
	$list = new wp_query($args);
}elseif(is_single()){
	$cat_ID = get_the_category()[0]->cat_ID;
	$title = 'Hot '.get_cat_name($cat_ID).' Novel';
	$args = array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'cat'            => $cat_ID,
		'posts_per_page' => 10,
		'meta_key'       => 'tw_views_post',
		'order'          => 'DESC',
	);
	$list = new wp_query($args);
}else{
	$title = 'Hot Novel';
	$args = array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'posts_per_page' => 10,
		'orderby'        => 'meta_value_num',
		'meta_key'       => 'tw_views_post',
		'order'          => 'DESC'
	);
	$list = new wp_query($args);
}
?>
<?php if (!is_single()): ?>

	<div class="list list-truyen list-cat col-xs-12">
		<div class="title-list"><h4>Thể loại</h4></div>
		<div class="row">
			<?php 
			$terms = get_terms( 'category', array( 'hide_empty' => false ) );
			foreach( $terms as $term ) {
				?>
				<div class="col-xs-6"><a href="<?php echo get_category_link( $term->term_id ); ?>" title="<?php echo $term->name; ?>"><?php echo $term->name; ?></a></div>
				<?php
			}
			?>
		</div>
	</div>
<?php endif;?>
<?php if (!is_home()): ?>
	<div class="list list-truyen list-side col-xs-12">
		<div class="title-list"><h4><?php echo $title; ?></h4></div>
		<?php 
		$i=1;
		?>
		<?php while($list->have_posts()):?>
			<?php $list->the_post();?>
			<div class="row top-item">
				<div class="col-xs-12">
					<div class="top-num top-<?php echo $i;?>"><?php echo $i;?></div>
					<div class="s-title">
						<h3><a href="<?php the_permalink()?>" title="<?php the_title()?>"><?php the_title()?></a></h3>
					</div>
					<div class="nowrap">
						<?php 
						$categories = get_the_category();
						$count = 0;
						$genres = array();
						foreach( $categories as $category ) {
							$genres[] = ' <a href="'.esc_url( get_category_link( $category->term_id ) ).'" title="'.esc_html( $category->name ).'">'.esc_html( $category->name ).'</a>';
							//if (++$count=== 4) break;
						};
						echo implode(',', $genres );
						?>
					</div>
				</div>
			</div>
			<?php $i++; endwhile; ?>
			<?php wp_reset_postdata(); ?>
		</div>
		<?php endif; ?>