<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;

class PostSlugPreparer extends AbstractPostBotPreparer {

    /** @var bool */
    private $childPost;

    /**
     * Prepare the post bot
     *
     * @return void
     */
    public function prepare() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        $this->childPost = $this->bot->getPostData()->getChildPost();

        if ($this->childPost) {
            $slug = $this->getValuesForSelectorSetting('_child_post_slug_selectors', 'text', false, true, true);
        } else {
            $slug = $this->getValuesForSelectorSetting('_post_slug_selectors', 'text', false, true, true);
        }
        if (!$slug) return;

        $this->bot->getPostData()->setSlug($slug);
    }
}