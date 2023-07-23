<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Data\PostData;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Objects\File\FileService;
use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\OptionsBox\OptionsBoxService;
use KDNAutoLeech\Utils;
use KDNAutoLeech\KDNAutoLeech;

class PostMediaPreparer extends AbstractPostBotPreparer {

    /** @var array */
    private $proxyList = [];

    /** @var array */
    private $ajaxData;

    /** @var bool */
    private $childPost;

    /** @var PostData */
    private $postData;

    private $findAndReplacesForImageUrls;

    private $postSaveImagesAsMedia;

    private $postSaveAllImagesInContent;

    /** @var bool */
    private $postSaveImagesAsGallery;

    /** @var bool */
    private $postSaveDirectFiles;

    /** @var MediaFile[] */
    private $attachmentMediaFiles = [];

    /**
     * @var array Stores the URLs of the remote files that are saved to the local environment. Keys are file URLs,
     *            and the values are MediaFile instances for the file URLs.
     */
    private $savedUrlMediaFileMap = [];

    /**
     * Prepare the post bot
     *
     * @return void
     */
    public function prepare() {

        // Prepare the proxy list if the user wants to use proxy.
        if($this->bot->getSettingForCheckbox("_kdn_use_proxy") && $this->bot->getSetting("_kdn_proxies", "", true)) {
            $this->proxyList = explode("\n", $this->bot->getSetting("_kdn_proxies", "", true));
            if ($this->bot->getSettingForCheckbox("_kdn_proxy_randomize")) {
                shuffle($this->proxyList);
            }
        }

        // Get all ajax data.
        $this->ajaxData = $this->bot->getPostData()->getAjaxData();

        /**
        * If we are crawling a child post.
        *
        * @since    2.1.8
        */
        $this->childPost = $this->bot->getPostData()->getChildPost();

        // Initialize instance variables
        $this->postData = $this->bot->getPostData();

        /**
        * If we are crawling a child post.
        *
        * @since    2.1.8
        */
        if ($this->childPost) {
            $this->findAndReplacesForImageUrls  = $this->bot->getSetting('_child_post_find_replace_image_urls');
            $this->postSaveImagesAsMedia        = $this->bot->getSettingForCheckbox('_child_post_save_images_as_media');
            $this->postSaveAllImagesInContent   = $this->bot->getSettingForCheckbox('_child_post_save_all_images_in_content');
            $this->postSaveImagesAsGallery      = $this->postSaveImagesAsMedia && $this->bot->getSettingForCheckbox('_child_post_save_images_as_gallery');

            // Save direct files settings
            $this->postSaveDirectFiles          = $this->bot->getSettingForCheckbox('_child_post_save_direct_files');
        } else {
            $this->findAndReplacesForImageUrls  = $this->bot->getSetting('_post_find_replace_image_urls');
            $this->postSaveImagesAsMedia        = $this->bot->getSettingForCheckbox('_post_save_images_as_media');
            $this->postSaveAllImagesInContent   = $this->bot->getSettingForCheckbox('_post_save_all_images_in_content');
            $this->postSaveImagesAsGallery      = $this->postSaveImagesAsMedia && $this->bot->getSettingForCheckbox('_post_save_images_as_gallery');

            // Save direct files settings
            $this->postSaveDirectFiles          = $this->bot->getSettingForCheckbox('_post_save_direct_files');
        }

        // If the user wants to save all images in the post content, set "save images as media" to true so that the
        // script can run properly.
        if($this->postSaveAllImagesInContent) {
            $this->postSaveImagesAsMedia = true;
        }

        // Prepare the attachment data.
        $this->prepareAttachmentData();

        // Save the thumbnail URL.
        $this->prepareAndSaveThumbnail();
    }

    /*
     *
     */

