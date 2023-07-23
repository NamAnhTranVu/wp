<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Utils;

class PostExcerptPreparer extends AbstractPostBotPreparer {

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
            $postExcerptSelectors      = $this->bot->getSetting('_child_post_excerpt_selectors');
            $findAndReplacesForExcerpt = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_child_post_find_replace_excerpt'));
        } else {
            $postExcerptSelectors      = $this->bot->getSetting('_post_excerpt_selectors');
            $findAndReplacesForExcerpt = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_post_find_replace_excerpt'));
        }

        foreach($postExcerptSelectors as $selectorData) {
            $selector = Utils::array_get($selectorData, "selector");
            if (!$selector) continue;

            $attr = Utils::array_get($selectorData, "attr");
            if (!$attr) $attr = 'html';

            if($excerpt = $this->bot->extractData($this->bot->getCrawler(), $selector, $attr, "excerpt", true, true)) {
                $excerpt["data"] = trim($this->bot->findAndReplace($findAndReplacesForExcerpt, $excerpt["data"], true, $this->bot->getPostUrl()));
                $this->bot->getPostData()->setExcerpt($excerpt);

                break;
            }

        }

    }
}