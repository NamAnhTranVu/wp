<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Data\PostData;
use KDNAutoLeech\PostDetail\PostDetailsService;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Objects\Enums\ShortCodeName;
use KDNAutoLeech\Objects\File\FileService;
use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\Objects\Traits\ShortCodeReplacerAndFindAndReplace;
use KDNAutoLeech\Utils;

class PostTemplatePreparer extends AbstractPostBotPreparer {

    use ShortCodeReplacerAndFindAndReplace;
    
    /** @var PostData */
    private $postData;

    /** @var childPost */
    private $childPost;

    //

    /** @var string */
    private $mainTitleShortCodeValue = '';

    /** @var string */
    private $mainListShortCodeValue = '';

    /** @var string */
    private $mainContentShortCodeValue = '';

    /** @var string */
    private $mainGalleryShortCodeValue = '';

    /** @var string */
    private $mainExcerptShortCodeValue = '';

    //

    /** @var array|null */
    private $customShortCodeValueMap = null;

    /** @var null|array */
    private $findAndReplacesForMedia = null;
    
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

        // Store the post data in the instance so that we can reach it easily.
        $this->postData = $this->bot->getPostData();

        // Prepare values of short codes
        $this->prepareMainTitleShortCodeValue();
        $this->prepareMainExcerptShortCodeValue();
        $this->prepareMainListShortCodeValue();
        $this->prepareMainContentShortCodeValue();
        $this->prepareMainGalleryShortCodeValue();
        $this->prepareMainDirectFileShortCodeValue();

        // Define short code names and their values
        $shortCodeValueMap = [
            ShortCodeName::KDN_MAIN_TITLE       => $this->mainTitleShortCodeValue,
            ShortCodeName::KDN_MAIN_EXCERPT     => $this->mainExcerptShortCodeValue,
            ShortCodeName::KDN_MAIN_CONTENT     => $this->mainContentShortCodeValue,
            ShortCodeName::KDN_MAIN_LIST        => $this->mainListShortCodeValue,
            ShortCodeName::KDN_SOURCE_URL       => $this->bot->getPostUrl(),
            ShortCodeName::KDN_MAIN_GALLERY     => $this->mainGalleryShortCodeValue,
            ShortCodeName::KDN_MAIN_DIRECT_FILE => $this->mainDirectFileShortCodeValue
        ];

        // Prepare the main template using the short code values
        $this->prepareMainTemplate($shortCodeValueMap);

        // Change the main content short code's value with the prepared template
        $shortCodeValueMap[ShortCodeName::KDN_MAIN_CONTENT] = $this->postData->getTemplate();