    /**
     * Prepares the thumbnail data and sets it to {@link $postData}
     */
    private function prepareAndSaveThumbnail() {

        // Allow to run with filter.
        $allowRun = apply_filters('kdn/post/allow_prepare_thumbnail', true, $this->postData, $this->bot, $this->proxyList, $this);
        
        // If not allow to run, stop here.
        if (!$allowRun) return;

        // Do action before prepare thumbnail.
        do_action('kdn/post/before_prepare_thumbnail', $this->postData, $this->bot, $this->proxyList, $this);





        /**
        * Get all needed settings.
        *
        * @since    2.1.8
        */
        if ($this->childPost) {
            $postSaveThumbnailIfNotExist    = $this->bot->getSetting('_child_post_save_thumbnails_if_not_exist');
            $postThumbnailByFirstImage      = $this->bot->getSetting('_child_post_thumbnail_by_first_image');
            $findAndReplacesForThumbnailUrl = $this->bot->getSetting('_child_post_find_replace_thumbnail_url');
            $postThumbnailSelectors         = $this->bot->getSetting('_child_post_thumbnail_selectors');
        } else {
            $postSaveThumbnailIfNotExist    = $this->bot->getSetting('_post_save_thumbnails_if_not_exist');
            $postThumbnailByFirstImage      = $this->bot->getSetting('_post_thumbnail_by_first_image');
            $findAndReplacesForThumbnailUrl = $this->bot->getSetting('_post_find_replace_thumbnail_url');
            $postThumbnailSelectors         = $this->bot->getSetting('_post_thumbnail_selectors');
        }





        /**
         * Set thumbnail data by the first image in post content.
         *
         * @since   2.1.8
         */
        // Get the first attachment data.
        $firstImageData = isset($this->postData->getAttachmentData()[0]) ? $this->postData->getAttachmentData()[0] : '';

        // If have first attachment data and use first attachment as thumbnail is activated.
        if ($postThumbnailByFirstImage && $firstImageData) {

            // If have first attachment data, do this.
            if ($firstImageData) {

                // Set source url to "first_image".
                $firstImageData->setSourceUrl('first_image');

                // Set thumbnail data.
                $this->postData->setThumbnailData($firstImageData);

            }

        }





        // If the user does not want to save a thumbnail, stop.
        if (!$postSaveThumbnailIfNotExist) return;

        $allAjaxData = $this->ajaxData;





        /**
         * Set thumbnail data by CSS selectors.
         *
         * @since   2.3.3
         */
        if (!$this->postData->getThumbnailData()) {

            // Process each CSS selector.
            foreach($postThumbnailSelectors as $selectorData) {

                // Get the element.
                $selector = Utils::array_get($selectorData, "selector");
                if (!$selector) continue;

                // Get the attribute.
                $attr = Utils::array_get($selectorData, "attr");
                if (!$attr) $attr = 'src';

                // Get the ajax number.
                $ajaxNumber = Utils::array_get($selectorData, "ajax");

                // If have an ajax number.
                if ($ajaxNumber) {

                    // Get the ajax data with key number in all ajax data.
                    $ajaxData = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';

                    // If have an ajax data.
                    if ($ajaxData) {

                        // Get the thumbnail URL
                        $thumbnailData = $this->bot->extractData($ajaxData, $selector, [$attr, "alt", "title"], false, true, true);

                    // Otherwise, continue with another CSS selector.
                    } else {
                        continue;
                    }

                // Otherwise, get the thumbnail URL from current post crawler.
                } else {

                    // Get the thumbnail URL from current post crawler.
                    $thumbnailData = $this->bot->extractData($this->bot->getCrawler(), $selector, [$attr, "alt", "title"], false, true, true);

                }

                // If not have any thumbnail data, try with another CSS selector.
                if (!$thumbnailData) continue;

                // Get the source URL
                // If the image data is an array
                if (is_array($thumbnailData)) {
                    // It must have an index of the given $attr.
                    if (!isset($thumbnailData[$attr])) {
                        // $attr index does not exist. Hence, we do not have an image URL. Continue with the next one.
                        continue;
                    }

                    $src = $thumbnailData[$attr];
                } else {
                    $src = $thumbnailData;
                }

                // Apply the replacements
                $originalSrc = $src;
                $src = $this->bot->findAndReplace($findAndReplacesForThumbnailUrl, $src, true, $this->bot->getPostUrl());

                // Set it as thumbnail URL to the post data
                try {
                    $src = $this->bot->resolveUrl($src);
                } catch (\Exception $e) {
                    Informer::addError(_kdn('URL could not be resolved') . ' - ' . $src)->addAsLog();
                }

                if (!$src) continue;

                // Create a media file
                $mediaFile = new MediaFile($src, null);
                $mediaFile->setOriginalSourceUrl($originalSrc);

                // Get "alt" and "title" values
                if (is_array($thumbnailData)) {
                    $mediaFile
                        ->setMediaAlt(Utils::array_get($thumbnailData, 'alt'))
                        ->setMediaTitle(Utils::array_get($thumbnailData, 'title'));
                }

                // Save the featured image
                $success = FileService::getInstance()->saveMediaFile($mediaFile, $this->getBot(), $this->proxyList);
                if (!$success) continue;

                // Get an applier for this selector data and, if it exists, apply the options.
                $applier = OptionsBoxService::getInstance()->createApplierFromSelectorData($selectorData);
                if ($applier) $applier->apply($mediaFile, $this->bot->getPostUrl());

                // We have found a thumbnail. So, no need to look for another one. Stop.
                $this->postData->setThumbnailData($mediaFile);

                break;

            }

        }





        /**
        * DEFAULT THUMBNAIL ID BY KEYWORDS IN POST TITLE
        * If we do not found any thumbnail from selector, use the
        * default thumbnail id by keywords in post title below.
        *
        * @since    2.1.8
        */
        if ($this->childPost) {
            $postDefaultThumnailIdsByKeywords = $this->bot->getSetting('_child_post_default_thumbnail_id_by_keywords');
        } else {
            $postDefaultThumnailIdsByKeywords = $this->bot->getSetting('_post_default_thumbnail_id_by_keywords');
        }

        if (!$this->postData->getThumbnailData() && ($postTitle = $this->postData->getTitle()) && $postDefaultThumnailIdsByKeywords) {

            foreach ($postDefaultThumnailIdsByKeywords as $postDefaultThumnailIdsByKeyword) {

                $keywords       =   isset($postDefaultThumnailIdsByKeyword['key']) ? $postDefaultThumnailIdsByKeyword['key'] : '';

                $thumbnailIds   =   isset($postDefaultThumnailIdsByKeyword['value']) ? $postDefaultThumnailIdsByKeyword['value'] : '';

                if(preg_match('/'.$keywords.'/i', $postTitle, $matches)){

                    $thumbnailIds = explode(',', $thumbnailIds);
                    $postDefaultThumnailId  = $thumbnailIds[array_rand($thumbnailIds)];

                    /**
                    * Create a media file by 2 cases:
                    *
                    * - Case 1: If this is     a test, create media file without $sourceUrl and $localPath.
                    * - Case 1: If this is NOT a test, we do 2 things:
                    *           - First:  Update a post meta "_post_default_thumbnail" to selected Media ID.
                    *           - Second: Create media file without $sourceUrl and have a $localPath is the
                    *                     path of selected Media ID.
                    */
                    if (KDNAutoLeech::isDoingTest()) {
                        $mediaFile = new MediaFile(null, null);
                    } else {
                        update_post_meta($postDefaultThumnailId, '_post_default_thumbnail', true);
                        $mediaFile = new MediaFile(null, get_attached_file($postDefaultThumnailId));
                    }

                    /**
                    * Set the MediaId and LocalUrl to $mediaFile object.
                    */
                    $mediaFile->setMediaId($postDefaultThumnailId);
                    $mediaFile->setLocalUrl(wp_get_attachment_url($postDefaultThumnailId));

                    // Finally, setThumbnailData and this may be will use in PostSaver.
                    if ($mediaFile->getLocalUrl()) $this->postData->setThumbnailData($mediaFile);

                    // If we have a thumbnailData, stop right now.
                    break;

                }

            }

        }





        /**
        * DEFAULT THUMBNAIL ID
        * If we do not found any thumbnail from selector and by keywords in post title,
        * use the default thumbnail below.
        *
        * @since    2.1.8
        */
        if ($this->childPost) {
            $postDefaultThumnailIds = $this->bot->getSetting('_child_post_default_thumbnail_id');
        } else {
            $postDefaultThumnailIds = $this->bot->getSetting('_post_default_thumbnail_id');
        }

        if (!$this->postData->getThumbnailData()) {

            /**
            * Get the settings of post default thumbnail id.
            *
            * @return   string
            */
            if($postDefaultThumnailIds){

                // Randomize the IDs and select a Media ID.
                $postDefaultThumnailIds = explode(',', $postDefaultThumnailIds);
                $postDefaultThumnailId  = $postDefaultThumnailIds[array_rand($postDefaultThumnailIds)];

                /**
                * Create a media file by 2 cases:
                *
                * - Case 1: If this is     a test, create media file without $sourceUrl and $localPath.
                * - Case 1: If this is NOT a test, we do 2 things:
                *           - First:  Update a post meta "_post_default_thumbnail" to selected Media ID.
                *           - Second: Create media file without $sourceUrl and have a $localPath is the
                *                     path of selected Media ID.
                */
                if (KDNAutoLeech::isDoingTest()) {
                    $mediaFile = new MediaFile(null, null);
                } else {
                    update_post_meta($postDefaultThumnailId, '_post_default_thumbnail', true);
                    $mediaFile = new MediaFile(null, get_attached_file($postDefaultThumnailId));
                }

                /**
                * Set the MediaId and LocalUrl to $mediaFile object.
                */
                $mediaFile->setMediaId($postDefaultThumnailId);
                $mediaFile->setLocalUrl(wp_get_attachment_url($postDefaultThumnailId));

                // Finally, setThumbnailData and this may be will use in PostSaver.
                $this->postData->setThumbnailData($mediaFile);
            }

        }





        // Apply filter for final thumbnail data.
        $theThumbnailData = apply_filters('kdn/post/the_thumbnail_data', $this->postData->getThumbnailData(), $this->postData, $this->bot, $this->proxyList, $this);

        // Set the final thumbnail data.
        $this->postData->setThumbnailData($theThumbnailData);

        // Do action after prepare thumbnail.
        do_action('kdn/post/after_prepare_thumbnail', $this->postData, $this->bot, $this->proxyList, $this);

    }

