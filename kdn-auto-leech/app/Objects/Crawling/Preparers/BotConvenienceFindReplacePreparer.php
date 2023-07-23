<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers;


use KDNAutoLeech\Objects\Crawling\Bot\AbstractBot;
use KDNAutoLeech\Objects\Crawling\Preparers\Interfaces\Preparer;
use KDNAutoLeech\Objects\GlobalShortCodes\GlobalShortCodeService;
use KDNAutoLeech\Objects\GlobalShortCodes\ShortCodes\IFrameGlobalShortCode;
use KDNAutoLeech\Objects\GlobalShortCodes\ShortCodes\ScriptGlobalShortCode;

/**
 * Prepares find-replace configs whose purpose is to provide convenience for the user, e.g. removing links and replacing
 * iframes with iframe short code.
 *
 * @package KDNAutoLeech\Objects\Crawling\Preparers
 * @since   1.8.0
 */
class BotConvenienceFindReplacePreparer implements Preparer {

    const REMOVE_LINKS_FIND     = '/<a\b[^>]*>((?:\n|.)*?)<\/a>/';
    const REMOVE_LINKS_REPLACE  = '$1';

    /*
     *
     */

    private $convertIframesToShortCodeFind           = '/<iframe([^>]*)>([^<]*)<\/iframe>/';
    private $convertIframesToShortCodeReplaceFormat  = '[%1$s$1]$2[/%1$s]';

    private $convertScriptsToShortCodeFind           = '/<script([^>]*)>([^<]*)<\/script>/';
    private $convertScriptsToShortCodeReplaceFormat  = '[%1$s$1]$2[/%1$s]';

    /** @var AbstractBot */
    private $bot;

    /** @var array Stores the prepared find-replace configs. */
    private $fr = null;

    /** @var bool */
    private $childPost;

    public function __construct(AbstractBot $bot) {
        $this->bot = $bot;
    }

    /**
     * @return array Prepares find-replace config
     * @since 1.8.0
     */
    public function prepare() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        $this->childPost = $this->bot->getPostData()->getChildPost();

        // Prepare the find and replace configurations only if they were not prepared.
        if ($this->fr === null) {
            $this->fr = [];
            $this->prepareRemoveLinks();
            $this->prepareConvertIframesToShortCode();
            $this->prepareConvertScriptsToShortCode();
        }

        return $this->fr;
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * Prepare link removal find-replace configuration
     *
     * @since 1.8.0
     */
    private function prepareRemoveLinks() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $removeLinksFromShortCodes = $this->bot->getSettingForCheckbox('_child_post_remove_links_from_short_codes');
        } else {
            $removeLinksFromShortCodes = $this->bot->getSettingForCheckbox('_post_remove_links_from_short_codes');
        }

        // Remove links from short codes
        if(!$removeLinksFromShortCodes) return;

        // Prepare the config
        $this->fr[] = $this->bot->createFindReplaceConfig(
            trim(static::REMOVE_LINKS_FIND, '/'),
            static::REMOVE_LINKS_REPLACE,
            true
        );
    }

    /**
     * Prepare find-replace config that can be used to convert iframe elements to iframe short code
     * @since 1.8.0
     */
    private function prepareConvertIframesToShortCode() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $convertIframesToShortCode = $this->bot->getSettingForCheckbox('_child_post_convert_iframes_to_short_code');
        } else {
            $convertIframesToShortCode = $this->bot->getSettingForCheckbox('_post_convert_iframes_to_short_code');
        }

        // Convert iframes to short code
        if (!$convertIframesToShortCode) return;

        // Prepare the config
        $this->fr[] = $this->bot->createFindReplaceConfig(
            trim($this->convertIframesToShortCodeFind, '/'),
            sprintf(
                $this->convertIframesToShortCodeReplaceFormat,
                GlobalShortCodeService::getShortCodeTagName(IFrameGlobalShortCode::class)
            ),
            true
        );
    }

    /**
     * Prepare find-replace config that can be used to convert iframe elements to iframe short code
     * @since 1.8.0
     */
    private function prepareConvertScriptsToShortCode() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $convertScriptsToShortCode = $this->bot->getSettingForCheckbox('_child_post_convert_scripts_to_short_code');
        } else {
            $convertScriptsToShortCode = $this->bot->getSettingForCheckbox('_post_convert_scripts_to_short_code');
        }

        // Convert iframes to short code
        if (!$convertScriptsToShortCode) return;

        // Prepare the config
        $this->fr[] = $this->bot->createFindReplaceConfig(
            trim($this->convertScriptsToShortCodeFind, '/'),
            sprintf(
                $this->convertScriptsToShortCodeReplaceFormat,
                GlobalShortCodeService::getShortCodeTagName(ScriptGlobalShortCode::class)
            ),
            true
        );
    }

}