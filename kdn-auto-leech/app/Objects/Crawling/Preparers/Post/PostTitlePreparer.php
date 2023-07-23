<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Utils;

class PostTitlePreparer extends AbstractPostBotPreparer {

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
        $this->childPost    = $this->bot->getPostData()->getChildPost();

        if ($this->childPost) {
            $postTitleSelectors         = $this->bot->getSetting('_child_post_title_selectors');
            $findAndReplacesForTitle    = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_child_post_find_replace_title'));
        } else {
            $postTitleSelectors         = $this->bot->getSetting('_post_title_selectors');
            $findAndReplacesForTitle    = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_post_find_replace_title'));
        }

        foreach($postTitleSelectors as $selectorData) {

            $selector = Utils::array_get($selectorData, "selector");
            if (!$selector) continue;

            $attr = Utils::array_get($selectorData, "attr");
            if (!$attr) $attr = 'text';

            if($title = $this->bot->extractData($this->bot->getCrawler(), $selector, $attr, false, true, true)) {
                $title = $this->bot->findAndReplace($findAndReplacesForTitle, $title, true, $this->bot->getPostUrl());
                $this->bot->getPostData()->setTitle($title);
                break;
            }
        }

    }

}