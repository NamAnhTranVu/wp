<?php

namespace KDNAutoLeech\Objects\Crawling\Data;


use KDNAutoLeech\Interfaces\Translatable;
use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\Utils;

class PostData implements Translatable {

    /** @var bool */
    private $childPostActive;

    /** @var bool */
    private $childPost;

    /** @var array */
    private $ajaxData;

    /** @var string */
    private $stopCrawlingAllRun;

    /** @var string */
    private $stopCrawlingEachRun;

    /*
     *
     */

    /**
     * @var null|array An array of names of the post categories. Each item is a string or array. If the item is a
     *                 string, then it is one of the main categories of the post. If it is an array, it represents
     *                 a category hierarchy. Each previous category name in the array is the parent category name of the
     *                 item. E.g. ['cat1', 'cat2', 'cat3'] represents 'cat1 > cat2 > cat3' hierarchy.
     */
    private $categoryNames;

    /** @var bool */
    private $paginate;

    /** @var string */
    private $nextPageUrl;

    /** @var array */
    private $allPageUrls;

    /*
     *
     */

    /** @var string */
    private $title;

    /** @var array */
    private $excerpt;

    /** @var array */
    private $contents;

    /** @var string */
    private $dateCreated;

    /** @var array */
    private $shortCodeData;

    /** @var array */
    private $tags;

    /** @var array */
    private $preparedTags;

    /** @var string */
    private $slug;

    /*
     * LIST
     */

    /** @var int */
    private $listStartPos;

    /** @var array */
    private $listNumbers;

    /** @var array */
    private $listTitles;

    /** @var array */
    private $listContents;

    /*
     * META
     */

    /** @var string */
    private $metaKeywords;

    /** @var array */
    private $metaKeywordsAsTags;

    /** @var string */
    private $metaDescription;

    /*
     *
     */

    /** @var null|MediaFile */
    private $thumbnailData;

    /** @var MediaFile[] */
    private $attachmentData = [];

    /*
     *
     */

    /** @var array */
    private $customMeta;

    /** @var array */
    private $customTaxonomies;

    /** @var string */
    private $template;

    /*
     *
     */

    /** @var array WordPress post data */
    private $wpPostData = [];

    /**
     * ORTHER FUNCTIONS
     * @since 2.1.8
     */

    /**
     * @return array|null
     */
    public function getAjaxData() {
        return $this->ajaxData;
    }

    /**
     * @param array|null $ajaxData
     */
    public function setAjaxData($ajaxData) {
        $this->ajaxData = $ajaxData;
    }

    /**
     * @return string|null
     */
    public function getStopCrawlingAllRun() {
        return $this->stopCrawlingAllRun;
    }

    /**
     * @param string|null $stopCrawlingAllRun
     */
    public function setStopCrawlingAllRun($stopCrawlingAllRun) {
        $this->stopCrawlingAllRun = $stopCrawlingAllRun;
    }

    /**
     * @return string|null
     */
    public function getStopCrawlingEachRun() {
        return $this->stopCrawlingEachRun;
    }

    /**
     * @param string|null $stopCrawlingEachRun
     */
    public function setStopCrawlingEachRun($stopCrawlingEachRun) {
        $this->stopCrawlingEachRun = $stopCrawlingEachRun;
    }

    /*
     * GETTERS AND SETTERS
     */

    /**
     * @return bool
     */
    public function getChildPostActive() {
        return $this->childPostActive;
    }

    /**
     * @param bool $childPostActive
     */
    public function setChildPostActive($childPostActive) {
        $this->childPostActive = $childPostActive;
    }

    /**
     * @return bool
     */
    public function getChildPost() {
        return $this->childPost;
    }

    /**
     * @param bool $childPost
     */
    public function setChildPost($childPost) {
        $this->childPost = $childPost;
    }

    /**
     * @return array|null See {@link $categoryNames}
     */
    public function getCategoryNames() {
        return $this->categoryNames;
    }

    /**
     * @param array|null $categoryNames
     */
    public function setCategoryNames($categoryNames) {
        $this->categoryNames = $categoryNames;
    }

    /**
     * @return boolean
     */
    public function isPaginate() {
        return $this->paginate;
    }

