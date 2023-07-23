<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Data\PostData;
use KDNAutoLeech\Objects\Crawling\Bot\PostBot;
use KDNAutoLeech\PostDetail\PostDetailsService;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Objects\Enums\ErrorType;
use KDNAutoLeech\Objects\Enums\InformationMessage;
use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\Settings\Settings;
use KDNAutoLeech\Objects\Translation\TranslatableTranslator;

class PostTranslationPreparer extends AbstractPostBotPreparer {

    /**
     * Prepare the post bot
     *
     * @return void
     */
    public function prepare() {
        // No need to translate if the translation is not activated in general settings page or site settings page.
        if(!Settings::isTranslationActive() || !$this->bot->getSettingForCheckbox('_active_translation')) return;

        /**
         * Fires just before the post data is translated according to the settings.
         *
         * @param int      siteId    ID of the site
         * @param string   $postUrl  URL of the post
         * @param PostBot  $this     The bot itself
         * @param PostData $postData The data retrieved from the target site by using the settings configured by the user.
         * @param Crawler  $crawler  Crawler containing the target post page's source code. The crawler was manipulated
         *                           according to the settings.
         * @since 1.6.3
         */
        do_action('kdn/post/data/before_translate', $this->bot->getSiteId(), $this->bot->getPostUrl(), $this, $this->bot->getPostData(), $this->bot->getCrawler());

        // Translate by handling the errors.
        try {
            $translator = new TranslatableTranslator($this->bot->getSettingsImpl(), $this->bot->getPostData());
            $translator->translate();

            // Translate registered post details
            PostDetailsService::getInstance()->translate($this->bot, $translator);

        } catch(\Exception $e) {
            $this->bot->addError(ErrorType::TRANSLATION_ERROR, $e->getMessage());

            Informer::add(Information::fromInformationMessage(
                InformationMessage::TRANSLATION_ERROR,
                $e->getMessage(),
                InformationType::ERROR
            )->setException($e)->addAsLog());
        }

        /**
         * Fires just after the post data is translated according to the settings.
         *
         * @param int      siteId    ID of the site
         * @param string   $postUrl  URL of the post
         * @param PostBot  $this     The bot itself
         * @param PostData $postData Translated post data.
         * @param Crawler  $crawler  Crawler containing the target post page's source code. The crawler was manipulated
         *                           according to the settings.
         * @since 1.6.3
         */
        do_action('kdn/post/data/after_translate', $this->bot->getSiteId(), $this->bot->getPostUrl(), $this, $this->bot->getPostData(), $this->bot->getCrawler());
    }
}