    /**
     * Prepares the attachment data.
     *
     * @since 1.8.0
     */
    private function prepareAttachmentData() {

        $this->attachmentMediaFiles = [];

        // Prepare the gallery images. This should be called before prepareImageData. Otherwise, if there are duplicate
        // image URLs and prepareImageData finds them first, gallery images won't be saved. In other words, the images
        // that are marked as "gallery_image" will be skipped since their URLs were already saved. So, gallery image
        // data preparation is first.
        $this->prepareGalleryFileData();

        // Prepare the images
        $this->prepareFileData();

        // Prepare the direct files.
        $this->prepareDirectFileData();

        // Set the attachment media files
        $this->postData->setAttachmentData($this->attachmentMediaFiles);

        /**
        * Create shortcode data for attachments and direct files.
        *
        * @since    2.1.8
        */
        $AllShortcodeData           = $this->postData->getShortCodeData() ? $this->postData->getShortCodeData() : [];
        $AllAttachmentShortcodes    = [];
        $AllDirectFileShortcodes    = [];

        // Merge all shortcode data with all attachment shortcode data.
        if ($AllAttachments = $this->postData->getAttachmentData()) {
            foreach ($AllAttachments as $key => $Attachment) {
                $AllAttachmentShortcodes[$key]['data']          = $Attachment->getLocalUrl();
                $AllAttachmentShortcodes[$key]['short_code']    = 'kdn-attachment-item-' . $key;
            }
        }
        $AllShortcodeData = array_merge($AllShortcodeData, $AllAttachmentShortcodes);

        // Merge all shortcode data with all direct file shortcode data.
        if ($AllAttachments = $this->postData->getAttachmentData()) {
            $order = 0;
            foreach ($AllAttachments as $Attachment) {
                if ($Attachment->isGalleryImage() === 'direct-file') {
                    $AllDirectFileShortcodes[$order]['data']          = $Attachment->getLocalUrl();
                    $AllDirectFileShortcodes[$order]['short_code']    = 'kdn-direct-file-' . $order;
                    $order++;
                }
            }
        }
        $AllShortcodeData = array_merge($AllShortcodeData, $AllDirectFileShortcodes);

        // Set the new shortcode data.
        $this->postData->setShortCodeData($AllShortcodeData);
        
    }