        // Prepare templates defined in Options Box
        $this->applyOptionsBoxTemplates($shortCodeValueMap);
    }

    /*
     * TEMPLATE PREPARATION
     */

    /**
     * Replaces short codes in the templates defined in Options Boxes.
     *
     * @param array $shortCodeValueMap Already-known short code names and values
     */
    private function applyOptionsBoxTemplates(&$shortCodeValueMap) {
        // Change file names
        $frForMedia = $this->applyShortCodesInMediaFileNames($shortCodeValueMap);

        // Prepare an array containing all short codes and their values
        $predefinedDefaults = [];
        foreach($this->getPredefinedShortCodeNames() as $name) $predefinedDefaults[$name] = "";
        $map = $shortCodeValueMap + $predefinedDefaults + $this->getCustomShortCodeValueMap();

        // Make the replacements

        // Post title
        $this->postData->setTitle($this->applyShortCodesAndFindReplaces($this->postData->getTitle(), $map, $frForMedia));

        // Post excerpt
        $this->postData->setExcerpt($this->applyShortCodesAndFindReplaces($this->postData->getExcerpt(), $map, $frForMedia));

        // Post template
        $this->postData->setTemplate($this->applyShortCodesAndFindReplaces($this->postData->getTemplate(), $map, $frForMedia));

        // Post slug
        $this->postData->setSlug($this->applyShortCodesAndFindReplaces($this->postData->getSlug(), $map, $frForMedia));

        // Post category
        $this->postData->setCategoryNames($this->applyShortCodesAndFindReplaces($this->postData->getCategoryNames(), $map, $frForMedia));

        // Post tags
        $this->postData->setPreparedTags($this->applyShortCodesAndFindReplaces($this->postData->getPreparedTags(), $map, $frForMedia));

        // Next page URL
        $this->postData->setNextPageUrl($this->applyShortCodesAndFindReplaces($this->postData->getNextPageUrl(), $map, $frForMedia));

        // All page URLs
        $this->postData->setAllPageUrls($this->applyShortCodesAndFindReplaces($this->postData->getAllPageUrls(), $map, $frForMedia, "data"));

        // Custom post meta
        $this->postData->setCustomMeta($this->applyShortCodesAndFindReplaces($this->postData->getCustomMeta(), $map, $frForMedia, "data", true));

        // Custom post taxonomies
        $this->postData->setCustomTaxonomies($this->applyShortCodesAndFindReplaces($this->postData->getCustomTaxonomies(), $map, $frForMedia, "data", true));

        // Custom short codes
        $this->postData->setShortCodeData($this->applyShortCodesAndFindReplaces($this->postData->getShortCodeData(), $map, $frForMedia, "data"));

        // Media files
        $this->prepareMediaTemplates($map, $frForMedia);

        // Prepare templates defined in options boxes of other post details implementations
        PostDetailsService::getInstance()->prepareTemplates($this->getBot(), $map, $frForMedia);
    }

    /**
     * Applies short codes existing in the names of the media files
     *
     * @param array $shortCodeValueMap Already-known short code names and values
     * @return array Find and replace configurations that can be used to replace old file URLs with the changed ones
     * @since 1.8.0
     */
    private function applyShortCodesInMediaFileNames(&$shortCodeValueMap) {
        $frForMedia = [];
        $map = $shortCodeValueMap + $this->getCustomShortCodeValueMap();
        foreach($this->postData->getAllMediaFiles() as $mediaFile) {
            // Replace short codes in the name of the file
            $currentFindReplaceForMedia = FileService::getInstance()->applyShortCodesToMediaFileName($mediaFile, $map);
            if (!$currentFindReplaceForMedia) continue;

            // Collect find-replace configurations
            $frForMedia = array_merge($frForMedia, $currentFindReplaceForMedia);
        }

        // Replace previous local URLs in the short code value map with new local URLs since the names of the files
        // have just been changed
        foreach($shortCodeValueMap as $k => &$v) $v = $this->findAndReplace($frForMedia, $v);
        foreach($this->getCustomShortCodeValueMap() as $k => &$v) $v = $this->findAndReplace($frForMedia, $v);

        return $frForMedia;
    }

    /**
     * @param array $shortCodeMap Already-known short code names and values
     * @param array $frForMedia   Find-replaces for media
     * @since 1.8.0
     */
    private function prepareMediaTemplates($shortCodeMap, $frForMedia) {
        // Create a dummy crawler for the post template
        $dummyTemplateCrawler = $this->bot->createDummyCrawler($this->postData->getTemplate());

        foreach($this->postData->getAllMediaFiles() as $mediaFile) {
            // Because the name of the file can also be used in these, we need to consider short codes of the file names
            // as well.

            // NOTE: Because we apply find-replaces for media, source media URL is replaced with its local URL. Hence,
            // currently, it is not possible to show source media URL in the media's details such as title, description,
            // etc.
            $mediaFile->setMediaTitle($this->applyShortCodesConsideringFileName($shortCodeMap, $mediaFile->getMediaTitle(), $frForMedia));
            $mediaFile->setMediaDescription($this->applyShortCodesConsideringFileName($shortCodeMap, $mediaFile->getMediaDescription(), $frForMedia));
            $mediaFile->setMediaCaption($this->applyShortCodesConsideringFileName($shortCodeMap, $mediaFile->getMediaCaption(), $frForMedia));
            $mediaFile->setMediaAlt($this->applyShortCodesConsideringFileName($shortCodeMap, $mediaFile->getMediaAlt(), $frForMedia));

            // Set media alt and title in the elements having this media's local URL as their 'src' value
            $this->bot->modifyMediaElement($dummyTemplateCrawler, $mediaFile, function(MediaFile $mediaFile, \DOMElement $element) {
                // If there is media alt value, set it.
                if ($mediaFile->getMediaAlt() !== '') {
                    $element->setAttribute('alt', $mediaFile->getMediaAlt());
                } else {
                    // Otherwise, make sure the element does not have 'alt' attribute.
                    $element->removeAttribute('alt');
                }

                // If there is media title value, set it
                if ($mediaFile->getMediaTitle() !== '') {
                    $element->setAttribute('title', $mediaFile->getMediaTitle());
                } else {
                    // Otherwise, make sure the element does not have 'title' attribute.
                    $element->removeAttribute('title');
                }

            });
        }

        // Set the modified template
        $this->postData->setTemplate($this->bot->getContentFromDummyCrawler($dummyTemplateCrawler));
    }

    /*
     * PREPARATION OF SHORT CODE VALUES
     */

    /**
     * Prepares main title short code's value and assigns title to {@link $postData}
     */
    private function prepareMainTitleShortCodeValue() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $templatePostTitle = $this->bot->getSetting('_child_post_template_title', '[' . ShortCodeName::KDN_MAIN_TITLE . ']');
        } else {
            $templatePostTitle = $this->bot->getSetting('_post_template_title', '[' . ShortCodeName::KDN_MAIN_TITLE . ']');
        }

        // If there is no template, stop.
        if(!$templatePostTitle) return;

        $this->replaceShortCode($templatePostTitle, ShortCodeName::KDN_MAIN_TITLE, $this->postData->getTitle() ? $this->postData->getTitle() : '');
        $this->replaceCustomShortCodes($templatePostTitle);

        // Clear remaining predefined short codes
        $this->clearRemainingPredefinedShortCodes($templatePostTitle);

        $this->postData->setTitle($templatePostTitle);

        $this->mainTitleShortCodeValue = $templatePostTitle;
    }

    /**
     * Prepares main excerpt short code's value and assigns excerpt in {@link $postData}
     */
    private function prepareMainExcerptShortCodeValue() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $templatePostExcerpt = $this->bot->getSetting('_child_post_template_excerpt', '[' . ShortCodeName::KDN_MAIN_EXCERPT . ']');
        } else {
            $templatePostExcerpt = $this->bot->getSetting('_post_template_excerpt', '[' . ShortCodeName::KDN_MAIN_EXCERPT . ']');
        }

        $excerpt = $this->postData->getExcerpt();
        if($excerpt && isset($excerpt["data"]) && $data = $excerpt["data"]) {
            $this->replaceShortCode($templatePostExcerpt, ShortCodeName::KDN_MAIN_EXCERPT, $data);
        }

        $this->replaceShortCode($templatePostExcerpt, ShortCodeName::KDN_MAIN_TITLE, $this->postData->getTitle() ? $this->postData->getTitle() : '');
        $this->replaceCustomShortCodes($templatePostExcerpt);

        // Clear remaining predefined short codes
        $this->clearRemainingPredefinedShortCodes($templatePostExcerpt);

        $excerpt["data"] = $templatePostExcerpt;
        $this->postData->setExcerpt($excerpt);

        $this->mainExcerptShortCodeValue = $templatePostExcerpt;
    }

    /**
     * Prepares main list short code's value
     */
    private function prepareMainListShortCodeValue() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postIsListType             = $this->bot->getSetting('_child_post_is_list_type');
            $templateListItem           = $this->bot->getSetting('_child_post_template_list_item');
            $postListNumberAutoInsert   = $this->bot->getSetting('_child_post_list_item_auto_number');
            $postListInsertReversed     = $this->bot->getSetting('_child_post_list_insert_reversed');
        } else {
            $postIsListType             = $this->bot->getSetting('_post_is_list_type');
            $templateListItem           = $this->bot->getSetting('_post_template_list_item');
            $postListNumberAutoInsert   = $this->bot->getSetting('_post_list_item_auto_number');
            $postListInsertReversed     = $this->bot->getSetting('_post_list_insert_reversed');
        }

        if (!$postIsListType) return;

        // If there is no list template, create a default one.
        if (!$templateListItem) {
            $templateListItem = sprintf(
                '[%1$s] [%2$s]<br>[%3$s]<br>',
                ShortCodeName::KDN_LIST_ITEM_POSITION,
                ShortCodeName::KDN_LIST_ITEM_TITLE,
                ShortCodeName::KDN_LIST_ITEM_CONTENT
            );
        }

        $listItems = [];

        // Combine each element and sort them according to their position in DOM ascending
        if(empty($this->bot->combinedListData)) {
            $this->bot->combinedListData = Utils::combineArrays(
                $this->bot->combinedListData,
                $this->postData->getListNumbers(),
                $this->postData->getListTitles(),
                $this->postData->getListContents()
            );
        }

        if(empty($this->bot->combinedListData)) return;

        // Sort the list data according to the elements' start position
        $this->bot->combinedListData = Utils::array_msort($this->bot->combinedListData, ['start' => SORT_ASC]);

        // Now, match.
        $listItems[] = []; // Add an empty array to initialize
        foreach($this->bot->combinedListData as $listData) {
            $dataType = $listData["type"];
            $val = $listData["data"];

            //  If the last item of listItems has "list_content", and this data is also a "list_content", then
            // append it to the last item's list_content.
            //  If the last item of listItems has "list_number", then add a new array to the listItems with the
            // value of "list_number". If the last item does not have "list_number", then add a "list_number" to
            // the last item of listItems. Do this for each key other than "list_content".
            //  By this way, we are able to combine relevant data for each list item into one array.

            if(isset($listItems[sizeof($listItems) - 1][$dataType])) {
                if($dataType != "list_content") {
                    $listItems[] = [
                        $dataType => $val
                    ];
                } else {
                    $listItems[sizeof($listItems) - 1][$dataType] .= $val;
                }

            } else {
                $listItems[sizeof($listItems) - 1][$dataType] = $val;
            }
        }

        // Insert list items into template
        $template = null;
        foreach ($listItems as $key => &$item) {
            $template = $templateListItem;
            $this->replaceShortCode($template, ShortCodeName::KDN_LIST_ITEM_TITLE, isset($item['list_title']) ? $item['list_title'] : '');
            $this->replaceShortCode($template, ShortCodeName::KDN_LIST_ITEM_CONTENT, isset($item['list_content']) ? $item['list_content'] : '');
            $this->replaceShortCode($template, ShortCodeName::KDN_LIST_ITEM_POSITION,
                isset($item['list_number']) ? $item['list_number'] : ($postListNumberAutoInsert ? $key + 1 : '')
            );
            $item["template"] = $template;
        }

        // Combine list contents and create main list short code value
        $this->mainListShortCodeValue = '';
        if(!empty($listItems)) {
            // Reverse the array, if it is desired
            if($postListInsertReversed) $listItems = array_reverse($listItems);

            foreach($listItems as $key => $mItem) {
                if(isset($mItem["template"])) $this->mainListShortCodeValue .= $mItem["template"];
            }
        }
    }

    /**
     * Prepares main content short code's value
     */
    private function prepareMainContentShortCodeValue() {
        $findAndReplacesForCombinedContent = $this->bot->prepareFindAndReplaces([]);

        $this->mainContentShortCodeValue = '';
        if($this->postData->getContents()) {
            foreach ($this->postData->getContents() as $content) {
                if (isset($content["data"])) $this->mainContentShortCodeValue .= "<p>" . $content["data"] . "</p>";
            }

            $this->mainContentShortCodeValue = $this->findAndReplace($findAndReplacesForCombinedContent, $this->mainContentShortCodeValue);
        }
    }

    /**
     * Prepares main gallery short code's value
     */
    private function prepareMainGalleryShortCodeValue() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $templateGalleryItem = $this->bot->getSetting('_child_post_template_gallery_item', '[' . ShortCodeName::KDN_GALLERY_ITEM_URL . ']');
        } else {
            $templateGalleryItem = $this->bot->getSetting('_post_template_gallery_item', '[' . ShortCodeName::KDN_GALLERY_ITEM_URL . ']');
        }

        $this->mainGalleryShortCodeValue = '';

        if(!$this->postData->getAttachmentData()) return;
        if(!$templateGalleryItem) return;

        // Prepare each item and append it to the main gallery template
        foreach ($this->postData->getAttachmentData() as $mediaFile) {
            if ($mediaFile->isGalleryImage() !== 'direct-file' && !empty($mediaFile->getLocalUrl())) {
                $currentItemTemplate = $templateGalleryItem;
                $this->replaceShortCode($currentItemTemplate, ShortCodeName::KDN_GALLERY_ITEM_URL, $mediaFile->getLocalUrl());
                $this->mainGalleryShortCodeValue .= $currentItemTemplate;
            }
        }
    }

    /**
     * Prepares main direct file short code's value.
     *
     * @since 2.1.8
     */
    private function prepareMainDirectFileShortCodeValue() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $templateDirectFileItem = $this->bot->getSetting('_child_post_template_direct_file_item', '[' . ShortCodeName::KDN_DIRECT_FILE_ITEM_URL . ']');
        } else {
            $templateDirectFileItem = $this->bot->getSetting('_post_template_direct_file_item', '[' . ShortCodeName::KDN_DIRECT_FILE_ITEM_URL . ']');
        }

        $this->mainDirectFileShortCodeValue = '';

        if(!$this->postData->getAttachmentData()) return;
        if(!$templateDirectFileItem) return;

        // Prepare each item and append it to the main gallery template
        foreach ($this->postData->getAttachmentData() as $mediaFile) {
            if ($mediaFile->isGalleryImage() === 'direct-file' && !empty($mediaFile->getLocalUrl())) {
                $currentItemTemplate = $templateDirectFileItem;
                $this->replaceShortCode($currentItemTemplate, ShortCodeName::KDN_DIRECT_FILE_ITEM_URL, $mediaFile->getLocalUrl());
                $this->mainDirectFileShortCodeValue .= $currentItemTemplate;
            }
        }
    }

    /**
     * Prepares the main template of the post
     *
     * @param array $shortCodeValueMap
     * @since 1.8.0
     */
    private function prepareMainTemplate(&$shortCodeValueMap) {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $templateMain                        = $this->bot->getSetting('_child_post_template_main', '[' . ShortCodeName::KDN_MAIN_CONTENT . ']');
            $findAndReplacesForTemplate          = $this->bot->getSetting('_child_post_find_replace_template');
            $templateUnnecessaryElementSelectors = $this->bot->getSetting('_child_post_template_unnecessary_element_selectors');
        } else {
            $templateMain                        = $this->bot->getSetting('_post_template_main', '[' . ShortCodeName::KDN_MAIN_CONTENT . ']');
            $findAndReplacesForTemplate          = $this->bot->getSetting('_post_find_replace_template');
            $templateUnnecessaryElementSelectors = $this->bot->getSetting('_template_unnecessary_element_selectors');
        }

        $template = $templateMain;

        // Replace all short codes with their values in the main template
        $template = $this->replaceShortCodes($shortCodeValueMap, $template);

        // Replace custom short codes
        $this->replaceCustomShortCodes($template);

        // Clear the post content from unnecessary elements
        if(!empty($templateUnnecessaryElementSelectors)) {
            // Create a crawler using the HTML of the template
            $templateCrawler = $this->bot->createDummyCrawler($template);

            // Remove the elements from the crawler
            $this->bot->removeElementsFromCrawler($templateCrawler, $templateUnnecessaryElementSelectors);

            // Get the HTML of body tag for the template.
            $template = $this->bot->getContentFromDummyCrawler($templateCrawler);
        }

        // Find and replace for template
        $template = $this->findAndReplace($findAndReplacesForTemplate, $template, true, $this->bot->getPostUrl());

        // Clear remaining predefined short codes
        $this->clearRemainingPredefinedShortCodes($template);

        // Set the template
        $this->postData->setTemplate($template);
    }

    /*
     * HELPERS
     */

    /**
     * Replace custom short codes inside a template
     *
     * @param string $template The template that contains custom short codes
     */
    private function replaceCustomShortCodes(&$template) {
        $map = $this->getCustomShortCodeValueMap();
        $template = $this->replaceShortCodes($map, $template);
    }

    /**
     * Get an array that contains custom short code names as the keys, and the short code values as the values. E.g.
     * [short_code_name => value1, short_code_name => value2]
     *
     * @return array
     */
    private function getCustomShortCodeValueMap() {
        if ($this->customShortCodeValueMap !== null) return $this->customShortCodeValueMap;

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postCustomShortCodeSelectors = $this->bot->getSetting('_post_custom_content_shortcode_selectors');
        } else {
            $postCustomShortCodeSelectors = $this->bot->getSetting('_child_post_custom_content_shortcode_selectors');
        }
        
        if(!$postCustomShortCodeSelectors) {
            $this->customShortCodeValueMap = [];
            return $this->customShortCodeValueMap;
        }

        // Prepare defaults by assigning empty values to all custom short codes
        $defaults = [];
        foreach($postCustomShortCodeSelectors as $v) {
            if(!isset($v['short_code']) || !$v['short_code']) continue;

            $defaults[$v['short_code']] = '';
        }

        // If there are not any short code data in the post data, no need to continue. Return the empty values.
        if(!$this->postData->getShortCodeData()) {
            $this->customShortCodeValueMap = $defaults;
            return $this->customShortCodeValueMap;
        }

        $map = [];

        // Get custom short codes that have values
        foreach($this->postData->getShortCodeData() as $scData) {
            $map[$scData["short_code"]] = $scData["data"];
        }

        $this->customShortCodeValueMap = $map + $defaults;

        return $this->customShortCodeValueMap;
    }

}