<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <?php
    $parent = $post->post_parent;
    $story = get_post($parent);
    $ID = get_the_ID();

    tw_views($parent);
    tw_views($post->ID);
    ?>
    <div id="chapter-big-container" class="container chapter">
        <div class="row">
            <div class="col-xs-12">
                <button type="button" class="btn btn-responsive btn-success toggle-nav-open"><span
                            class="glyphicon glyphicon-menu-updownswitch"></span></button>
                <a class="truyen-title" href="<?php echo get_the_permalink($story) ?>"
                   title="<?php echo $story->post_title ?>"><?php echo $story->post_title ?></a>
                <h2>
                    <a class="chapter-title" href="<?php the_permalink() ?>"
                       title="<?php echo $story->post_title ?> - <?php the_title() ?>">
                        <span class="chapter-text"><span><?php the_title() ?></span></span>
                    </a>
                </h2>
                <hr class="chapter-start"/>
                <div class="chapter-nav" id="chapter-nav-top">
                    <div class="btn-group">
                        <?php tw_get_prev_chap($parent) ?>
                        <button type="button" class="btn btn-success btn-chapter-nav chapter_jump"><span
                                    class="glyphicon glyphicon-list-alt"></span></button>
                        <?php tw_get_next_chap($parent) ?>
                    </div>
                </div>
                <hr class="chapter-end"/>
                <div id="chapter-c" class="chapter-c">
                    <?php the_content(); ?>

                </div>
                <div class="related-all-content container" style="overflow: hidden;">
                    <div class="related-box">
                        <div class="related-head"><span class="related-head-title">ĐƯỢC ĐỀ XUẤT CHO BẠN</span><a
                                    class="related-url-go-to"></a>
                            <div style="clear: both;"></div>
                        </div>

                        <div class="realted-body row">
                            <?php
                            $args = array(
                                'posts_per_page' => 4,
                                'post__not_in'=>[$story->ID],
                                'orderby'        => 'rand'
                            );
                            $the_query = new WP_Query($args);

                            // The Loop
                            if ($the_query->have_posts()) :
                                while ($the_query->have_posts()) : $the_query->the_post();
                                    ob_start();
                                    ?>
                                    <div class="col-md-3 col-xs-3 text-center">
                                        <div class="background-FFF">
                                            <a href="<?= get_permalink(); ?>">
                                           
                                                    <img src="<?php echo tw_get_thumbnail(); ?>" class="cover" alt="<?php the_title()?>">
                                                
                                                <p class="title"><?= get_the_title(); ?></p>
                                            </a>
                                        </div>

                                    </div>
                                    <?php
                                    echo ob_get_clean();
                                endwhile;
                            endif;

                            // Reset Post Data
                            wp_reset_postdata();

                            ?>

                        </div>
                    </div>
                </div>
                <hr class="chapter-end" id="chapter-end-bot"/>
                <div class="chapter-nav" id="chapter-nav-bot">
                    <input type="hidden" id="id_post" value="<?php echo $parent ?>">
                    <input type="hidden" id="chapter-id" value="<?php echo get_the_ID() ?>">
                    <input type="hidden" id="chapter-num" value="<?php echo get_the_ID() ?>">
                    <div class="btn-group">
                        <?php tw_get_prev_chap($parent) ?>
                        <button type="button" class="btn btn-success btn-chapter-nav chapter_jump"><span
                                    class="glyphicon glyphicon-list-alt"></span></button>
                        <?php tw_get_next_chap($parent) ?>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-warning" id="chapter_error"><span
                                    class="glyphicon glyphicon-flag"></span> Báo lỗi chương
                        </button>

                        <button class="btn btn-info" data-toggle="collapse" data-target="#demo"><span
                                    class="glyphicon glyphicon-comment"></span> Bình Luận
                        </button>
                    </div>
                </div>
                <div class="bg-info text-center visible-md visible-lg box-notice">Tip: You can use left, right, A and D
                    keyboard keys to browse between chapters.
                </div>

                <div class="col-xs-12">
                    <div id="demo" class="collapse">
                        <div id="fb-comments" class="fb-comments" data-href="<?php echo get_the_permalink($story) ?>"
                             style="width: 100%;" data-width="100%" data-order-by="reverse_time"
                             data-numposts="5"></div>
                    </div>
                    <div class="row" id="chapter_comment">
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>

    </div>

<?php endwhile; ?>
<?php endif; ?>
    <script>
        var novel = {
            id: <?php echo $parent?>,
            name: '<?php echo $story->post_title?>',
            url: '<?php echo get_the_permalink($story)?>',
            chapter: {
                id: '<?php echo get_the_ID(); ?>',
                name: '<?php echo get_the_title(); ?>',
                url: '<?php echo get_the_permalink(); ?>',
            }
        };

        jQuery(document).ready(function () {
            var limit = 10;
            var novels = $.cookie("novels_history");
            if (novels) novels = JSON.parse(novels);
            else novels = [];

            for (var i in novels) {
                var nv = novels[i];
                if (nv.id == novel.id) {
                    novels.splice(i, 1);
                    break;
                }
            }

            if (novels.length == limit) {
                novels.splice(-1, 1);
            }
            novels.unshift(novel);

            var expDate = new Date();
            expDate.setTime(expDate.getTime() + (7 * 24 * 60 * 60 * 1000));
            $.cookie("novels_history", JSON.stringify(novels), {path: '/', expires: expDate});
        });
    </script>


<?php
if (isset($_POST["type"])) {
    $my_post = array(
        'post_title' => $_POST["title"],
        'post_content' => $_POST["id"] . ' - ' . $_POST["message"],
        'post_status' => 'publish',
        'post_type' => 'error_report'
    );
    wp_insert_post($my_post);
}
?>
<style>
    .related-box .realted-body.row img {
        width: 200px;
    }

    .related-box {
        background-color: #e6e6e6;
        padding: 10px;
    }


    .related-box .related-head-title {
        font-weight: bold;
        font-size: 16px;
    }

    .related-box .related-head {
        margin: 10px 0;
        text-align: left;
    }
    .related-box .title{
        padding: 5px 0;
    }
    .related-box .background-FFF {
        background: #fff;
    }

    .related-box .col-md-3.text-center {
        font-weight: bold;
    }
    @media screen and (max-width: 769px){
        .related-box .realted-body.row img {
            width: 100%;
        }
    }
</style>
<?php get_footer(); ?>