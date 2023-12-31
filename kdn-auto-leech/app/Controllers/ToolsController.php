<?php

namespace KDNAutoLeech\Controllers;


use KDNAutoLeech\Constants;
use KDNAutoLeech\Factory;
use KDNAutoLeech\Objects\Crawling\Bot\CategoryBot;
use KDNAutoLeech\Objects\Enums\ErrorType;
use KDNAutoLeech\Objects\Enums\InformationMessage;
use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\Page\AbstractMenuPage;
use KDNAutoLeech\Objects\Crawling\Savers\PostSaver;
use KDNAutoLeech\Objects\Traits\ErrorTrait;
use KDNAutoLeech\Utils;

class ToolsController extends AbstractMenuPage {

    use ErrorTrait;

    /** @var bool This is true if a post has just been recrawled. */
    private $isRecrawled = false;

    /**
     * @return string Menu title for the page
     */
    public function getMenuTitle() {
        return _kdn('Tools');
    }

    /**
     * @return string Page title
     */
    public function getPageTitle() {
        return _kdn('Tools');
    }

    /**
     * @return string Slug for the page
     */
    public function getPageSlug() {
        return "tools";
    }

    /**
     * Get view for the page.
     *
     * @return mixed Not-rendered blade view for the page
     */
    public function getView() {
        // Add assets
        Factory::assetManager()->addPostSettings();
        Factory::assetManager()->addTools();

        // Get available sites
        $availableSites = get_posts(['post_type' => Constants::$POST_TYPE, 'numberposts' => -1]);

        $sites = [];
        foreach($availableSites as $site) {
            $sites[$site->ID] = $site->post_title;
        }

        return Utils::view('tools/main')->with([
            'settings'      =>  [], // To prevent errors, since all form items work with $settings variable
            'sites'         =>  $sites,
            'categories'    =>  Utils::getCategories(),
            'urlTypes'      =>  $this->getUrlTypes()
        ]);
    }

    public function handleAJAX() {
        $data = wp_unslash(parent::handleAJAX());

        $result = null;
        switch ($data["tool_type"]) {
            // Save a post
            case 'save_post':
                $result = $this->handleSavePostRequest($data);
                break;

            // Recrawl a post
            case 'recrawl_post':
                $result = $this->handleRecrawlPostRequest($data);
                break;

            // Delete URLs
            case "delete_urls":
                $result = $this->handleDeleteUrlsRequest($data);
                break;

            // Unlock URLs
            case 'unlock_all_urls':
                $result = $this->handleUnlockAllUrlsRequest($data);
                break;

            // Get post URLs from a category URL
            case 'get_post_urls_from_category_url':
                echo $this->handleGetPostUrlsFromCategoryUrlRequest($data);
                return;

            // Add URLs to database
            case 'add_urls_to_database':
                echo $this->handleAddUrlsToDatabaseRequest($data);
                return;
        }

        // Send the response.
        echo json_encode([
            'view' => Utils::view('partials.information-message')
                ->with('message', $result)
                ->render()
        ]);
    }

    /*
     * REQUEST HANDLERS
     */

    /**
     * Handles "get post URLs from category URL" request
     *
     * @param $data
     * @return string
     */
    private function handleGetPostUrlsFromCategoryUrlRequest($data) {
        $emptyResult = json_encode([]);

        $categoryUrl = Utils::array_get($data, 'category_url');
        $siteId = Utils::array_get($data, 'site_id');

        // If the category URL or the site ID does not exist, return an empty result.
        if (!$categoryUrl || !$siteId) return $emptyResult;

        // Get site settings
        $settings = get_post_meta($siteId);
        if (!$settings) return $emptyResult;

        // Get category URLs
        $bot = new CategoryBot(get_post_meta($siteId), $siteId);
        $categoryData = $bot->collectUrls(Utils::prepareUrl($bot->getSiteUrl(), $categoryUrl));

        $results = [];
        if ($categoryData) {
            // Prepare the response
            foreach($categoryData->getPostUrls() as $postUrlData) {
                $item = ["url" => $postUrlData["data"]];
                if ($thumbnail = Utils::array_get($postUrlData, "thumbnail")) {
                    $item["thumbnail"] = $thumbnail;
                }

                $results[] = $item;
            }
        }

        return json_encode([
            'view' => Utils::view('partials.info-list')
                ->render(),

            // Send whether there are information that should be shown or not
            'hasInfo' => Informer::hasInfo(),

            // Send the results
            'results' => $results,
        ]);
    }

