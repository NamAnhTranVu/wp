<?php
function load_hot_select() {
	$id = $_GET['id'];
	$args = array(
		'post_type' => 'post',
		'showposts' => 13,
		'cat'       => $id,
		'meta_key'  => 'tw_views_post',
	);
	$i = 1;
	$wp_query = new wp_query($args);
	while($wp_query->have_posts()):
		$wp_query->the_post();
		if ($i === 1) : ?>
			<div class="item top-<?php echo $i; ?>" itemscope itemtype="https://schema.org/Book">
				<?php else: ?>
					<div class="item top-<?php echo $i; ?>" itemscope itemtype="https://schema.org/Book">
					<?php endif; ?>
					<a href="<?php the_permalink(); ?>" itemprop="url">

<?php if( get_post_meta($post->ID,'tw_status',true) == 'Full' ) : ?>
<span class="full-label"></span>
<?php endif; ?>										<?php if ($i === 1) : ?>
							<img src="<?php echo tw_get_thumbnail('hot-top-1'); ?>" alt="<?php the_title(); ?>" class="img-responsive item-img" itemprop="image" />
							<?php else: ?>
								<img src="<?php echo tw_get_thumbnail('hot-top'); ?>" alt="<?php the_title(); ?>" class="img-responsive item-img" itemprop="image" />
							<?php endif; ?>
							<div class="title"><h3 itemprop="name"><?php the_title(); ?></h3></div>
						</a>
					</div>
<?php $i++; ?>
<?php endwhile;?>
			</div>
<?php
die();
}
add_action( 'wp_ajax_nopriv_load_hot_select', 'load_hot_select' );
add_action( 'wp_ajax_load_hot_select', 'load_hot_select' );
?>
<?php
		function load_new_select() {
			$id = $_GET['id'];
			$args = array(
				'post_type'  => 'post',
				'showposts'  => -1,
				'post_status'=> 'publish',
				'cat'        => $id
			);
			$post = get_posts( $args );
			$post_ID = array();
			foreach ($post as $posts ) {
				$post_ID[] = $posts->ID;
			}
			$chap = array(
				'post_type'  => 'chap',
				'showposts'  => -1,
				'post_status'=> 'publish',
				'orderby'    => 'ID',
				'order'      => 'DESC',
				'post_parent__in'=> $post_ID
			);
			$novels = get_posts($chap);

			$arrNovel	= $arrID = array();

			for ($i=0; $i<count($novels); $i++) {
				if (!in_array($novels[$i]->post_parent, $arrID)) {
					$arrID[]	= $novels[$i]->post_parent;

					$q_novel  = get_post($novels[$i]->post_parent);
					$arrNovel[$i]['truyen']	= $q_novel->post_title;
					$arrNovel[$i]['id_truyen']	= $q_novel->ID;
					$arrNovel[$i]['link']	= get_the_permalink($q_novel->ID);

					$arrNovel[$i]['chuong']	= $novels[$i]->post_title;
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
<?php endif; ?>					<?php $terms = get_the_terms($info['id_truyen'], 'tien_to'); ?>
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
<?php
die();
}
add_action( 'wp_ajax_nopriv_load_new_select', 'load_new_select' );
add_action( 'wp_ajax_load_new_select', 'load_new_select' );
?>