    /**
     * Prepares gallery images
     */
    private function prepareGalleryFileData() {

        // If the images should not be saved, stop.
        if (!$this->postSaveImagesAsMedia || !$this->postSaveImagesAsGallery) return;

        /**
        * If we are crawling a child post.
        *
        * @since    2.1.8
        */
        if ($this->childPost) {
            $postGalleryImageSelectors = $this->bot->getSetting('_child_post_gallery_image_selectors');
        } else {
            $postGalleryImageSelectors = $this->bot->getSetting('_post_gallery_image_selectors');
        }

        // Prepare the image data
        $this->attachmentMediaFiles = array_merge(
            $this->attachmentMediaFiles,
            $this->prepareFileDataWithSelectors($this->bot->getCrawler(), $postGalleryImageSelectors, true)
        );
    }

    /**
     * Prepares images whose CSS selectors are given in the settings
     */
    private function prepareFileData() {

        // If the images should not be saved, stop.
        if (!$this->postSaveImagesAsMedia) return;

        /**
        * If we are crawling a child post.
        *
        * @since    2.1.8
        */
        if ($this->childPost) {
            $postImageSelectors = $this->bot->getSetting('_child_post_image_selectors');
        } else {
            $postImageSelectors = $this->bot->getSetting('_post_image_selectors');
        }

        // If the user wants to save all images inside the post content, manually add "img" selector to the post image
        // selectors.
        if($this->postSaveAllImagesInContent) {
            if(!$postImageSelectors) $postImageSelectors = [];

            $postImageSelectors[] = [
                "selector" => "img",
                "attr"     => "src"
            ];
        }

        // Get all content combined
        $allContent = $this->getAllContent();

        // If there is no content, we cannot find any images. So, stop.
        if(empty($allContent)) return;

        $combinedContent = "";
        foreach($allContent as $content) {
            $combinedContent .= $content["data"];
        }

        // Create a crawler for the combined content and search for URLs
        $sourceCrawler = $this->bot->createDummyCrawler($combinedContent);

        // Prepare the image data
        $this->attachmentMediaFiles = array_merge(
            $this->attachmentMediaFiles,
            $this->prepareFileDataWithSelectors($sourceCrawler, $postImageSelectors)
        );
    }