    /**
     * Handles "add URLs to database" request
     *
     * @param array $data Request data
     * @return null|string
     */
    private function handleAddUrlsToDatabaseRequest($data) {
        $results = array_merge(
            $this->addPostUrlsToDatabase($data),
            $this->addPostUrlsToDatabaseFromCategoryUrls($data)
        );

        $insertCount = sizeof($results);

        // If there are no URLs inserted, return a single message.
        if ($insertCount === 0) {
            $message = _kdn('No URLs have been inserted.');
            return json_encode(['view' => $message]);
        }

        // Return a message with the inserted URLs
        $message = $insertCount === 1 ? _kdn('1 URL has been inserted') : sprintf(_kdn('%1$s URLs have been inserted'), $insertCount);
        $message .= ':';

        return json_encode([
            'view' => Utils::view('partials.test-result')
                ->with('message', $message)
                ->with('results', $results)
                ->render()
        ]);
    }

    /**
     * Handles "save post" request
     *
     * @param array $data Request data
     * @return null|string
     */
    private function handleSavePostRequest($data) {
        if (!isset($data["_kdn_tools_post_url"])) return null;

        $postId = $this->savePostManually(
            $data["_kdn_tools_site_id"],
            $data["_kdn_tools_post_url"],
            $data["_kdn_tools_category_id"],
            $data["_kdn_tools_featured_image_url"],
            Utils::array_get($data, '_kdn_recrawl_if_duplicate', false) == '1'
        );

        if ($postId) {
            $msg = $this->isRecrawled ? _kdn('The post has been recrawled.') : _kdn('The post has been saved.');

            $postUrl = get_permalink($postId);
            $result = sprintf($msg . ' ' . _kdn('You can check it here') . ': <a href="%1$s" target="_blank">%1$s</a>', $postUrl);

            return $result;
        }

        $result = _kdn('The post could not be saved.');
        if($errors = $this->getErrorDescriptions()) $result .= "<br>" . implode("<br>", $errors);

        // If there is a duplicate post, show its link to the user.
        if($duplicatePostId = $this->getErrorValue(ErrorType::DUPLICATE_POST)) {
            $duplicatePost = get_post($duplicatePostId);

            if($duplicatePost) {
                $duplicatePostTitle = $duplicatePost->post_title ? $duplicatePost->post_title : _kdn("No Title");
                $duplicatePostUrl = get_permalink($duplicatePostId);
                $result .= "<br>" . _kdn("You should delete the duplicate post first") . ": " .
                    sprintf('<a href="%1$s" target="_blank">%2$s</a> ID: %3$s', $duplicatePostUrl, $duplicatePostTitle, $duplicatePostId);
            }
        }

        return $result;
    }

    /**
     * Handles "recrawl post" requests
     *
     * @param array $data Request data
     * @return null|string
     */
    private function handleRecrawlPostRequest($data) {
        if (!isset($data["_kdn_tools_recrawl_post_id"])) return null;

        $postId = $this->recrawlPostManually($data["_kdn_tools_recrawl_post_id"]);

        if ($postId) {
            $postUrl = get_permalink($postId);
            $result = $postId . ' - ' . sprintf(_kdn('The post is recrawled. You can check it here') . ': <a href="%1$s" target="_blank">%1$s</a>', $postUrl);
            return $result;

        }

        $result = _kdn('The post could not be found or it might not have been saved by KDN Auto Leech.');
        if($errors = $this->getErrorDescriptions()) $result .= "<br>" . implode("<br>", $errors);

        return $result;
    }

    /**
     * Handles "delete URL" requests
     *
     * @param array $data Request data
     * @return false|int|null|string
     */
    private function handleDeleteUrlsRequest($data) {
        if(!isset($data["_kdn_tools_safety_check"])) {
            return _kdn('You did not check the safety checkbox.');
        }

        if (!$data["_kdn_tools_safety_check"] || !isset($data["_kdn_tools_site_id"]) || !isset($data["_kdn_tools_url_type"])) {
            return null;
        }

        $result = null;
        $siteId = $data["_kdn_tools_site_id"];
        $resetLastCrawled = false;
        $resetLastRecrawled = false;

        switch ($data["_kdn_tools_url_type"]) {
            case "url_type_queue":
                $result = Factory::databaseService()->deleteUrlsBySiteIdAndSavedStatus($siteId, false);
                $resetLastCrawled = true;
                break;

            case "url_type_saved":
                $result = Factory::databaseService()->deleteUrlsBySiteIdAndSavedStatus($siteId, true);
                $resetLastRecrawled = true;
                break;

            case "url_type_all":
                $result = Factory::databaseService()->deleteUrlsBySiteId($siteId);
                $resetLastCrawled = true;
                $resetLastRecrawled = true;
                break;
        }

        if($resetLastCrawled) {
            Factory::postSaver()->setIsRecrawl(false);
            Factory::postSaver()->resetLastCrawled($siteId);
        }

        if($resetLastRecrawled) {
            Factory::postSaver()->setIsRecrawl(true);
            Factory::postSaver()->resetLastCrawled($siteId);
        }

        if ($result !== false) {
            $result = _kdn("Deleted successfully.");
        }

        return $result;
    }