    /**
     * @param boolean $paginate
     */
    public function setPaginate($paginate) {
        $this->paginate = $paginate;
    }

    /**
     * @return string
     */
    public function getNextPageUrl() {
        return $this->nextPageUrl;
    }

    /**
     * @param string $nextPageUrl
     */
    public function setNextPageUrl($nextPageUrl) {
        $this->nextPageUrl = $nextPageUrl;
    }

    /**
     * @return array
     */
    public function getAllPageUrls() {
        return $this->allPageUrls;
    }

    /**
     * @param array $allPageUrls
     */
    public function setAllPageUrls($allPageUrls) {
        $this->allPageUrls = $allPageUrls;
    }

    /**
     * @return string
     */
    public function getTitle() {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title) {
        $this->title = $title;
    }

    /**
     * @return array
     */
    public function getExcerpt() {
        return $this->excerpt;
    }

    /**
     * @param array $excerpt
     */
    public function setExcerpt($excerpt) {
        $this->excerpt = $excerpt;
    }

    /**
     * @return array
     */
    public function getContents() {
        return $this->contents;
    }

    /**
     * @param array $contents
     */
    public function setContents($contents) {
        $this->contents = $contents;
    }

    /**
     * @return string
     */
    public function getDateCreated() {
        return $this->dateCreated;
    }

    /**
     * @param string $dateCreated
     */
    public function setDateCreated($dateCreated) {
        $this->dateCreated = $dateCreated;
    }

    /**
     * @return array
     */
    public function getShortCodeData() {
        return $this->shortCodeData;
    }

    /**
     * @param array $shortCodeData
     */
    public function setShortCodeData($shortCodeData) {
        $this->shortCodeData = $shortCodeData;
    }

    /**
     * @return array
     */
    public function getTags() {
        return $this->tags;
    }

    /**
     * @param array $tags
     */
    public function setTags($tags) {
        $this->tags = $tags;
    }

    /**
     * @return array
     */
    public function getPreparedTags() {
        return $this->preparedTags;
    }

    /**
     * @param array $preparedTags
     */
    public function setPreparedTags($preparedTags) {
        $this->preparedTags = $preparedTags;
    }

    /**
     * @return string
     */
    public function getSlug() {
        return $this->slug;
    }

    /**
     * @param string $slug
     */
    public function setSlug($slug) {
        $this->slug = $slug;
    }

    /**
     * @return int
     */
    public function getListStartPos() {
        return $this->listStartPos;
    }

    /**
     * @param int $listStartPos
     */
    public function setListStartPos($listStartPos) {
        $this->listStartPos = $listStartPos;
    }

    /**
     * @return array
     */
    public function getListNumbers() {
        return $this->listNumbers;
    }

    /**
     * @param array $listNumbers
     */
    public function setListNumbers($listNumbers) {
        $this->listNumbers = $listNumbers;
    }

    /**
     * @return array
     */
    public function getListTitles() {
        return $this->listTitles;
    }

    /**
     * @param array $listTitles
     */
    public function setListTitles($listTitles) {
        $this->listTitles = $listTitles;
    }

    /**
     * @return array
     */
    public function getListContents() {
        return $this->listContents;
    }

    /**
     * @param array $listContents
     */
    public function setListContents($listContents) {
        $this->listContents = $listContents;
    }

    /**
     * @return string
     */
    public function getMetaKeywords() {
        return $this->metaKeywords;
    }

    /**
     * @param string $metaKeywords
     */
    public function setMetaKeywords($metaKeywords) {
        $this->metaKeywords = $metaKeywords;
    }

    /**
     * @return array
     */
    public function getMetaKeywordsAsTags() {
        return $this->metaKeywordsAsTags;
    }

    /**
     * @param array $metaKeywordsAsTags
     */
    public function setMetaKeywordsAsTags($metaKeywordsAsTags) {
        $this->metaKeywordsAsTags = $metaKeywordsAsTags;
    }

    /**
     * @return string
     */
    public function getMetaDescription() {
        return $this->metaDescription;
    }

    /**
     * @param string $metaDescription
     */
    public function setMetaDescription($metaDescription) {
        $this->metaDescription = $metaDescription;
    }

