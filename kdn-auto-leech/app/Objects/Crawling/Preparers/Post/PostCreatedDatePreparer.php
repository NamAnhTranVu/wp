<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use DateTime;
use KDNAutoLeech\Constants;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Objects\Informing\Informer;

class PostCreatedDatePreparer extends AbstractPostBotPreparer {

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
            $dateSelectors          = $this->bot->getSetting('_child_post_date_selectors');
            $findAndReplacesForDate = $this->bot->getSetting('_child_post_find_replace_date');
            $minutesToAdd           = $this->bot->getSetting('_child_post_date_add_minutes');
        } else {
            $dateSelectors          = $this->bot->getSetting('_post_date_selectors');
            $findAndReplacesForDate = $this->bot->getSetting('_post_find_replace_date');
            $minutesToAdd           = $this->bot->getSetting('_post_date_add_minutes');
        }

        // Get all ajax data.
        $allAjaxData = $this->bot->getPostData()->getAjaxData();

        $finalDate = current_time('mysql');

        if($dateSelectors) {
            foreach($dateSelectors as $dateSelector) {
                $attr = isset($dateSelector["attr"]) && $dateSelector["attr"] ? $dateSelector["attr"] : "content";

                if (isset($dateSelector["ajax"]) && $ajaxNumber = $dateSelector["ajax"]) {
                    $dataCrawler = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';
                } else {
                    $dataCrawler = $this->bot->getCrawler();
                }

                if($date = $this->bot->extractData($dataCrawler, $dateSelector["selector"], $attr, false, true, true)) {
                    // Apply find-and-replaces
                    $date = $this->bot->findAndReplace($findAndReplacesForDate, $date, true, $this->bot->getPostUrl());

                    // Get the timestamp. If there is a valid timestamp, prepare the date and assign it
                    // to postData
                    if($timestamp = strtotime($date)) {
                        // Get the date in MySQL date format.
                        $finalDate = date(Constants::$MYSQL_DATE_FORMAT, $timestamp);

                        // No need to continue. One match is enough.
                        break;

                    } else {
                        // Notify the user.
                        Informer::addInfo(sprintf(_kdn('Date %1$s could not be parsed.'), $date))
                            ->addAsLog();
                    }
                }
            }
        }

        // Create a DateTime object for the date so that we can manipulate it as we please.
        $dt = new DateTime($finalDate);

        // Now, manipulate the date if the user defined how many minutes should be added to the date.
        if($minutesToAdd) {
            // Minutes can be comma-separated. Get each minute by making sure they are integers.
            $minutes = array_map(function ($m) {
                return (int) trim($m);
            }, explode(",", $minutesToAdd));

            // If there are minutes, get a random one and add it to the date.
            if($minutes) {
                $dt->modify($minutes[array_rand($minutes)] . " minute");
            }
        }

        // Set the date in postData after formatting it by MySQL date format
        $this->bot->getPostData()->setDateCreated($dt->format(Constants::$MYSQL_DATE_FORMAT));
    }
}