    /**
     * Handles "unlock all URLs" request
     *
     * @param array $data Request data
     * @return string
     */
    private function handleUnlockAllUrlsRequest($data) {
        $res = Factory::databaseService()->unlockAllUrls();
        $result = $res ?
            ($res > 1 ? sprintf(_kdn("%s URLs have been unlocked."), $res) : _kdn("1 URL has been unlocked.") ) :
            _kdn("There are no locked URLs currently.");

        return $result;
    }

    /*
     * HELPERS
     */

    /**
     * Adds requested post URLs to the database
     *
     * @param array $data Request data
     * @return array
     */
    private function addPostUrlsToDatabase($data) {
        $results = [];

        $postUrls = Utils::array_get($data, 'post_urls');
        if (!$postUrls) return $results;

        $postUrls = json_decode($postUrls, true);
        if (!$postUrls) return $results;

        // Insert each URL into the database
        foreach($postUrls as $urlData) {
            $siteId     = Utils::array_get($urlData, '_siteId');
            $url        = Utils::array_get($urlData, '_url');
            $categoryId = Utils::array_get($urlData, '_categoryId');
            $imageUrl   = Utils::array_get($urlData, '_imageUrl');

            // If there is no site ID or URL or category ID, continue with the next one.
            if (!$siteId || !$url || !$categoryId) continue;

            $id = Factory::databaseService()->addUrl($siteId, $url, $imageUrl, $categoryId);
            if ($id) $results[] = $url;
        }

        return $results;
    }

    /**
     * Adds post URLs to the database by retrieving them from the given category URLs
     *
     * @param array $data Request data.
     * @return array
     */
    private function addPostUrlsToDatabaseFromCategoryUrls($data) {
        $results = [];

        $categoryUrls = Utils::array_get($data, 'category_urls');
        if (!$categoryUrls) return $results;

        $categoryUrls = json_decode($categoryUrls, true);
        if (!$categoryUrls) return $results;

        $siteBotCache = [];

        foreach($categoryUrls as $urlData) {
            $categoryUrl    = Utils::array_get($urlData, '_url');
            $siteId         = Utils::array_get($urlData, '_siteId');
            $categoryId     = Utils::array_get($urlData, '_categoryId');

            // Create category bot
            // If the bot exists in cache, use it.
            if (isset($siteBotCache[$siteId])) {
                $bot = $siteBotCache[$siteId];
            } else {
                // Otherwise, create a bot and cache it.
                $bot = new CategoryBot(get_post_meta($siteId), $siteId);
                $siteBotCache[$siteId] = $bot;
            }

            $data = $bot->collectUrls(Utils::prepareUrl($bot->getSiteUrl(), $categoryUrl));
            if (!$data) continue;

            foreach($data->getPostUrls() as $key => $item) {
                if(!$item["data"]) continue;

                $thumbnailUrl = isset($item["thumbnail"]) ? $item["thumbnail"] : null;
                $postUrl = $item["data"];

                if(Factory::databaseService()->addUrl($siteId, $postUrl, $thumbnailUrl, $categoryId)) {
                    $results[] = $postUrl;
                }
            }

        }

        return $results;
    }