    /**
     * @return MediaFile|null
     */
    public function getThumbnailData() {
        return $this->thumbnailData;
    }

    /**
     * @param MediaFile $mediaFile
     */
    public function setThumbnailData($mediaFile) {
        $this->thumbnailData = $mediaFile;
    }

    /**
     * @return MediaFile[]
     */
    public function getAttachmentData() {
        return $this->attachmentData;
    }

    /**
     * @param MediaFile[] $attachmentData
     */
    public function setAttachmentData($attachmentData) {
        $this->attachmentData = $attachmentData ?: [];
    }

    /**
     * Deletes previously saved attachments.
     */
    public function deleteAttachments() {
        if(!$this->getAttachmentData()) return;

        foreach($this->getAttachmentData() as $mediaFile) {
            Utils::deleteFile($mediaFile->getLocalPath());

            // If the media file has an ID, delete the attachment with that ID.
            if ($mediaFile->getMediaId()) {
                wp_delete_attachment($mediaFile->getMediaId(), true);
            }
        }
    }

    /**
     * @return array
     */
    public function getCustomMeta() {
        return $this->customMeta;
    }

    /**
     * @param array $customMeta
     */
    public function setCustomMeta($customMeta) {
        $this->customMeta = $customMeta;
    }

    /**
     * @return array
     */
    public function getCustomTaxonomies() {
        return $this->customTaxonomies;
    }

    /**
     * @param array $customTaxonomies
     */
    public function setCustomTaxonomies($customTaxonomies) {
        $this->customTaxonomies = $customTaxonomies;
    }

    /**
     * @return string
     */
    public function getTemplate() {
        return $this->template;
    }

    /**
     * @param string $template
     */
    public function setTemplate($template) {
        $this->template = $template;
    }

    /**
     * @return array
     */
    public function getWpPostData() {
        return $this->wpPostData;
    }

    /**
     * @param array $wpPostData
     */
    public function setWpPostData($wpPostData) {
        $this->wpPostData = $wpPostData;
    }

    /**
     * Get all media files, which contain attachment media files and the thumbnail media file.
     *
     * @return MediaFile[]
     * @since 1.8.0
     */
    public function getAllMediaFiles() {
        $mediaFiles = $this->getAttachmentData();
        if ($this->getThumbnailData()) $mediaFiles[] = $this->getThumbnailData();
        return $mediaFiles;
    }

    /**
     * NOTE: Translate more wisely. For example, instead of translating listNumbers, listTitles, etc., just translate
     * the final post template. By this way, the number of chars to be translated will be less, hence, less money will
     * be spent for the translation service.
     *
     * NOTE: The fields must have mutator and accessor methods. In other words, if there is "title", then there must be
     * setTitle and getTitle methods so that "title" can be translated.
     *
     * @return array Stores the names of the fields that can be translated. The values indicate the translatable keys of
     *      the fields. E.g. if the value of "attachmentData" field has a an array value, whose each item
     *      has translatable values in "title" and "alt" keys, ["attachmentData" => ["title", "alt"]] indicates this.
     *      Make sure the value is defined for a translatable field. If you do not specify a value, the field won't be
     *      considered as translatable. So, ["title"] is not translatable, while ["title" => ""] is translatable. An
     *      empty value means the value of the field is entirely translatable. Objects are translatable as well. In
     *      case of objects, set the field names that have setter and getter methods. E.g. if "attachmentData" stores
     *      an array of MediaFile instances, and each media file has a mediaTitle field and setMediaTitle and
     *      getMediaTitle methods, then ["attachmentData" => ["mediaTitle"]] indicates this.
     * @since 1.8.0
     */
    public function getTranslatableFields() {
        return [
            "title"                 => "",
            "excerpt"               => "data",
            'categoryNames'         => "",
            "slug"                  => "",
            "template"              => "",
            "preparedTags"          => "",
            "metaKeywords"          => "",
            "metaDescription"       => "",
            "customMeta"            => "data",
            "attachmentData"        => ["mediaTitle", "mediaDescription", "mediaCaption", "mediaAlt"],
            "thumbnailData"         => ["mediaTitle", "mediaDescription", "mediaCaption", "mediaAlt"],
            "customTaxonomies"      => "data",
        ];
    }
}