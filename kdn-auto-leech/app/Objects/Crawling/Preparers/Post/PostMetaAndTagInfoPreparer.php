<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;

class PostMetaAndTagInfoPreparer extends AbstractPostBotPreparer {

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

        // Prepare tags
        $this->prepareTags();

        // Prepare meta description
        $this->prepareMetaDescription();
    }

    /**
     * Prepares tags using post tag selectors and meta keywords
     * @since 1.8.0
     */
    private function prepareTags() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postSaveMetaKeywords               = $this->bot->getSetting('_child_post_meta_keywords');
            $postMetaKeywordsAsTags             = $this->bot->getSetting('_child_post_meta_keywords_as_tags');

            $findAndReplacesForTags             = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_child_post_find_replace_tags'));
            $findAndReplacesForMetaKeywords     = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_child_post_find_replace_meta_keywords'));

            // Get tags
            $allTags = $this->getValuesForSelectorSetting('_child_post_tag_selectors','text', false, false, true);
        } else {
            $postSaveMetaKeywords               = $this->bot->getSetting('_post_meta_keywords');
            $postMetaKeywordsAsTags             = $this->bot->getSetting('_post_meta_keywords_as_tags');

            $findAndReplacesForTags             = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_post_find_replace_tags'));
            $findAndReplacesForMetaKeywords     = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_post_find_replace_meta_keywords'));

            // Get tags
            $allTags = $this->getValuesForSelectorSetting('_post_tag_selectors','text', false, false, true);
        }

        if (!$allTags) $allTags = [];
        $allTags = array_flatten(array_map(function($tag) {

            // Explode and trim
            return array_map(function($tagFromExplode) {
                return trim($tagFromExplode);
            }, explode(",", $tag));

        }, array_flatten($allTags)));

        // Store the tags found by given selectors
        if(!empty($allTags)) $this->bot->getPostData()->setTags(array_unique($allTags));

        // Meta keywords
        if($postSaveMetaKeywords) {
            if($metaKeywords = $this->bot->extractData($this->bot->getCrawler(), "meta[name=keywords]", "content", false, true, true)) {
                $metaKeywords = trim($this->bot->findAndReplace($findAndReplacesForMetaKeywords, $metaKeywords, true, $this->bot->getPostUrl()), ",");

                $this->bot->getPostData()->setMetaKeywords($metaKeywords);

                if($postMetaKeywordsAsTags) {
                    $metaKeywordsAsTags = array_unique(explode(',', $metaKeywords));

                    // Add these tags to allTags as well
                    $allTags = array_merge($allTags, $metaKeywordsAsTags);

                    $this->bot->getPostData()->setMetaKeywordsAsTags($metaKeywordsAsTags);
                }
            }
        }

        // Prepare the tags by applying find-and-replaces
        if(!empty($allTags)) {
            foreach ($allTags as $mTag) {
                if ($mTag = $this->bot->findAndReplace($findAndReplacesForTags, $mTag, true, $this->bot->getPostUrl())) {
                    $tagsPrepared[] = $mTag;
                }
            }

            // Add all tags to the main data
            if(!empty($tagsPrepared)) {
                $this->bot->getPostData()->setPreparedTags(array_unique($tagsPrepared));
            }
        }
    }

    /**
     * Prepares meta description
     * @since 1.8.0
     */
    private function prepareMetaDescription() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postSaveMetaDescription = $this->bot->getSetting('_child_post_meta_description');
        } else {
            $postSaveMetaDescription = $this->bot->getSetting('_post_meta_description');
        }

        if(!$postSaveMetaDescription) return;

        // Get the meta description
        $metaDescription = $this->bot->extractData($this->bot->getCrawler(), "meta[name=description]", "content", false, true, true);
        if (!$metaDescription) return;

        // Apply find and replaces
        if ($this->childPost) {
            $findAndReplacesForMetaDescription  = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_child_post_find_replace_meta_description'));
        } else {
            $findAndReplacesForMetaDescription  = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_post_find_replace_meta_description'));
        }

        $metaDescription = $this->bot->findAndReplace($findAndReplacesForMetaDescription, $metaDescription, true, $this->bot->getPostUrl());

        // Store it
        $this->bot->getPostData()->setMetaDescription($metaDescription);
    }
}