    /**
     * Prepares the direct files.
     *
     * @since   2.1.8
     */
    private function prepareDirectFileData() {
        
        // If the direct files should not be saved, stop.
        if (!$this->postSaveDirectFiles) return;

        /**
        * If we are crawling a child post.
        *
        * @since    2.1.8
        */
        if ($this->childPost) {
            $postDirectFileSelectors = $this->bot->getSetting('_child_post_direct_file_selectors');
        } else {
            $postDirectFileSelectors = $this->bot->getSetting('_post_direct_file_selectors');
        }

        // Prepare the image data
        $this->attachmentMediaFiles = array_merge(
            $this->attachmentMediaFiles,
            $this->prepareFileDataWithSelectors($this->bot->getCrawler(), $postDirectFileSelectors, 'direct-file')
        );
    }

    /*
     *
     */

    /**
     * Prepares image data and adds them to {@link sourceData}
     *
     * @param Crawler $crawler        The crawler from which the data will be extracted
     * @param array   $imageSelectors An array of selectors. Each selector is an array that should contain 'selector',
     *                                and 'attr' keys whose values are strings. 'selector' is a CSS selector, and
     *                                'attr'
     *                                is the target attribute from which the content will be retrieved. Default 'attr'
     *                                is
     *                                'src'.
     * @param bool    $isForGallery   True if the found images are for gallery.
     * @param bool    $singleResult   True if only one result is enough.
     * @return MediaFile[] Found data as a MediaFile array
     * @since 1.8.0
     */
    private function prepareFileDataWithSelectors($crawler, $imageSelectors, $isForGallery = false, $singleResult = false) {
        // TODO: This method have a lot in common with FileService::saveFilesWithSelectors(). Find a way to keep
        // the code DRY.
        $mediaFiles = [];

        $allAjaxData = $this->ajaxData;

        // Prepare the image data
        foreach($imageSelectors as $selectorData) {
            $selector = Utils::array_get($selectorData, "selector");
            if (!$selector) continue;

            $attr = Utils::array_get($selectorData, "attr");
            if (!$attr) $attr = 'src';

            /**
             * Extract data with Ajax.
             * @since   2.1.8
             */
            if (isset($selectorData["ajax"]) && $ajaxNumber = $selectorData["ajax"]) {

                // Get the ajax data with key number in all ajax data.
                $ajaxData = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';

                if ($ajaxData) {
                    // Get image data
                    $fileData = $this->bot->extractData($ajaxData, $selector, [$attr, "alt", "title"], false, $singleResult, true);
                } else {
                    continue;
                }
            } else {
                // Get image data
                $fileData = $this->bot->extractData($crawler, $selector, [$attr, "alt", "title"], false, $singleResult, true);
            }

            if (!$fileData) continue;

            if ($isForGallery) {
                /**
                * Remove these elements from the source code of the page.
                * We do not need to do that, keep the elements.
                *
                * @since    2.1.8
                */
                //$this->bot->removeElementsFromCrawler($crawler, $selector);
            }

            // If the image data is not an array, make it an array.
            if (!is_array($fileData)) $fileData = [$fileData];

            // Try to get an options box applier for this selector data
            $applier = OptionsBoxService::getInstance()->createApplierFromSelectorData($selectorData);

            // Make replacements
            foreach ($fileData as $key => $mFileData) {
                // Get the source URL
                // If the image data is an array
                if (is_array($mFileData)) {
                    // It must have an index of the given $attr.
                    if (!isset($mFileData[$attr])) {
                        // $attr index does not exist. Hence, we do not have an image URL. Continue with the next one.
                        continue;
                    }

                    $src = $mFileData[$attr];
                } else {
                    $src = $mFileData;
                }

                // Store the original source URL
                $original = $src;

                // Make the replacements for the image URL
                if ($src) $src = $this->bot->findAndReplace($this->findAndReplacesForImageUrls, $src, true, $this->bot->getPostUrl());

                // If there is no URL, continue with the next one.
                if (!$src) continue;

                // Prepare the media URL
                try {
                    $src = $this->bot->resolveUrl($src);

                } catch (\Exception $e) {
                    Informer::addError(_kdn('URL could not be resolved.') . ' - ' . $src)->addAsLog();
                }

                // Create a media file for this file
                $mediaFile = (new MediaFile($src, null))
                    ->setOriginalSourceUrl($original)
                    ->setIsGalleryImage($isForGallery);

                // Get "alt" and "title" values
                if (is_array($mFileData)) {
                    $mediaFile
                        ->setMediaAlt(Utils::array_get($mFileData, 'alt'))
                        ->setMediaTitle(Utils::array_get($mFileData, 'title'));
                }

                // If this is a duplicate, continue with the next one.
                if(isset($this->savedUrlMediaFileMap[$mediaFile->getSourceUrl()])) {
                    continue;
                }

                // Cache this so that we can check for duplicate source URLs. By this way, we eliminate redundant file
                // save operations.
                $this->savedUrlMediaFileMap[$mediaFile->getSourceUrl()] = $mediaFile;

                // Save the media file
                $success = FileService::getInstance()->saveMediaFile($mediaFile, $this->getBot(), $this->proxyList);
                if (!$success) continue;

                // Apply file options box options
                if ($applier) $applier->apply($mediaFile, $this->bot->getPostUrl());

                // Add it among others
                $mediaFiles[] = $mediaFile;

                // Stop if there should only be a single result.
                if ($singleResult) break;
            }

        }

        return $mediaFiles;
    }

    /**
     * Get an array containing contents, list contents, and short code contents
     *
     * @return array
     */
    private function getAllContent() {
        $allContent = [];

        // Get all of the contents
        if($this->postData->getContents())      $allContent = array_merge($allContent, $this->postData->getContents());
        if($this->postData->getListContents())  $allContent = array_merge($allContent, $this->postData->getListContents());
        if($this->postData->getShortCodeData()) $allContent = array_merge($allContent, $this->postData->getShortCodeData());

        return $allContent;
    }
}