<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Utils;

class PostContentsPreparer extends AbstractPostBotPreparer {

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
            $postContentSelectors = $this->bot->getSetting('_child_post_content_selectors');
        } else {
            $postContentSelectors = $this->bot->getSetting('_post_content_selectors');
        }

        $allContents = [];
        foreach($postContentSelectors as $selectorData) {
            $selector = Utils::array_get($selectorData, "selector");
            if (!$selector) continue;

            $attr = Utils::array_get($selectorData, "attr");
            if (!$attr) $attr = 'html';

            if($contents = $this->bot->extractData($this->bot->getCrawler(), $selector, $attr, "content", false, true)) {
                $contents = Utils::array_msort($contents, ['start' => SORT_ASC]);

                $allContents = array_merge($allContents, $contents);
            }
        }

        $this->bot->getPostData()->setContents($allContents);
    }
}