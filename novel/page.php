<?php get_header(); ?>
<?php if (is_page('contact')){
	$class = ' id="contact-container"';
}
?>
<?php while ( have_posts()): the_post();?>
	<div class="container single-page"<?php echo $class; ?>>
		<div class="row">
			<div class="list list-truyen col-xs-12">
				<div class="title-list">
					<h2><?php the_title(); ?></h2>
				</div>
				<div class="row">
					<div class="col-xs-12 content">
						<?php the_content(); ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php endwhile;?>
<?php get_footer();?>