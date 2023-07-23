<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Utils;

class PostListInfoPreparer extends AbstractPostBotPreparer {

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
            $postIsListType                     = $this->bot->getSetting('_child_post_is_list_type');
        } else {
            $postIsListType                     = $this->bot->getSetting('_post_is_list_type');
        }
        
        if(!$postIsListType) return;

        if ($this->childPost) {
            $postListItemsStartAfterSelectors   = $this->bot->getSetting('_child_post_list_item_starts_after_selectors');
            $postListNumberSelectors            = $this->bot->getSetting('_child_post_list_item_number_selectors');
            $postListTitleSelectors             = $this->bot->getSetting('_child_post_list_title_selectors');
            $postListContentSelectors           = $this->bot->getSetting('_child_post_list_content_selectors');
        } else {
            $postListItemsStartAfterSelectors   = $this->bot->getSetting('_post_list_item_starts_after_selectors');
            $postListNumberSelectors            = $this->bot->getSetting('_post_list_item_number_selectors');
            $postListTitleSelectors             = $this->bot->getSetting('_post_list_title_selectors');
            $postListContentSelectors           = $this->bot->getSetting('_post_list_content_selectors');
        }

        $findAndReplaces                        = $this->bot->prepareFindAndReplaces([]);

        $listNumbers = $listTitles = $listContents = [];
        $listStartPos = 0;

        // Get the position after which the list items start
        if(!empty($postListItemsStartAfterSelectors)) {
            foreach($postListItemsStartAfterSelectors as $selectorData) {
                $selector = Utils::array_get($selectorData, "selector");
                if (!$selector) continue;

                /** @var Crawler $node */
                try {
                    $node = $this->bot->getCrawler()->filter($selector)->first();

                    try {
                        $nodeHtml = Utils::getNodeHTML($node);
                        $pos = $nodeHtml ? mb_strpos($this->bot->getCrawler()->html(), $nodeHtml) : 0;
                        if ($pos > $listStartPos) $listStartPos = $pos;
                    } catch(\InvalidArgumentException $e) {}

                } catch(\Exception $e) {
                    Informer::addError("{$selector} - " . $e->getMessage())->setException($e)->addAsLog();
                }
            }

            $this->bot->getPostData()->setListStartPos($listStartPos);
        }

        // Get item numbers
        foreach($postListNumberSelectors as $selectorData) {
            $selector = Utils::array_get($selectorData, "selector");
            if (!$selector) continue;

            $attr = Utils::array_get($selectorData, "attr");
            if (!$attr) $attr = 'text';

            if ($listNumbers = $this->bot->extractData($this->bot->getCrawler(), $selector, $attr, "list_number", false, true)) {
                if ($listStartPos) $this->bot->removeItemsBeforePos($listNumbers, $listStartPos);

                $this->bot->getPostData()->setListNumbers($listNumbers);
                break;
            }
        }

        // Get titles
        foreach($postListTitleSelectors as $selectorData) {
            $selector = Utils::array_get($selectorData, "selector");
            if (!$selector) continue;

            $attr = Utils::array_get($selectorData, "attr");
            if (!$attr) $attr = 'text';

            if ($listTitles = $this->bot->extractData($this->bot->getCrawler(), $selector, $attr, "list_title", false, true)) {
                if ($listStartPos) $this->bot->removeItemsBeforePos($listTitles, $listStartPos);

                $this->bot->getPostData()->setListTitles($listTitles);
                break;
            }
        }

        // Get contents
        $allListContents = [];
        foreach($postListContentSelectors as $selectorData) {
            $selector = Utils::array_get($selectorData, "selector");
            if (!$selector) continue;

            $attr = Utils::array_get($selectorData, "attr");
            if (!$attr) $attr = 'html';

            if ($listContents = $this->bot->extractData($this->bot->getCrawler(), $selector, $attr, "list_content", false, true)) {
                if ($listStartPos) $this->bot->removeItemsBeforePos($listContents, $listStartPos);

                // Apply find-and-replaces
                $listContents = $this->modifyArrayValue($listContents, 'data', function ($val) use (&$findAndReplaces) {
                    return $this->bot->findAndReplace($findAndReplaces, $val);
                });

                $allListContents = array_merge($allListContents, $listContents);
            }
        }
        $listContents = $allListContents;
        $this->bot->getPostData()->setListContents($listContents);

        // Remove the list content from main content
        if($listStartPos > 0 && $contents = $this->bot->getPostData()->getContents()) {
            // Find start and end pos of the list
            $this->bot->combinedListData = Utils::combineArrays($this->bot->combinedListData, $listNumbers, $listTitles, $listContents);

            $startPos = $endPos = 0;
            foreach($this->bot->combinedListData as $listData) {
                if(!$startPos || (isset($listData["start"]) && $listData["start"] < $startPos)) {
                    $startPos = $listData["start"];
                }

                if(!$endPos || (isset($listData["end"]) && $listData["end"] > $endPos)) {
                    $endPos = $listData["end"];
                }
            }

            // If start and end positions are valid, remove the content between these positions
            if($startPos && $endPos) {
                foreach($contents as $key => $mContent) {
                    if(isset($mContent["start"]) && $mContent["start"] > $startPos &&
                        isset($mContent["end"]) && $mContent["end"] < $endPos) {
                        unset($contents[$key]);
                    }
                }
            }

            $this->bot->getPostData()->setContents($contents);
        }

    }

    /**
     * Modify a value in each inner array of an array.
     *
     * @param array    $array    An array of arrays. E.g. <i>[ ['data' => 'a'], ['data' => 'b'] ]</i>
     * @param string   $key      Inner array key whose value should be modified. E.g. <i>'data'</i>
     * @param callable $callback Called for each inner array. func($val) {return $modifiedVal; }. $val is, e.g., the
     *                           value of 'data'. This should return the modified value.
     * @return array             Modified array
     */
    private function modifyArrayValue($array, $key, $callback) {
        if(!is_callable($callback)) return $array;

        $preparedArray = [];
        foreach($array as $data) {
            if(isset($data[$key])) {
                $data[$key] = $callback($data[$key]);
            }

            $preparedArray[] = $data;
        }

        return $preparedArray;
    }
}