    /**
     * Saves a post by post URL, site ID and category ID
     *
     * @param int         $siteId       ID of a site (custom post type) to which the URL belongs
     * @param string      $postUrl      The URL for the post-to-be-saved
     * @param int         $categoryId   ID of a category in which the saved post is saved
     * @param null|string $thumbnailUrl Thumbnail (featured image) URL for the post
     * @param bool        $recrawlIfDuplicate When this is true, if there is a duplicate post found, it will be recrawled.
     * @return int|null Inserted post's ID
     */
    public function savePostManually($siteId, $postUrl, $categoryId, $thumbnailUrl = null, $recrawlIfDuplicate = false) {
        $this->isRecrawled = false;
        $settings = get_post_meta($siteId);

        $postSaver = new PostSaver();
        $postSaver->setSettings($settings, Factory::postService()->getSingleMetaKeys());
        $postSaver->setIsRecrawl(false);

        // First check if it exists
        $urlId = null;
        $urlTuple = Factory::databaseService()->getUrlBySiteIdAndUrl($siteId, $postUrl);

        $duplicateTypes = get_post_meta($siteId, '_duplicate_check_types', true);
        $duplicateTypeUrl = isset($duplicateTypes[0]['url']);

        // Check for duplicate
        $postData = null;
        if($urlTuple && $urlTuple->saved_post_id && $duplicateTypeUrl) {
            // Get the post
            $postData = get_post($urlTuple->saved_post_id, ARRAY_A);

            // If the post exists, this is a duplicate. Checking this is vital. If we skip this and check it via
            // isDuplicate method, it will exclude the saved_post_id when checking. And then, it won't be able to
            // catch this duplicate post. Either check the existence of postData here, or set urlTuple's saved_post_id
            // to null before passing it to isDuplicate method.
            if($postData) {
                // If a recrawl is requested in case of a duplicate post, recrawl it.
                if ($recrawlIfDuplicate) return $this->recrawlPostManually($urlTuple->saved_post_id);

                $this->addError(ErrorType::DUPLICATE_POST, $urlTuple->saved_post_id);
                Informer::add(Information::fromInformationMessage(
                    InformationMessage::DUPLICATE_POST,
                    _kdn("Post ID") . ": {$urlTuple->saved_post_id}",
                    InformationType::ERROR
                )->addAsLog());

                return null;
            }

            // Otherwise, check for another duplicate post. This is a very unlikely case.
            if($postSaver->isDuplicate($postUrl, $postData, true, true)) {
                // If a recrawl is requested in case of a duplicate post, recrawl it.
                if ($recrawlIfDuplicate) return $this->recrawlPostManually($urlTuple->saved_post_id);

                // Get the errors from the post saver so that we can use them later.
                $this->setErrors($postSaver->getErrors());

                return null;
            }
        }

        // If saved, delete.
        if($urlTuple && $duplicateTypeUrl) Factory::databaseService()->deleteUrl($urlTuple->id);

        // Now, save the URL
        $urlId = Factory::databaseService()->addUrl($siteId, $postUrl, $thumbnailUrl, $categoryId);

        // Define the required variables. These variables will be changed by savePost function.
        $nextPageUrl    = null;
        $nextPageUrls   = null;
        $draftPostId    = null;

        $postId = null;
        $finished = false;
        while(!$finished) {
            $postId = $postSaver->savePost($siteId, $settings, $urlId, false, $nextPageUrl, $nextPageUrls, $postId);

            $nextPageUrl = $postSaver->getNextPageUrl();
            $nextPageUrls = $postSaver->getNextPageUrls();

            if(!$nextPageUrl || !$postId) $finished = true;
        }
//        var_dump("Saving the post is finished. Post ID is ");
//        var_dump($postId);

        // Get the errors from the post saver so that we can use them later.
        $this->setErrors($postSaver->getErrors());

        return $postId;

    }

    /**
     * Recrawl a post manually by its post ID
     *
     * @param int $postId ID of the post to be recrawled
     * @return null|int ID of the post or null if there was something wrong
     */
    public function recrawlPostManually($postId) {
        if(!$postId || $postId < 1) return null;
        $urlTuple = Factory::databaseService()->getUrlByPostId($postId);

        if(!$urlTuple) return null;

        // Define the required variables. These variables will be changed by savePost method.
        $siteId         = $urlTuple->post_id;
        $nextPageUrl    = null;
        $nextPageUrls   = null;
        $draftPostId    = null;

        $settings = get_post_meta($siteId);

        $postSaver = new PostSaver();
        $postSaver->setIsRecrawl(true);

        $finished = false;
        while(!$finished) {
            $postId = $postSaver->savePost($siteId, $settings, $urlTuple->id, false,
                $nextPageUrl, $nextPageUrls, $postId);

            $nextPageUrl = $postSaver->getNextPageUrl();
            $nextPageUrls = $postSaver->getNextPageUrls();

            if(!$nextPageUrl || !$postId) $finished = true;
        }
//        var_dump("Recrawling the post is finished. Post ID is ");
//        var_dump($postId);

        // Get the errors from the post saver so that we can use them later.
        $this->setErrors($postSaver->getErrors());

        $this->isRecrawled = true;

        return $postId;
    }

    /**
     * Get URL types to be shown as options in a select element.
     * @return array URL types as key,value pairs
     */
    private function getUrlTypes() {
        return [
            "url_type_queue"    =>  _kdn("Queue"),
            "url_type_saved"    =>  _kdn("Saved"),
            "url_type_all"      =>  _kdn("All")
        ];
    }
}